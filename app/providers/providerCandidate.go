package providers

import (
	"ttt/app/mappers"
	"ttt/app/types"
)

func UserPost(user types.User) (types.Employee, error) {
	return mappers.UserPost(user)
}

func CandidateGet() ([]*types.Candidate, error) {
	return mappers.CandidateGet()
}

func CandidateSearch(str types.Search) []*types.Candidate {
	return mappers.CandidateSearch(str)
}

func CandidateGetId(id int) *types.Candidate {
	return mappers.CandidateGetId(id)
}
func CandidatePut(candidate types.Candidate) (int64, error) {
	return mappers.CandidatePut(candidate)
}
func CandidatePutInAssess(candidate types.Candidate) error {
	return mappers.CandidatePutInAssess(candidate)
}

func CandidateDelete(id int) error {
	return mappers.CandidateDelete(id)
}

func CandidatePost(id int, candidate types.Candidate) error {
	return mappers.CandidatePost(id, candidate)
}
