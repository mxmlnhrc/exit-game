import hashlib
import os

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
def blink_cycle(pin, delay: float = 0.1):
    """Endlos-Blinken in eigenem Thread"""
    try:
        while True:
            GPIO.output(pin, GPIO.HIGH)
            time.sleep(delay)
            GPIO.output(pin, GPIO.LOW)
            print("Blinking...")
            time.sleep(delay)
    except Exception:
        pass  # Thread wird mit Hauptprogramm beendet

