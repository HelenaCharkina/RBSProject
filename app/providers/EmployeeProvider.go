package providers

import (
	"ttt/app/mappers"
	"ttt/app/types"
)

func EmployeeGetAll() ([]*types.Employee, error) {
	return mappers.EmployeeGetAll()
}

func EmployeeCreate(employee types.Employee) (int64, error) {
	return mappers.EmployeeCreate(employee)
}

func EmployeeDelete(id int) error {
	return mappers.EmployeeDelete(id)
}
func EmployeeUpdate(id int, employee types.Employee) error {
	return mappers.EmployeeUpdate(id, employee)
}

func EmployeeAddInAssess(employee types.Employee) error {
	return mappers.EmployeeAddInAssess(employee)
}

func EmployeeSearch(str types.Search) []*types.Employee {
	return mappers.EmployeeSearch(str)
}
