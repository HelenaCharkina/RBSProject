package mappers

import (
	"database/sql"
	"ttt/app/types"
)

func UserPost(db *sql.DB, user *types.User) (*types.Employee, error) {

	defer db.Close()

	var ID int64
	err := db.QueryRow(`
		select id from db.public.user where login = $1 and password = $2 
`, user.Login, user.Pass).Scan(&ID)
	if err != nil {
		println(err)
	}
	employee := types.Employee {}
	err = db.QueryRow(`
		select id, firstname, middlename, lastname from db.public.employee where id = $1
`, ID).Scan(&employee.Id, &employee.FirstName, &employee.MiddleName, &employee.LastName)
	if err != nil {
		println(err)
	}
	return &employee, err
}
