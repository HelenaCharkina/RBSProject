package providers

import (
	"ttt/app/mappers"
	"ttt/app/types"
	"ttt/app/util"
)

func UserPost(user types.User) (*types.Employee, error) {
	db, err := util.DatabaseConnect()
	if err != nil {
		return nil, err
	}
	defer db.Close()
	return mappers.UserPost(db, &user)
}
