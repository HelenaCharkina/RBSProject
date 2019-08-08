const CandidatePage = {
    config: () => {
        return CandidateView()
    },

    init: () => {

        // загрузка всех кандидатов
        CandidateModel.getAll().then(items => {
            if (items) {
                for (const item of items) {
                    $$('studentTable').add(item);
                }
            }
        });


        // окно подробной инфы
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

        // удаление
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

                CandidateModel.delete(selectITEM.Id)

                webix.message("Кандидат удален");

                // assessment update
                ($$('assessmentTable').serialize()).forEach(function (assessment) {
                    if (assessment.Candidates) {
                        let index = assessment.Candidates.findIndex(el => el.Id === selectITEM.Id);
                        assessment.Candidates.splice(index, 1);
                    }
                });
            }
        });

        // редактирование
        $$('SaveStudent').attachEvent("onItemClick", function () {
            if (selectITEM) {
                let item = {
                    FirstName: $$('infoFirstName').getValue(),
                    MiddleName: $$('infoMiddleName').getValue(),
                    LastName: $$('infoLastName').getValue(),
                    Phone: $$('infoPhone').getValue(),
                    Email: $$('infoEmail').getValue(),

                };
                CandidateModel.update(selectITEM.Id, item).then($$('studentTable').updateItem(selectITEM.id, item));
                webix.message("Изменения сохранены");
            }
        });

        // поиск
        $$("candidateSearch").attachEvent("onEnter", function () {

            let str = this.getValue();

            CandidateModel.search(str).then(res => {
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

        // ДОБАВИТЬ КАНДИДАТА В АССЕССМЕНТ:ЗАПОЛНЕНИЕ ТАБЛИЦЫ ВО ВСПЛЫВАЮЩЕМ ОКНЕ
        $$('infoAsses').attachEvent('onItemClick', () => {
            if (selectITEM) {
                $$('tableAddCandidateInAssess').clearAll();

                AssessmentModel.getAll().then(response => {
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
};
