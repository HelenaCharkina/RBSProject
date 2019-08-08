webix.ready(function () {
    -webix.ui({
            rows: [
                {//шапка
                    view: "label",  align: 'center', height: 50, id: "currentUserLabel", css: "webix_icon wxi-user"
                },
                {
                    borderless: true, view: "tabbar", id: "tabbar", multiview: true, options: [
                        {value: 'Список кандидатов', id: 'studentList'},
                        {value: 'Список ассессментов', id: 'assessmentList'},
                        {value: 'Список сотрудников', id: 'employeeList'},
                    ]
                },
                {
                    cells: [
                        CandidatePage.config(),
                        AssessmentPage.config(),
                        EmployeePage.config()
                    ]
                }
            ]
        }
    );

    CandidatePage.init();
    AssessmentPage.init();
    EmployeePage.init();

    tabbarChangeCell();
   


});
