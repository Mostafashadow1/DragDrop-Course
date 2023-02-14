export const assignValidateInputs = (titleValue, descValue) => {
    const titleInputRule = {
        type: "title",
        value: titleValue,
        required: true,
        minLength: 4,
        maxLength: 30,
    };
    const descInputRule = {
        type: "descrabtion",
        value: descValue,
        required: true,
        minLength: 10,
        maxLength: 100,
    };
    return [titleInputRule, descInputRule];
};
export const handleValidationErrors = (inputRule) => {
    let errorMsg = "";
    if (inputRule.required && inputRule.value.trim().length === 0) {
        errorMsg = `${inputRule.type} is required`;
    }
    if (inputRule.minLength &&
        inputRule.minLength > inputRule.value.trim().length) {
        errorMsg = `${inputRule.type} must be at least ${inputRule.minLength} characters`;
    }
    if (inputRule.maxLength &&
        inputRule.maxLength < inputRule.value.trim().length) {
        errorMsg = `${inputRule.type} must be less than ${inputRule.maxLength} characters`;
    }
    return errorMsg;
};
//# sourceMappingURL=validation_helpers.js.map