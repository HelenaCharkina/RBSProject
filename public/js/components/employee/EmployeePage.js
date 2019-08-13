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

        //список ассессментов
        $$('listOfAssessmentE').attachEvent("onItemClick", function () {

            $$("deleteEmployeeFromAssessment").enable();
        })

        // окно подробной инфы
        $$('employeeTable').attachEvent("onItemClick", function (id) {

            $$("formInfoEmployee").clearValidation()
            $$("SaveEmployee").enable();
            $$("deleteEmployee").enable();
            $$("infoAssesE").enable();
            $$("deleteEmployeeFromAssessment").disable();

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
                        if(index !== -1) {
                            assessment.Employees.splice(index, 1);
                        }
                    }
                });
                $$("SaveEmployee").disable();
                $$("deleteEmployee").disable();
                $$("infoAssesE").disable();
            }
        });

        // редактирование
        $$('SaveEmployee').attachEvent("onItemClick", function () {
            if (selectITEM) {
                if ($$("formInfoEmployee").validate()) {
                    let item = {
                        Id: selectITEM.Id,
                        FirstNameE: $$('infoFirstNameEmployee').getValue(),
                        MiddleNameE: $$('infoMiddleNameEmployee').getValue(),
                        LastNameE: $$('infoLastNameEmployee').getValue(),
                        PhoneE: $$('infoPhoneEmployee').getValue(),
                        EmailE: $$('infoEmailEmployee').getValue(),
                    };

                    EmployeeModel.update(item).then($$('employeeTable').updateItem(selectITEM.id, item));

                    $$('assessmentTable').serialize().forEach(function (asses) {

                        asses.Employees.forEach(function (employee) {

                            if(employee.Id === item.Id) {
                                employee.FirstNameE = item.FirstNameE
                                employee.MiddleNameE = item.MiddleNameE
                                employee.LastNameE = item.LastNameE
                            }
                        })
                    })
                    webix.message("Изменения сохранены")
                }
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

                    AssessmentModel.addInside(asses.Id, asses);

                    let upEmployee = selectITEM
                    let idxUpEmployee = upEmployee.ListOfAssessment.findIndex(el => el.Id === deletedAssessment.Id);
                    upEmployee.ListOfAssessment.splice(idxUpEmployee, 1);
                    ($$('employeeTable').updateItem(selectITEM.id, upEmployee))

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