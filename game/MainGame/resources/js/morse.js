let firstCorrectMorseIn = true;

let morseList = JSON.parse(sessionStorage.getItem('MorseList')) || [];

let isMorseSuccessful = false;

function morseIn(key) {
    if (isMorseSuccessful) {
        return;
    }

    console.log(key);

    if (key === 'entf') {
        if (morseList) {
            morseList.pop();
        }
    } else if (key === 'enter') {
        console.log(morseList);
        sendMorse();
    } else if (!isNaN(key)) {
        if (activeList) {
            if (activeList.length < 5) {
                activeList.push(key);
            }
        } else {
            console.log('Keine Liste ausgewählt.');
        }
    }
    saveListsToSessionMorse();
    updateMorseList();
}

function saveListsToSessionMorse() {
    sessionStorage.setItem('MorseList', JSON.stringify(morseList));
}

function updateMorseList() {
    sendMorse();
    const listXElement = document.getElementById('list-x');

    const maxLength = 4;

    function renderMorseList(element, list) {
        element.innerHTML = '';
        list.forEach((item, index) => {
            const listItem = document.createElement('a');
            listItem.textContent = item;

            // Blinken nur für den nächsten Unterstrich der aktiven Liste
            if (isActive && item === '_' && index === list.findIndex((el) => el === '_')) {
                listItem.classList.add('blinking');
            }

            element.appendChild(listItem);
        });
    }

    renderMorseList(listXElement, formatListWithFixedDot(listX), activeList === listX);
}

function sendMorse() {
    fetch("resources/static.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Fehler beim Laden der URL-Basis");
            }
            return response.json();
        })
        .then(config => {
            const url = `${config.url_base}check-morse`;
            const formData = new FormData();
            formData.append("message", parseInt(morseList.join(''), 10));
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
            if (data.success) {
                isSendCoordsSuccessful = true; // Interaktionen deaktivieren
                if (firstCorrectCoordIn === true) {
                    firstCorrectCoordIn = false;
                    closeOverlay();
                }
            }
        })
        .catch(error => {
            console.error("Fehler:", error);
        });
}