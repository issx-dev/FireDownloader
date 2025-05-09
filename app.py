from flask import Flask, render_template, redirect, send_from_directory, request
from modules.yt_downloader import download_video
from modules.del_media import limpiar_archivos_viejos

app = Flask(__name__)


@app.route("/")
def home():
    print("Limpiando archivos viejos...")
    limpiar_archivos_viejos("Downloads")
    return render_template("index.html")


@app.route("/download", methods=["POST"])
def download():
    url = request.form["url"]
    quality = request.form["quality"]
    format = request.form["format"]

    result = download_video(url, quality, format)
    return render_template(
        "index.html", result=result, download_file=f"/download/{result}"
    )


@app.route("/download/<filename>")
def download_file(filename):
    return send_from_directory("Downloads", filename, as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True)
