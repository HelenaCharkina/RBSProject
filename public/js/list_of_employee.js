function add_list_employee() {
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
                // {
                //     view: "button", width: 100, value: 'Удалить', popup: "delete_employee"
                // }
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
                            //width: 130,
                            sort:"string",
                            id: "FirstNameE",
                            header: "Имя"
                        },
                        {
                            fillspace: true,
                            //width: 130,
                            sort:"string",
                            id: "MiddleNameE",
                            header: "Отчество"
                        },
                        {
                            fillspace: true,
                            //width: 130,
                            sort:"string",
                            id: "LastNameE",
                            header: "Фамилия"
                        }

                    ]
                },
                {
                    padding: 20,
                    rows: [
                        // {
                        //     height: 44.44,
                        //     view: "label",
                        //     label: "Информация",
                        //     align: "center",
                        // },
                        {
                            view: "text",

                            //width: 800,
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
                        // {
                        //     view:"multicombo",
                        //     suggest: masAsses,
                        //     label: "Дата ассессмента",
                        //     labelWidth: 150,
                        //     id: "infoAssesEmployee"
                        // },
                        {},

                        {
                            cols:[
                                {
                                    view: "button",
                                    id: "deleteEmployee",
                                    value: "Удалить",
                                    //width: 150,
                                },
                                {
                                    view: "button",
                                    id: "SaveEmployee",
                                    value: "Сохранить",
                                    //width: 150,
                                },
                                {
                                    view: "button",
                                    popup: "addEmployeeInAssess",
                                    //view:"multicombo",
                                    //suggest: masAsses,
                                    value :"Добавить в ассессмент",
                                    id: "infoAssesE",
                                    height: 50
                                    // view: "text"
                                    //view: "select",
                                    //options: masAsses
                                }]
                        }

                    ]
                }
            ]
        }
        ]
    }
}
