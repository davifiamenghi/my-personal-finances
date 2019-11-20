import authService from '../components/api-authorization/AuthorizeService';

export const getAllCashflowTypes = () => {
    return new Promise((resolve, reject) => {
        authService
            .getAccessToken()
            .then(token => {
                fetch(`/api/CashflowType/GetAll`, {
                    method: 'GET',
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                })
                    .then(response => response.json())
                    .then(data => resolve(data))
                    .catch(err => reject(err))
            })
    });

}

