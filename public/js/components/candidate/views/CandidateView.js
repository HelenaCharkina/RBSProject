function CandidateView() {
    return {
        id: "studentList",
        rows: [{
            //меню поиска
            view: 'toolbar',
            elements: [
                {
                    view: "search", placeholder: "Поиск..", width: 300, height: 50, id: "candidateSearch"

                },
                {},
                {
                    view: "button",
                    width: 100,
                    value: 'Добавить',
                    popup: "add_student"
                },
                {
                    view: "button",
                    id: "SaveStudent",
                    width: 100,
                    value: "Сохранить",
                    disabled:true
                },
                {
                    view: "button",
                    id: "deleteStudent",
                    width: 100,
                    value: "Удалить",
                    disabled:true
                }
            ]
        },
            {//списки
                cols: [
                    {
                        //autoheight:true,
                        view: "datatable",
                        select: "row",
                        id: "studentTable",
                        scroll: "y",
                        height: 500,
                        autoConfig: true,
                        columns: [

                            {
                                sort:"string",
                                id: "FirstName",
                                header: "Имя",
                                fillspace: true
                            },
                            {
                                sort:"string",
                                id: "MiddleName",
                                header: "Отчество",
                                fillspace: true
                            },
                            {
                                sort:"string",
                                id: "LastName",
                                header: "Фамилия",
                                fillspace: true
                            },
                        ]
                    },
                    {
                        view: "form",
                        id: "formInfoCandidate",
                        padding: 20,
                        elements: [
                            {
                                view: "text",
                                labelWidth: 150,
                                label: "Имя",
                                id: "infoFirstName",
                                invalidMessage: "Введите имя",
                                validate: webix.rules.isNotEmpty,
                                name: "fn",

                            },
                            {
                                view: "text",
                                labelWidth: 150,
                                label: "Отчество",
                                id: "infoMiddleName",
                                name: "mn",
                                invalidMessage: "Введите отчество",
                                validate: webix.rules.isNotEmpty,

                            },
                            {
                                view: "text",
                                label: "Фамилия",
                                labelWidth: 150,
                                id: "infoLastName",
                                invalidMessage: "Введите фамилию",
                                validate: webix.rules.isNotEmpty,
                                name:"ln",
                            },
                            {
                                view: "text",
                                label: "Телефон",
                                labelWidth: 150,
                                id: "infoPhone",
                                pattern:{ mask:"####-###-##-##", allow:/[0-9]/g },
                                name:"ph",
                                invalidMessage: "Некорректный номер",
                            },
                            {
                                view: "text",
                                labelWidth: 150,
                                label: "Почта",
                                id: "infoEmail",
                                invalidMessage: "Некорректный email",
                                name:"em",
                                //validate: webix.rules.isEmail,
                            },
                            {
                                view: "list",
                                select: "row",
                                id: "listOfAssessment",
                                template:"#Date#",
                                height: 200,
                            },
                            {},
                            {
                                cols:[
                                    {
                                        view: "button",
                                        popup: "addCandidateInAssess",
                                        value :"Добавить в ассессмент",
                                        id: "infoAsses",
                                        height: 40,
                                        disabled:true
                                    },
                                    {
                                        view: "button",
                                        value :"Удалить ассессмент",
                                        id: "deleteCandidateFromAssessment",
                                        height: 40,
                                        disabled:true
                                    }
                                    ]
                            }
                        ]

                    }
                ]
            }
        ]
    }

}