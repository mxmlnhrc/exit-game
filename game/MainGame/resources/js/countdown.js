let countdownTime = 20 * 60; // 20 Minuten in Sekunden

function startCountdown() {
    if(sessionStorage.getItem('countdownTime')){
        countdownTime = parseInt(sessionStorage.getItem('countdownTime'));
    }
    const countdownElement = document.getElementById('countdown');
    const interval = setInterval(() => {
        const minutes = Math.floor(countdownTime / 60);
        const seconds = countdownTime % 60;
        countdownElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        countdownTime--;
        sessionStorage.setItem('countdownTime', countdownTime);

        if (countdownTime < 0) {
            clearInterval(interval);
            countdownElement.textContent = "00:00";
        }
    }, 1000);
}

window.onload = startCountdown;