from fastapi import FastAPI, Query, Form, HTTPException
from fastapi.responses import JSONResponse

#Eigene Module
from controller import initialize, salt_string

app = FastAPI()

passwordCheck = salt_string(str(885))

@app.get("/")
def read_root(q: str = Query(default="")):
    if q == passwordCheck:
        initialize()
        return {"message": "Willkommen bei FastAPI!", "query": q}
    else:
        return {"message": "Sorry aber das ist wohl nicht die antwort"}

@app.post("/check-pw")
def check_pw(password: str = Form(...)):
    if salt_string(password) == passwordCheck:
        initialize()
        return JSONResponse(content={"link": "127.0.0.1:8000/q="+password}, status_code=201)
    else:
        return HTTPException(status_code=400, detail="Password is incorrect!")