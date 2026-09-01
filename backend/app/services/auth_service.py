"""Authentication — login, token refresh, current user lookup."""

from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import (
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    create_access_token,
    create_refresh_token,
    decode_token,
    verify_password,
)
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.auth import LoginRequest, LoginResponse, RefreshRequest, TokenResponse, UserOut


class AuthService:
    def __init__(self, db: Session) -> None:
        self._repo = UserRepository(db)

    def login(self, credentials: LoginRequest) -> LoginResponse:
        user = self._repo.get_by_email(str(credentials.email))
        if user is None or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password.",
            )

        if not verify_password(credentials.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password.",
            )

        return LoginResponse(
            access_token=create_access_token(user.id, user.role),
            refresh_token=create_refresh_token(user.id),
            user=UserOut.model_validate(user),
        )

    def refresh(self, body: RefreshRequest) -> TokenResponse:
        payload = decode_token(body.refresh_token)
        if payload is None or payload.get("type") != REFRESH_TOKEN:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired refresh token.",
            )

        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token.",
            )

        user = self._repo.get_by_id(int(user_id))
        if user is None or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User account is inactive.",
            )

        return TokenResponse(
            access_token=create_access_token(user.id, user.role),
            refresh_token=create_refresh_token(user.id),
        )

    def get_user_from_token(self, token: str) -> User:
        payload = decode_token(token)
        if payload is None or payload.get("type") != ACCESS_TOKEN:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired access token.",
            )

        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid access token.",
            )

        user = self._repo.get_by_id(int(user_id))
        if user is None or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User account is inactive.",
            )

        return user
