function tabbarChangeCell() {
    $$('tabbar').attachEvent("onItemClick", function () {

        $$('studentTable').clearSelection();
        $$('assessmentTable').clearSelection();
        $$('employeeTable').clearSelection()
        selectITEM = null
    });
}

//GetStudent получение кандидатов из бд
function getCandidate() {

    fetch('/candidate', {method: 'GET'})
        .then(response => response.json())
        .then(items => {
            if(items){
                for (const item of items) {
                    $$('studentTable').add(item);
                }
            }
        })
}

//GetEmployee получение сотрудников из бд
function getEmployee() {

    fetch('/employee', {method: 'GET'})
        .then(response => response.json())
        .then(items => {
            if(items) {
                for (const item of items) {
                    $$('employeeTable').add(item);
                }
            }
        })
}

//GetAssessment получение ассессментов из бд
function getAssessment() {

    fetch('/assessment', {method: 'GET'})
        .then(response => response.json())
        .then(items => {
            if(items){
                for (const item of items) {
                    $$('assessmentTable').add(item);
                }
            }
        })
}

