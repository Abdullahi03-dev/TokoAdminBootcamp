from pydantic import BaseModel
from typing import List, Optional
from enum import Enum


class CourseType(str, Enum):
    free = "free"
    paid = "paid"


# ---------------------- Submodule Schemas ----------------------
class SubmoduleBase(BaseModel):
    title: str
    link: str


class SubmoduleCreate(SubmoduleBase):
    pass


class SubmoduleOut(SubmoduleBase):
    id: int

    model_config = {
        "from_attributes": True
    }


# ---------------------- Module Schemas ----------------------
class ModuleBase(BaseModel):
    day: int
    submodules: List[SubmoduleCreate] = []


class ModuleCreate(ModuleBase):
    pass


class ModuleOut(ModuleBase):
    id: int
    submodules: List[SubmoduleOut] = []

    model_config = {
        "from_attributes": True
    }


# ---------------------- Course Schemas ----------------------
class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    duration: int
    type: CourseType
    price: Optional[str] = None
    image_url: Optional[str] = None  # ✅ image link stored in DB


class CourseCreate(CourseBase):
    modules: List[ModuleCreate] = []


class CourseOut(CourseBase):
    id: int
    modules: List[ModuleOut] = []

    model_config = {
        "from_attributes": True
    }
