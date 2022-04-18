import { removeLastChar } from "./char";

export const normalizeCardNumber = (value) => {
    return (
        value
            .replace(/\D/g, "")
            .match(/.{1,4}/g)
            ?.join(" ")
            .substr(0, 19) || ""
    );
};

export function normalizeName(value) {
    if (/^[A-Za-zÀ-ÖØ-öø-ÿ- ]+$/.test(value)) {
        return value
    } else {
        return removeLastChar(value)
    }
}

export function normalizePseudo(value) {
    if (/^[A-Za-zÀ-ÖØ-öø-ÿ-0-9- ]+$/.test(value)) {
        return value
    } else {
        return removeLastChar(value)
    }
}

export function normalizeSimpleNumber(value, maxLength) {
    if (/^[0-9]+$/.test(value) && value.length <= maxLength) {
        return value
    } else {
        return removeLastChar(value)
    }
}