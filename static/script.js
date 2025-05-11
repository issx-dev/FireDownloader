// NOTES
//  window.addEventListener("load", ...) -> This event is used to ensure that all DOM elements are loaded

// Function that redirects to the main page after 30 seconds
// Define a variable to check if the redirect is already in progress
let isRedirectingToMain = false;
async function redirectAfterDownload() {
    if (isRedirectingToMain) return;
    isRedirectingToMain = true;

    // Get the redirect info element in the DOM
    let redirectInfo = document.getElementById("redirect_info");
    // Define the counter variable and set the redirection time in seconds
    let counter = 30;
    // Set the initial text content of the redirect info element
    redirectInfo.textContent = `Redirigiendo en ${counter}...`;
    // Set the interval to update the counter every second
    let interval = setInterval(() => {
        // Update the counter every second
        counter--;
        if (counter > 0) {
            redirectInfo.textContent = `Redirigiendo en ${counter}...`;
        } else {
            // If the counter reaches 0, clear the interval and redirect to the main page
            redirectInfo.textContent = "Redirigiendo...";
            clearInterval(interval);
        }
    }, 1000);

    // Generate a promise that resolves after 30 seconds
    // Await needs a promise to makes a pause in the function until the promise is resolved (like wait 30 seconds before continuing)
    // When the timeout (timer) is over, resolve is automatically called
    // Resolve by itself is a function that is called when the promise is resolved successfully (reject is called when the promise fails)
    await new Promise((resolve) => setTimeout(resolve, 30000));
    // Redirect to the main page
    location.href = "/";
}

window.addEventListener("load", () => {
    const downloadForm = document.querySelector("form");
    const loadingAnimation = document.getElementById("loading_animation");

    // Add event listener for submit option to ensure that the form has been filled correctly
    downloadForm.addEventListener("submit", () => {
        if (loadingAnimation) loadingAnimation.style.display = "block";
    });
});

window.addEventListener("load", () => {
    // Get the download link element in the DOM
    const downloadLink = document.getElementById("download-link");
    // Check if the download link exists (because if an error occurs, the download link will not be present)
    if (!downloadLink) return;

    // Add a click event listener to the download link
    downloadLink.addEventListener("click", async function (event) {
        // Prevent the default action of the link
        event.preventDefault();
        // Get the link and filename from the data attributes in the HTML (a button with the download link)
        const link = this.getAttribute("href");
        const filename = this.getAttribute("data-filename");

        try {
            const response = await fetch(link);
            if (!response.ok) throw new Error("Fallo al descargar el archivo");

            // Create a blob from the response
            const blob = await response.blob();
            // Create a temporary URL for the blob
            const url = URL.createObjectURL(blob);

            // Create an hidden <a> link element
            const a = document.createElement("a");
            a.style.display = "none";
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
            URL.revokeObjectURL(url);
            // Return to the main page after 30 seconds
            redirectAfterDownload();
        } catch (error) {
            // If the request fails, show an error message
            const downloadInfo = document.getElementById("download_info");
            downloadInfo.innerHTML = `<div class="error">Error: ${error.message}</div>`;
            return;
        }
    });
});

window.addEventListener("load", () => {
    // Scroll to the download info section if it contains a success, warning, or error message
    const scrollTarget = document.getElementById("download_info");
    if (scrollTarget) {
        const resultSection = scrollTarget.querySelector(
            ".success, .warning, .error"
        );
        if (resultSection) {
            // Delay the scroll to ensure the section is fully loaded
            setTimeout(() => {
                scrollTarget.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 100);
        }
    }
});
