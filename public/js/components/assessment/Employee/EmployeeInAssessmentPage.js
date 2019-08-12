const EmployeeInAssessmentPage = {
    config: () => {

        return EmployeeInAssessmentView()
    },

    init: () => {

        $$('employeeTableAsses').attachEvent('onItemClick', () => {
            if($$('employeeTableAsses').getSelectedItem()) {
                $$('deleteEmployeeFromA').enable();
            }else{
                $$('deleteEmployeeFromA').disable();
            }
        })

        //ТАБЛИЦА АССЕССМЕНТОВ ЗАГРУЗКА СОТРУДНИКОВ
        $$('addEmployeeInA').attachEvent('onItemClick', () => {

            if (selectITEM) {
                $$('tableAssessAddEmployee').clearAll();
                EmployeeModel.getAll().then(response => {
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

                AssessmentModel.addInside(selectITEM.Id, item)

                $$('employeeTableAsses').remove($$('employeeTableAsses').getSelectedId());
                $$('AssessAddEmployee').hide();

                masDelIdE.forEach(function (deleted) {

                    let index = selectITEM.Employees.findIndex(el => el.Id === deleted.Id);
                    selectITEM.Employees.splice(index, 1);

                    //employee update
                    let idx = ($$('employeeTable').find(el => el.Id === deleted.Id))[0].id;
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
