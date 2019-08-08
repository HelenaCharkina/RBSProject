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
                    width: 150,
                    value: 'Добавить',
                    popup: "add_student"
                },
                {
                    view: "button",
                    id: "SaveStudent",
                    value: "Сохранить",
                },
                {
                    view: "button",
                    id: "deleteStudent",
                    value: "Удалить",
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
                        padding: 20,
                        rows: [
                            {
                                view: "text",
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
                                id: "infoPhone",
                                pattern:{ mask:"(###) ###-####", allow:/[0-9]/g }
                            },
                            {
                                view: "text",
                                labelWidth: 150,
                                label: "Почта",
                                id: "infoEmail",
                            },
                            {
                                view: "list",
                                select: "row",
                                id: "listOfAssessment",
                                template:"#Date#",
                                height: 200
                            },
                            {},
                            {
                                cols:[
                                    {
                                        view: "button",
                                        popup: "addCandidateInAssess",
                                        value :"Добавить в ассессмент",
                                        id: "infoAsses",
                                        height: 40
                                    },
                                    {
                                        view: "button",
                                        value :"Удалить ассессмент",
                                        id: "deleteCandidateFromAssessment",
                                        height: 40
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