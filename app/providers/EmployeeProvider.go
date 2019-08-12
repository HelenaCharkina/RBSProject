package providers

import (
	"log"
	"ttt/app/mappers"
	"ttt/app/types"
	"ttt/app/util"
)

func EmployeeGetAll() ([]*types.Employee, error) {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
		return nil, err
	}
	return mappers.EmployeeGetAll(db)
}

func EmployeeCreate(employee types.Employee) (int64, error) {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
		return 0, err
	}
	return mappers.EmployeeCreate(db, employee)
}

func EmployeeDelete(id int) error {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
		return err
	}
	return mappers.EmployeeDelete(db, id)
}
func EmployeeUpdate( employee types.Employee) error {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
		return err
	}
	return mappers.EmployeeUpdate(db, employee)
}

func EmployeeAddInAssess(employee types.Employee) error {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
		return  err
	}
	return mappers.EmployeeAddInAssess(db, employee)
}

func EmployeeSearch(str types.Search) ([]*types.Employee, error) {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
		return nil, err
	}
	return mappers.EmployeeSearch(db, str)
}

