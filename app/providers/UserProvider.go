package providers

import (
	"ttt/app/mappers"
	"ttt/app/types"
)

func UserPost(user types.User) (types.Employee, error) {
	return mappers.UserPost(user)
}
