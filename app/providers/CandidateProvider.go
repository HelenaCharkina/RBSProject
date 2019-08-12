package providers

import (
	"ttt/app/mappers"
	"ttt/app/types"
	"ttt/app/util"
)

func CandidateGetAll() ([]*types.Candidate, error) {
	db, err := util.DatabaseConnect()
	if err != nil {
		return nil, err
	}
	defer db.Close()
	return mappers.CandidateGetAll(db)
}

func CandidateSearch(str types.Search) ([]*types.Candidate, error) {

	db, err := util.DatabaseConnect()
	if err != nil {
		return nil, err
	}
	defer db.Close()
	return mappers.CandidateSearch(db, str)
}

func CandidateCreate(candidate types.Candidate) (int64, error) {
	db, err := util.DatabaseConnect()
	if err != nil {
		return 0, err
	}
	defer db.Close()
	return mappers.CandidateCreate(db, candidate)
}
func CandidateAddInAssess(candidate types.Candidate) error {
	db, err := util.DatabaseConnect()
	if err != nil {
		return err
	}
	defer db.Close()
	return mappers.CandidateAddInAssess(db, candidate)
}

func CandidateDelete(id int) error {
	db, err := util.DatabaseConnect()
	if err != nil {
		return err
	}
	defer db.Close()
	return mappers.CandidateDelete(db, id)
}

func CandidateUpdate( candidate types.Candidate) error {
	db, err := util.DatabaseConnect()
	if err != nil {
		return err
	}
	defer db.Close()
	return mappers.CandidateUpdate(db, candidate)
}
