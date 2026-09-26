{
    document.getElementById("share").addEventListener("click", async (event) => {
        event.preventDefault();

        const shareData = {
            title: document.title,
            url: window.location.href
        };
        const status = document.getElementById("share-status");

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                status.textContent = "";
                return;
            }

            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(shareData.url);
                status.textContent = "Enlace copiado para compartir.";
                return;
            }

            window.prompt("Copia este enlace para compartirlo:", shareData.url);
        } catch (error) {
            if (error.name !== "AbortError") {
                status.textContent = "No se pudo compartir el enlace.";
            }
        }
    });
}