webix.ready(function () {
    -webix.ui({
            rows: [
                {//шапка
                    view: "label", label: "login", width: 300, align: 'center', height: 50
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
    getCandidate();
    getAssessment();
    getEmployee();

    // searchCandidate();
    // openInfoCandidate();
    // deleteCandidate();
    // editCandidate();
    // addCandidateInAssessmentLoadTable();

    // searchEmployee();
    // openInfoEmployee();
    // deleteEmployee();
    // editEmployee();
    // addEmployeeInAssessmentLoadTable();

    // searchAssessment();
    // openInfoAssessment();
    // deleteAssessment();
    // editAssessment();
    // assessmentTableLoadCandidate();
    // assessmentTableDeleteCandidate();
    // assessmentTableLoadEmployee();
    // assessmentTableDeleteEmployee();

});
