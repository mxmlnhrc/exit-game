# main.py
from fastapi import FastAPI, HTTPException
import RPi.GPIO as GPIO
import threading
import time

# --- GPIO Setup ---
LED_PINS = [18, 12, 13]

def gpio_setup():
    GPIO.setmode(GPIO.BCM)
    for pin in LED_PINS:
        GPIO.setup(pin, GPIO.OUT)
        GPIO.output(pin, GPIO.LOW)

def gpio_cleanup():
    GPIO.cleanup()

# --- Blink-Funktion ---
def blink_cycle(delay: float = 0.5):
    """Endlos-Blinken in eigenem Thread"""
    try:
        while True:
            for pin in LED_PINS:
                GPIO.output(pin, GPIO.HIGH)
                time.sleep(delay)
                GPIO.output(pin, GPIO.LOW)
    except Exception:
        pass  # Thread wird mit Hauptprogramm beendet

# Thread-Instanz für Blink-Loop
blink_thread: threading.Thread | None = None

# --- FastAPI App ---
app = FastAPI(on_startup=[gpio_setup], on_shutdown=[gpio_cleanup])

@app.post("/led/{pin}/{action}")
def switch_led(pin: int, action: str):
    """Einzelnes LED an/aus schalten"""
    if pin not in LED_PINS:
        raise HTTPException(status_code=404, detail="Ungültiger Pin")
    if action == "on":
        GPIO.output(pin, GPIO.HIGH)
    elif action == "off":
        GPIO.output(pin, GPIO.LOW)
    else:
        raise HTTPException(status_code=400, detail="Action muss 'on' oder 'off' sein")
    return {"pin": pin, "action": action}

@app.post("/blink/start")
def start_blink(delay: float = 0.5):
    """Blink-Routine starten"""
    global blink_thread
    if blink_thread and blink_thread.is_alive():
        return {"status": "already blinking"}
    blink_thread = threading.Thread(target=blink_cycle, args=(delay,), daemon=True)
    blink_thread.start()
    return {"status": f"blinking started (delay={delay}s)"}

@app.post("/blink/stop")
def stop_blink():
    """Blink-Routine stoppen"""
    global blink_thread
    if blink_thread and blink_thread.is_alive():
        # Thread endet durch Exception/Abbruch im blink_cycle
        blink_thread = None
        return {"status": "blinking stopped"}
    return {"status": "was not blinking"}
