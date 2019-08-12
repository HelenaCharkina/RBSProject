package util

import (
	"database/sql"
	_ "github.com/lib/pq"
	"log"
)

func DatabaseConnect() (*sql.DB, error) {

	connectionStr := "user=postgres password=oaqcrick8n dbname=db sslmode=disable"

	db, err := sql.Open("postgres", connectionStr)
	if err != nil {
		log.Println(err)
	}

	return db, err
}
