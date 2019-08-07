package providers

import (
	"ttt/app/mappers"
	"ttt/app/types"
)

func AssessmentGet() []*types.Assessment {
	return mappers.AssessmentGet()
}
func AssessmentGetMas(id int) *types.Assessment {
	return mappers.AssessmentGetMas(id)
}

func AssessmentPut(assessment types.Assessment) (int64, error) {
	return mappers.AssessmentPut(assessment)
}

func AssessmentPutCandidate(assessment types.Assessment) error {
	return mappers.AssessmentPutCandidate(assessment)
}

func AssessmentDelete(id int) error {
	return mappers.AssessmentDelete(id)
}
func AssessmentPost(id int, assessment types.Assessment)( types.Assessment, error) {
	return mappers.AssessmentPost(id, assessment)
}

func AssessmentSearch(str types.Search) []*types.Assessment {
	return mappers.AssessmentSearch(str)
}
