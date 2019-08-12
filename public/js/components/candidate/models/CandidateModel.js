/**
 * Модель для сущности "candidate"
 * @type {{getAll: (function(): Promise<any>)}}
 */
const CandidateModel = {

    getAll: () => {
        return fetch('/candidate', {method: 'GET'}).then(response => response.json())
    },

    delete: (Id) => {
        return fetch(`/candidate/${Id}`, {method: 'DELETE'}).then(response => response.text());
    },

    update: (item) => {
        return fetch(`/candidate`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(item)})
               .then(res => res.text())
    },

    search: (str) => {
        return fetch(`/candidate/search`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({str: str})})
               .then(res => res.json())
    },

    create: (candidate) => {
        return fetch('/candidate', {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(candidate)})
               .then(res => res.json())
    },

    addInAssessment: (Id, item) => {
        return fetch(`/candidate/${Id}`, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(item)})
               .then(res => res.text())
    }
};