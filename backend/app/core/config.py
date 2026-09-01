from functools import lru_cache

from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment / .env file."""

    model_config = SettingsConfigDict(
        env_file=(".env", "../.env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # Application
    APP_NAME: str = "VAELKODE"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_V1_PREFIX: str = "/api/v1"

    # Database (MySQL)
    DB_HOST: str = "localhost"
    DB_PORT: int = 3306
    DB_USER: str = "root"
    DB_PASSWORD: str = ""
    DB_NAME: str = "vaelkode"

    # Security / JWT
    SECRET_KEY: str = "change-me"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    JWT_ALGORITHM: str = "HS256"

    # CORS (comma-separated origins)
    CORS_ORIGINS: str = "http://localhost:5173"

    # Lead uploads
    UPLOAD_DIR: str = "uploads/leads"
    MAX_UPLOAD_SIZE_MB: int = 25
    MAX_UPLOAD_FILES: int = 10
    LEADS_RATE_LIMIT: str = "5/minute"

    # First admin (used by seed script)
    FIRST_ADMIN_EMAIL: str = "admin@vaelkode.com"
    FIRST_ADMIN_PASSWORD: str = "ChangeMe123!"

    @computed_field
    @property
    def DATABASE_URL(self) -> str:  # noqa: N802
        return (
            f"mysql+pymysql://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}?charset=utf8mb4"
        )

    @computed_field
    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
