webix.ui({
    view: "popup",
    id: "AssessAddEmployee",
    width: 600, height: 600,
    body: {
        rows:[{
            view: "datatable",
            scroll: "y",
            height: 300,
            multiselect:"touch",
            select:'row',
            id: "tableAssessAddEmployee",
            columns: [
                {
                    id: "FirstNameE",
                    header: "Имя",
                    fillspace: true
                },
                {
                    id: "MiddleNameE",
                    header: "Отчество",
                    fillspace: true
                },
                {
                    id: "LastNameE",
                    header: "Фамилия",
                    fillspace: true
                }
            ]
        },
            {
                view: "button",
                id: "selectEmployee",
                value: "Добавить"
            }

        ]
    }
}).hide();

//ДОБАВЛЕНИЕ СПИСКА СОТРУДНИКОВ В АССЕССМЕНТ

    $$('selectEmployee').attachEvent("onItemClick", function (id) {

        if(selectITEM) {
            let masIdEA = [];

            ($$('tableAssessAddEmployee').getSelectedItem(true)).forEach(function (item) {
                masIdEA.push(item)
            })

            let item = {
                Id: selectITEM.Id,
                Date: $$('infoAssesDate').getValue(),
                Employees: [],
            }
            masIdEA.forEach(function (employee, i) {
                item.Employees[i] = {
                    Id: employee.Id
                }
            })

            fetch(`/assessment/${selectITEM.Id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
                .then(res => res.text())
                .then(text => console.log(text))

            let newAssess = selectITEM
            if (newAssess.Employees == null) {
                newAssess.Employees = []
            }
            for (const item of masIdEA) {

                $$('employeeTableAsses').add(item)
                const employee = {
                    Id: item.Id,
                    FirstNameE: item.FirstNameE,
                    MiddleNameE: item.MiddleNameE,
                    LastNameE: item.LastNameE,
                    ListOfAssessment: item.ListOfAssessment
                }
                newAssess.Employees.push(employee);

                $$('AssessAddEmployee').hide();

                //employee update
                let idx = ($$('employeeTable').find(el => el.Id === item.Id))[0].id
                let editEmployee = $$('employeeTable').getItem(idx)
                if (!editEmployee.ListOfAssessment) {
                    editEmployee.ListOfAssessment = [];
                }
                editEmployee.ListOfAssessment.push(newAssess);
                ($$('employeeTable').updateItem(editEmployee.id, editEmployee))
            }
            ($$('assessmentTable').updateItem(selectITEM.id, newAssess))

            webix.message("Сотрудники добавлены")
        }
    })
