package types

type Candidate struct {
	Id               int64
	FirstName        string
	MiddleName       string
	LastName         string
	Phone            string
	Email            string
	ListOfAssessment []Assessment
	S  string `json:"infoStatusA"`
	P  string `json:"infoProofA"`
}
