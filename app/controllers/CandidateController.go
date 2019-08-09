package controllers

import (
	"github.com/revel/revel"
	"log"
	"ttt/app/providers"
	"ttt/app/types"
)

// CandidateController
type CandidateController struct {
	*revel.Controller
}

func (c *CandidateController) GetAll() revel.Result {
	candidates, err := providers.CandidateGetAll()
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderJSON(candidates)
}

func (c *CandidateController) Create(candidate types.Candidate) revel.Result {
	ID, err := providers.CandidateCreate(candidate)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderJSON(ID)
}

func (c *CandidateController) Delete(id int) revel.Result {

	err := providers.CandidateDelete(id)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}

	return c.RenderText("success")
}

func (c *CandidateController) Update(id int, candidate types.Candidate) revel.Result {

	err := providers.CandidateUpdate(id, candidate)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}

	return c.RenderText("success")
}

func (c *CandidateController) AddInAssess(candidate types.Candidate) revel.Result {
	err := providers.CandidateAddInAssess(candidate)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderText("success")
}

func (c *CandidateController) Search(str types.Search) revel.Result {

	candidates := providers.CandidateSearch(str)
	return c.RenderJSON(candidates)
}
