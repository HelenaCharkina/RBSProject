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
                value: "Готово",
                width: 150,
                align: "center"
            }
        ]
    }
}).hide();

$$('addEmployeeButton').attachEvent('onItemClick', () => {
    let employee = {
        FirstNameE: $$('first_name_employee').getValue(),
        MiddleNameE: $$('middle_name_employee').getValue(),
        LastNameE: $$('last_name_employee').getValue(),
    }

    fetch('/employee', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)})
        .then(res => res.json())
        .then(text => {
            employee.Id = text
            $$('employeeTable').add(employee)
            }
        )
    webix.message("Сотрудник добавлен")
    $$('add_employee').hide();
})


