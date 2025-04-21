let listX = [];
let listY = [];
let activeList = null;

function koordinatenIn(key) {
    if (key === 'x') {
        activeList = listX;
        console.log('Liste X ausgewählt:', activeList);
    } else if (key === 'y') {
        activeList = listY;
        console.log('Liste Y ausgewählt:', activeList);
    } else if (key === 'entf') {
        if (activeList) {
            activeList.pop();
            console.log('Letztes Element entfernt. Aktuelle Liste:', activeList);
        } else {
            console.log('Keine Liste ausgewählt.');
        }
    } else if (!isNaN(key)) {
        if (activeList) {
            activeList.push(key);
            console.log('Zahl hinzugefügt. Aktuelle Liste:', activeList);
        } else {
            console.log('Keine Liste ausgewählt.');
        }
    }
    updateList()
}

function updateList() {
    const listXElement = document.getElementById('list-x');
    const listYElement = document.getElementById('list-y');

    listXElement.innerHTML = '';
    listX.forEach((item) => {
        const listItem = document.createElement('a');
        listItem.textContent = item;
        listXElement.appendChild(listItem);
    })

    listYElement.innerHTML = '';
    listY.forEach((item) => {
        const listItem = document.createElement('a');
        listItem.textContent = item;
        listYElement.appendChild(listItem);
    })
}