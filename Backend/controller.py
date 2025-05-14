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

