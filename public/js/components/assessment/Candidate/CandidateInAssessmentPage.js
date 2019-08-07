const CandidateInAssessmentPage = {
    config: () => {
        return {
            id: "studentCell",
            rows: [{
                view: "datatable",
                select: "row",
                id: "studentTableAsses",
                height: 400,
                editable: true,
                multiselect: "touch",
                autoConfig: true,
                columns: [
                    {
                        sort: "string",
                        id: "FirstName",
                        header: "Имя",
                        fillspace: true
                    },
                    {
                        sort: "string",
                        id: "MiddleName",
                        header: "Отчество",
                        fillspace: true
                    },
                    {
                        sort: "string",
                        id: "LastName",
                        header: "Фамилия",
                        fillspace: true
                    },
                    {
                        editor: "select",
                        options: ["Подтвержден", "Не подтвержден"],
                        fillspace: true,
                        header: ["Подтверждение", {
                            content: "selectFilter",
                            onBeforeShow: ""
                        }],
                        id: "infoProofA"
                    },
                    {
                        editor: "select",
                        options: ["Принят", "Отклонен", "Приглашен"],
                        fillspace: true,
                        header: ["Статус", {content: "selectFilter"}],
                        id: "infoStatusA"
                    },

                ]
            },
                {
                    cols: [
                        {
                            view: "button",
                            id: "addCandidate",
                            value: "Добавить кандидата",
                            popup: "AssessAddCandidate"
                            //width: 150,
                        },
                        {
                            view: "button",
                            id: "deleteCandidate",
                            value: "Удалить кандидата",
                        }]
                }
            ]
        }
    },

    init: () => {

        //ТАБЛИЦА АССЕССМЕНТОВ ЗАГРУЗКА КАНДИДАТОВ
        $$('addCandidate').attachEvent('onItemClick', () => {

            if (selectITEM) {
                $$('tableAssessAddCandidate').clearAll();
                fetch('/candidate', {method: 'GET'})
                    .then(response => response.json())
                    .then(response => {
                            response.forEach(function (item) {
                                let x = true;
                                if (selectITEM.Candidates == null) {
                                    $$('tableAssessAddCandidate').add(item)
                                } else {
                                    selectITEM.Candidates.forEach(function (candidate) {
                                        if (candidate.Id === item.Id)
                                            x = false
                                    });
                                    if (x) {
                                        $$('tableAssessAddCandidate').add(item)
                                    }
                                }
                            })
                        }
                    )
            }
        });

        // УДАЛЕНИЕ КАНДИДАТА ИЗ АССЕССМЕНТА
        $$('deleteCandidate').attachEvent('onItemClick', () => {
            if (selectITEM) {
                let masDelId = [];
                ($$('studentTableAsses').getSelectedItem(true)).forEach(function (item) {
                    masDelId.push(item)
                });
                let item = {
                    Id: selectITEM.Id,
                    Date: $$('infoAssesDate').getValue(),
                    Candidates: [],
                };
                masDelId.forEach(function (candidate, i) {
                    item.Candidates[i] = {
                        Id: candidate.Id
                    }
                });
                fetch(`/assessment/${selectITEM.Id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                })
                    .then(res => res.text())
                    .then(text => console.log(text));

                $$('studentTableAsses').remove($$('studentTableAsses').getSelectedId());
                $$('AssessAddCandidate').hide();

                masDelId.forEach(function (deleted) {
                    let index = selectITEM.Candidates.findIndex(el => el.Id === deleted.Id);
                    selectITEM.Candidates.splice(index, 1);

                    //candidate update
                    let idx = ($$('studentTable').find(el => el.Id === deleted.Id))[0].id;
                    let editCandidate = $$('studentTable').getItem(idx);
                    let idxAssess = editCandidate.ListOfAssessment.findIndex(el => el.Id === selectITEM.Id);
                    editCandidate.ListOfAssessment.splice(idxAssess, 1);
                    ($$('studentTable').updateItem(editCandidate.id, editCandidate))
                });
                webix.message("Кандидаты удалены")
            }
        });
    }
};