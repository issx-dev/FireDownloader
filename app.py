from flask import Flask, render_template, send_from_directory, request
from modules.yt_downloader import download_video
from modules.del_media import del_old_files

app = Flask(__name__)


@app.route("/")
def home():
    # Deletes the filename recieved from the redirection
    filename = request.args.get("q", None)
    if filename:
        del_old_files("Downloads", filename)

    return render_template("index.html")


@app.route("/download", methods=["POST"])
def download():
    url = request.form["url"]
    quality = request.form.get("quality", "1080")
    format = request.form.get("format", "mp4")

    result = download_video(url, quality, format)

    if not result["success"]:
        return render_template("index.html", result=result)

    return render_template(
        "index.html",
        result=result,
        download_file=f"/download/{result['unique_filename']}",
    )


@app.route("/download/<filename>")
def download_file(filename):
    return send_from_directory("Downloads", filename, as_attachment=True)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
