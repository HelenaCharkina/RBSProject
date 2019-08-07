webix.ui({
    view: "popup",
    id: "add_asses",
    width: 500, height: 400,
    body: {
        view: "form",
        elements: [
            { view: "datepicker", timepicker: true, label: "Дата", stringResult: "true", width: 500, id: "date_asses" },
            { view: "button", id: "addAssesButton", value: "Готово", width: 150, align: "center" }
        ]
    }
}).hide();

$$('addAssesButton').attachEvent('onItemClick', () => {
    let asses = {
        Date: $$('date_asses').getValue(),
    }

    fetch('/assessment', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(asses)})
        .then(res => res.json())
        .then(res => {
            asses.Id = res
            $$('assessmentTable').add(asses);
        })
    webix.message("Ассессмент добавлен")
    $$('add_asses').hide();
})