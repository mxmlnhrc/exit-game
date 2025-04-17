from fastapi import FastAPI, Query, Form, HTTPException, Header
from fastapi.responses import JSONResponse

#Eigene Module
from controller import initialize, salt_string

app = FastAPI()

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