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

    let masIdE = [];
    ($$('tableAddEmployeeInAssess').getSelectedItem(true)).forEach(function (item) {
        masIdE.push(item)
    })

    let item = {
        Id: selectITEM.Id,
        ListOfAssessment: [],
    }
    masIdE.forEach(function (a, i) {
        item.ListOfAssessment[i] ={
            Id : a.Id
        }
    })

    fetch(`/employee/${selectITEM.Id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(res => res.text())
        .then(text => console.log(text))

    let newEmployee = selectITEM
    if(newEmployee.ListOfAssessment == null) {
        newEmployee.ListOfAssessment = []
    }
    for (const item of masIdE) {
        $$('listOfAssessmentE').add(item)
        newEmployee.ListOfAssessment.push(item)

        //assessment
        // let editAssess = $$('assessmentTable').getItem(item.Id)
        // if(editAssess.Candidates == null) {
        //     editAssess.Candidates = []
        // }
        //     const employee = {
        //         Id: selectITEM.Id,
        //         FirstNameE: selectITEM.FirstNameE,
        //         MiddleNameE: selectITEM.MiddleNameE,
        //         LastNameE: selectITEM.LastNameE,
        //     }
        //     editAssess.Employees.push(employee)
        // $$('assessmentTable').updateItem(item.Id, editAssess)
        ///////////
    }
    ($$('employeeTable').updateItem(selectITEM.id, newEmployee))
    $$('addEmployeeInAssess').hide();
    webix.message("Сотрудники добавлены")
})