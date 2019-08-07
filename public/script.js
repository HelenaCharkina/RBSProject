webix.ready(function () {
    -webix.ui({

            rows: [
                {//шапка
                    view: "label", label: "login", width: 300, align: 'center', height: 50
                },
                {
                    borderless: true, view: "tabbar", id: "tabbar", multiview: true, options: [
                        {value: 'Список кандидатов', id: 'studentList'},
                        {value: 'Список ассессментов', id: 'assessmentList'},
                        {value: 'Список сотрудников', id: 'employeeList'},
                    ]
                },
                {

                    cells: [

                        add_list_student(),
                        add_list_assessment(),
                        add_list_employee(),

                    ]

                }
            ]

        }
    );

    getStudent();
    getAssessment();
    getEmployee();
    addButtonEditCandidate();
    addButtonEditEmployee();
    addButtonEditAsses();

    addButtonAddCandidateInAssess();
    addButtonAddEmployeeInAssess();

    /*---------------------РЕДАКТИРОВАНИЕ----------------------------*/

    $$('tabbar').attachEvent("onItemClick", function () {

        $$('studentTable').clearSelection();
        $$('assessmentTable').clearSelection();
        $$('employeeTable').clearSelection()

    });

//ОКНО ПОДРОБНОЙ ИНФЫ КАНДИДАТА

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


//ОКНО ПОДРОБНОЙ ИНФЫ АССЕССМЕНТОВ

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

//ОКНО ПОДРОБНОЙ ИНФЫ СОТРУДНИКОВ

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

//КНОПКА УДАЛЕНИЯ СТУДЕНТА

    $$('deleteStudent').attachEvent("onItemClick", function () {


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
            if(assessment.Candidates) {
                let index = assessment.Candidates.findIndex(el => el.Id === selectITEM.Id);
                assessment.Candidates.splice(index, 1);
            }
        });
    });

//КНОПКА УДАЛЕНИЯ АССЕССМЕНТА

    $$('deleteAsses').attachEvent("onItemClick", function () {
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
            if(candidate.ListOfAssessment) {
                let index = candidate.ListOfAssessment.findIndex(el => el.Id === selectITEM.Id);
                candidate.ListOfAssessment.splice(index, 1);
            }
        });
        //employee update
        ($$('employeeTable').serialize()).forEach(function (employee) {
            if(employee.ListOfAssessment) {
                let index = employee.ListOfAssessment.findIndex(el => el.Id === selectITEM.Id);
                employee.ListOfAssessment.splice(index, 1);
            }
        });
    });

//КНОПКА УДАЛЕНИЯ СОТРУДНИКОВ

    $$('deleteEmployee').attachEvent("onItemClick", function () {

        let table = $$('employeeTable');
        table.remove(table.getSelectedId());

        $$('infoFirstNameEmployee').setValue("");
        $$('infoMiddleNameEmployee').setValue("");
        $$('infoLastNameEmployee').setValue("");
        $$('infoPhoneEmployee').setValue("");
        $$('infoEmailEmployee').setValue("");

        fetch(`/employee/${selectITEM.Id}`, {
            method: 'DELETE',
        }).then(text => console.log(text));
        webix.message("Сотрудник удален");

        //assessment update
        ($$('assessmentTable').serialize()).forEach(function (assessment) {
            if(assessment.Employees) {
                let index = assessment.Employees.findIndex(el => el.Id === selectITEM.Id);
                assessment.Employees.splice(index, 1);
            }
        });
    });


//РЕДАКТИРОВАНИЕ КАНДИДАТА
    function addButtonEditCandidate() {
        $$('SaveStudent').attachEvent("onItemClick", function () {

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
        })
    }

//РЕДАКТИРОВАНИЕ СОТРУДНИКА
    function addButtonEditEmployee() {
        $$('SaveEmployee').attachEvent("onItemClick", function () {

            let item = {
                FirstNameE: $$('infoFirstNameEmployee').getValue(),
                MiddleNameE: $$('infoMiddleNameEmployee').getValue(),
                LastNameE: $$('infoLastNameEmployee').getValue(),
                PhoneE: $$('infoPhoneEmployee').getValue(),
                EmailE: $$('infoEmailEmployee').getValue(),
            };


            fetch(`/employee/${selectITEM.Id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
                .then(res => res.text())
                .then(text => console.log(text))
                .then($$('employeeTable').updateItem(selectITEM.id, item));

            webix.message("Изменения сохранены")
        })
    }

//РЕДАКТИРОВАНИЕ АССЕССМЕНТА
    function addButtonEditAsses() {
        $$('SaveAsses').attachEvent("onItemClick", function () {

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
        })
    }

//ДОБАВИТЬ КАНДИДАТА В АССЕССМЕНТ:ЗАПОЛНЕНИЕ ТАБЛИЦЫ
    $$('infoAsses').attachEvent('onItemClick', () => {
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
    });

    //ДОБАВИТЬ СОТРУДНИКА В АССЕССМЕНТ:ЗАПОЛНЕНИЕ ТАБЛИЦЫ
    $$('infoAssesE').attachEvent('onItemClick', () => {
        $$('tableAddEmployeeInAssess').clearAll();
        fetch('/assessment', {method: 'GET'})
            .then(response => response.json())
            .then(response => {
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
    });

    //ТАБЛИЦА АССЕССМЕНТОВ ЗАГРУЗКА КАНДИДАТОВ

    $$('addCandidate').attachEvent('onItemClick', () => {

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

    });

    //ТАБЛИЦА АССЕССМЕНТОВ ЗАГРУЗКА СОТРУДНИКОВ

    $$('addEmployeeInA').attachEvent('onItemClick', () => {

        $$('tableAssessAddEmployee').clearAll();
        fetch('/employee', {method: 'GET'})
            .then(response => response.json())
            .then(response => {
                    response.forEach(function (item) {
                        let x = true;
                        if (selectITEM.Employees == null) {
                            $$('tableAssessAddEmployee').add(item)
                        } else {
                            selectITEM.Employees.forEach(function (employee) {
                                if (employee.IdE === item.Id)
                                    x = false
                            });
                            if (x) {
                                $$('tableAssessAddEmployee').add(item)
                            }

                        }
                    })
                }
            )

    });

    //КНОПКА УДАЛЕНИЯ КАНДИДАТА ИЗ АССЕССМЕНТА

    $$('deleteCandidate').attachEvent('onItemClick', () => {
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
            //console.log(idx)
            let editCandidate = $$('studentTable').getItem(idx);
            let idxAssess = editCandidate.ListOfAssessment.findIndex(el => el.Id === selectITEM.Id);
            editCandidate.ListOfAssessment.splice(idxAssess, 1);
            ($$('studentTable').updateItem(editCandidate.id, editCandidate))
        });

        webix.message("Кандидаты удалены")

    });


    //КНОПКА УДАЛЕНИЯ СОТРУДНИКОВ ИЗ АССЕССМЕНТА
    $$('deleteEmployeeFromA').attachEvent("onItemClick", function (id) {
        let masDelIdE = [];
        ($$('employeeTableAsses').getSelectedItem(true)).forEach(function (item) {
            masDelIdE.push(item)
        });

        let item = {
            Id: selectITEM.Id,
            Date: $$('infoAssesDate').getValue(),
            Employees: [],
        };
        masDelIdE.forEach(function (employee, i) {
            item.Employees[i] = {
                IdE: employee.IdE
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

        $$('employeeTableAsses').remove($$('employeeTableAsses').getSelectedId());
        $$('AssessAddEmployee').hide();

        masDelIdE.forEach(function (deleted) {

            let index = selectITEM.Employees.findIndex(el => el.IdE === deleted.IdE);
            selectITEM.Employees.splice(index, 1);

            //employee update
            let idx = ($$('employeeTable').find(el => el.Id === deleted.IdE))[0].id;
            //console.log(idx)
            let editEmployee = $$('employeeTable').getItem(idx);
            let idxAssess = editEmployee.ListOfAssessment.findIndex(el => el.Id === selectITEM.Id);
            editEmployee.ListOfAssessment.splice(idxAssess, 1);
            ($$('employeeTable').updateItem(editEmployee.id, editEmployee))
        });

        webix.message("Сотрудники удалены")
    });


    //ПОИСК КАНДИДАТА

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

    //ПОИСК СОТРУДНИКА

    $$("employeeSearch").attachEvent("onEnter", function () {

        let str = this.getValue();

        fetch(`/employee/search`, {
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
                    $$('employeeTable').clearAll();
                    res.forEach(function (item) {
                        $$('employeeTable').add(item)
                    })
                } else {
                    webix.message("Сотрудники не найдены")
                }
            })
    });
    //ПОИСК АССЕССМЕНТА

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

});
