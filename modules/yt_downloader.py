import yt_dlp
import os


def download_video(url, quality="1080", format="mp4"):
    download_dir = os.path.join(
        os.path.expanduser("~"), "Escritorio/YtVideoDownloaderFlask/Downloads"
    )

    os.makedirs(download_dir, exist_ok=True)

    ydl_opts = {
        "outtmpl": os.path.join(download_dir, "%(title)s.%(ext)s"),
        "progress_hooks": [progreso_descarga],
    }

    if format == "mp3":
        ydl_opts["format"] = "bestaudio/best"
        ydl_opts["postprocessors"] = [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }
        ]
    else:
        ydl_opts["format"] = (
            f"bestvideo[height<={quality}][ext={format}]+bestaudio/best[height<={quality}]"
        )
        ydl_opts["merge_output_format"] = format

        if format != "webm":
            ydl_opts["postprocessors"] = [
                {"key": "FFmpegVideoConvertor", "preferedformat": format}
            ]

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)

            if (info.get("height", 0) or 0) < int(quality) and format != "mp3":
                return f"⚠️ Calidad máxima disponible: {info['height']}p"

            title = info["title"]
            return f"{title}.{'mp3' if format == 'mp3' else format}"

    except yt_dlp.utils.ExtractorError as e:
        return f"❌ Error de extracción: {str(e)}"
    except yt_dlp.utils.DownloadError as e:
        return f"❌ Error: {str(e)}"
    except Exception as e:
        return f"❌ Error inesperado: {str(e)}"


def progreso_descarga(d):
    if d["status"] == "downloading":
        porcentaje = d.get("_percent_str", "N/A")
        velocidad = d.get("_speed_str", "N/A")
        print(f"\rProgreso: {porcentaje} | Velocidad: {velocidad}", end="")


if __name__ == "__main__":
    # Ejemplo de uso
    resultado = download_video("https://youtu.be/OuJerKzV5T0?si=PFvUBM4FsTODeP3u")
    print("\n" + resultado)
