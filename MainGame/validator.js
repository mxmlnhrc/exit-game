function validate() {
    console.log(sessionStorage.getItem("uid"));
    fetch('http://127.0.0.1:8000/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'uid': sessionStorage.getItem("uid"),
        },
    })
    .then(response => {
        console.log(response);
        if (!response.ok) {
            return false
        }
        return response.json();
    })
    .then(data => {
        return true
    })
    .catch(error => {
        window.location.href = '../First Puzzle/index.html';
    });
}