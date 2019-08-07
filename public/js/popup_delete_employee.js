webix.ui({
    view: "popup",
    id: "delete_employee",
    width: 500, height: 400,

    body: {
        view: "form",
        elements: [
            { view: "checkbox", id: "del_all_employee", labelRight: "Удалить всех", width: 500 },
            { view: "button", id: "del_employee", value: "Готово", width: 150, align: "center" }
        ]
    }
}).hide();

$$('del_employee').attachEvent('onItemClick', () => {
    if ($$('del_all_employee').getValue() == 1) {
        employeeData.length = 0;
        $$('employeeTable').clearAll();
    }
    $$('delete_employee').hide();
})

