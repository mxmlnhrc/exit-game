from fastapi import FastAPI, Query, Form, HTTPException, Header, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

#Eigene Module
from controller import salt_string, generate_check_sum, activate_led, blink_cycle, change_level_state, check_all_Level


#RaspberryPi Code
# main.py
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

# Thread-Instanz für Blink-Loop
blink_thread: threading.Thread | None = None

app = FastAPI(on_startup=[gpio_setup], on_shutdown=[gpio_cleanup])

#CORS Config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


passwordCheck = salt_string(str(885))


#Der Hash muss immer als Identifier übergeben werden
@app.get("/")
def read_root(uid: str = Header(default=None)):
    if uid == passwordCheck and check_all_Level():
        return JSONResponse(content={"message": "Alle Level sind aktiv!", "success": True}, status_code=200)
    else:
        return HTTPException(status_code=404, detail="Noch nicht bestanden!")

@app.post("/check-pw")
async def check_pw(request: Request):
    data = await request.json()
    if salt_string(data["password"]) == passwordCheck:
        global blink_thread
        if blink_thread and blink_thread.is_alive():
            return {"status": "already blinking"}
        blink_thread = threading.Thread(target=blink_cycle, daemon=True)
        blink_thread.start()
        change_level_state('entry')
        return JSONResponse(content={"success": True, "uid": salt_string(data["password"])}, status_code=201)
    else:
        return JSONResponse(content={"success": False}, status_code=400)

@app.post("/check-coords")
async def check_coordinates(x: int = Form(...), y: int = Form(...), uid: str = Header(default=None)):
    # if uid == passwordCheck:
    if x == 20612 and y == 31927:
        generate_check_sum(uid, "Coords")
        activate_led(18)
        change_level_state('coords')
        return JSONResponse(content={"success": True}, status_code=200)
    else:
        return JSONResponse(content={"success": False, "message":"coords"}, status_code=400)
    #else:
    #    return JSONResponse(content={"success": False, "message":"wrong UID"}, status_code=400)

@app.post("/check-bar")
async def check_bar(bar1: int = Form(...), bar2: int = Form(...), bar3: int = Form(...), uid: str = Header(default=None)):
    if bar1 == 6 and bar2 == 4 and bar3 == 7:
        activate_led(12)
        change_level_state('bar')
        return JSONResponse(content={"success": True}, status_code=200)
    else:
        return JSONResponse(content={"success": False, "message":"at least one is wrong"}, status_code=400)

@app.post("/check-morse")
async def check_morse(message: str = Form(...), uid: str = Header(default=None)):
    if message == "1793":
       #Morse Routine stoppen
        global blink_thread
        if blink_thread and blink_thread.is_alive():
            # Thread kann in Python nicht direkt "gekillt" werden, daher setze ein Flag im blink_cycle, um den Thread zu beenden
            blink_thread.stop = True
            blink_thread = None
            print("Blink-Thread wird gestoppt")
        activate_led(13)
        change_level_state('morse')
        return JSONResponse(content={"success": True}, status_code=200)
    else:
        return JSONResponse(content={"success": False, "message": "at least one is wrong"}, status_code=400)