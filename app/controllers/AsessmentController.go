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

func (c *AssessmentController) GetAll() revel.Result {
	assessments, err := providers.AssessmentGetAll()
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}
	return c.RenderJSON(assessments)
}


func (c *AssessmentController) UpdateUsers(assessment types.Assessment) revel.Result {

	err := providers.AssessmentUpdateUsers(assessment)
	if err != nil {
		log.Println(err)
		return c.RenderError(err)
	}

	return c.RenderText("success")
}

func (c *AssessmentController) Create(assessment types.Assessment) revel.Result {
	asses, err := providers.AssessmentCreate(assessment)
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

func (c *AssessmentController) Update(id int, assessment types.Assessment) revel.Result {

	assess, err := providers.AssessmentUpdate(id, assessment)
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
