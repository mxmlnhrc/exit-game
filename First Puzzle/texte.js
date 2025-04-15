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
`Capt. ~ "Tag 1: Die Crew ist an Bord und die Vorräte sind verstaut. Wir legen ab."
Capt. ~ "Tag 2: Das Wetter ist ruhig, die Navigation verläuft planmäßig."
Capt. ~ "Tag 3: Ein kleiner technischer Defekt an der Steuerung wurde behoben."
Capt. ~ "Tag 4: Ein Sturm zieht auf, wir bereiten uns auf schwere See vor."
Capt. ~ "Tag 5: Der Sturm ist vorüber, keine Schäden am Boot."
Capt. ~ "Tag 6: Ein ungewöhnliches Signal wurde empfangen, wir untersuchen es."
Capt. ~ "Tag 7: Die Crew bleibt motiviert, die Maschinen laufen einwandfrei."
Capt. ~ "Tag 8: Ein Wal wurde gesichtet, die Crew war begeistert."
Capt. ~ "Tag 9: Routinewartung der Systeme abgeschlossen, alles in Ordnung."
Capt. ~ "Tag 10: Wir nähern uns unserem Ziel, die Stimmung an Bord ist gut."`,
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