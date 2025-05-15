let barFinish = false;
let morseFinish = false;
let coordsFinish = false;

function verifyAll() {
    fetch("resources/static.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Fehler beim Laden der URL-Basis");
            }
            return response.json();
        })
        .then(config => {
            const url = `${config.url_base}`;
            return fetch(url, {
                method: "post",
                headers: {
                    "uid": sessionStorage.getItem('uid')
                },
            });
        })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error("Fehler beim Senden der Anfrage");
            }
            //window.location.href = '../EndScene.html';
            return response.json();
        })
        .then(data => {
            if (data.success) {
                window.location.href = '/MainGame/EndScene.html?Gewonnen';
            }
        })
        .catch(error => {
            console.error("Fehler:", error);
        });
}