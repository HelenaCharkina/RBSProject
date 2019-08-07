webix.ui({
    view: "popup",
    id: "delete_asses",
    width: 500, height: 400,
    body: {
        view: "form",
        elements: [
            { view: "checkbox", id: "del_all_asses", labelRight: "Удалить все", width: 500 },
            { view: "checkbox", id: "del_close", labelRight: "Удалить завершенные" },
            { view: "checkbox", id: "del_old", labelRight: "Удалить старые" },
            { view: "button", id: "del_asses", value: "Готово", width: 150, align: "center" }
        ]
    }
}).hide();

$$('del_asses').attachEvent('onItemClick', () => {
    if ($$('del_all_asses').getValue() === 1) {
        assessmentData.length = 0;
        $$('assessmentTable').clearAll();
    }

    console.log(assessmentData);
    $$('delete_asses').hide();
})