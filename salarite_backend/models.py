from sqlalchemy import Column, Integer, String
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    assigned_to = Column(String(255))
    status = Column(String(50), default="Pending")


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)
    candidate_name = Column(String(255))
    mode = Column(String(50))
    scheduled_time = Column(String(100))
    task_id = Column(Integer)