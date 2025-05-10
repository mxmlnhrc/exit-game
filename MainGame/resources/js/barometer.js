function loadBarometerValues() {
    const storedBarometers = sessionStorage.getItem('barometers');
    let barometers = [0, 0, 0]; // Standardwerte

    if (storedBarometers) {
        barometers = JSON.parse(storedBarometers);
    }

    if (document.getElementById('bar1')) {
        document.getElementById('bar1').textContent = barometers[0];
    }
    if (document.getElementById('bar2')) {
        document.getElementById('bar2').textContent = barometers[1];
    }
    if (document.getElementById('bar3')) {
        document.getElementById('bar3').textContent = barometers[2];
    }

    sendBar(barometers);
}

function updateBarometer(key) {
    const storedBarometers = sessionStorage.getItem('barometers');
    let barometers = [0, 0, 0]; // Standardwerte

    if (storedBarometers) {
        barometers = JSON.parse(storedBarometers);
    }

    const input = prompt("Bitte eine Zahl eingeben:");
    const value = parseInt(input, 10);

    if (input !== null && !isNaN(value) && value >= 0 && value <= 9) {
        const index = parseInt(key, 10) - 1;
        if (index >= 0 && index < barometers.length) {
            barometers[index] = value;
            sessionStorage.setItem('barometers', JSON.stringify(barometers));

            if (document.getElementById(`bar${key}`)) {
                document.getElementById(`bar${key}`).textContent = value;
            }

            sendBar(barometers);
        }
    } else {
        alert("Bitte eine gültige Zahl eingeben!");
    }
}

function sendBar(barometers) {
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
            formData.append("bar1", barometers[0]);
            formData.append("bar2", barometers[1]);
            formData.append("bar3", barometers[2]);
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