package mappers

import (
	"database/sql"
	_ "github.com/lib/pq"
	"log"
	"strings"
	"ttt/app/types"
)

// получение списка кандидатов
func CandidateGetAll(db *sql.DB) ([]*types.Candidate, error) {

	defer db.Close()

	var candidates []*types.Candidate

	rows, err := db.Query(`
		SELECT *
		FROM db.public.candidate
`)
	if err != nil {
		log.Println(err)
		return candidates, err
	}

	defer rows.Close()
	for rows.Next() {
		c := types.Candidate{}
		err := rows.Scan(&c.Id, &c.FirstName, &c.MiddleName, &c.LastName, &c.Phone, &c.Email)
		if err != nil {
			log.Println(err)
			return candidates, err
		}
		//----------------АССЕССМЕНТЫ-----------------------

		rowAssessment, err := db.Query(`
		select a.id, Date from candidate c
		join candidate_assessment ca on c.id = ca.id_candidate
		join assessment a on ca.id_assessment = a.id
		where c.id = $1`, &c.Id)
		if err != nil {
			log.Println(err)
			return candidates, err
		}
		defer rowAssessment.Close()

		for rowAssessment.Next() {
			itemAssessment := types.Assessment{}
			err := rowAssessment.Scan(&itemAssessment.Id, &itemAssessment.Date)
			if err != nil {
				log.Println(err)
				return candidates, err
			}
			c.ListOfAssessment = append(c.ListOfAssessment, itemAssessment)
		}

		//--------------------------------------
		candidates = append(candidates, &c)
	}
	if err = rows.Err(); err != nil {
		log.Println(err)
	}
	return candidates, err
}

// создание нового кандидата
func CandidateCreate(db *sql.DB, candidate types.Candidate) (int64, error) {

	defer db.Close()

	var ID int64
	err := db.QueryRow(`
		INSERT INTO candidate (firstname, middlename, lastname, phone, email) 
		VALUES ($1, $2, $3, $4, $5) RETURNING id
	`, candidate.FirstName, candidate.MiddleName, candidate.LastName, 0, "").Scan(&ID)
	if err != nil {
		log.Println(err)
	}

	return ID, err
}

// удаление кандидата
func CandidateDelete(db *sql.DB, id int) error {

	defer db.Close()

	_, err := db.Exec(`
		delete from candidate 
		where id = $1 `, id)
	if err != nil {
		log.Println(err)
	}
	return err
}

// обновление кандидата
func CandidateUpdate(db *sql.DB, candidate types.Candidate) error {

	defer db.Close()

	_, err := db.Exec(`
		update candidate set Firstname = $2, Middlename = $3, Lastname = $4, Phone = $5, Email = $6
		where id = $1 `, candidate.Id, candidate.FirstName, candidate.MiddleName, candidate.LastName, candidate.Phone, candidate.Email)
	if err != nil {
		log.Println(err)
	}
	return err
}

// добавление ассессментов кандидата
func CandidateAddInAssess(db *sql.DB, candidate types.Candidate) error {

	defer db.Close()

	var err error
	for i := range candidate.ListOfAssessment {
		_, err = db.Exec(`
		insert into candidate_assessment(id_assessment, id_candidate, status, proof) values($1, $2, $3, $4)`, candidate.ListOfAssessment[i].Id, candidate.Id, "", "")
		if err != nil {
			log.Println(err)
		}
	}
	return err
}

// поиск кандидата
func CandidateSearch(db *sql.DB, str types.Search) []*types.Candidate {

	defer db.Close()

	var masObjects = strings.Split(str.Str, " ")

	var candidates []*types.Candidate

	for i := range masObjects {
		rows, err := db.Query(`
			SELECT *
			FROM db.public.candidate 
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
			c := types.Candidate{}
			err := rows.Scan(&c.Id, &c.FirstName, &c.MiddleName, &c.LastName, &c.Phone, &c.Email)
			if err != nil {
				log.Fatal(err)
			}
			var flag = true
			for i := range candidates {

				if candidates[i].Id == c.Id {
					flag = false
				}
			}
			if flag {
				candidates = append(candidates, &c)
			}
		}
	}

	return candidates
}
