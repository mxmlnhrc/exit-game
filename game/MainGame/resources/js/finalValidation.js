let barFinish = false;
let morseFinish = false;
let coordsFinish = false;

function verifyAll(barometers) {
    const storedBarometers = sessionStorage.getItem('barometers');
    console.log(sendBar(JSON.parse(storedBarometers)))
    console.log(JSON.parse(storedBarometers))
}