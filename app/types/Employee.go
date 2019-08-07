package types

type Employee struct {
	Id               int    `json:"Id"`
	FirstName        string `json:"FirstNameE"`
	MiddleName       string `json:"MiddleNameE"`
	LastName         string `json:"LastNameE"`
	Phone            string `json:"PhoneE"`
	Email            string `json:"EmailE"`
	ListOfAssessment []Assessment
}
