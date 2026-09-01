from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

__all__ = [
    "Limiter",
    "RateLimitExceeded",
    "limiter",
    "_rate_limit_exceeded_handler",
    "get_remote_address",
]

from slowapi.errors import RateLimitExceeded  # noqa: E402
