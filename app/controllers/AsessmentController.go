package controllers

import (
	"github.com/revel/revel"
	"log"
	"ttt/app/providers"
	"ttt/app/types"
)

type AssessmentController struct {
	*revel.Controller
}

func (c *AssessmentController) Get() revel.Result {
	assessments, err := providers.AssessmentGet()
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderJSON(assessments)
}

func (c *AssessmentController) GetMas(id int) revel.Result {

	assessment := providers.AssessmentGetMas(id)
	return c.RenderJSON(assessment)
}

func (c *AssessmentController) PutCandidate(assessment types.Assessment) revel.Result {

	err := providers.AssessmentPutCandidate(assessment)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}

	return c.RenderText("success")
}

func (c *AssessmentController) Put(assessment types.Assessment) revel.Result {
	asses, err := providers.AssessmentPut(assessment)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderJSON(asses)
}

func (c *AssessmentController) Delete(id int) revel.Result {

	err := providers.AssessmentDelete(id)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderText("success")
}

func (c *AssessmentController) Post(id int, assessment types.Assessment) revel.Result {

	assess, err := providers.AssessmentPost(id, assessment)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}

	return c.RenderJSON(assess)
}

func (c *AssessmentController) Search(str types.Search) revel.Result {

	assessments := providers.AssessmentSearch(str)
	return c.RenderJSON(assessments)
}
