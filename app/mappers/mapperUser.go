package mappers

import (
	"ttt"
	"ttt/app/types"
)

func UserPost(user types.User) (int64, error) {

	db := ttt.DatabaseConnect()

	var ID int64
	err := db.QueryRow(`
		select id from db.public.user where login = $1 and password = $2 
`, user.Login, user.Pass).Scan(&ID)
	if err != nil {
		println(err)
	}
	return ID, err
}
