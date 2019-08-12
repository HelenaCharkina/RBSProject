package controllers

import (
	"github.com/revel/revel"
	"log"
	"ttt/app/providers"
	"ttt/app/types"
)

// CandidateController
type EmployeeController struct {
	*revel.Controller
}

func (c *EmployeeController) GetAll() revel.Result {
	employees, err := providers.EmployeeGetAll()
	if err != nil{
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderJSON(employees)
}

func (c *EmployeeController) Create(employee types.Employee) revel.Result {
	ID, err := providers.EmployeeCreate(employee)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderJSON(ID)
}

func (c *EmployeeController) Delete(id int) revel.Result {

	err := providers.EmployeeDelete(id)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderText("success")
}

func (c *EmployeeController) Update(employee types.Employee) revel.Result {

	err := providers.EmployeeUpdate(employee)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderText("success")
}

func (c *EmployeeController) AddInAssess(employee types.Employee) revel.Result {
	err := providers.EmployeeAddInAssess(employee)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderText("success")
}

func (c *EmployeeController) Search(str types.Search) revel.Result {

	Employee, err := providers.EmployeeSearch(str)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderJSON(Employee)
}
