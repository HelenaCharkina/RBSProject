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

func (c *EmployeeController) Get() revel.Result {
	employees := providers.EmployeeGet()
	return c.RenderJSON(employees)
}

func (c *EmployeeController) Put(employee types.Employee) revel.Result {
	ID, err := providers.EmployeePut(employee)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderJSON(ID)
}

func (c *EmployeeController) Delete(id int) revel.Result{

	err := providers.EmployeeDelete(id)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderText("success")
}

func (c *EmployeeController) Post(id int, employee types.Employee) revel.Result{

	err := providers.EmployeePost(id, employee)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderText("success")
}

func (c *EmployeeController) PutInAssess(employee types.Employee) revel.Result {
	err := providers.EmployeePutInAssess(employee)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderText("success")
}

func (c *EmployeeController) Search(str types.Search) revel.Result{

	Employee := providers.EmployeeSearch(str)
	return c.RenderJSON(Employee)
}