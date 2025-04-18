from fastapi import FastAPI, Query, Form, HTTPException, Header, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

#Eigene Module
from controller import initialize, salt_string

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