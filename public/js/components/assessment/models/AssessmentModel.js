/*Модель для сущности "assessment"*/
const AssessmentModel = {

    getAll: () => {
        return fetch('/assessment', {method: 'GET'}).then(response => response.json())
    },

    delete: (Id) => {
        return fetch(`/assessment/${Id}`, {method: 'DELETE',}).then(response => response.text());
    },

    update: (item) => {
        return fetch(`/assessment`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(item)})
               .then(res => res.json())
    },

    search: (str) => {
        return fetch(`/assessment/search`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({str: str})})
               .then(res => res.json())
    },

    create: (asses) => {
        return fetch('/assessment', {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(asses)})
               .then(res => res.json())
    },

    addInside: (Id, item) => {
        return fetch(`/assessment/${Id}`, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(item)})
               .then(res => res.text())
    }
}