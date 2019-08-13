const CandidateInAssessmentPage = {
    config: () => {

        return CandidateInAssessmentView()
    },

    init: () => {

        $$('studentTableAsses').attachEvent('onItemClick', () => {
            if($$('studentTableAsses').getSelectedItem()) {
                $$('deleteCandidate').enable();
            }else{
                $$('deleteCandidate').disable();
            }
        })
        // ТАБЛИЦА АССЕССМЕНТОВ ЗАГРУЗКА КАНДИДАТОВ
        $$('addCandidate').attachEvent('onItemClick', () => {

            if (selectITEM) {
                $$('tableAssessAddCandidate').clearAll();
                CandidateModel.getAll().then(response => {
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

                AssessmentModel.addInside(selectITEM.Id, item)

                $$('studentTableAsses').remove($$('studentTableAsses').getSelectedId());
                $$('AssessAddCandidate').hide();

                masDelId.forEach(function (deleted) {
                    let index = selectITEM.Candidates.findIndex(el => el.Id === deleted.Id);
                    if(index !== -1) {
                        selectITEM.Candidates.splice(index, 1);
                    }

                    //candidate update
                    let idx = ($$('studentTable').find(el => el.Id === deleted.Id))[0].id;
                    let editCandidate = $$('studentTable').getItem(idx);
                    let idxAssess = editCandidate.ListOfAssessment.findIndex(el => el.Id === selectITEM.Id);
                    if(idxAssess !== -1) {
                        editCandidate.ListOfAssessment.splice(idxAssess, 1);
                        ($$('studentTable').updateItem(editCandidate.id, editCandidate))
                    }
                });
                webix.message("Кандидаты удалены")
            }
        });
    }
};