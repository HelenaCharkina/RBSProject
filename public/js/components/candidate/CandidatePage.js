const CandidatePage = {
    config: () => {
        return {

            id: "studentList",
            rows: [{
                //меню поиска
                view: 'toolbar',
                elements: [
                    {
                        view: "search", placeholder: "Search..", width: 300, height: 50, id: "candidateSearch"

                    },
                    {},
                    {
                        view: "button", width: 150, value: 'Добавить', popup: "add_student"
                    },
                ]
            },
                {//списки
                    cols: [
                        {
                            autoheight:true,
                            view: "datatable",
                            select: "row",
                            id: "studentTable",
                            //height: 500,
                            autoConfig: true,
                            columns: [

                                {
                                    sort:"string",
                                    id: "FirstName",
                                    header: "Имя",
                                    fillspace: true
                                },
                                {
                                    sort:"string",
                                    id: "MiddleName",
                                    header: "Отчество",
                                    fillspace: true
                                },
                                {
                                    sort:"string",
                                    id: "LastName",
                                    header: "Фамилия",
                                    fillspace: true
                                },
                            ]
                        },
                        {
                            padding: 20,
                            rows: [
                                {
                                    view: "text",
                                    labelWidth: 150,
                                    label: "Имя",
                                    id: "infoFirstName"
                                },
                                {
                                    view: "text",
                                    labelWidth: 150,
                                    label: "Отчество",
                                    id: "infoMiddleName"
                                },
                                {
                                    view: "text",
                                    label: "Фамилия",
                                    labelWidth: 150,
                                    id: "infoLastName"
                                },
                                {
                                    view: "text",
                                    label: "Телефон",
                                    labelWidth: 150,
                                    id: "infoPhone"
                                },
                                {
                                    view: "text",
                                    labelWidth: 150,
                                    label: "Почта",
                                    id: "infoEmail"
                                },
                                {
                                    view: "list",
                                    id: "listOfAssessment",
                                    template:"#Date#",
                                    height: 200
                                },
                                {},
                                {
                                    cols:[
                                        {
                                            view: "button",
                                            id: "deleteStudent",
                                            value: "Удалить",
                                        },
                                        {
                                            view: "button",
                                            id: "SaveStudent",
                                            value: "Сохранить",
                                        },
                                        {
                                            view: "button",
                                            popup: "addCandidateInAssess",
                                            value :"Добавить в ассессмент",
                                            id: "infoAsses",
                                            height: 50
                                        },]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    init: () => {

        //окно подробной инфы
        $$('studentTable').attachEvent("onItemClick", function (id) {

            let item = this.getItem(id);
            selectITEM = item;

            $$('listOfAssessment').clearAll();
            $$('infoFirstName').setValue(item.FirstName);
            $$('infoMiddleName').setValue(item.MiddleName);
            $$('infoLastName').setValue(item.LastName);
            $$('infoPhone').setValue(item.Phone);
            $$('infoEmail').setValue(item.Email);

            if (item.ListOfAssessment) {
                const list = $$('listOfAssessment');
                for (const assessment of item.ListOfAssessment) {
                    list.add(assessment)
                }
            }
        });

        //удаление
        $$('deleteStudent').attachEvent("onItemClick", function () {

            if (selectITEM) {
                const table = $$('studentTable');
                table.remove(table.getSelectedId());

                $$('infoFirstName').setValue("");
                $$('infoMiddleName').setValue("");
                $$('infoLastName').setValue("");
                $$('infoPhone').setValue("");
                $$('infoEmail').setValue("");
                $$('infoAsses').setValue("");

                fetch(`/candidate/${selectITEM.Id}`, {
                    method: 'DELETE',
                })
                    .then(text => console.log(text));
                webix.message("Кандидат удален");

                //assessment update
                ($$('assessmentTable').serialize()).forEach(function (assessment) {
                    if (assessment.Candidates) {
                        let index = assessment.Candidates.findIndex(el => el.Id === selectITEM.Id);
                        assessment.Candidates.splice(index, 1);
                    }
                });
            }
        });

        //редактирование
        $$('SaveStudent').attachEvent("onItemClick", function () {
            if (selectITEM) {
                let item = {
                    FirstName: $$('infoFirstName').getValue(),
                    MiddleName: $$('infoMiddleName').getValue(),
                    LastName: $$('infoLastName').getValue(),
                    Phone: $$('infoPhone').getValue(),
                    Email: $$('infoEmail').getValue(),

                };
                fetch(`/candidate/${selectITEM.Id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                })
                    .then(res => res.text())
                    .then(text => console.log(text))
                    .then($$('studentTable').updateItem(selectITEM.id, item));
                webix.message("Изменения сохранены");
            }
        })

        //поиск
        $$("candidateSearch").attachEvent("onEnter", function () {

            let str = this.getValue();
            fetch(`/candidate/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    str: str
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res) {
                        $$('studentTable').clearAll();
                        res.forEach(function (item) {
                            $$('studentTable').add(item)
                        })
                    } else {
                        webix.message("Кандидаты не найдены")
                    }
                })
        });

        //ДОБАВИТЬ КАНДИДАТА В АССЕССМЕНТ:ЗАПОЛНЕНИЕ ТАБЛИЦЫ ВО ВСПЛЫВАЮЩЕМ ОКНЕ
        $$('infoAsses').attachEvent('onItemClick', () => {
            if (selectITEM) {
                $$('tableAddCandidateInAssess').clearAll();
                fetch('/assessment', {method: 'GET'})
                    .then(response => response.json())
                    .then(response => {
                            response.forEach(function (item) {
                                let x = true;
                                if (selectITEM.ListOfAssessment == null) {
                                    $$('tableAddCandidateInAssess').add(item)
                                } else {
                                    selectITEM.ListOfAssessment.forEach(function (assessment) {
                                        if (assessment.Id === item.Id)
                                            x = false
                                    });
                                    if (x) {
                                        $$('tableAddCandidateInAssess').add(item)
                                    }
                                }
                            })
                        }
                    )
            }
        });

    }
}
