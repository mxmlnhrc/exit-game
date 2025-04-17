const coms = {
    story:
`Dein U-Boot fängt ab zu sinken. Du bist als einziger noch bei Bewusstsein.
Du hast zwanzig Minuten Zeit um das dich und deine Crew sicher an die Oberfläche zu bringen.
Aber wo fängst du an? Am besten Logst du dich zunächst in das Interface ein und siehst ob dir dann etwas bekannt vorkommt.

 __      ___      _   ______       __      _       
 \\ \\    / (_)    | | |  ____|     / _|    | |      
  \\ \\  / / _  ___| | | |__   _ __| |_ ___ | | __ _ 
   \\ \\/ / | |/ _ \\ | |  __| | '__|  _/ _ \\| |/ _\` |
    \\  /  | |  __/ | | |____| |  | || (_) | | (_| |
     \\/   |_|\\___|_| |______|_|  |_| \\___/|_|\\__, |
                                              __/ |
                                             |___/ 
                                             
Wenn du eine Liste aller Befehle brauchst, tippe 'help'
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -`,
    welcome:
    `
  ___                 _   _          ___                        
 / __| __ ___ _____  | |_| |_  ___  |   \\ __ _ _  _            
 \\__ \\/ _\` \\ V / -_) |  _| ' \\/ -_) | |) / _\` | || |      
 |___/\\__,_|\\_/\\___|  \\__|_||_\\___| |___/\\__,_|\\_, |     
 | __|_ _(_) |_   ___   / __|__ _ _ __  ___    |__/             
 | _|\\ \\ / |  _| |___| | (_ / _\` | '  \\/ -_)                
 |___/_\\_\\_|\\__|        \\___\\__,_|_|_|_\\___|              
                                                    
    `,
    submarine: `
 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
               ___
             /   |  
   ,--------'    '--------..._,.
  (                          _--+
   \`----------------------''' \`'
> Gebe 'help' ein falls du nicht weiter weißt.

    `,
    logbuch:
`I ~ „Ich beobachte eine interessante Strömung – wir halten Kurs zur Analyse.“
V ~ „Vorbereitungen für das Abtauchen auf 400 Meter sind abgeschlossen.“
P ~ „Position wurde aktualisiert – wir bewegen uns entlang der geplanten Route.“
O ~ „Oberflächenbedingungen zeigen keine besonderen Auffälligkeiten.“
D ~ „Die Kommunikation mit der Basis wurde erfolgreich getestet.“
G ~ „Geringe Aktivität auf den Sonarsensoren – Umgebung bleibt stabil.“
P ~ „Periskop zeigt eine klare Wasseroberfläche – wir setzen unsere Erkundung fort.“
N ~ „Neue Meeresformationen wurden identifiziert – Daten werden protokolliert.“
`,
    help:
`    Verfügbare Befehle:
    help:                   Zeigt diese Liste an
    log:                    Zeigt das Logbuch des Kapitäns an
    rot:                    Lässt einen Rotationscipher laufen
     rot -shift <shift>:    Setzt einen Shift für den Rotationscipher (ganz Zahl)
     rot -string <string>:  Setzt einen String in den Rotationscipher
     rot -info:             Gibt deinen gewählten Shift und String für den Rotationscipher aus
    clear:                  Löscht den Bildschirm aber behält alle Variablen
    story:                  Zeigt die Hintergrundgeschichte an
    `,
}