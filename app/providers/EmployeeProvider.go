package providers

import (
	"ttt/app/mappers"
	"ttt/app/types"
	"ttt/app/util"
)

func EmployeeGetAll() ([]*types.Employee, error) {
	db, err := util.DatabaseConnect()
	if err != nil {
		return nil, err
	}
	defer db.Close()
	return mappers.EmployeeGetAll(db)
}

func EmployeeCreate(employee types.Employee) (int64, error) {
	db, err := util.DatabaseConnect()
	if err != nil {
		return 0, err
	}
	defer db.Close()
	return mappers.EmployeeCreate(db, employee)
}

func EmployeeDelete(id int) error {
	db, err := util.DatabaseConnect()
	if err != nil {
		return err
	}
	defer db.Close()
	return mappers.EmployeeDelete(db, id)
}
func EmployeeUpdate( employee types.Employee) error {
	db, err := util.DatabaseConnect()
	if err != nil {
		return err
	}
	defer db.Close()
	return mappers.EmployeeUpdate(db, employee)
}

func EmployeeAddInAssess(employee types.Employee) error {
	db, err := util.DatabaseConnect()
	if err != nil {
		return  err
	}
	defer db.Close()
	return mappers.EmployeeAddInAssess(db, employee)
}

func EmployeeSearch(str types.Search) ([]*types.Employee, error) {
	db, err := util.DatabaseConnect()
	if err != nil {
		return nil, err
	}
	defer db.Close()
	return mappers.EmployeeSearch(db, str)
}

