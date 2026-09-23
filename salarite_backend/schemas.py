from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    assigned_to: str
    status: str = "Pending"


class TaskResponse(BaseModel):
    id: int
    title: str
    assigned_to: str
    status: str

    class Config:
        from_attributes = True


class InterviewCreate(BaseModel):
    candidate_name: str
    mode: str
    scheduled_time: str
    task_id: int


class InterviewResponse(BaseModel):
    id: int
    candidate_name: str
    mode: str
    scheduled_time: str
    task_id: int

    class Config:
        from_attributes = True