package types

type Assessment struct {
	Id   int
	Date string
	Candidates [] InfoCandidate
	Employees [] InfoEmployee
}

type InfoCandidate struct{
	Id int `json:"Id"`
	Fn string `json:"FirstName"`
	Mn string `json:"MiddleName"`
	Ln string `json:"LastName"`
	S string `json:"infoStatusA"`
	P string `json:"infoProofA"`
}

type InfoEmployee struct{
	IdEmployee int `json:"IdE"`
	Fn string `json:"FirstNameE"`
	Mn string `json:"MiddleNameE"`
	Ln string `json:"LastNameE"`
}