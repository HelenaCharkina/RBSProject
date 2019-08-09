package providers

import (
	"ttt/app/mappers"
	"ttt/app/types"
)

func CandidateGetAll() ([]*types.Candidate, error) {
	return mappers.CandidateGetAll()
}

func CandidateSearch(str types.Search) []*types.Candidate {
	return mappers.CandidateSearch(str)
}

func CandidateCreate(candidate types.Candidate) (int64, error) {
	return mappers.CandidateCreate(candidate)
}
func CandidateAddInAssess(candidate types.Candidate) error {
	return mappers.CandidateAddInAssess(candidate)
}

func CandidateDelete(id int) error {
	return mappers.CandidateDelete(id)
}

func CandidateUpdate(id int, candidate types.Candidate) error {
	return mappers.CandidateUpdate(id, candidate)
}
