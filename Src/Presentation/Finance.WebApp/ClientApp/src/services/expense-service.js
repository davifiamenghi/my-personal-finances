import authService from '../../src/components/api-authorization/AuthorizeService';

export const getAllExpenses = (month, year) => {
    return new Promise((resolve, reject) => {
        authService
            .getUser()
            .then(user => {
                authService
                    .getAccessToken()
                    .then(token => {
                        fetch(`/api/Expense/GetAll?month=${month}&year=${year}&userId=${user.sub}`, {
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

export const getExpensesByYear = (year) => {
    return new Promise((resolve, reject) => {
        authService
            .getUser()
            .then(user => {
                authService
                    .getAccessToken()
                    .then(token => {
                        fetch(`/api/Expense/GetByYear?year=${year}&userId=${user.sub}`, {
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

export const getExpense = (id) => {
    return new Promise((resolve, reject) => {
        authService
            .getAccessToken()
            .then(token => {
                fetch(`/api/Expense/Get/${id}`, {
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
                    .then((res) => {
                        if (res.status === 400) {
                            resolve(res.json())
                        }
                        resolve();
                    })
                    .catch(err => reject(err));
            })
    });
}

export const updateExpense = (payload) => {
    return new Promise((resolve, reject) => {
        authService
            .getAccessToken()
            .then(token => {
                fetch('/api/Expense/Update', {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                })
                    .then((res) => {
                        if (res.status === 400) {
                            resolve(res.json())
                        }
                        resolve();
                    })
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
                    .then((res) => {
                        if (res.status === 400) {
                            resolve(res.json())
                        }
                        resolve();
                    })
                    .catch(err => reject(err));
            })
    });
}