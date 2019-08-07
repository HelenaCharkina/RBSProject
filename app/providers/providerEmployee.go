package providers

import (
	"ttt/app/mappers"
	"ttt/app/types"
)

func EmployeeGet() []*types.Employee {
	return mappers.EmployeeGet()
}

func EmployeePut(employee types.Employee) (int64, error) {
	return mappers.EmployeePut(employee)
}

func EmployeeDelete(id int) error {
	return mappers.EmployeeDelete(id)
}
func EmployeePost(id int, employee types.Employee) error {
	return mappers.EmployeePost(id, employee)
}

func EmployeePutInAssess(employee types.Employee) error {
	return mappers.EmployeePutInAssess(employee)
}

func EmployeeSearch(str types.Search) []*types.Employee {
	return mappers.EmployeeSearch(str)
}
