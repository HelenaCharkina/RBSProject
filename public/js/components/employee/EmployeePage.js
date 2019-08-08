const EmployeePage = {
    config: () => {

       return  EmployeeView();
    },

    init: () => {

        // загрузка всех сотрудников
        EmployeeModel.getAll().then(items => {
            if(items) {
                for (const item of items) {
                    $$('employeeTable').add(item);
                }
            }
        })

        // окно подробной инфы
        $$('employeeTable').attachEvent("onItemClick", function (id) {

            let item = this.getItem(id);
            selectITEM = item;
            $$('listOfAssessmentE').clearAll();

            $$('infoFirstNameEmployee').setValue(item.FirstNameE);
            $$('infoMiddleNameEmployee').setValue(item.MiddleNameE);
            $$('infoLastNameEmployee').setValue(item.LastNameE);
            $$('infoPhoneEmployee').setValue(item.PhoneE);
            $$('infoEmailEmployee').setValue(item.EmailE);

            if (item.ListOfAssessment) {
                const list = $$('listOfAssessmentE');
                for (const assessment of item.ListOfAssessment) {
                    list.add(assessment)
                }
            }
        });

        // удаление
        $$('deleteEmployee').attachEvent("onItemClick", function () {

            if (selectITEM) {
                let table = $$('employeeTable');
                table.remove(table.getSelectedId());

                $$('infoFirstNameEmployee').setValue("");
                $$('infoMiddleNameEmployee').setValue("");
                $$('infoLastNameEmployee').setValue("");
                $$('infoPhoneEmployee').setValue("");
                $$('infoEmailEmployee').setValue("");

                EmployeeModel.delete(selectITEM.Id)

                webix.message("Сотрудник удален");

                //assessment update
                ($$('assessmentTable').serialize()).forEach(function (assessment) {
                    if (assessment.Employees) {
                        let index = assessment.Employees.findIndex(el => el.Id === selectITEM.Id);
                        assessment.Employees.splice(index, 1);
                    }
                });
            }
        });

        // редактирование
        $$('SaveEmployee').attachEvent("onItemClick", function () {
            if (selectITEM) {
                let item = {
                    FirstNameE: $$('infoFirstNameEmployee').getValue(),
                    MiddleNameE: $$('infoMiddleNameEmployee').getValue(),
                    LastNameE: $$('infoLastNameEmployee').getValue(),
                    PhoneE: $$('infoPhoneEmployee').getValue(),
                    EmailE: $$('infoEmailEmployee').getValue(),
                };

                EmployeeModel.update(selectITEM.Id, item).then($$('employeeTable').updateItem(selectITEM.id, item));

                webix.message("Изменения сохранены")
            }
        })

        // поиск
        $$("employeeSearch").attachEvent("onEnter", function () {

            let str = this.getValue();

            EmployeeModel.search(str).then(res => {
                    if (res) {
                        $$('employeeTable').clearAll();
                        res.forEach(function (item) {
                            $$('employeeTable').add(item)
                        })
                    } else {
                        webix.message("Сотрудники не найдены")
                    }
                })
        });

        // удалить ассессмент сотрудника
        $$('deleteEmployeeFromAssessment').attachEvent('onItemClick', () => {
            if (selectITEM) {
                if ($$('listOfAssessmentE').getSelectedItem()) {
                    let deletedAssessment = $$('listOfAssessmentE').getSelectedItem()

                    $$('listOfAssessmentE').remove($$('listOfAssessmentE').getSelectedId());
                    let asses = {
                        Id: deletedAssessment.Id,
                        Date: deletedAssessment.Date,
                        Employees: [],
                    }
                    let employee = {
                        Id: selectITEM.Id
                    }
                    asses.Employees.push(employee);

                    AssessmentModel.putInside(asses.Id, asses);

                    // assessment update
                    let idx = ($$('assessmentTable').find(el => el.Id === deletedAssessment.Id))[0].id;
                    let editAssessment = $$('assessmentTable').getItem(idx);
                    let idxEmployee = editAssessment.Employees.findIndex(el => el.Id === selectITEM.Id);
                    editAssessment.Employees.splice(idxEmployee, 1);
                    ($$('assessmentTable').updateItem(editAssessment.id, editAssessment))

                }
            }
        });

        // ДОБАВИТЬ СОТРУДНИКА В АССЕССМЕНТ:ЗАПОЛНЕНИЕ ТАБЛИЦЫ ВО ВСПЛЫВАЮЩЕМ ОКНЕ
        $$('infoAssesE').attachEvent('onItemClick', () => {
            if (selectITEM) {
                $$('tableAddEmployeeInAssess').clearAll();

                AssessmentModel.getAll().then(response => {
                            response.forEach(function (item) {
                                let x = true;
                                if (selectITEM.ListOfAssessment == null) {
                                    $$('tableAddEmployeeInAssess').add(item)
                                } else {
                                    selectITEM.ListOfAssessment.forEach(function (assessment) {
                                        if (assessment.Id === item.Id)
                                            x = false
                                    });
                                    if (x) {
                                        $$('tableAddEmployeeInAssess').add(item)
                                    }
                                }
                            })
                        }
                    )
            }
        });
    }
};