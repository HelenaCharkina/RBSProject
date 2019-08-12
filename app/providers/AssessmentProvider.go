package providers

import (
	"log"
	"ttt/app/mappers"
	"ttt/app/types"
	"ttt/app/util"
)

func AssessmentGetAll() ([]*types.Assessment, error) {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
	}
	return mappers.AssessmentGetAll(db)
}

func AssessmentCreate(assessment types.Assessment) (int64, error) {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
	}
	return mappers.AssessmentCreate(db, assessment)
}

func AssessmentUpdateUsers(assessment types.Assessment) error {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
	}
	return mappers.AssessmentUpdateUsers(db, assessment)
}

func AssessmentDelete(id int) error {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
	}
	return mappers.AssessmentDelete(db, id)
}
func AssessmentUpdate(assessment types.Assessment) (types.Assessment, error) {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
	}
	return mappers.AssessmentUpdate(db, assessment)
}

func AssessmentSearch(str types.Search) []*types.Assessment {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
	}
	return mappers.AssessmentSearch(db, str)
}
