function hashSum(input) {
    const rotatedInput = rotateString(input, 13); // Rotationsverschiebung um 13
    return input.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0); // Einfache Hash-Funktion (Summe der ASCII-Werte der Zeichen)
}

function checkHash(input) {
    // Berechnet den Hash des Eingabestrings und vergleicht ihn mit dem verschlüsselten Wert
    const inputHash = hashSum(input);
    return inputHash === 1412; //beispiel -> 1412 = dasisteintest
}