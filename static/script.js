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

//  window.addEventListener("load", ...) -> This event is used to ensure that all DOM elements are loaded
window.addEventListener("load", () => {

    // Get the download link element in the DOM
    const downloadLink = document.getElementById('download-link');
    // Check if the download link exists (because if an error occurs, the download link will not be present)
    if (!downloadLink) return;
    // Add a click event listener to the download link
    downloadLink.addEventListener('click', function (event) {
        // Prevent the default action of the link
        event.preventDefault();
        // Get the link and filename from the data attributes in the HTML (a button with the download link)
        var link = this.getAttribute('href');
        var filename = this.getAttribute('data-filename');
        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();
        // Set up the request to the endpoint that returns the file
        xhr.open('GET', link, true);
        // Set the response type to 'blob' (for videos/audio files)
        xhr.responseType = 'blob';

        // When the request/download is complete, create a link to download the file
        xhr.onload = function () {
            // Keep the blob file given in the previous request
            var blob = xhr.response;
            // Create a temporary link using (createObjectURL) to download the file 
            var url = window.URL.createObjectURL(blob);
            // Create an hidden <a> link element
            var a = document.createElement('a');
            a.style.display = 'none';
            // Set the href attribute to the blob temporary URL
            a.href = url;
            // Set the download attribute to the filename (to download the file with the correct name)
            a.download = filename;
            // Append the link to the body (to make it work in Firefox)
            // This is necessary because Firefox requires the link to be in the DOM before it can be clicked
            document.body.appendChild(a);
            // Programmatically click the link to trigger the download, because the link that the user clicked is not the same as the one that was created
            a.click();
            // CLEAN UP
            // Remove the temporary link from the DOM
            window.URL.revokeObjectURL(url);
            // Retutrn to the main page after 30 seconds
            redirectAfterDownload();
        };

        xhr.send();
    });
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

