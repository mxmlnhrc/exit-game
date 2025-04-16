from fastapi import FastAPI, Query, Form, HTTPException
from fastapi.responses import JSONResponse

app = FastAPI()

passwordCheck = "dasisteintest"

@app.get("/")
def read_root(q: str = Query(default="")):
    if q == passwordCheck:
        return {"message": "Willkommen bei FastAPI!", "query": q}
    else:
        return {"message": "Sorry aber das ist wohl nicht die antwort"}

@app.post("/check-pw")
def check_pw(password: str = Form(...)):
    if password == passwordCheck:
        return JSONResponse(content={"message": "Passwort ist richtig"}, status_code=201)
    else:
        return HTTPException(status_code=400, detail="Password is incorrect!")