package controllers

import (
	"github.com/revel/revel"
	"log"
	"ttt/app/providers"
	"ttt/app/types"
)

// UserController
type UserController struct {
	*revel.Controller
}

func (c *UserController) Post(user types.User) revel.Result {
	ID, err := providers.UserPost(user)
	if err != nil {
		log.Println(err)
		println(err)
	}
	return c.RenderJSON(ID)
}
