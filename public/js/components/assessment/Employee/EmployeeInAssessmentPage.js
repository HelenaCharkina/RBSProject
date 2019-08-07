const EmployeeInAssessmentPage = {
    config: () => {
        return {
            id: "employeeCell",
            rows: [{
                view: "datatable",
                select: "row",
                multiselect: "touch",
                id: "employeeTableAsses",
                height: 400,
                autoConfig: true,
                columns: [
                    {
                        sort: "string",
                        id: "FirstNameE",
                        header: "Имя",
                        fillspace: true
                    },
                    {
                        sort: "string",
                        id: "MiddleNameE",
                        header: "Отчество",
                        fillspace: true
                    },
                    {
                        sort: "string",
                        id: "LastNameE",
                        header: "Фамилия",
                        fillspace: true
                    }
                ]
            },
                {
                    cols: [
                        {
                            view: "button",
                            id: "addEmployeeInA",
                            popup: "AssessAddEmployee",
                            value: "Добавить сотрудника",
                        },
                        {
                            view: "button",
                            id: "deleteEmployeeFromA",
                            value: "Удалить сотрудника",
                        }]
                }

            ]
        }
    },

    init: () => {

        //ТАБЛИЦА АССЕССМЕНТОВ ЗАГРУЗКА СОТРУДНИКОВ
        $$('addEmployeeInA').attachEvent('onItemClick', () => {

            if (selectITEM) {
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
            }
        });

        //УДАЛЕНИЕ СОТРУДНИКОВ ИЗ АССЕССМЕНТА
        $$('deleteEmployeeFromA').attachEvent("onItemClick", function (id) {
            if (selectITEM) {
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
                        Id: employee.Id
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

                    let index = selectITEM.Employees.findIndex(el => el.Id === deleted.Id);
                    selectITEM.Employees.splice(index, 1);


                    console.log(deleted.Id);
                    console.log($$('employeeTable').serialize());
                    //employee update
                    let idx = ($$('employeeTable').find(el => el.Id === deleted.Id))[0].id;

                    //console.log(idx)
                    let editEmployee = $$('employeeTable').getItem(idx);
                    let idxAssess = editEmployee.ListOfAssessment.findIndex(el => el.Id === selectITEM.Id);
                    editEmployee.ListOfAssessment.splice(idxAssess, 1);
                    ($$('employeeTable').updateItem(editEmployee.id, editEmployee))
                });

                webix.message("Сотрудники удалены")
            }
        });
    }
};
