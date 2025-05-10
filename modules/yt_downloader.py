# yt_dlp is a library for downloading videos from YouTube.
import yt_dlp
import os

# This function downloads a video from a given URL using yt-dlp, with the specified quality and format.
def download_video(url, quality="1080", format="mp4"):
    # Temporarily set the download directory to the current working directory
    download_dir = os.path.join(os.getcwd(), "Downloads")
    os.makedirs(download_dir, exist_ok=True)

    # Template for the output file name, using the title of the video and its extension
    outtmpl = os.path.join(download_dir, "%(title).80s.%(ext)s") 

    # Set the output template and mutes the console output.
    ydl_opts = {
        "outtmpl": outtmpl,
        "quiet": True,
    }

    # If the format is mp3, set the options for audio extraction.
    if format == "mp3":
        # Gets the best audio quality available.
        ydl_opts["format"] = "bestaudio/best"
        # Convert the audio to mp3 format with FFmpeg.
        ydl_opts["postprocessors"] = [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }
        ]
    # If the format is not mp3, set the options for video download.
    else:
        # Set the format to download the best video and audio quality available.
        ydl_opts["format"] = (
            f"bestvideo[height<={quality}][ext={format}]+bestaudio/best[height<={quality}]"
        )
        ydl_opts["merge_output_format"] = format

        # If the format is not webm, converts the video to the specified format with FFmpeg.
        if format != "webm":
            ydl_opts["postprocessors"] = [
                {"key": "FFmpegVideoConvertor", "preferedformat": format}
            ]

    try:
        # Download the file and extract the information about the video.
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)

            title = info.get("title") if info else "firedownloader_video"
            ext = "mp3" if format == "mp3" else format
            filename = f"{title}.{ext}"
            full_path = os.path.join(download_dir, filename)

            # If the requested quality is not available, return an alert message with the maximum available quality.
            if info and (info.get("height", 0) or 0) < int(quality) and format != "mp3":
                max_quality = f"{info['height']}p"
                return {
                    "success": True,
                    "error": f"⚠️ Calidad máxima disponible: {max_quality}",
                    "file_path": full_path,
                    "file_name": filename,
                    "title": title,
                }

            # Verify if the file was downloaded successfully.
            if not os.path.isfile(full_path):
                return {
                    "success": False,
                    "error": "❌ Archivo no encontrado tras descarga",
                }

            # If the file exists, return the success message with the file path and name.
            return {
                "success": True,
                "file_path": full_path,
                "file_name": filename,
                "title": title,
            }
    
    # Handle specific exceptions for better error messages.
    except yt_dlp.utils.ExtractorError:
        return {"success": False, "error": "❌ Error al extraer el video"}
    except yt_dlp.utils.DownloadError:
        return {"success": False, "error": "❌ Video no encontrado o URL inválida"}
    except ValueError as e:
        return {"success": False, "error": f"❌ {str(e)}"}
    except Exception as e:
        return {"success": False, "error": f"❌ Error inesperado: {str(e)}"}