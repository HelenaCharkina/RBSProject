function EmployeeView() {

    return {

        id: "employeeList",

        rows: [{
            //меню поиска
            view: 'toolbar',
            elements: [
                {
                    view: "search", placeholder: "Search..", width: 300, height: 50, id: "employeeSearch"
                },
                {},
                {
                    view: "button", width: 150, value: 'Добавить', popup: "add_employee"
                },
            ]
        },
            {//списки
                cols: [
                    {

                        view: "datatable",
                        select: "row",
                        id: "employeeTable",
                        height: 500,
                        autoConfig: true,
                        scrollX: false,
                        fillspace : true,
                        columns: [
                            {
                                fillspace: true,
                                sort:"string",
                                id: "FirstNameE",
                                header: "Имя"
                            },
                            {
                                fillspace: true,
                                sort:"string",
                                id: "MiddleNameE",
                                header: "Отчество"
                            },
                            {
                                fillspace: true,
                                sort:"string",
                                id: "LastNameE",
                                header: "Фамилия"
                            }

                        ]
                    },
                    {
                        padding: 20,
                        rows: [
                            {
                                view: "text",
                                labelWidth: 150,
                                label: "Имя",
                                id: "infoFirstNameEmployee"
                            },
                            {
                                view: "text",
                                labelWidth: 150,
                                label: "Отчество",
                                id: "infoMiddleNameEmployee"
                            },
                            {
                                view: "text",
                                label: "Фамилия",
                                labelWidth: 150,
                                id: "infoLastNameEmployee"
                            },

                            {
                                view: "text",
                                label: "Телефон",
                                labelWidth: 150,
                                id: "infoPhoneEmployee"
                            },
                            {
                                view: "text",
                                labelWidth: 150,
                                label: "Почта",
                                id: "infoEmailEmployee"
                            },
                            {
                                view: "list",
                                id: "listOfAssessmentE",
                                template:"#Date#",
                                height: 200
                            },
                            {},
                            {
                                cols:[
                                    {
                                        view: "button",
                                        id: "deleteEmployee",
                                        value: "Удалить",
                                    },
                                    {
                                        view: "button",
                                        id: "SaveEmployee",
                                        value: "Сохранить",
                                    },
                                    {
                                        view: "button",
                                        popup: "addEmployeeInAssess",
                                        value :"Добавить в ассессмент",
                                        id: "infoAssesE",
                                        height: 50
                                    }]
                            }

                        ]
                    }
                ]
            }
        ]
    }
}