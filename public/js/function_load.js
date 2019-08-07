//GetStudent получение студентов из бд
function getStudent() {

    //$$('studentTable').clearAll()
    fetch('/candidate', {method: 'GET'})
        .then(response => response.json())
        .then(items => {
            for (const item of items) {
                $$('studentTable').add(item);

            }
        })
}

//GetEmployee получение сотрудников из бд
function getEmployee() {

    fetch('/employee', {method: 'GET'})
        .then(response => response.json())
        .then(items => {
            for (const item of items) {
                $$('employeeTable').add(item);
            }
        })
}

//GetAssessment получение ассессментов из бд
function getAssessment() {

    fetch('/assessment', {method: 'GET'})
        .then(response => response.json())
        .then(items => {
            for (const item of items) {
                $$('assessmentTable').add(item);
            }
        })
}
// //getCandidateAsses не используется(перенесла в загрузку ассессментов)
// function getCandidateAsses(id){
//
//     fetch(`/assessment/${id}`, {method: 'GET'})
//         .then(response => response.json())
//         .then(response => console.log((response)))
//         .then(items => {
//             for (const item of items) {
//                 $$('assessmentTable').add(item);
//             }
//         })
// }

// //getDates ПОЛУЧЕНИЕ ВСЕХ СУЩЕСТВУЮЩИХ АССЕССМЕНТОВ
//
// function getDates(){
//     fetch('/assessment', {method: 'GET'})
//         .then(response => response.json())
//         .then(response =>
//             response.forEach(function(item){
//                 masAsses.push(item);
//             })
//         )
// }

