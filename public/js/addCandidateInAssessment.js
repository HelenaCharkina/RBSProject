webix.ui({
    view: "popup",
    id: "addCandidateInAssess",
    width: 300, height: 500,
    body: {
        rows:[{
            view: "datatable",
            scroll: "y",
            select: "row",
            height: 300,
            //multiselect: "touch",
            id: "tableAddCandidateInAssess",
            columns: [
                {
                    id: "Date",
                    header: "Дата",
                    fillspace: true
                }
            ]
        },
            {
                view: "button",
                id: "buttonAddCandidateInAssess",
                value:"Добавить в ассессмент"
            }
            ]
    }
}).hide();


$$('buttonAddCandidateInAssess').attachEvent("onItemClick", function (id) {

    let masId = [];
    ($$('tableAddCandidateInAssess').getSelectedItem(true)).forEach(function (item) {
        masId.push(item)
    })

    let item = {
        Id: selectITEM.Id,
        ListOfAssessment: [],
    }
    masId.forEach(function (a, i) {
        item.ListOfAssessment[i] ={
            Id : a.Id
        }
    })

    fetch(`/candidate/${selectITEM.Id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(res => res.text())
        .then(text => console.log(text))

    let newCandidate = selectITEM
    if(newCandidate.ListOfAssessment == null) {
        newCandidate.ListOfAssessment = []
    }

    for (const item of masId) {
        $$('listOfAssessment').add(item)
        newCandidate.ListOfAssessment.push(item)

        //assessment
        // let editAssess = $$('assessmentTable').getItem(item.Id)
        // if(editAssess.Candidates == null) {
        //     editAssess.Candidates = []
        // }
        //     const candidate = {
        //         Id: selectITEM.Id,
        //         FirstName: selectITEM.FirstName,
        //         MiddleName: selectITEM.MiddleName,
        //         LastName: selectITEM.LastName,
        //     }
        //     editAssess.Candidates.push(candidate)
        // $$('assessmentTable').updateItem(item.Id, editAssess)
        ///////////
    }

    ($$('studentTable').updateItem(selectITEM.id, newCandidate))
    $$('addCandidateInAssess').hide();
    webix.message("Кандидаты добавлены")
})