package mappers

import (
	_ "github.com/lib/pq"
	"log"
	"ttt"
	"ttt/app/types"
)

func AssessmentGet() []*types.Assessment {

	db := ttt.DatabaseConnect()

	rows, err := db.Query(`
		SELECT *
		FROM db.public.assessment
`)
	if err != nil {
		log.Println(err)
	}
	defer rows.Close()

	var assessments []*types.Assessment
	for rows.Next() {
		c := types.Assessment{}
		err := rows.Scan(&c.Id, &c.Date)
		if err != nil {
			log.Fatal(err)
		}
		/*------------Кандидаты-------------*/

		rowCandidate, err := db.Query(`
		select c.id, firstname, middlename, lastname, ca.status, ca.proof, c.id from assessment a
		join candidate_assessment ca on a.id = ca.id_assessment
		join candidate c on ca.id_candidate = c.id
		where a.id = $1`, &c.Id)
		if err != nil {
			log.Println(err)
		}
		defer rowCandidate.Close()

		for rowCandidate.Next(){
			itemCandidate := types.InfoCandidate{}
			err := rowCandidate.Scan(&itemCandidate.Id, &itemCandidate.Fn, &itemCandidate.Mn, &itemCandidate.Ln, &itemCandidate.S, &itemCandidate.P, &itemCandidate.Id)
			if err != nil {
				log.Println(err)
			}
			c.Candidates = append(c.Candidates, itemCandidate)
		}
		/*------------------------------*/

		/*--------------Сотрудники----------------*/

		rowEmployee, err := db.Query(`
		select e.id, firstname, middlename, lastname, e.id from assessment a
		join assessment_employee ae on a.id = ae.id_assessment
		join employee e on ae.id_employee = e.id
		where a.id = $1`, &c.Id)
		if err != nil {
			log.Println(err)
		}
		defer rowEmployee.Close()

		for rowEmployee.Next(){
			itemEmployee := types.InfoEmployee{}
			err := rowEmployee.Scan(&itemEmployee.IdEmployee, &itemEmployee.Fn, &itemEmployee.Mn, &itemEmployee.Ln, &itemEmployee.IdEmployee)
			if err != nil {
				log.Println(err)
			}
			c.Employees = append(c.Employees, itemEmployee)
		}
		/*----------------------------------------*/

		assessments = append(assessments, &c)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}
	return assessments
}

func AssessmentPut(assessment types.Assessment) (int64, error) {

	db := ttt.DatabaseConnect()

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

func AssessmentDelete(id int) error{

	db := ttt.DatabaseConnect()

	_, err := db.Exec(`
		delete from assessment 
		where id = $1 `, id)
	if err != nil {
		log.Println(err)
	}
	return err
}

func AssessmentPost(id int, assessment types.Assessment) (types.Assessment , error){

	db := ttt.DatabaseConnect()

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
		select c.id, firstname, middlename, lastname, ca.status, ca.proof, c.id from assessment a
		join candidate_assessment ca on a.id = ca.id_assessment
		join candidate c on ca.id_candidate = c.id
		where a.id = $1`, &c.Id)
		if err != nil {
			log.Println(err)
		}
		defer rowCandidate.Close()

		for rowCandidate.Next() {
			itemCandidate := types.InfoCandidate{}
			err := rowCandidate.Scan(&itemCandidate.Id, &itemCandidate.Fn, &itemCandidate.Mn, &itemCandidate.Ln, &itemCandidate.S, &itemCandidate.P, &itemCandidate.Id)
			if err != nil {
				log.Println(err)
			}
			c.Candidates = append(c.Candidates, itemCandidate)
		}
		/*------------------------------*/

		/*--------------Сотрудники----------------*/

		rowEmployee, err := db.Query(`
		select e.id, firstname, middlename, lastname, e.id from assessment a
		join assessment_employee ae on a.id = ae.id_assessment
		join employee e on ae.id_employee = e.id
		where a.id = $1`, &c.Id)
		if err != nil {
			log.Println(err)
		}
		defer rowEmployee.Close()

		for rowEmployee.Next() {
			itemEmployee := types.InfoEmployee{}
			err := rowEmployee.Scan(&itemEmployee.IdEmployee, &itemEmployee.Fn, &itemEmployee.Mn, &itemEmployee.Ln, &itemEmployee.IdEmployee)
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
	for rows.Next(){
		item := types.InfoCandidate{}
		err := rows.Scan(&item.Fn, &item.Mn, &item.Ln, &item.S, &item.P, &item.Id)
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
    var err error
	for i := range assessment.Candidates {
		_, err = db.Exec(`
		insert into candidate_assessment(id_assessment, id_candidate) values($1, $2)`, assessment.Id, assessment.Candidates[i].Id)
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
		insert into assessment_employee(id_assessment, id_employee) values($1, $2)`, assessment.Id, assessment.Employees[i].IdEmployee)
		if err != nil {
			_, err = db.Exec(`
			delete from assessment_employee where id_assessment = $1 and id_employee = $2`, assessment.Id, assessment.Employees[i].IdEmployee)
			if err != nil {
				log.Println(err)
			}
		}
	}
	return err
}

func AssessmentSearch(str types.Search) []*types.Assessment {

	db := ttt.DatabaseConnect()

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
		select c.id, firstname, middlename, lastname, ca.status, ca.proof, c.id from assessment a
		join candidate_assessment ca on a.id = ca.id_assessment
		join candidate c on ca.id_candidate = c.id
		where a.id = $1`, &c.Id)
			if err != nil {
				log.Println(err)
			}
			defer rowCandidate.Close()

			for rowCandidate.Next(){
				itemCandidate := types.InfoCandidate{}
				err := rowCandidate.Scan(&itemCandidate.Id, &itemCandidate.Fn, &itemCandidate.Mn, &itemCandidate.Ln, &itemCandidate.S, &itemCandidate.P, &itemCandidate.Id)
				if err != nil {
					log.Println(err)
				}
				c.Candidates = append(c.Candidates, itemCandidate)
			}
			/*------------------------------*/

			/*--------------Сотрудники----------------*/

			rowEmployee, err := db.Query(`
		select e.id, firstname, middlename, lastname, e.id from assessment a
		join assessment_employee ae on a.id = ae.id_assessment
		join employee e on ae.id_employee = e.id
		where a.id = $1`, &c.Id)
			if err != nil {
				log.Println(err)
			}
			defer rowEmployee.Close()

			for rowEmployee.Next(){
				itemEmployee := types.InfoEmployee{}
				err := rowEmployee.Scan(&itemEmployee.IdEmployee, &itemEmployee.Fn, &itemEmployee.Mn, &itemEmployee.Ln, &itemEmployee.IdEmployee)
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