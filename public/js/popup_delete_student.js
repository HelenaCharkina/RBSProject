webix.ui({
    view: "popup",
    id: "delete_student",
    width: 500, height: 400,

    body: {
        view: "form",
        elements: [
            { view: "checkbox", id: "del_all", labelRight: "Удалить всех", width: 500 },
            { view: "checkbox", id: "del_decline", labelRight: "Удалить, если отклонен" },
            { view: "checkbox", id: "del_accept", labelRight: "Удалить, если принят" },
            { view: "button", id: "del_student", value: "Готово", width: 150, align: "center" }
        ]
    }
}).hide();

$$('del_student').attachEvent('onItemClick', () => {
    if ($$('del_all').getValue() == 1) {
        studentData.length = 0;
        $$('studentTable').clearAll();
    }
    if ($$('del_decline').getValue() == 1) {
        for (const i of studentData) {
            if (i.status == "Отклонен") {
                $$('studentTable').remove(i.id);
            }
        }
    }
    if ($$('del_accept').getValue() == 1) {
        for (const i of studentData) {
            if (i.status == "Принят") {
                $$('studentTable').remove(i.id);
            }
        }
    }
    $$('delete_student').hide();
    console.log(studentData);
})

