package mappers

import (
	"database/sql"
	_ "github.com/lib/pq"
	"log"
	"strings"
	"ttt/app/types"
)

// получение всех сотрудников
func EmployeeGetAll(db *sql.DB) ([]*types.Employee, error) {

	var employees []*types.Employee
	rows, err := db.Query(`
		SELECT * 
		FROM db.public.employee
`)
	if err != nil {
		return employees, err
	}
	defer rows.Close()
	for rows.Next() {
		c := types.Employee{}
		err := rows.Scan(&c.Id, &c.FirstName, &c.MiddleName, &c.LastName, &c.Phone, &c.Email)
		if err != nil {
			return employees, err
		}

		//----------------АССЕССМЕНТЫ-----------------------

		rowAssessment, err := db.Query(`
		select a.id, Date from employee e
		join assessment_employee ae on e.id = ae.id_employee
		join assessment a on ae.id_assessment = a.id
		where e.id = $1`, &c.Id)
		if err != nil {
			return employees, err
		}
		defer rowAssessment.Close()

		for rowAssessment.Next() {
			itemAssessment := types.Assessment{}
			err := rowAssessment.Scan(&itemAssessment.Id, &itemAssessment.Date)
			if err != nil {
				return employees, err
			}
			c.ListOfAssessment = append(c.ListOfAssessment, itemAssessment)
		}

		//--------------------------------------

		employees = append(employees, &c)
	}

	if err = rows.Err(); err != nil {
		log.Println(err)
	}

	return employees, err
}

// создание нового сотрудника
func EmployeeCreate(db *sql.DB, employee types.Employee) (int64, error) {

	var ID int64
	err := db.QueryRow(`
		INSERT INTO employee (firstname, middlename, lastname, phone, email) 
		VALUES ($1, $2, $3, $4, $5) returning id
	`, employee.FirstName, employee.MiddleName, employee.LastName, "", "").Scan(&ID)
	if err != nil {
		return 0, err
	}

	return ID, err
}

// удаление сотрудника
func EmployeeDelete(db *sql.DB, id int) error {

	_, err := db.Exec(`
		delete from employee 
		where id = $1 `, id)
	if err != nil {
		return err
	}
	return err
}

// обновление сотрудника
func EmployeeUpdate(db *sql.DB, employee types.Employee) error {

	_, err := db.Exec(`
		update employee set firstname = $2, middlename = $3, lastname = $4, phone = $5, email = $6 
		where id = $1 `, employee.Id, employee.FirstName, employee.MiddleName, employee.LastName, employee.Phone, employee.Email)
	if err != nil {
		return err
	}
	return err
}

// добавление ассессментов сотрудника
func EmployeeAddInAssess(db *sql.DB, employee types.Employee) error {

	var err error
	for i := range employee.ListOfAssessment {
		_, err = db.Exec(`
		insert into assessment_employee(id_assessment, id_employee) values($1, $2)`, employee.ListOfAssessment[i].Id, employee.Id)
		if err != nil {
			return err
		}
	}
	return err
}

// поиск сотрудника
func EmployeeSearch(db *sql.DB, str types.Search) ([]*types.Employee, error) {

	var masObjects = strings.Split(str.Str, " ")

	var employees []*types.Employee

	for i := range masObjects {
		rows, err := db.Query(`
			SELECT *
			FROM db.public.employee 
			where  LOWER(firstname) LIKE '%' || $1 || '%' or 
				  LOWER(middlename) LIKE '%' || $1 || '%' or 
				  LOWER(lastname) LIKE '%' || $1 || '%' or 
				  phone LIKE '%' || $1 || '%' or 
				  LOWER(email) LIKE '%' || $1 || '%'
			`, masObjects[i])
		if err != nil {
			return nil, err
		}

		for rows.Next() {
			c := types.Employee{}
			err := rows.Scan(&c.Id, &c.FirstName, &c.MiddleName, &c.LastName, &c.Phone, &c.Email)
			if err != nil {
				return nil, err
			}
			var flag = true
			for i := range employees {

				if employees[i].Id == c.Id {
					flag = false
				}
			}
			if flag {
				employees = append(employees, &c)
			}
		}
	}

	return employees, nil
}
