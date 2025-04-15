const input = document.getElementById('commandInput');
const output = document.getElementById('output');

const commands = {
    help: "Verfügbare Befehle: help, log, rot, clear, story",
    rot: "Rotationscipher",
    story: coms.story
};

var shiftIn;
var rotIn;

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

    if (commands[cmd]) {
        if (cmd === 'clear') {
            output.innerHTML = '';
            const line = document.createElement('pre');
            line.className = 'submarine-art';
            line.textContent = coms.submarine;
            output.appendChild(line);
            return;
        }
        switch (cmd.toLowerCase()) {
            case 'help':
                const helpText = document.createElement('pre');
                helpText.textContent = coms.help;
                output.appendChild(helpText);
                break;
            case 'log':
                const logText = document.createElement('pre');
                logText.textContent = coms.logbuch;
                output.appendChild(logText);
                break;
            case 'rot':
                const rotText = document.createElement('div');
                rotText.textContent = commands.rot;
                output.appendChild(rotText);
                break;
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
