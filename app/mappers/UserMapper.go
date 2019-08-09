package mappers

import (
	"ttt/app/types"
	"ttt/app/util"
)

func UserPost(user types.User) (types.Employee, error) {

	db := util.DatabaseConnect()

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
	return employee, err
}
