import hashlib
import os
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