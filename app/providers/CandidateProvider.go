package providers

import (
	"log"
	"ttt/app/mappers"
	"ttt/app/types"
	"ttt/app/util"
)

func CandidateGetAll() ([]*types.Candidate, error) {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
	}
	return mappers.CandidateGetAll(db)

}

func CandidateSearch(str types.Search) []*types.Candidate {

	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
	}
	return mappers.CandidateSearch(db, str)
}

func CandidateCreate(candidate types.Candidate) (int64, error) {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
	}
	return mappers.CandidateCreate(db, candidate)
}
func CandidateAddInAssess(candidate types.Candidate) error {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
		return err
	}
	return mappers.CandidateAddInAssess(db, candidate)
}

func CandidateDelete(id int) error {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
		return err
	}
	return mappers.CandidateDelete(db, id)
}

func CandidateUpdate( candidate types.Candidate) error {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
		return err
	}
	return mappers.CandidateUpdate(db, candidate)
}
