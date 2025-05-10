let barometer1 = 0;
let barometer2 = 0;
let barometer3 = 0;

function updateBarometer(key) {
    const input = prompt("Bitte eine Zahl eingeben:");
    if (input !== null && !isNaN(input)) {
        const value = parseInt(input, 10);
        switch (key) {
            case '1':
                barometer1 = value;
                document.getElementById('bar1').textContent = barometer1;
                break;
            case '2':
                barometer2 = value;
                document.getElementById('bar2').textContent = barometer2;
                break;
            case '3':
                barometer3 = value;
                document.getElementById('bar3').textContent = barometer3;
                break;
            default:
                console.error("Ungültiger Schlüssel:", key);
        }
    } else {
        alert("Bitte eine gültige Zahl eingeben!");
    }
}