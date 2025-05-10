from fastapi import FastAPI, Query, Form, HTTPException, Header, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

#Eigene Module
from controller import initialize, salt_string, generate_check_sum

app = FastAPI()

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
    if uid == passwordCheck:
        return JSONResponse(content={"message": "Willkomen"})
    else:
        return HTTPException(status_code=404, detail="UID ist falsch!")

@app.post("/check-pw")
async def check_pw(request: Request):
    data = await request.json()
    if salt_string(data["password"]) == passwordCheck:
        initialize()
        return JSONResponse(content={"success": True, "uid": salt_string(data["password"])}, status_code=201)
    else:
        return JSONResponse(content={"success": False}, status_code=400)

@app.post("/check-coords")
async def check_coordinates(x: int = Form(...), y: int = Form(...), uid: str = Header(default=None)):
    # if uid == passwordCheck:
    if x == 20612 and y == 31927:
        generate_check_sum(uid, "Coords")
        return JSONResponse(content={"success": True}, status_code=200)
    else:
        return JSONResponse(content={"success": False, "message":"coords"}, status_code=400)
    #else:
    #    return JSONResponse(content={"success": False, "message":"wrong UID"}, status_code=400)

@app.post("/check-bar")
async def check_bar(bar1: int = Form(...), bar2: int = Form(...), bar3: int = Form(...), uid: str = Header(default=None)):
    if bar1 == 6 and bar2 == 4 and bar3 == 7:
        return JSONResponse(content={"success": True}, status_code=200)
    else:
        return JSONResponse(content={"success": False, "message":"at least one is wrong"}, status_code=400)