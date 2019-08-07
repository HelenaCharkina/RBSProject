function add_list_student() {
    return {

        id: "studentList",

        rows: [{
            //меню поиска
            view: 'toolbar',
            elements: [
                {
                    view: "search", placeholder: "Search..", width: 300, height: 50, id: "candidateSearch"

                },
                {},
                {
                    view: "button", width: 150, value: 'Добавить', popup: "add_student"
                },
                // {
                //     view: "button", width: 100, value: 'Удалить', popup: "delete_student"
                // }
            ]



        },
        {//списки

            cols: [
                {
                    autoheight:true,
                    view: "datatable",
                    select: "row",
                    id: "studentTable",
                    //height: 500,
                    autoConfig: true,
                    columns: [

                        {

                            //width: 130,
                            sort:"string",
                            id: "FirstName",
                            header: "Имя",
                            fillspace: true
                        },
                        {
                            //width: 130,
                            sort:"string",
                            id: "MiddleName",
                            header: "Отчество",
                            fillspace: true
                        },
                        {
                            //width: 130,
                            sort:"string",
                            id: "LastName",
                            header: "Фамилия",
                            fillspace: true
                        },
                        // {
                        //     width: 130,
                        //     id: "assessment",
                        //     header: "Дата ассессмента"
                        // },
                        // {
                        //     width: 130,
                        //     id: "status",
                        //     header: "Статус"
                        // }
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
                            id: "infoFirstName"
                        },
                        {
                            view: "text",
                            labelWidth: 150,
                            label: "Отчество",
                            id: "infoMiddleName"
                        },
                        {
                            view: "text",
                            label: "Фамилия",
                            labelWidth: 150,
                            id: "infoLastName"
                        },
                        {
                            view: "text",
                            label: "Телефон",
                            labelWidth: 150,
                            id: "infoPhone"
                        },
                        {
                            view: "text",
                            labelWidth: 150,
                            label: "Почта",
                            id: "infoEmail"
                        },
                        {
                            view: "list",
                            id: "listOfAssessment",
                            template:"#Date#",
                            height: 200
                        },

                        // {
                        //     view:"select",
                        //     options:["Принят", "Отклонен", "Приглашен"],
                        //     label: "Статус",
                        //     labelWidth: 150,
                        //     id: "infoStatus"
                        // },
                        // {
                        //     view:"checkbox",
                        //     label: "Подтверждение",
                        //     labelWidth: 150,
                        //     id: "infoProof"
                        // },
                        {},
                        {
                            cols:[
                                {
                                    view: "button",
                                    id: "deleteStudent",
                                    value: "Удалить",
                                    //width: 150,
                                },
                                {
                                    view: "button",
                                    id: "SaveStudent",
                                    value: "Сохранить",
                                    //width: 150,
                                },
                                {
                                    view: "button",
                                    popup: "addCandidateInAssess",
                                    //view:"multicombo",
                                    //suggest: masAsses,
                                    value :"Добавить в ассессмент",
                                    id: "infoAsses",
                                    height: 50
                                    // view: "text"
                                    //view: "select",
                                    //options: masAsses
                                },]
                }

                    ]
                }
            ]
        }
        ]
    }
}
