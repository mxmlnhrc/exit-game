let barometer1;
let barometer2;
let barometer3;

function loadBarometerValues() {

    let hasStoredValues = false;

    const storedBarometer1 = sessionStorage.getItem('barometer1');
    const storedBarometer2 = sessionStorage.getItem('barometer2');
    const storedBarometer3 = sessionStorage.getItem('barometer3');

    if (storedBarometer1 !== null && document.getElementById('bar1')) {
        barometer1 = parseInt(storedBarometer1, 10);
        document.getElementById('bar1').textContent = barometer1;
        hasStoredValues = true;
        console.log(storedBarometer1);
    }
    if (storedBarometer2 !== null && document.getElementById('bar2')) {
        barometer2 = parseInt(storedBarometer2, 10);
        document.getElementById('bar2').textContent = barometer2;
        hasStoredValues = true;
        console.log(storedBarometer2);
    }
    if (storedBarometer3 !== null && document.getElementById('bar3')) {
        barometer3 = parseInt(storedBarometer3, 10);
        document.getElementById('bar3').textContent = barometer3;
        hasStoredValues = true;
        console.log(storedBarometer3);
    }

    if (hasStoredValues) {
        sendBar();
    }
}


function updateBarometer(key) {
    loadBarometerValues();
    const input = prompt("Bitte eine Zahl eingeben:");
    const value = parseInt(input, 10);
    if (input !== null && !isNaN(value) && value >= 0 && value <= 9) {
        switch (key) {
            case '1':
                barometer1 = value;
                document.getElementById('bar1').textContent = barometer1;
                sessionStorage.setItem('barometer1', barometer1);
                sendBar();
                break;
            case '2':
                barometer2 = value;
                document.getElementById('bar2').textContent = barometer2;
                sessionStorage.setItem('barometer2', barometer2);
                sendBar();
                break;
            case '3':
                barometer3 = value;
                document.getElementById('bar3').textContent = barometer3;
                sessionStorage.setItem('barometer3', barometer3);
                sendBar();
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

function disableInputs() {
    for (let i = 1; i <= 3; i++) {
        const area = document.getElementById(`bar-area-${i}`);
        if (area) {
            area.onclick = null;
            area.classList.add('inactive');
        }
    }
}