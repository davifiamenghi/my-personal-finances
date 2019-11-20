import authService from '../components/api-authorization/AuthorizeService';

export const getIncomesByCategory = (month, year) => {
    return new Promise((resolve, reject) => {
        authService
            .getUser()
            .then(user => {
                authService
                    .getAccessToken()
                    .then(token => {
                        fetch(`/api/IncomeCategory/GetIncomesByCategory?month=${month}&year=${year}&userId=${user.sub}`, {
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

export const getAllIncomeCategories = () => {
    return new Promise((resolve, reject) => {
        authService
            .getUser()
            .then(user => {
                authService
                    .getAccessToken()
                    .then(token => {
                        fetch(`/api/IncomeCategory/GetAll?userId=${user.sub}`, {
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

export const createIncomeCategory = (payload) => {
    return new Promise((resolve, reject) => {
        authService
            .getAccessToken()
            .then(token => {
                fetch('/api/IncomeCategory/Create', {
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

export const deleteIncomeCategory = (id) => {
    return new Promise((resolve, reject) => {
        authService
            .getAccessToken()
            .then(token => {
                fetch(`/api/IncomeCategory/Delete/${id}`, {
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