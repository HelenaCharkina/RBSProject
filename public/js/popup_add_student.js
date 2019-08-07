webix.ui({
    view: "popup",
    id: "add_student",
    width: 500, height: 400,
    body: {
        view: "form",
        method: "post",
        elements: [
            {view: "text", label: "Имя", width: 500, id: "FirstNamePop"},
            {view: "text", label: "Отчество", width: 500, id: "MiddleNamePop"},
            {view: "text", label: "Фамилия", width: 500, id: "LastNamePop"},
            // {
            //     view: "multicombo",
            //     button: true,
            //
            //     label: "Ассессмент",
            //     id: "asses",
            //     keepText: true,
            //     suggest: {
            //         body: {
            //             data: masAsses,
            //             template: webix.template("#assessment#")
            //         }
            //     }
            // },
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

$$('addStudentButton').attachEvent('onItemClick', () => {
    let candidate = {
        FirstName: $$('FirstNamePop').getValue(),
        MiddleName: $$('MiddleNamePop').getValue(),
        LastName: $$('LastNamePop').getValue(),
    };
    fetch('/candidate', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(candidate)
    })
        .then(res => res.json())
        .then(data => {
            candidate.Id = data;
            $$('studentTable').add(candidate)
        });
    webix.message("Кандидат добавлен");
    $$('add_student').hide();
});


