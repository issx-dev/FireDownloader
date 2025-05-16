import logging
import re
from datetime import datetime


def sanitize_title(name: str) -> str:
    # Replace invalid characters with "_"
    return re.sub(r'[\\/*?:"<>|]+', "_", name).strip("_")


def make_unique_filename(raw_title: str) -> str:
    safe = sanitize_title(raw_title)
    ts = datetime.now().strftime("%Y%m%d_%H%M%S_%f")[:-3]
    return f"{safe}_{ts}"


logging.basicConfig(level=logging.INFO, datefmt="%Y-%m-%d %H:%M:%S")

logger = logging.getLogger(__name__)
