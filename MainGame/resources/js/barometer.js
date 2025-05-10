let barometer1 = 0;
let barometer2 = 0;
let barometer3 = 0;

function updateBarometer(key) {
    const input = prompt("Bitte eine Zahl eingeben:");
    const value = parseInt(input, 10);
    if (input !== null && !isNaN(value) && value >= 0 && value <= 9) {
        switch (key) {
            case '1':
                barometer1 = value;
                document.getElementById('bar1').textContent = barometer1;
                sendBar()
                break;
            case '2':
                barometer2 = value;
                document.getElementById('bar2').textContent = barometer2;
                sendBar()
                break;
            case '3':
                barometer3 = value;
                document.getElementById('bar3').textContent = barometer3;
                sendBar()
                break;
            default:
                console.error("Ungültiger Schlüssel:", key);
        }
    } else {
        alert("Bitte eine gültige Zahl eingeben!");
    }
}

function sendBar() {
    fetch("resources/static.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Fehler beim Laden der URL-Basis");
            }
            return response.json();
        })
        .then(config => {
            const url = `${config.url_base}check-bar`;
            const formData = new FormData();
            formData.append("bar1", barometer1);
            formData.append("bar2", barometer2);
            formData.append("bar3", barometer3);
            console.log(formData);

            return fetch(url, {
                method: "POST",
                headers: {
                    "uid": sessionStorage.getItem('uid')
                },
                body: formData
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Fehler beim Senden der Anfrage");
            }
            return response.json();
        })
        .then(data => {
            console.log("Antwort:", data);
            if (data.success === true) {
                disableInputs();
            }
        })
        .catch(error => {
            console.error("Fehler:", error);
        });
}

