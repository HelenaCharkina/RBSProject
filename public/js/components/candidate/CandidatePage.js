const CandidatePage = {
    config: () => {
        return CandidateView()
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
