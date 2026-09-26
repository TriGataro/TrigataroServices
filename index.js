const shareButton = document.getElementById("share");
const shareStatus = document.getElementById("share-status");

shareButton.addEventListener("click", async () => {
    const shareData = {
        title: document.title,
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
            shareStatus.textContent = "";
            return;
        }

        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(shareData.url);
            shareStatus.textContent = "Enlace copiado para compartir.";
            return;
        }

        window.prompt("Copia este enlace para compartirlo:", shareData.url);
    } catch (error) {
        if (error.name !== "AbortError") {
            shareStatus.textContent = "No se pudo compartir el enlace.";
        }
    }
});
