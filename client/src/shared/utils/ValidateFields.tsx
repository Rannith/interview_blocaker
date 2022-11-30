const ValidateFields = (name, value): any => {
    if (value === "") {
        return `Please enter your ${name}`;
    }
    return "";
}

export default ValidateFields;