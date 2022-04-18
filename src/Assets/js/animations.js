export const btnAnimation = (event) => {
    event.target.setAttribute('class', 'btnClicked');
    setTimeout(() => {
        event.target.classList.remove('btnClicked');
    }, 400);
}

export const showMenuOptionAnimation = (baseClass) => {
    document.querySelector('.' + baseClass).classList.toggle(baseClass + '-Visible')
}