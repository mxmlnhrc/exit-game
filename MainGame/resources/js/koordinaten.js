let listX = [];
let listY = [];
let activeList = listX; // Standardmäßig Liste X aktiv

function koordinatenIn(key) {
    if (key === 'x') {
        activeList = listX;
    } else if (key === 'y') {
        activeList = listY;
    } else if (key === 'entf') {
        if (activeList) {
            activeList.pop();
        }
    } else if (key === 'enter'){
        console.log(listX);
        console.log(listY);
        sendCoords();
    } else if (!isNaN(key)) {
        if (activeList) {
            if (activeList.length < 5) {
                activeList.push(key);
            } else {
            }
        } else {
            console.log('Keine Liste ausgewählt.');
        }
    }
    updateList();
}

function updateList() {
    const listXElement = document.getElementById('list-x');
    const listYElement = document.getElementById('list-y');

    const maxLength = 5;

    function formatListWithFixedDot(list) {
        const formattedList = [];
        let numberIndex = 0;

        for (let i = 0; i < 6; i++) {
            if (i === 3) {
                formattedList.push('.');
            } else {
                formattedList.push(numberIndex < list.length ? list[numberIndex] : '_');
                numberIndex++;
            }
        }

        return formattedList;
    }

    function renderList(element, list, isActive) {
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

    renderList(listXElement, formatListWithFixedDot(listX), activeList === listX);
    renderList(listYElement, formatListWithFixedDot(listY), activeList === listY);
}

function sendCoords() {
    fetch("resources/static.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Fehler beim Laden der URL-Basis");
            }
            return response.json();
        })
        .then(config => {
            const url = `${config.url_base}check-coords`;
            const formData = new FormData();
            formData.append("x", parseInt(listX.join(''), 10));
            formData.append("y", parseInt(listY.join(''), 10));
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
        })
        .catch(error => {
            console.error("Fehler:", error);
        });
}
