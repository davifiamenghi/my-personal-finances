﻿import authService from '../../src/components/api-authorization/AuthorizeService';

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