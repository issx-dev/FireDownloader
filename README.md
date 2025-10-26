# 🔥 FireDownloader

A powerful Flask-based web application for downloading YouTube videos and audio files with ease.

## Technologies Used

- Flask (3.1.0)
- yt-dlp
- Jinja2 (3.1.6)

![Python](https://img.shields.io/badge/python-3.12.3-blue.svg)
![Flask](https://img.shields.io/badge/flask-3.1.0-green.svg)
![Jinja2](https://img.shields.io/badge/jinja2-3.1.6-red.svg)
![License](https://img.shields.io/badge/license-MIT-yellow.svg)

## Features

- 📱 Multiple video quality options (360p to 2160p)
- 🎵 Various output formats supported:
  - Video: MP4, WEBM, MKV
  - Audio: MP3, M4A
- 🚫 No advertisements
- 🧹 Automatic cleanup of old downloads
- 🌐 User-friendly web interface

## Installation

1. Create a Python virtual environment (recommended):
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

1. Start the Flask application:
```bash
python3 app.py
# or
flask run
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

3. Enter a valid YouTube URL:
- Full URL: https://www.youtube.com/watch?v=VIDEO_ID
- Short URL: https://youtu.be/VIDEO_ID


## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/FireDownloader.git
cd FireDownloader
```

2. Create a virtual environment and install dependencies (see Installation section)

3. Run in debug mode:
```bash
flask run --debug
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Developed by issx-dev

## Disclaimer
Done for educational purposes only.
