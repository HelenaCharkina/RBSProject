webix.ui({
    view: "popup",
    id: "add_employee",
    width: 500, height: 400,
    body: {
        view: "form",
        elements: [
            { view: "text", label: "Имя", width: 500, id: "first_name_employee" },
            { view: "text", label: "Отчество", width: 500, id: "middle_name_employee" },
            { view: "text", label: "Фамилия", width: 500, id: "last_name_employee" },

            {
                view: "button",
                id: "addEmployeeButton",
                value: "Подтвердить",
                width: 150,
                align: "center"
            }
        ]
    }
}).hide();

// создание нового сотрудника
$$('addEmployeeButton').attachEvent('onItemClick', () => {
    let employee = {
        FirstNameE: $$('first_name_employee').getValue(),
        MiddleNameE: $$('middle_name_employee').getValue(),
        LastNameE: $$('last_name_employee').getValue(),
    }

    EmployeeModel.create(employee).then(text => {
            employee.Id = text
            $$('employeeTable').add(employee)
            webix.message("Сотрудник добавлен")
            }
        )

    $$('first_name_employee').setValue("")
    $$('middle_name_employee').setValue("")
    $$('last_name_employee').setValue("")
    $$('add_employee').hide();
})


