import authService from '../../src/components/api-authorization/AuthorizeService';

export const getAllExpenses = (month, year) => {
    return new Promise((resolve, reject) => {
        authService
            .getAccessToken()
            .then(token => {
                fetch(`/api/Expense/GetAll?month=${month}&year=${year}`, {
                    method: 'GET',
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err))
            })
    });
}

export const createExpense = (payload) => {
    return new Promise((resolve, reject) => {
        authService
            .getAccessToken()
            .then(token => {
                fetch('/api/Expense/Create', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                })
                    .then(() => resolve())
                    .catch(err => reject(err));
            })
    });
}

export const deleteExpense = (id) => {
    return new Promise((resolve, reject) => {
        authService
            .getAccessToken()
            .then(token => {
                fetch(`/api/Expense/Delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(() => resolve())
                    .catch(err => reject(err));
            })
    });
}