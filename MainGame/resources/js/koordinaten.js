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
        } else {
        }
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
                formattedList.push(list[numberIndex] || '_');
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