package controllers

import (
	"github.com/revel/revel"
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
		return c.RenderError(err)
	}
	return c.RenderJSON(candidates)
}

func (c *CandidateController) Create(candidate types.Candidate) revel.Result {
	ID, err := providers.CandidateCreate(candidate)
	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(ID)
}

func (c *CandidateController) Delete(id int) revel.Result {

	err := providers.CandidateDelete(id)
	if err != nil {
		return c.RenderError(err)
	}

	return c.RenderText("success")
}

func (c *CandidateController) Update( candidate types.Candidate) revel.Result {

	err := providers.CandidateUpdate(candidate)
	if err != nil {
		return c.RenderError(err)
	}

	return c.RenderText("success")
}

func (c *CandidateController) AddInAssess(candidate types.Candidate) revel.Result {
	err := providers.CandidateAddInAssess(candidate)
	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderText("success")
}

func (c *CandidateController) Search(str types.Search) revel.Result {

	candidates, err := providers.CandidateSearch(str)
	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(candidates)
}
