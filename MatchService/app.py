from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from models.matcher import compute_match

app = FastAPI(title="AI Recruiter Matcher API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VacancyDto(BaseModel):
    id: int
    title: str
    stack: List[str]
    level: int  
    location: str
    salary: Optional[float] = None
    description: str
    minMatchPercent: int
    maxCandidates: int
    companyId: int

class CandidateDto(BaseModel):
    id: int
    firstName: str
    lastName: str
    location: str
    experienceYears: int
    skills: List[str]

class MatchResponse(BaseModel):
    matchPercent: float

class MatchRequest(BaseModel):
    vacancy: VacancyDto
    candidate: CandidateDto

@app.post("/match", response_model=MatchResponse)
def match(request: MatchRequest):
    """POST /match — compute match between vacancy and candidate."""
    level_mapping = {
        0: "Intern",
        1: "Junior",
        2: "Middle",
        3: "Senior",
        4: "Lead"
    }
    
    vacancy_with_level = request.vacancy.model_copy()
    vacancy_with_level.level = level_mapping.get(request.vacancy.level, "Unknown")
    
    score = compute_match(request.vacancy, request.candidate)
    return MatchResponse(matchPercent=score)

@app.get("/health")
def health():
    """Health check endpoint."""
    return {"status": "ok"}
