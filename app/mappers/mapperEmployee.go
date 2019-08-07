package mappers

import (
	_ "github.com/lib/pq"
	"log"
	"strings"
	"ttt"
	"ttt/app/types"
)

func EmployeeGet() []*types.Employee {

	db := ttt.DatabaseConnect()

	rows, err := db.Query(`
		SELECT * 
		FROM db.public.employee
`)

	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()

	var employees []*types.Employee
	for rows.Next() {
		c := types.Employee{}
		err := rows.Scan(&c.Id, &c.FirstName, &c.MiddleName, &c.LastName, &c.Phone, &c.Email)
		if err != nil {
			log.Fatal(err)
		}

		//----------------АССЕССМЕНТЫ-----------------------

		rowAssessment, err := db.Query(`
		select a.id, Date from employee e
		join assessment_employee ae on e.id = ae.id_employee
		join assessment a on ae.id_assessment = a.id
		where e.id = $1`, &c.Id)
		if err != nil {
			log.Println(err)
		}
		defer rowAssessment.Close()

		for rowAssessment.Next(){
			itemAssessment := types.Assessment{}
			err := rowAssessment.Scan(&itemAssessment.Id,&itemAssessment.Date)
			if err != nil {
				log.Println(err)
			}
			c.ListOfAssessment = append(c.ListOfAssessment, itemAssessment)
		}

		//--------------------------------------

		employees = append(employees, &c)
	}

	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}

	return employees
}

func EmployeePut(employee types.Employee) (int64, error) {

	db := ttt.DatabaseConnect()

	var ID int64
	 err := db.QueryRow(`
		INSERT INTO employee (firstname, middlename, lastname, phone, email) 
		VALUES ($1, $2, $3, $4, $5) returning id
	`, employee.FirstName, employee.MiddleName, employee.LastName, 0, "").Scan(&ID)
	if err != nil {
		log.Println(err)
	}

	return ID, err
}

func EmployeeDelete(id int) error{

	db := ttt.DatabaseConnect()

	_, err := db.Exec(`
		delete from employee 
		where id = $1 `, id)
	if err != nil {
		log.Println(err)
	}
	return err
}

func EmployeePost(id int, employee types.Employee) error{

	db := ttt.DatabaseConnect()

	_, err := db.Exec(`
		update employee set firstname = $2, middlename = $3, lastname = $4, phone = $5, email = $6 
		where id = $1 `, id, employee.FirstName, employee.MiddleName, employee.LastName, employee.Phone, employee.Email)
	if err != nil {
		log.Println(err)
	}
	return err
}

func EmployeePutInAssess(employee types.Employee) error {

	db := ttt.DatabaseConnect()

	var err error
	for i := range employee.ListOfAssessment {
		_, err = db.Exec(`
		insert into assessment_employee(id_assessment, id_employee) values($1, $2)`, employee.ListOfAssessment[i].Id, employee.Id)
		if err != nil {
			log.Println(err)
		}
	}
	return err
}



func EmployeeSearch(str types.Search) []*types.Employee {

	db := ttt.DatabaseConnect()

	var masObjects = strings.Split(str.Str, " ")

	var employees []*types.Employee

	for i := range masObjects{
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
			log.Fatal(err)
		}

		for rows.Next() {
			c := types.Employee{}
			err := rows.Scan(&c.Id, &c.FirstName, &c.MiddleName, &c.LastName, &c.Phone, &c.Email)
			if err != nil {
				log.Fatal(err)
			}
			var flag = true
			for i := range employees{

				if employees[i].Id == c.Id{
					flag = false
				}
			}
			if flag{
				employees = append(employees, &c)
			}
		}
	}

	return employees
}