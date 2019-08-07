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

func (c *CandidateController) Get() revel.Result {
	candidates := providers.CandidateGet()
	return c.RenderJSON(candidates)
}

func (c *CandidateController) GetId(id int) revel.Result {
	candidates := providers.CandidateGetId(id)
	return c.RenderJSON(candidates)
}

func (c *CandidateController) Put(candidate types.Candidate) revel.Result {
	ID, err := providers.CandidatePut(candidate)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderJSON(ID)
}

func (c *CandidateController) Delete(id int) revel.Result{

	err := providers.CandidateDelete(id)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}

	return c.RenderText("success")
}

func (c *CandidateController) Post(id int, candidate types.Candidate) revel.Result{

	err := providers.CandidatePost(id, candidate)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}

	return c.RenderText("success")
}

func (c *CandidateController) PutInAssess(candidate types.Candidate) revel.Result {
	err := providers.CandidatePutInAssess(candidate)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderText("success")
}

func (c *CandidateController) Search(str types.Search) revel.Result{

	candidates := providers.CandidateSearch(str)
	return c.RenderJSON(candidates)
}