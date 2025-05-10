let isRedirectingToMain = false;
async function redirectAfterDownload() {

    if (isRedirectingToMain) return;
    isRedirectingToMain = true;

    let redirectInfo = document.getElementById("redirect_info");
    let counter = 30;
    redirectInfo.textContent = `Redirigiendo en ${counter}...`;

    let interval = setInterval(() => {
        counter--;
        if (counter > 0) {
            redirectInfo.textContent = `Redirigiendo en ${counter}...`;
        } else {
            clearInterval(interval);
        }
    }, 1000);

    await new Promise(resolve => setTimeout(resolve, 30000));
    location.href = "/";
}

document.getElementById('download-link').addEventListener('click', function (event) {
    event.preventDefault();
    var link = this.getAttribute('href');
    var filename = this.getAttribute('data-filename');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', link, true);
    xhr.responseType = 'blob';
    // Set the request header to accept the file type
    xhr.onload = function () {
        var blob = xhr.response;
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            window.open(url, '_blank');
        } else {
            a.click();
        }
        
        window.URL.revokeObjectURL(url);

        // Retutrn to the main page after 30 seconds
        redirectAfterDownload();
    };
    xhr.send();
});

window.addEventListener("load", () => {
    const scrollTarget = document.getElementById("download_info");
    if (scrollTarget) {
        const resultSection = scrollTarget.querySelector(".success, .warning, .error");
        if (resultSection) {
            // Delay the scroll to ensure the section is fully loaded
            setTimeout(() => {
                scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    }
});

