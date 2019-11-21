import authService from '../../src/components/api-authorization/AuthorizeService';

export const getAllIncomes = (month, year) => {
    return new Promise((resolve, reject) => {
        authService
            .getUser()
            .then(user => {
                authService
                    .getAccessToken()
                    .then(token => {
                        fetch(`/api/Income/GetAll?month=${month}&year=${year}&userId=${user.sub}`, {
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

export const getIncome = (id) => {
    return new Promise((resolve, reject) => {
        authService
            .getAccessToken()
            .then(token => {
                fetch(`/api/Income/Get/${id}`, {
                    method: 'GET',
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                })
                    .then(response => response.json())
                    .then(data => resolve(data))
                    .catch(err => reject(err))
            })
    });
}

export const getIncomesByYear = (year) => {
    return new Promise((resolve, reject) => {
        authService
            .getUser()
            .then(user => {
                authService
                    .getAccessToken()
                    .then(token => {
                        fetch(`/api/Income/GetByYear?year=${year}&userId=${user.sub}`, {
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


export const createIncome = (payload) => {
    return new Promise((resolve, reject) => {
        authService
            .getAccessToken()
            .then(token => {
                fetch('/api/Income/Create', {
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

export const updateIncome = (payload) => {
    return new Promise((resolve, reject) => {
        authService
            .getAccessToken()
            .then(token => {
                fetch('/api/Income/Update', {
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

export const deleteIncome = (id) => {
    return new Promise((resolve, reject) => {
        authService
            .getAccessToken()
            .then(token => {
                fetch(`/api/Income/Delete/${id}`, {
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