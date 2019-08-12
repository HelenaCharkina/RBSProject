webix.ui({
    view: "popup",
    id: "add_student",
    width: 500, height: 400,
    body: {
        view: "form",
        elements: [
            {
                view: "text",
                label: "Имя",
                width: 500,
                id: "FirstNamePop"
            },
            {
                view: "text",
                label: "Отчество",
                width: 500,
                id: "MiddleNamePop"
            },
            {
                view: "text",
                label: "Фамилия",
                width: 500,
                id: "LastNamePop"
            },
            {
                view: "button",
                id: "addStudentButton",
                value: "Готово",
                width: 150,
                align: "center"
            }
        ]
    }
}).hide();

// создание нового кандидата
$$('addStudentButton').attachEvent('onItemClick', () => {
    let candidate = {
        FirstName: $$('FirstNamePop').getValue(),
        MiddleName: $$('MiddleNamePop').getValue(),
        LastName: $$('LastNamePop').getValue(),
    };
    CandidateModel.create(candidate).then(data => {
            candidate.Id = data;
            $$('studentTable').add(candidate)
            webix.message("Кандидат добавлен");
        });

    $$('FirstNamePop').setValue("")
    $$('MiddleNamePop').setValue("")
    $$('LastNamePop').setValue("")
    $$('add_student').hide();
});


