// NOTES
//  window.addEventListener("load", ...) -> This event is used to ensure that all DOM elements are loaded

// Function that redirects to the main page after 30 seconds
// Define a variable to check if the redirect is already in progress
let isRedirectingToMain = false;
async function redirectAfterDownload(filename) {
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
    if (filename) {
        // Redirect to the main page
        location.href = `/?q=${filename}`;
    } else {
        location.href = "/";
    }
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
    downloadLink.addEventListener("click", function (event) {
        // Get the unique filename from the data attribute
        const unique_filename = this.getAttribute("data-uniqueFilename");
        
        // Let the browser handle the download directly (don't prevent default)
        // The download will start automatically via the href attribute
        
        // Return to the main page after 30 seconds
        redirectAfterDownload(unique_filename);
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
