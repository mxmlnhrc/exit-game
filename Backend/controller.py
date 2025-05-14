import hashlib
import os
import threading

import time

import RPi.GPIO as GPIO

#Salt für single Use -> einfachste Hürde
salt = "b5f1017a22ee2b783a89389dec56c2ee"

def initialize():
    print("Initializing...")

def salt_string(input_string):
    return hashlib.sha512((input_string + salt).encode()).hexdigest()

def generate_check_sum(uid, level):
    # Erstellt eine Prüfziffer für die UID und das Level
    print(uid, level)

def activate_led(led):
    # Hier wird die LED aktiviert
    GPIO.output(led, GPIO.HIGH)

# --- Morse-Funktion ---
blink_time = {
    'short' : 0.5,
    'long' : 1.5,
    'pause_short' : 0.5,
    'pause_long' : 2,
}

# Morse code [1, 7, 9, 3]
morse_num = [['long', 'short', 'short', 'short'], ['short', 'short', 'short', 'long'], ['short', 'long', 'long', 'short'], ['long', 'long', 'long', 'short']]

def blink_cycle():
    """Endlos-Blinken in eigenem Thread"""
    try:
        while True:
            for number in morse_num:
                for part in number:
                    if getattr(threading.current_thread(), "stop", False):
                        break
                    GPIO.output(13, GPIO.HIGH)
                    time.sleep(blink_time[part])
                    GPIO.output(13, GPIO.LOW)
                    time.sleep(blink_time['pause_short'])
                time.sleep(blink_time['pause_long'])
    except Exception:
        pass  # Thread wird mit Hauptprogramm beendet


level_bar = False
level_entry = False
level_morse = False
level_coords = False

def change_level_state(level):
    # Hier wird der Status des Levels geändert
    if level == "bar":
        level_bar = True
    elif level == "entry":
        level_entry = True
    elif level == "morse":
        level_morse = True
    elif level == "coords":
        level_coords = True

def check_all_Level():
    # Hier wird überprüft, ob alle Level aktiv sind
    if level_bar and level_entry and level_morse and level_coords:
        return True
    else:
        return False