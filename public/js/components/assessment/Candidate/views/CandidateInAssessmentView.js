function CandidateInAssessmentView() {

    return {
        id: "studentCell",
        rows: [{
            view: "datatable",
            select: "row",
            id: "studentTableAsses",
            height: 400,
            editable: true,
            multiselect: "touch",
            autoConfig: true,
            columns: [
                {
                    sort: "string",
                    id: "FirstName",
                    header: "Имя",
                    fillspace: true
                },
                {
                    sort: "string",
                    id: "MiddleName",
                    header: "Отчество",
                    fillspace: true
                },
                {
                    sort: "string",
                    id: "LastName",
                    header: "Фамилия",
                    fillspace: true
                },
                {
                    editor: "select",
                    options: ["Подтвержден", "Не подтвержден"],
                    fillspace: true,
                    header: ["Подтверждение", {
                        content: "selectFilter",
                        onBeforeShow: ""
                    }],
                    id: "infoProofA"
                },
                {
                    editor: "select",
                    options: ["Принят", "Отклонен", "Приглашен"],
                    fillspace: true,
                    header: ["Статус", {content: "selectFilter"}],
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
                    }]
            }
        ]
    }
}