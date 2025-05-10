let redirectInfo = document.getElementById("redirect_info");

async function hideInfoDownload() {
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
    location.href = "http://localhost:5000";
}