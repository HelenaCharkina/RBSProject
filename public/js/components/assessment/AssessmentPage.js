const AssessmentPage = {
    config: () => {

       return AssessmentView();
    },
    init: () => {

        EmployeeInAssessmentPage.init();
        CandidateInAssessmentPage.init();

        //окно подробной инфы
        $$('assessmentTable').attachEvent("onItemClick", function (id) {
            let item = this.getItem(id);
            selectITEM = item;

            //очистка фильтров
            $$("studentTableAsses").eachColumn(function (id, col) {
                const filter = this.getFilter(id);
                if (filter) {
                    if (filter.setValue) filter.setValue("");
                    else filter.value = "";
                }
            });

            $$('infoAssesDate').setValue(item.Date);
            $$('studentTableAsses').clearAll();
            if (item.Candidates != null) {
                for (const candidate of item.Candidates) {
                    $$('studentTableAsses').add(candidate)
                }
            }
            $$('employeeTableAsses').clearAll();
            if (item.Employees != null) {
                for (const employee of item.Employees) {
                    $$('employeeTableAsses').add(employee)
                }
            }
        });


        //удаление
        $$('deleteAsses').attachEvent("onItemClick", function () {
            if (selectITEM) {
                let table = $$('assessmentTable');
                table.remove(table.getSelectedId());
                $$('infoAssesDate').setValue("");

                fetch(`/assessment/${selectITEM.Id}`, {
                    method: 'DELETE',
                })
                    .then(text => console.log(text));
                webix.message("Ассессмент удален");

                //candidate update
                ($$('studentTable').serialize()).forEach(function (candidate) {
                    if (candidate.ListOfAssessment) {
                        let index = candidate.ListOfAssessment.findIndex(el => el.Id === selectITEM.Id);
                        candidate.ListOfAssessment.splice(index, 1);
                    }
                });
                //employee update
                ($$('employeeTable').serialize()).forEach(function (employee) {
                    if (employee.ListOfAssessment) {
                        let index = employee.ListOfAssessment.findIndex(el => el.Id === selectITEM.Id);
                        employee.ListOfAssessment.splice(index, 1);
                    }
                });
            }
        });


        //редактирование
        $$('SaveAsses').attachEvent("onItemClick", function () {
            if (selectITEM) {
                let item = {
                    Id: selectITEM.Id,
                    Date: $$('infoAssesDate').getValue(),
                    Candidates: []
                };
                $$('studentTableAsses').serialize().forEach(function (candidate) {
                    newC = {
                        Id: candidate.Id,
                        FirstName: candidate.FirstName,
                        MiddleName: candidate.MiddleName,
                        LastName: candidate.LastName,
                        infoProofA: candidate.infoProofA,
                        infoStatusA: candidate.infoStatusA
                    };
                    item.Candidates.push(newC);
                });
                fetch(`/assessment/${selectITEM.Id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                })
                    .then(res => res.json())
                    .then(res => $$('assessmentTable').updateItem(selectITEM.id, res));
                webix.message("Изменения сохранены")
            }
        });

        //поиск
        $$("assessmentSearch").attachEvent("onChange", function () {

            let str = this.getText();

            fetch(`/assessment/search`, {
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
                        $$('assessmentTable').clearAll();
                        res.forEach(function (item) {
                            $$('assessmentTable').add(item)
                        })
                    } else {
                        webix.message("Ассессменты не найдены")
                    }
                })
        })
    }
};
