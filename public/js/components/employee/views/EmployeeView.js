function EmployeeView() {

    return {

        id: "employeeList",

        rows: [{
            //меню поиска
            view: 'toolbar',
            elements: [
                {
                    view: "search", placeholder: "Поиск..", width: 300, height: 50, id: "employeeSearch"
                },
                {},
                {
                    view: "button",
                    width: 100,
                    value: 'Добавить',
                    popup: "add_employee"
                },
                {
                    view: "button",
                    width: 100,
                    id: "SaveEmployee",
                    value: "Сохранить",
                },
                {
                    view: "button",
                    width: 100,
                    id: "deleteEmployee",
                    value: "Удалить",
                }
            ]
        },
            {//списки
                cols: [
                    {
                        height: 500,
                        view: "datatable",
                        select: "row",
                        id: "employeeTable",
                        //autoheight:true,
                        autoConfig: true,
                        scrollX: false,
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
                        view:"form",
                        id: "formInfoEmployee",
                        padding: 20,
                        rows: [
                            {
                                view: "text",
                                labelWidth: 150,
                                label: "Имя",
                                id: "infoFirstNameEmployee",
                                invalidMessage: "Введите имя",
                                validate: webix.rules.isNotEmpty,
                                name: "fn",
                            },
                            {
                                view: "text",
                                labelWidth: 150,
                                label: "Отчество",
                                id: "infoMiddleNameEmployee",
                                name: "mn",
                                invalidMessage: "Введите отчество",
                                validate: webix.rules.isNotEmpty,
                            },
                            {
                                view: "text",
                                label: "Фамилия",
                                labelWidth: 150,
                                id: "infoLastNameEmployee",
                                invalidMessage: "Введите фамилию",
                                validate: webix.rules.isNotEmpty,
                                name:"ln",
                            },

                            {
                                view: "text",
                                label: "Телефон",
                                labelWidth: 150,
                                id: "infoPhoneEmployee",
                                pattern:{ mask:"####-###-##-##", allow:/[0-9]/g },
                                name:"ph",
                                invalidMessage: "Некорректный номер",
                            },
                            {
                                view: "text",
                                labelWidth: 150,
                                label: "Почта",
                                id: "infoEmailEmployee",
                                name:"em",
                                invalidMessage: "Некорректный email",
                                validate: webix.rules.isEmail,
                            },
                            {
                                view: "list",
                                select: "row",
                                id: "listOfAssessmentE",
                                template:"#Date#",
                                height: 200
                            },
                            {},
                            {
                                cols:[
                                    {
                                        view: "button",
                                        popup: "addEmployeeInAssess",
                                        value :"Добавить в ассессмент",
                                        id: "infoAssesE",
                                        height: 40
                                    },
                                    {
                                        view: "button",
                                        value :"Удалить ассессмент",
                                        id: "deleteEmployeeFromAssessment",
                                        height: 40
                                    }]
                            }

                        ]
                    }
                ]
            }
        ]
    }
}