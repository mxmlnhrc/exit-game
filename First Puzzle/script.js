const input = document.getElementById('commandInput');
const output = document.getElementById('output');

const commands = {
    help: "Verfügbare Befehle: help, log, rot, clear, story",
    log: "This is a web-based terminal made with HTML/CSS/JS." ,
    clear: "clear",
    rot: "Rotationscipher",
    story: `
Dein U-Boot fängt ab zu sinken. Du bist als einziger noch bei Bewusstsein.
Du hast zwanzig Minuten Zeit um das dich und deine Crew sicher an die Oberfläche zu bringen.
Aber wo fängst du an? Am besten Logst du dich zunächst in das Interface ein und siehst ob dir dann etwas bekannt vorkommt.
Wenn du eine Liste aller Befehle brauchst, tippe 'help'

 __      ___      _   ______       __      _       
 \\ \\    / (_)    | | |  ____|     / _|    | |      
  \\ \\  / / _  ___| | | |__   _ __| |_ ___ | | __ _ 
   \\ \\/ / | |/ _ \\ | |  __| | '__|  _/ _ \\| |/ _\` |
    \\  /  | |  __/ | | |____| |  | || (_) | | (_| |
     \\/   |_|\\___|_| |______|_|  |_| \\___/|_|\\__, |
                                              __/ |
                                             |___/ 
`
};

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const cmd = input.value.trim();
        handleCommand(cmd);
        input.value = '';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const welcomeText = document.createElement('pre');
    welcomeText.textContent = `
  ___                 _   _          ___            
 / __| __ ___ _____  | |_| |_  ___  |   \\ __ _ _  _ 
 \\__ \\/ _\` \\ V / -_) |  _| ' \\/ -_) | |) / _\` | || |
 |___/\\__,_|\\_/\\___|  \\__|_||_\\___| |___/\\__,_|\\_, |
 | __|_ _(_) |_   ___   / __|__ _ _ __  ___    |__/ 
 | _|\\ \\ / |  _| |___| | (_ / _\` | '  \\/ -_)        
 |___/_\\_\\_|\\__|        \\___\\__,_|_|_|_\\___|        
                                                    

    `;
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
            return;
        }
        switch (cmd.toLowerCase()) {
            case 'help':
                const helpText = document.createElement('div');
                helpText.textContent = commands.help;
                output.appendChild(helpText);
                break;
            case 'log':
                const logText = document.createElement('div');
                logText.textContent = commands.log;
                output.appendChild(logText);
                break;
            case 'rot':
                const rotText = document.createElement('div');
                rotText.textContent = commands.rot;
                output.appendChild(rotText);
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
