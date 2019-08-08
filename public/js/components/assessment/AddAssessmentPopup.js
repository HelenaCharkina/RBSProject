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

    AssessmentModel.put(asses).then(res => {
            asses.Id = res
            $$('assessmentTable').add(asses);
            webix.message("Ассессмент добавлен")
        })

    $$('date_asses').setValue("")
    $$('add_asses').hide();
})