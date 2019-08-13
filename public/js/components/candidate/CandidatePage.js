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

        //список ассессментов
        $$('listOfAssessment').attachEvent("onItemClick", function () {

                $$("deleteCandidateFromAssessment").enable();
        })

        // окно подробной инфы
        $$('studentTable').attachEvent("onItemClick", function (id) {

            $$("formInfoCandidate").clearValidation()
            $$("SaveStudent").enable();
            $$("deleteStudent").enable();
            $$("infoAsses").enable();
            $$("deleteCandidateFromAssessment").disable();

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
                //$$('infoAsses').setValue("");

                CandidateModel.delete(selectITEM.Id)

                webix.message("Кандидат удален");

                // assessment update
                ($$('assessmentTable').serialize()).forEach(function (assessment) {
                    if (assessment.Candidates) {
                        let index = assessment.Candidates.findIndex(el => el.Id === selectITEM.Id);
                        if(index !== -1) {
                            assessment.Candidates.splice(index, 1);
                        }
                    }
                });
                $$("SaveStudent").disable();
                $$("deleteStudent").disable();
                $$("infoAsses").disable();
            }
        });

        // редактирование
        $$('SaveStudent').attachEvent("onItemClick", function () {
            if (selectITEM) {

                if ($$("formInfoCandidate").validate()) {
                    let item = {
                        Id: selectITEM.Id,
                        FirstName: $$('infoFirstName').getValue(),
                        MiddleName: $$('infoMiddleName').getValue(),
                        LastName: $$('infoLastName').getValue(),
                        Phone: $$('infoPhone').getValue(),
                        Email: $$('infoEmail').getValue(),

                    };
                    CandidateModel.update(item).then($$('studentTable').updateItem(selectITEM.id, item));

                    $$('assessmentTable').serialize().forEach(function (asses) {

                        asses.Candidates.forEach(function (candidate) {

                            if(candidate.Id === item.Id) {
                                candidate.FirstName = item.FirstName
                                candidate.MiddleName = item.MiddleName
                                candidate.LastName = item.LastName
                            }
                        })
                    })

                    webix.message("Изменения сохранены");
                }
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

        // удалить ассессмент кандидата
        $$('deleteCandidateFromAssessment').attachEvent('onItemClick', () => {
            if (selectITEM) {
                if ($$('listOfAssessment').getSelectedItem()) {
                    let deletedAssessment = $$('listOfAssessment').getSelectedItem()

                    $$('listOfAssessment').remove($$('listOfAssessment').getSelectedId());
                    let asses = {
                        Id: deletedAssessment.Id,
                        Date: deletedAssessment.Date,
                        Candidates: [],
                    }
                    let candidate = {
                        Id: selectITEM.Id
                    }
                    asses.Candidates.push(candidate);

                    AssessmentModel.addInside(asses.Id, asses);

                    let upCandidate = selectITEM
                    let idxUpCandidate = upCandidate.ListOfAssessment.findIndex(el => el.Id === deletedAssessment.Id);
                    upCandidate.ListOfAssessment.splice(idxUpCandidate, 1);
                    ($$('studentTable').updateItem(selectITEM.id, upCandidate))

                    // assessment update
                    let idx = ($$('assessmentTable').find(el => el.Id === deletedAssessment.Id))[0].id;
                    let editAssessment = $$('assessmentTable').getItem(idx);
                    let idxCandidate = editAssessment.Candidates.findIndex(el => el.Id === selectITEM.Id);
                    editAssessment.Candidates.splice(idxCandidate, 1);
                    ($$('assessmentTable').updateItem(editAssessment.id, editAssessment))

                }
            }
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
