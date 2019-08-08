function EmployeeInAssessmentView() {

    return {
        id: "employeeCell",
        rows: [{
            view: "datatable",
            select: "row",
            multiselect: "touch",
            id: "employeeTableAsses",
            height: 400,
            autoConfig: true,
            columns: [
                {
                    sort: "string",
                    id: "FirstNameE",
                    header: "Имя",
                    fillspace: true
                },
                {
                    sort: "string",
                    id: "MiddleNameE",
                    header: "Отчество",
                    fillspace: true
                },
                {
                    sort: "string",
                    id: "LastNameE",
                    header: "Фамилия",
                    fillspace: true
                }
            ]
        },
            {
                cols: [
                    {
                        view: "button",
                        id: "addEmployeeInA",
                        popup: "AssessAddEmployee",
                        value: "Добавить сотрудника",
                    },
                    {
                        view: "button",
                        id: "deleteEmployeeFromA",
                        value: "Удалить сотрудника",
                    }]
            }

        ]
    }
}