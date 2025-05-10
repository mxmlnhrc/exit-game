function hashSum(input) {
    const rotatedInput = rotateString(input, 13); // Rotationsverschiebung um 13
    return input.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0); // Einfache Hash-Funktion (Summe der ASCII-Werte der Zeichen)
}

function checkHash(input) {
    // Berechnet den Hash des Eingabestrings und vergleicht ihn mit dem verschlüsselten Wert
    const inputHash = hashSum(input);
    return inputHash === 885; //beispiel -> 1412 = dasisteintest
}

function sendPostRequest(data) {
    fetch("http://127.0.0.1:8000/check-pw", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Fehler beim Senden der Anfrage');
            }
            return response.json();
        })
        .then(result => {
            if (result.success) {
                console.log('Bestätigung erhalten:', result.uid);
                sessionStorage.setItem('uid', result.uid);
                // Weiterleitung zu einer Seite in einem anderen Ordner
                window.location.href = '../../../MainGame/index.html';
            } else {
                console.log('Ablehnung erhalten:', result.message);
            }
        })
        .catch(error => {
            console.error('Fehler:', error);
        });
}