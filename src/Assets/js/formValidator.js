
export const dispatchBtn = (type, content) => {
    const btns = {
        simple: <button className=''>{content}</button>,
        onLoad: <button className=''>{content}
            <i className='mdi mdi-spin mdi-loading'></i></button>,
        disable: <button className=' disabled' disabled >{content}</button>,
        disableAndLoad: <button className=' disabled' disabled >{content}
            <i className='mdi mdi-spin mdi-loading'></i>
        </button>

    }

    return btns[type]
}


export const getError = (fieldName, errors) => {
    const errorList = errors.filter(item => item.name == fieldName);
    if (errorList.length > 0) {
        return errorList.map(err => <span className="fieldError" key={err.type}>{err.error}</span>)
    }
}

export const getSuccess = (fieldName, success) => {
    const successList = success.filter(item => item.name == fieldName);
    if (successList.length > 0) {
        return successList.map(scs => <b className="fieldSuccess"
            key={scs.type}>{scs.success}</b>)
    }
}

export const isValidLenght = (errors, setErrors, charName, char, minLength, maxLength, charMsgTitle) => {
    const copyErrs = errors.slice();
    const errorMsg = 'Erreur: ' + charMsgTitle + ' doit contenir entre ' + minLength + ' et ' + maxLength + ' charactère';
    const errExist = copyErrs.filter(err => err.name == charName && err.type == 'charLength');

    if (char.length < minLength || char.length > maxLength) {
        let newError = { name: charName, error: errorMsg, type: 'charLength' }
        if (errExist.length == 0) {
            setErrors([...copyErrs, newError])
        }
    }
    else {
        for (let i = 0; i < copyErrs.length; i++) {
            if (copyErrs[i].name == charName && copyErrs[i].type == 'charLength') {
                copyErrs.splice(i, 1)
                return setErrors(copyErrs)
            }
        }

    }
}

export const isValidNumberValue = (errors, setErrors, charName, char, minValue, maxValue, charMsgTitle, unit) => {
    const copyErrs = errors.slice();
    const errorMsg = 'Erreur: ' + charMsgTitle + ' doit etre entre ' + minValue + ' et ' + maxValue + ' ' + unit;
    const errExist = copyErrs.filter(err => err.name == charName && err.type == 'charLength');

    if (char < minValue || char > maxValue) {
        let newError = { name: charName, error: errorMsg, type: 'charLength' }
        if (errExist.length == 0) {
            setErrors([...copyErrs, newError])
        }
    }
    else {
        for (let i = 0; i < copyErrs.length; i++) {
            if (copyErrs[i].name == charName && copyErrs[i].type == 'charLength') {
                copyErrs.splice(i, 1)
                return setErrors(copyErrs)
            }
        }

    }
}

export const isValidChar = (validationType, errors, setErrors, charName, char, charMsgTitle, charConfirm = null) => {
    const copyErrs = errors.slice();
    let regex = null;
    let errorMsg = null;

    if (validationType == 'isNumeric') {
        regex = /^[0-9]+$/.test(char);
        errorMsg = 'Erreur: ' + charMsgTitle + ' doit etre au format numerique';
    }
    else if (validationType == 'isAlpha') {
        regex = /^[a-zA-Z]+$/.test(char);
        errorMsg = 'Erreur: ' + charMsgTitle + ' doit etre au format alphabetique';
    }
    else if (validationType == 'isAlphaWithSpace') {
        regex = /^[a-zA-Z- ]+$/.test(char);
        errorMsg = 'Erreur: ' + charMsgTitle + ' doit etre au format alphabetique';
    }
    else if (validationType == 'isAlphaNumeric') {
        regex = /^[a-zA-Z-0-9]+$/.test(char);
        errorMsg = 'Erreur: ' + charMsgTitle + ' doit etre au format alpha-numerique';
    }
    else if (validationType == 'isMail') {
        regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(char);
        errorMsg = 'Format du mail incorrect';
    }
    else if (validationType == 'isPassword') {
        regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(char);
        errorMsg = 'Le Mot de passe doit contenir au moins ' +
            '1 majuscule,1 miniscule,1 caractère special,1 chiffre';
    }
    else if (validationType == 'isPasswordConfirm') {
        regex = char === charConfirm;
        errorMsg = 'Les mots de passe ne correspondent pas';
    } else if (validationType == 'isOneAlphaAndOneNumeric') {
        regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(char);
        errorMsg = 'Erreur: ' + charMsgTitle + ' doit contenir au moins 1 lettre et au moins 1 chiffre';
    }

    const errExist = copyErrs.filter(err => err.name == charName && err.type == validationType);
    if (regex == false) {
        let newError = { name: charName, error: errorMsg, type: validationType }
        if (errExist.length == 0) {
            setErrors([...copyErrs, newError])
        }
    }
    else {
        for (let i = 0; i < copyErrs.length; i++) {
            if (copyErrs[i].name == charName && copyErrs[i].type == validationType) {
                copyErrs.splice(i, 1)
                return setErrors(copyErrs)
            }
        }
    }
}

