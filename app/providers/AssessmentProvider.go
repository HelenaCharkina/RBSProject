package providers

import (
	"ttt/app/mappers"
	"ttt/app/types"
)

func AssessmentGetAll() ([]*types.Assessment, error) {
	return mappers.AssessmentGetAll()
}

func AssessmentCreate(assessment types.Assessment) (int64, error) {
	return mappers.AssessmentCreate(assessment)
}

func AssessmentUpdateUsers(assessment types.Assessment) error {
	return mappers.AssessmentUpdateUsers(assessment)
}

func AssessmentDelete(id int) error {
	return mappers.AssessmentDelete(id)
}
func AssessmentUpdate(id int, assessment types.Assessment) (types.Assessment, error) {
	return mappers.AssessmentUpdate(id, assessment)
}

func AssessmentSearch(str types.Search) []*types.Assessment {
	return mappers.AssessmentSearch(str)
}
