webix.ui({
    view: "popup",
    id: "addEmployeeInAssess",
    width: 300, height: 500,
    body: {
        rows:[{
            view: "datatable",
            scroll: "y",
            select: "row",
            multiselect:"touch",
            height: 300,
            id: "tableAddEmployeeInAssess",
            columns: [
                {
                    id: "Date",
                    header: "Дата",
                    fillspace: true
                }
            ]
        },
            {
                view: "button",
                id: "buttonAddEmployeeInAssess",
                value:"Добавить в ассессмент"
            }
        ]
    }
}).hide();



$$('buttonAddEmployeeInAssess').attachEvent("onItemClick", function (id) {

    if (selectITEM) {
        let masIdE = [];
        ($$('tableAddEmployeeInAssess').getSelectedItem(true)).forEach(function (item) {
            masIdE.push(item)
        })

        let item = {
            Id: selectITEM.Id,
            ListOfAssessment: [],
        }
        masIdE.forEach(function (a, i) {
            item.ListOfAssessment[i] = {
                Id: a.Id
            }
        })

        EmployeeModel.putInAssessment(selectITEM.Id, item)

        let newEmployee = selectITEM
        if (newEmployee.ListOfAssessment == null) {
            newEmployee.ListOfAssessment = []
        }
        for (const item of masIdE) {
            $$('listOfAssessmentE').add(item)
            newEmployee.ListOfAssessment.push(item)

            //update assessment
            let idx = ($$('assessmentTable').find(el => el.Id === item.Id))[0].id
            let editAssessment = $$('assessmentTable').getItem(idx)
            if (!editAssessment.Employees) {
                editAssessment.Employees = [];
            }
            editAssessment.Employees.push(newEmployee);
            ($$('assessmentTable').updateItem(editAssessment.id, editAssessment))
        }
        ($$('employeeTable').updateItem(selectITEM.id, newEmployee))
        $$('addEmployeeInAssess').hide();
        webix.message("Сотрудники добавлены")
    }
})