import { toast } from 'react-toastify';
import { css } from 'glamor';
import 'react-toastify/dist/ReactToastify.css';

export const collectCashflowErrors = (err) => {
    let errors = [];

    if (err.CategoryId) {
        errors = [...errors, err.CategoryId.toString()]
    }

    if (err.Date) {
        errors = [...errors, err.Date.toString()]
    }

    if (err.Merchant) {
        errors = [...errors, err.Merchant.toString()]
    }

    if (err.Total) {
        errors = [...errors, err.Total.toString()]
    }

    if (err.Note) {
        errors = [...errors, err.note.toString()]
    }

    errors.forEach(error => notify(error));
}

export const collectCashflowFilterErrors = (err) => {
    let errors = [];

    if (err.Month) {
        errors = [...errors, err.Month.toString()]
    }

    if (err.Year) {
        errors = [...errors, err.Year.toString()]
    }   

    errors.forEach(error => notify(error));
}

export const collectCategoriesErrors = (err) => {
    let errors = [];

    if (err.TypeId) {
        errors = [...errors, err.TypeId.toString()]
    }

    if (err.Name) {
        errors = [...errors, err.Name.toString()]
    }

    errors.forEach(error => notify(error));
}

export const notify = (message) => {
    toast(message, {
        className: css({
            background: '#343A40'
        }),
        bodyClassName: css({
            color: 'black',
            fontFamily: 'Open Sans',
            fontSize: '16px'
        }),
        progressClassName: css({
            background: "#C70935"
        })
    });
}