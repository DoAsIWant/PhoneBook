const regexes = {
    phoneRegex: /^\+380\d{9}$/,
    personRegex: /^[a-zA-Z|\s]+$/,
};

function isPersonValid(personField) {
    return regexes.personRegex.test(personField);
}

function isPhoneValid(phoneField) {
    return regexes.phoneRegex.test(phoneField);
}

export {
    isPersonValid,
    isPhoneValid,
}