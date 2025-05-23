const input = document.getElementById('commandInput');
const output = document.getElementById('output');

const commands = {
    help: "Verfügbare Befehle: help, log, rot, clear, story",
    rot: "Rotationscipher",
    story: coms.story
};

let shiftIn;
let rotIn;
let password;

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const cmd = input.value.trim();
        handleCommand(cmd);
        input.value = '';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const welcomeText = document.createElement('pre');
    welcomeText.textContent = coms.welcome;
    output.appendChild(welcomeText);

    const infoText = document.createElement('pre');
    infoText.textContent = commands.story;
    output.appendChild(infoText);
});


function handleCommand(cmd) {
    const line = document.createElement('div');
    line.textContent = `> ${cmd}`;
    output.appendChild(line);
    cmd = cmd.toLowerCase();

    if (cmd) {
        if (cmd === 'clear') {
            output.innerHTML = '';
            const line = document.createElement('pre');
            line.className = 'submarine-art';
            line.textContent = coms.submarine;
            output.appendChild(line);
            return;
        }
        switch (true) {
            case 'help' === cmd:
                const helpText = document.createElement('pre');
                helpText.textContent = coms.help;
                output.appendChild(helpText);
                break;
            case 'log' === cmd:
                const logText = document.createElement('pre');
                logText.textContent = coms.logbuch;
                output.appendChild(logText);
                break;
            case 'rot' === cmd:
                const rotText = document.createElement('div');
                if (!NaN && rotIn && rotIn !== 'undefined' && rotIn !== 'null' && /^[a-z]+$/.test(rotIn) && rotIn.length > 0){
                    if (shiftIn !== 0 && shiftIn !== undefined && shiftIn !== null) {
                        rotText.textContent = `Vershobener Text: ${rotateString(rotIn, shiftIn).toUpperCase()}`;
                    }else{
                        rotText.textContent = 'Bitte gebe einen Shift ein. Verwende: rot -shift <shift>';
                    }
                } else {
                    rotText.textContent = 'Bitte gebe einen String ein. Verwende: rot -string <string>';
                }

                output.appendChild(rotText);
                break;
            case 'rot -info' === cmd:
                const rotInfoText = document.createElement('pre');
                rotInfoText.textContent = `Shift: ${shiftIn || 'nicht gesetzt'}, String: ${rotIn || 'nicht gesetzt'}`;
                output.appendChild(rotInfoText);
                break;
            case cmd.startsWith('rot -shift'):
                const shiftValue = cmd.replace('rot -shift', '').trim();
                if (!isNaN(shiftValue)) {
                    shiftIn = parseInt(shiftValue, 10);
                    const response = document.createElement('div');
                    response.textContent = `Shift wurde auf ${shiftIn} gesetzt.`;
                    output.appendChild(response);
                } else {
                    const error = document.createElement('div');
                    error.textContent = 'Ungültiger Shift-Wert.';
                    output.appendChild(error);
                }
                break;
            case cmd.startsWith('rot -string'):
                const rotString = cmd.replace('rot -string', '').trim();
                if (rotString.length > 0 && !NaN && rotString && rotString !== 'undefined' && rotString !== 'null' && /^[a-z]+$/.test(rotString)) {
                    rotIn = rotString;
                    const rotInText = document.createElement('div');
                    rotInText.textContent = `String wurde auf "${rotIn}" gesetzt.`;
                    output.appendChild(rotInText);
                }
                 else {
                    const rotStringError = document.createElement('div');
                    rotStringError.textContent = 'Ungültiger String.';
                    output.appendChild(rotStringError);
                }
                break;
            case cmd.startsWith('login -pw'):
                const loginPw = cmd.replace('login -pw', '').trim();
                if (loginPw.length > 0 && !NaN && loginPw && loginPw !== 'undefined' && loginPw !== 'null' && /^[a-z]+$/.test(loginPw)) {
                    if (checkHash(loginPw) === true) {
                        const loginText = document.createElement('button');
                        loginText.textContent = '/> Einloggen';
                        // POST-Request zur Verifizierung des Passworts
                        // Richtiges Passwort => Weiterleitungslink
                        loginText.onclick = () => sendPostRequest({'password': String(hashSum(loginPw))});
                        output.appendChild(loginText);
                    } else {
                        const loginText = document.createElement('div');
                        loginText.textContent = 'Ungültiges Passwort.';
                        output.appendChild(loginText);
                    }

                }
                else {
                    const loginFormalError = document.createElement('div');
                    loginFormalError.textContent = 'Üngültiges Passwort.';
                    output.appendChild(loginFormalError);
                }
                break;
            case 'story' === cmd:
                output.innerHTML = '';
                const storyText = document.createElement('pre');
                storyText.textContent = commands.story;
                output.appendChild(storyText);
                break;
            case 'HERTHA BSC' === cmd:
                console.log('Skip the game - Gewonnen');
                break;
            default:
                const response = document.createElement('div');
                response.textContent = `Command not found: ${cmd}`;
                output.appendChild(response);
        }
    } else {
        const response = document.createElement('div');
        response.textContent = `Command not found: ${cmd}`;
        output.appendChild(response);
    }

    output.scrollTop = output.scrollHeight;
}
