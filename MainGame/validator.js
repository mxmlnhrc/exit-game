fetch('http://127.0.0.1:8000/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'uid': sessionStorage.getItem("uid"),
    },
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Daten');
        }
        return response.json();
    })
    .then(data => {
        console.log('Daten erhalten:', data);
    })
    .catch(error => {
        window.location.href = '../First Puzzle/index.html';
    });