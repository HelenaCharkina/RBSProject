webix.ui({
    view: "popup",
    id: "AssessAddCandidate",
    width: 600, height: 600,
    body: {
        rows:[{
            view: "datatable",
            scroll: "y",
            height: 300,
            multiselect:"touch",
            select:'row',
            id: "tableAssessAddCandidate",
            columns: [
                {
                    id: "FirstName",
                    header: "Имя",
                    fillspace: true
                },
                {
                    id: "MiddleName",
                    header: "Отчество",
                    fillspace: true
                },
                {
                    id: "LastName",
                    header: "Фамилия",
                    fillspace: true
                }
            ]
        },
            {
                view: "button",
                id: "selectCandidate",
                value: "Добавить"
            }

        ]
    }
}).hide();

//ДОБАВЛЕНИЕ СПИСКА КАДИДАТОВ В АССЕССМЕНТ

    $$('selectCandidate').attachEvent("onItemClick", function (id) {

        if(selectITEM) {
            let masIdA = [];

            ($$('tableAssessAddCandidate').getSelectedItem(true)).forEach(function (item) {
                masIdA.push(item)
            })
            let item = {
                Id: selectITEM.Id,
                Date: $$('infoAssesDate').getValue(),
                Candidates: [],
            }
            masIdA.forEach(function (candidate, i) {
                item.Candidates[i] = {
                    Id: candidate.Id
                }
            })

            fetch(`/assessment/${selectITEM.Id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
                .then(res => res.text())
                .then(text => console.log(text))
            let newAssess = selectITEM
            if (newAssess.Candidates == null) {
                newAssess.Candidates = []
            }

            for (const item of masIdA) {
                $$('studentTableAsses').add(item)
                const candidate = {
                    Id: item.Id,
                    FirstName: item.FirstName,
                    MiddleName: item.MiddleName,
                    LastName: item.LastName,
                    ListOfAssessment: item.ListOfAssessment
                }
                newAssess.Candidates.push(candidate)
                $$('AssessAddCandidate').hide();

                //candidate update
                let idx = ($$('studentTable').find(el => el.Id === item.Id))[0].id
                let editCandidate = $$('studentTable').getItem(idx)
                if (!editCandidate.ListOfAssessment) {
                    editCandidate.ListOfAssessment = [];
                }
                editCandidate.ListOfAssessment.push(newAssess);
                ($$('studentTable').updateItem(editCandidate.id, editCandidate))
            }
            ($$('assessmentTable').updateItem(selectITEM.id, newAssess))
            webix.message("Кандидаты добавлены")
        }
    })
