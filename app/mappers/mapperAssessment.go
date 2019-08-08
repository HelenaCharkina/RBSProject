package mappers

import (
	_ "github.com/lib/pq"
	"log"
	"ttt"
	"ttt/app/types"
)

func AssessmentGet() ([]*types.Assessment, error) {

	db := ttt.DatabaseConnect()
	defer db.Close()

	var assessments []*types.Assessment
	rows, err := db.Query(`
		SELECT *
		FROM db.public.assessment
`)
	if err != nil {
		log.Println(err)
		return assessments, err
	}
	defer rows.Close()

	for rows.Next() {
		c := types.Assessment{}
		err := rows.Scan(&c.Id, &c.Date)
		if err != nil {
			log.Println(err)
			return assessments, err
		}
		/*------------Кандидаты-------------*/

		rowCandidate, err := db.Query(`
		select c.id, firstname, middlename, lastname, ca.status, ca.proof, c.id from assessment a
		join candidate_assessment ca on a.id = ca.id_assessment
		join candidate c on ca.id_candidate = c.id
		where a.id = $1`, &c.Id)
		if err != nil {
			log.Println(err)
			return assessments, err
		}
		defer rowCandidate.Close()

		for rowCandidate.Next() {
			itemCandidate := types.Candidate{}
			err := rowCandidate.Scan(&itemCandidate.Id, &itemCandidate.FirstName, &itemCandidate.MiddleName, &itemCandidate.LastName, &itemCandidate.S, &itemCandidate.P, &itemCandidate.Id)
			if err != nil {
				log.Println(err)
				return assessments, err
			}
			c.Candidates = append(c.Candidates, itemCandidate)
		}
		/*------------------------------*/

		/*--------------Сотрудники----------------*/

		rowEmployee, err := db.Query(`
		select e.id, firstname, middlename, lastname from assessment a
		join assessment_employee ae on a.id = ae.id_assessment
		join employee e on ae.id_employee = e.id
		where a.id = $1`, &c.Id)
		if err != nil {
			log.Println(err)
			return assessments, err
		}
		defer rowEmployee.Close()

		for rowEmployee.Next() {
			itemEmployee := types.Employee{}
			err := rowEmployee.Scan(&itemEmployee.Id, &itemEmployee.FirstName, &itemEmployee.MiddleName, &itemEmployee.LastName)
			if err != nil {
				log.Println(err)
				return assessments, err
			}
			c.Employees = append(c.Employees, itemEmployee)
		}
		/*----------------------------------------*/

		assessments = append(assessments, &c)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}
	return assessments, err
}

func AssessmentPut(assessment types.Assessment) (int64, error) {

	db := ttt.DatabaseConnect()
	defer db.Close()

	var ID int64
	err := db.QueryRow(`
		INSERT INTO assessment (Date) 
		VALUES ($1) returning id
	`, assessment.Date).Scan(&ID)
	if err != nil {
		log.Println(err)
	}
	return ID, err
}

func AssessmentDelete(id int) error {

	db := ttt.DatabaseConnect()
	defer db.Close()

	_, err := db.Exec(`
		delete from assessment 
		where id = $1 `, id)
	if err != nil {
		log.Println(err)
	}
	return err
}

func AssessmentPost(id int, assessment types.Assessment) (types.Assessment, error) {

	db := ttt.DatabaseConnect()
	defer db.Close()

	_, err := db.Exec(`
		update assessment set date = $2
		where id = $1 `, id, assessment.Date)
	if err != nil {
		log.Println(err)
	}

	for i := range assessment.Candidates {
		_, err = db.Exec(`
		update candidate_assessment set status = $2, proof = $3
		where id_assessment = $1 and id_candidate = $4 `, id, assessment.Candidates[i].S, assessment.Candidates[i].P, assessment.Candidates[i].Id)
		if err != nil {
			log.Println(err)
		}
	}

	//вернуть обновленный ассессмент
	c := types.Assessment{}
	err = db.QueryRow(`
		SELECT id, date
		FROM db.public.assessment
		where id = $1
`, id).Scan(&c.Id, &c.Date)
	if err != nil {
		log.Println(err)
	}
	/*------------Кандидаты-------------*/

	rowCandidate, err := db.Query(`
		select c.id, firstname, middlename, lastname, ca.status, ca.proof from assessment a
		join candidate_assessment ca on a.id = ca.id_assessment
		join candidate c on ca.id_candidate = c.id
		where a.id = $1`, &c.Id)
	if err != nil {
		log.Println(err)
	}
	defer rowCandidate.Close()

	for rowCandidate.Next() {
		itemCandidate := types.Candidate{}
		err := rowCandidate.Scan(&itemCandidate.Id, &itemCandidate.FirstName, &itemCandidate.MiddleName, &itemCandidate.LastName, &itemCandidate.S, &itemCandidate.P)
		if err != nil {
			log.Println(err)
		}
		c.Candidates = append(c.Candidates, itemCandidate)
	}
	/*------------------------------*/

	/*--------------Сотрудники----------------*/

	rowEmployee, err := db.Query(`
		select e.id, firstname, middlename, lastname from assessment a
		join assessment_employee ae on a.id = ae.id_assessment
		join employee e on ae.id_employee = e.id
		where a.id = $1`, &c.Id)
	if err != nil {
		log.Println(err)
	}
	defer rowEmployee.Close()

	for rowEmployee.Next() {
		itemEmployee := types.Employee{}
		err := rowEmployee.Scan(&itemEmployee.Id, &itemEmployee.FirstName, &itemEmployee.MiddleName, &itemEmployee.LastName)
		if err != nil {
			log.Println(err)
		}
		c.Employees = append(c.Employees, itemEmployee)
	}

	/*----------------------------------------*/

	return c, err
}

func AssessmentGetMas(id int) *types.Assessment {

	db := ttt.DatabaseConnect()
	defer db.Close()

	rows, err := db.Query(`
		select firstname, middlename, lastname, ca.status, ca.proof, c.id from assessment a
		join candidate_assessment ca on a.id = ca.id_assessment
		join candidate c on ca.id_candidate = c.id
		where a.id = $1`, id)
	if err != nil {
		log.Println(err)
	}
	defer rows.Close()

	c := types.Assessment{}
	for rows.Next() {
		item := types.Candidate{}
		err := rows.Scan(&item.FirstName, &item.MiddleName, &item.LastName, &item.S, &item.P, &item.Id)
		if err != nil {
			log.Println(err)
		}
		c.Candidates = append(c.Candidates, item)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}
	return &c
}

func AssessmentPutCandidate(assessment types.Assessment) error {

	db := ttt.DatabaseConnect()
	defer db.Close()

	var err error
	for i := range assessment.Candidates {
		_, err = db.Exec(`
		insert into candidate_assessment(id_assessment, id_candidate, status, proof) values($1, $2, $3, $4)`, assessment.Id, assessment.Candidates[i].Id, "", "")
		if err != nil {
			_, err = db.Exec(`
			delete from candidate_assessment where id_assessment = $1 and id_candidate = $2`, assessment.Id, assessment.Candidates[i].Id)
			if err != nil {
				log.Println(err)
			}
		}
	}
	for i := range assessment.Employees {
		_, err = db.Exec(`
		insert into assessment_employee(id_assessment, id_employee) values($1, $2)`, assessment.Id, assessment.Employees[i].Id)
		if err != nil {
			_, err = db.Exec(`
			delete from assessment_employee where id_assessment = $1 and id_employee = $2`, assessment.Id, assessment.Employees[i].Id)
			if err != nil {
				log.Println(err)
			}
		}
	}
	return err
}

func AssessmentSearch(str types.Search) []*types.Assessment {

	db := ttt.DatabaseConnect()
	defer db.Close()

	var assessments []*types.Assessment

	rows, err := db.Query(`
			SELECT *
			FROM db.public.assessment 
			where  date LIKE '%' || $1 || '%' 
			`, str.Str)
	if err != nil {
		log.Fatal(err)
	}
	for rows.Next() {
		c := types.Assessment{}
		err := rows.Scan(&c.Id, &c.Date)
		if err != nil {
			log.Fatal(err)
		}

		/*------------Кандидаты-------------*/

		rowCandidate, err := db.Query(`
		select c.id, firstname, middlename, lastname, ca.status, ca.proof from assessment a
		join candidate_assessment ca on a.id = ca.id_assessment
		join candidate c on ca.id_candidate = c.id
		where a.id = $1`, &c.Id)
		if err != nil {
			log.Println(err)
		}
		defer rowCandidate.Close()

		for rowCandidate.Next() {
			itemCandidate := types.Candidate{}
			err := rowCandidate.Scan(&itemCandidate.Id, &itemCandidate.FirstName, &itemCandidate.MiddleName, &itemCandidate.LastName, &itemCandidate.S, &itemCandidate.P)
			if err != nil {
				log.Println(err)
			}
			c.Candidates = append(c.Candidates, itemCandidate)
		}
		/*------------------------------*/

		/*--------------Сотрудники----------------*/

		rowEmployee, err := db.Query(`
		select e.id, firstname, middlename, lastname from assessment a
		join assessment_employee ae on a.id = ae.id_assessment
		join employee e on ae.id_employee = e.id
		where a.id = $1`, &c.Id)
		if err != nil {
			log.Println(err)
		}
		defer rowEmployee.Close()

		for rowEmployee.Next() {
			itemEmployee := types.Employee{}
			err := rowEmployee.Scan(&itemEmployee.Id, &itemEmployee.FirstName, &itemEmployee.MiddleName, &itemEmployee.LastName)
			if err != nil {
				log.Println(err)
			}
			c.Employees = append(c.Employees, itemEmployee)
		}
		/*----------------------------------------*/

		assessments = append(assessments, &c)
	}
	return assessments
}
