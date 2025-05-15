let firstCorrectMorseIn = true;

let morseList = JSON.parse(sessionStorage.getItem('MorseList')) || [];

let isMorseSuccessful = false;

function morseIn(key) {
    if (isMorseSuccessful) {
        return;
    }
    console.log(key)

    if (key === 'entf') {
        morseList.pop();
    } else if (key === 'enter') {
        console.log(morseList);
        sendMorse();
    } else if (!isNaN(key)) {
        if(morseList.length < 4){
            morseList.push(key);
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
    const listMorseElements = document.getElementById('list-morse');

    const maxLength = 4;

    function formatListMorse(list) {
        const formatedMorseList = [];
        let numberIndex = 0;

        for (let i = 0; i < 4; i++) {
            formatedMorseList.push(numberIndex < list.length ? list[numberIndex] : '_');
            numberIndex++;
        }
        return formatedMorseList;
    }

    function renderMorseList(element, list) {
        element.innerHTML = '';
        list.forEach((item, index) => {
            const listItem = document.createElement('a');
            listItem.textContent = item;

            // Blinken nur für den nächsten Unterstrich der aktiven Liste
            if (item === '_' && index === list.findIndex((el) => el === '_')) {
                listItem.classList.add('blinking');
            }
            element.appendChild(listItem);
        });
    }
    renderMorseList(listMorseElements, formatListMorse(morseList));
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
            formData.append("message", morseList.join(''));
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
                isMorseSuccessful = true; // Interaktionen deaktivieren
                if (firstCorrectMorseIn === true) {
                    firstCorrectMorseIn = false;
                    closeOverlay();
                }
                verifyAll();
            }
        })
        .catch(error => {
            console.error("Fehler:", error);
        });
}