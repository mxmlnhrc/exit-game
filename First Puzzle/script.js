const input = document.getElementById('commandInput');
const output = document.getElementById('output');

const commands = {
    help: "Verfügbare Befehle: help, log, rot, clear, story",
    rot: "Rotationscipher",
    story: coms.story
};

let shiftIn;
let rotIn;

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
                rotText.textContent = commands.rot;
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
                console.log(cmd)
                const rotString = cmd.replace('rot -string', '').trim();
                console.log(rotString.length);
                if (rotString.length > 0 && !NaN) {
                    rotIn = rotString;
                    const response = document.createElement('div');
                    response.textContent = `String wurde auf "${rotIn}" gesetzt.`;
                    output.appendChild(response);
                } else {
                    const error = document.createElement('div');
                    error.textContent = 'Ungültiger String.';
                    output.appendChild(error);
                }

            case 'story':
                output.innerHTML = '';
                const storyText = document.createElement('pre');
                storyText.textContent = commands.story;
                output.appendChild(storyText);
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
