package providers

import (
	"log"
	"ttt/app/mappers"
	"ttt/app/types"
	"ttt/app/util"
)

func UserPost(user types.User) (types.Employee, error) {
	db, err := util.DatabaseConnect()
	if err != nil {
		log.Println(err)
	}
	return mappers.UserPost(db, user)
}
