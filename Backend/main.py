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
def read_root(hash_id: str = Header(default=None)):
    if hash_id == passwordCheck:
        initialize()
        return JSONResponse(content={"message": "Willkomen"})
    else:
        return HTTPException(status_code=404, detail="Hash ID ist falsch!")

@app.post("/check-pw")
def check_pw(password: str = Form(...)):
    if salt_string(password) == passwordCheck:
        initialize()
        return JSONResponse(content={"hash": salt_string(password)}, status_code=201)
    else:
        return HTTPException(status_code=400, detail="Password is incorrect!")

@app.post("/check")
async def check(request: Request):
    data = await request.json()
    print(data["password"])
    return {"success": True, "uid": salt_string(data["password"])}