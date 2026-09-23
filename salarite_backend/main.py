from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import SessionLocal, engine, Base
import models
import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"message": "Salarite backend is running"}


# ---- TASKS ----

@app.post("/tasks", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    new_task = models.Task(
        title=task.title,
        assigned_to=task.assigned_to,
        status=task.status
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


@app.get("/tasks", response_model=List[schemas.TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()


@app.put("/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task_status(task_id: int, status: str, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        return {"error": "Task not found"}
    task.status = status
    db.commit()
    db.refresh(task)
    return task


# ---- INTERVIEWS ----

@app.post("/interviews", response_model=schemas.InterviewResponse)
def schedule_interview(interview: schemas.InterviewCreate, db: Session = Depends(get_db)):
    new_interview = models.Interview(
        candidate_name=interview.candidate_name,
        mode=interview.mode,
        scheduled_time=interview.scheduled_time,
        task_id=interview.task_id
    )
    db.add(new_interview)
    db.commit()
    db.refresh(new_interview)
    return new_interview


@app.get("/interviews", response_model=List[schemas.InterviewResponse])
def get_interviews(db: Session = Depends(get_db)):
    return db.query(models.Interview).all()
