function add_list_assessment() {
    return {
        id: "assessmentList",
        rows: [
            {
                view: 'toolbar',
                elements: [
                    {
                        view: "datepicker",
                        placeholder: "Search..",
                        width: 300,
                        height: 50,
                        id:"assessmentSearch",
                       // timepicker: true,
                        format:webix.Date.dateToStr("%y-%m-%d"),
                        stringResult: true,
                    }, {},
                    {
                        view: "button",
                        width: 150,
                        value: 'Создать',
                        popup: "add_asses",
                        height: 50
                    },
                    {
                        view: "button",
                        id: "deleteAsses",
                        value: "Удалить",
                        //width: 150,
                    },
                    {
                        view: "button",
                        id: "SaveAsses",
                        value: "Сохранить",
                        //width: 150,
                    }
                ]

            },

            {
                cols: [
                    {

                            view: "datatable",
                            select: "row",
                            height: 500,
                            width: 300,
                            id: "assessmentTable",
                            autoConfig: true,
                            scroll: "y",
                            columns: [
                                {
                                    //sort:"Date",
                                    sort:"string",
                                    //width: 300,
                                    id: "Date",
                                    header: "Дата ассессмента",
                                    fillspace: true
                                }]


                    },
                    {
                        padding: 20,
                        rows: [
                            {
                                //width: 800,
                                view: "datepicker",
                                timepicker: true,
                                stringResult: true,
                                labelWidth: 150,
                                label: "Дата",
                                scrollX: false,
                                fillspace: true,
                                id: "infoAssesDate"
                            },
                            {
                                borderless: true, view: "tabbar", id: "tabbarAssessment", multiview: true, options: [
                                    {value: 'Кандидаты', id: 'studentCell'},
                                    {value: 'Сотрудники', id: 'employeeCell'}
                                ]
                            },
                            {
                                cells: [
                                    {id:"employeeCell",
                                        rows: [{
                                            view: "datatable",
                                            select: "row",
                                            multiselect: "touch",
                                            id: "employeeTableAsses",
                                            height: 400,
                                            autoConfig: true,
                                            columns: [
                                                {

                                                    //width: 130,
                                                    sort: "string",
                                                    id: "FirstNameE",
                                                    header: "Имя",
                                                    fillspace: true
                                                },
                                                {
                                                    //width: 130,
                                                    sort: "string",
                                                    id: "MiddleNameE",
                                                    header: "Отчество",
                                                    fillspace: true
                                                },
                                                {
                                                    //width: 130,
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
                                                        //width: 150,
                                                    },
                                                    {
                                                        view: "button",
                                                        id: "deleteEmployeeFromA",
                                                        value: "Удалить сотрудника",
                                                        //width: 150,
                                                    }]
                                            }

                                        ]
                                    },
                                    {
                                        id:"studentCell",
                                        rows: [{
                                            view: "datatable",
                                            select: "row",
                                            id: "studentTableAsses",
                                            height: 400,
                                            editable: true,
                                            multiselect:"touch",
                                            autoConfig: true,
                                            columns: [
                                                {

                                                    //width: 130,
                                                    sort: "string",
                                                    id: "FirstName",
                                                    header: "Имя",
                                                    fillspace: true
                                                },
                                                {
                                                    //width: 130,
                                                    sort: "string",
                                                    id: "MiddleName",
                                                    header: "Отчество",
                                                    fillspace: true
                                                },
                                                {
                                                    //width: 130,
                                                    sort: "string",
                                                    id: "LastName",
                                                    header: "Фамилия",
                                                    fillspace: true
                                                },
                                                {
                                                    editor:"select",
                                                    options:["Подтвержден", "Не подтвержден"],
                                                    fillspace: true,
                                                    header:["Подтверждение", {content:"selectFilter", onBeforeShow:"" }],
                                                    id: "infoProofA"
                                                },
                                                {
                                                    editor:"select",
                                                    options:["Принят", "Отклонен", "Приглашен"],
                                                    fillspace: true,
                                                    header:["Статус", {content:"selectFilter"}],
                                                    id: "infoStatusA"
                                                },

                                            ]
                                        },
                                            {
                                                cols: [
                                                    {
                                                        view: "button",
                                                        id: "addCandidate",
                                                        value: "Добавить кандидата",
                                                        popup: "AssessAddCandidate"
                                                        //width: 150,
                                                    },
                                                    {
                                                        view: "button",
                                                        id: "deleteCandidate",
                                                        value: "Удалить кандидата",
                                                        //width: 150,
                                                    }]
                                            }
]
                                    },
                                ]
                            },

                        ]
                    }
                ]
            }
        ]
    }

}