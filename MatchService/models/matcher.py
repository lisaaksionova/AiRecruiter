from typing import List, Optional
import difflib
from pydantic import BaseModel

def calculate_match_score(vacancy_skills: List[str], candidate_skills: List[str]) -> float:
    if not vacancy_skills or not candidate_skills:
        return 0.0

    total_score = 0
    matched_skills = 0

    for vacancy_skill in vacancy_skills:
        best_match_score = 0
        for candidate_skill in candidate_skills:
            similarity = difflib.SequenceMatcher(None, 
                                               vacancy_skill.lower(), 
                                               candidate_skill.lower()).ratio()
            best_match_score = max(best_match_score, similarity)
        
        if best_match_score > 0.8:
            total_score += best_match_score
            matched_skills += 1

    if matched_skills == 0:
        return 0.0

    match_percentage = (total_score / len(vacancy_skills)) * 100
    return round(match_percentage, 2)

class VacancyData(BaseModel):
    stack: List[str]
    level: int
    location: str
    salary: Optional[float] = None
    experienceYears: Optional[int] = None

class CandidateData(BaseModel):
    skills: List[str]
    location: str
    experienceYears: int



def jaccard_similarity(list1: List[str], list2: List[str]) -> float:
    """Compute similarity between two lists of strings."""
    if not list1 or not list2:
        return 0.0
    set1, set2 = set(map(str.lower, list1)), set(map(str.lower, list2))
    return len(set1 & set2) / len(set1 | set2)


def fuzzy_location_match(loc1: str, loc2: str) -> float:
    """Compute fuzzy string match between locations."""
    if not loc1 or not loc2:
        return 0.0
    return difflib.SequenceMatcher(None, loc1.lower(), loc2.lower()).ratio()


def experience_match(level: int, exp: int) -> float:
    """Compare candidate experience with vacancy level expectation."""
    level_ranges = {
        0: (0, 1),      # Intern
        1: (0, 2),      # Junior
        2: (2, 5),      # Middle
        3: (5, 10),     # Senior
        4: (8, 20),     # Lead
    }

    if level not in level_ranges:
        return 0.5  # neutral if unknown

    min_exp, max_exp = level_ranges[level]

    if min_exp <= exp <= max_exp:
        return 1.0
    elif exp < min_exp:
        diff = min_exp - exp
        return max(0, 1 - diff / 5)
    else:
        diff = exp - max_exp
        return max(0, 1 - diff / 10)


def salary_match(vacancy_salary: Optional[float], exp: int) -> float:
    """Approximate salary expectation vs offered."""
    if not vacancy_salary:
        return 0.5
    expected_salary = 1000 + (exp * 800)
    ratio = min(vacancy_salary / expected_salary, expected_salary / vacancy_salary)
    return max(0.0, min(1.0, ratio))



def compute_match(vacancy, candidate) -> float:
    """Compute overall match score between vacancy and candidate."""
    skill_score = jaccard_similarity(vacancy.stack, candidate.skills)
    exp_score = experience_match(vacancy.level, candidate.experienceYears)
    loc_score = fuzzy_location_match(vacancy.location, candidate.location)
    sal_score = salary_match(vacancy.salary, candidate.experienceYears)

    total = (
        0.6 * skill_score +
        0.2 * exp_score +
        0.1 * loc_score +
        0.1 * sal_score
    )

    return round(total * 100, 2)
