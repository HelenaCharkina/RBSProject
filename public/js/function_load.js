function tabbarChangeCell() {
    $$('tabbar').attachEvent("onItemClick", function () {

        $$('studentTable').clearSelection();
        $$('assessmentTable').clearSelection();
        $$('employeeTable').clearSelection()
        selectITEM = null

        $$('formInfoCandidate').clear()
        $$('listOfAssessment').clearAll()

        $$('formInfoEmployee').clear()
        $$('listOfAssessmentE').clearAll()

        //candidate
        $$("SaveStudent").disable();
        $$("deleteStudent").disable();
        $$("infoAsses").disable();
        $$("deleteCandidateFromAssessment").disable();

        //employee
        $$("SaveEmployee").disable();
        $$("deleteEmployee").disable();
        $$("infoAssesE").disable();
        $$("deleteEmployeeFromAssessment").disable();

        //assessment
        $$("SaveAsses").disable();
        $$("deleteAsses").disable();

        $$("addCandidate").disable();
        $$("deleteCandidate").disable();

        $$("addEmployeeInA").disable();
        $$("deleteEmployeeFromA").disable();

        //assessmentPage

        $$('studentTableAsses').clearAll()
        $$('employeeTableAsses').clearAll()
    });
}

