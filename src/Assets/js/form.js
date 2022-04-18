import { isValidLenght, isValidChar, isValidNumberValue } from "./formValidator";
import { normalizePseudo, normalizeSimpleNumber } from "./normaliser";


export const handleFieldChangeAndSearch = (event,
    userInfo, setUserInfo,
    errors, setErrors,
    searchObjKey,
    arraySearch, setArrayResult) => {
    const name = event.target.name;
    const value = event.target.value;
    const suggestionBox = event.currentTarget.nextElementSibling;

    document.querySelectorAll('.fs-suggestionList').forEach(element => {
        if (element != suggestionBox) {
            element.style.display = 'none'
            suggestionBox.style.display = 'flex'
        } else {
            element.style.display = 'flex'
        }
    });


    const copyArray = arraySearch;
    const filter = copyArray.filter(item => item[searchObjKey].toLowerCase().includes(value.toLowerCase()))

    setArrayResult(filter)
    setUserInfo({ ...userInfo, [name]: value })
}

export const handleFieldChange = (event, userInfo, setUserInfo, errors, setErrors) => {
    const name = event.target.name;
    let value = event.target.value;
    let normalized = value
    const errMsgName = event.target.attributes['errmsgname'].value;

    if (name == 'pseudo') {
        normalized = normalizePseudo(value)
    }
    if (name === 'mail') {
        isValidChar('isMail', errors, setErrors, name, value, 'Votre ' + errMsgName + ' ')
    }
    if (name == 'age') {
        normalized = normalizeSimpleNumber(value, 70)
    }
    if (['logo_entreprise', 'profil', 'image'].includes(name)) {
        let file = event.target.files[0];
        if (file) {
            let imgUrl = URL.createObjectURL(file)
            setTimeout(() => {
                document.getElementById(name + '-preview').src = imgUrl
            }, 500)

            value = file
        }

    }

    if (name === 'password') {
        isValidChar('isPassword', errors, setErrors, 'password', value, "le mot de passe")
    }
    if (name === 'password_confirm') {
        isValidChar('isPasswordConfirm', errors, setErrors, 'password_confirm',
            value, "les mots de passe", userInfo.password)
    }


    value = normalized;
    setUserInfo({ ...userInfo, [name]: value })
}



export const dispatchInputSelectTextareaOrImg = (formValueObj, setFormValueObj,
    field, handleChange,
    errors, setErrors,
    arraySearch = null, arrayResult = null, setArrayResult = null) => {
    const removeImg = (name) => {
        setFormValueObj({ ...formValueObj, [name]: '' })
    }
    function handlePwdView(event) {
        // console.log(event.currentTarget.children[0])
        if (event.target.previousSibling.getAttribute('type') == 'password') {
            event.target.setAttribute('class', "password-icon-visible mdi mdi-eye")
            event.target.previousSibling.setAttribute('type', 'text')
        } else {
            event.target.previousSibling.setAttribute('type', 'password')
            event.target.setAttribute('class', 'password-icon mdi mdi-eye-off-outline')
        }
    }
    return <>
        {
            (() => {
                if (field.comp === 'input' && !['radio', 'checkbox', 'textAndSearch'].includes(field.fieldType)) {
                    return <>
                        <input placeholder={field.ph} type={field.fieldType}
                            name={field.name} value={formValueObj[field.name]}
                            onChange={(event) => handleChange(event,
                                formValueObj, setFormValueObj,
                                errors, setErrors)}
                            onKeyPress={(event) => { event.key === 'Enter' && event.preventDefault(); }}
                            errmsgname={field.errmsgname}
                            autoComplete="off"
                        />
                        {
                            field.fieldType == 'password' ?
                                <span className="password-icon mdi mdi-eye-off-outline"
                                    onClick={(event) => handlePwdView(event)}>
                                </span> : ''
                        }
                    </>
                }
                else if (field.comp === 'input' && field.fieldType == 'textAndSearch') {
                    return <>
                        <input placeholder={field.ph} type={field.fieldType}
                            name={field.name} value={formValueObj[field.name]}
                            onChange={(event) => handleChange(event,
                                formValueObj, setFormValueObj,
                                errors, setErrors,
                                field.searchObjKey,
                                arraySearch, setArrayResult)}
                            onKeyPress={(event) => { event.key === 'Enter' && event.preventDefault(); }}
                            errmsgname={field.errmsgname}
                            autoComplete="off"
                        />

                        {

                            <div className="fs-suggestionList" id={"f_sugg-" + field.name}>
                                {
                                    arrayResult.map((ar, index) => <span key={'field sugg nb' + index}
                                        onClick={() => {
                                            setFormValueObj({
                                                ...formValueObj,
                                                [field.name]: ar[field.searchObjKey]
                                            })
                                            setArrayResult([])
                                        }}>
                                        {ar[field.searchObjKey]}
                                    </span>)
                                }
                            </div>
                        }
                    </>
                }
                else if (field.comp === 'select') {
                    return <select defaultValue={formValueObj[field.name]}
                        name={field.name}
                        onChange={(event) => handleChange(event,
                            formValueObj, setFormValueObj,
                            errors, setErrors)}
                        errmsgname={field.errmsgname}>
                        <option value="">Choisir...</option>
                        {
                            field.options.map((sop, index) => <option
                                key={'option' + index + field.name}>
                                {sop.ph ? sop.ph : sop}
                            </option>)
                        }
                    </select>
                } else if (field.comp === 'textarea') {
                    return <textarea placeholder='Message'
                        name={field.name} errmsgname={field.errmsgname}
                        onChange={(event) => handleChange(event,
                            formValueObj, setFormValueObj,
                            errors, setErrors)}
                        defaultValue={formValueObj[field.name]}
                    ></textarea>
                }
                else if (field.fieldType === 'radio') {
                    return <div className={field.align}>
                        {
                            field.options.map((op, index) => <label htmlFor={op.id}
                                key={"option radio" + index}>

                                <input placeholder='Hey' type={field.fieldType}
                                    name={field.name} value={op.value}
                                    id={op.id}
                                    onChange={(event) => handleChange(event,
                                        formValueObj, setFormValueObj,
                                        errors, setErrors)}
                                    errmsgname={field.errmsgname}
                                    checked={op.value === formValueObj[field.name]}
                                />
                                <span>{op.label} </span>

                            </label>)
                        }
                    </div>
                }
                else if (field.comp === 'input' && field.htmlType == 'file') {
                    return <>
                        <label htmlFor={field.id} className='iconUploader'>
                            <i className='mdi mdi-file-upload-outline'></i>
                            <span>Cliquez ici pour uploader l'image</span>
                            <input placeholder='Hey' type='file'
                                name={field.name}
                                onChange={(event) => handleChange(event,
                                    formValueObj, setFormValueObj,
                                    errors, setErrors)}
                                errmsgname={field.errmsgname}
                                id={field.id}
                            />
                        </label>
                        <div className='previewImg'>
                            {
                                formValueObj[field.name] != ''
                                    ? <>
                                        <i className='mdi mdi-close'
                                            onClick={() => removeImg(field.name)}></i>
                                        <img id={field.name + '-preview'}
                                            alt="Image uploaded preview"
                                            src={formValueObj[field.name]} />
                                    </>
                                    : ''
                            }
                        </div>
                    </>
                }
            })()
        }
    </>
}
