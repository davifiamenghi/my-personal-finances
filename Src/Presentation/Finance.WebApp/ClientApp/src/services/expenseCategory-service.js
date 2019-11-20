import authService from '../components/api-authorization/AuthorizeService';

export const getExpensesByCategory = (month, year) => {
    return new Promise((resolve, reject) => {
        authService
            .getUser()
            .then(user => {
                authService
                    .getAccessToken()
                    .then(token => {
                        fetch(`/api/ExpenseCategory/GetExpensesByCategory?month=${month}&year=${year}&userId=${user.sub}`, {
                            method: 'GET',
                            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                        })
                            .then(response => response.json())
                            .then(data => resolve(data))
                            .catch(err => reject(err))
                    })
            });
        
    });
}

export const getAllExpenseCategories = () => {
    return new Promise((resolve, reject) => {
        authService
            .getUser()
            .then(user => {
                authService
                    .getAccessToken()
                    .then(token => {
                        fetch(`/api/ExpenseCategory/GetAll?userId=${user.sub}`, {
                            method: 'GET',
                            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                        })
                            .then(response => response.json())
                            .then(data => resolve(data))
                            .catch(err => reject(err))
                    })
            });

    });
}

export const createExpenseCategory = (payload) => {
    return new Promise((resolve, reject) => {
        authService
            .getAccessToken()
            .then(token => {
                fetch('/api/ExpenseCategory/Create', {
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

export const deleteExpenseCategory = (id) => {
    return new Promise((resolve, reject) => {
        authService
            .getAccessToken()
            .then(token => {
                fetch(`/api/ExpenseCategory/Delete/${id}`, {
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