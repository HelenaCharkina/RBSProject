/*Модель для сущности "employee"*/
const EmployeeModel = {

    getAll: () => {
        return fetch('/employee', {method: 'GET'}).then(response => response.json())
    },

    delete: (Id) => {
        return fetch(`/employee/${Id}`, {method: 'DELETE'}).then(response => response.text());
    },

    update: (item) => {
        return fetch(`/employee`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(item)})
               .then(res => res.text())
    },

    search: (str) => {
        return fetch(`/employee/search`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({str: str})})
               .then(res => res.json())
    },

    create: (employee) => {
        return fetch('/employee', {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(employee)})
               .then(res => res.json())
    },

    addInAssessment: (Id, item) => {
        return fetch(`/employee/${Id}`, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(item)})
               .then(res => res.text())
    }
}