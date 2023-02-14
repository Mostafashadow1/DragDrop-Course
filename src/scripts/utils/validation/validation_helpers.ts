import { validation } from "./validation_types.js";

/**
 * @desc assign pattern validation in inputs
 * @param1 titleValue : string
 * @param2 descValue: string
 * @returns [titleInputRule , descInputRule]
 * */
export const assignValidateInputs = (titleValue: string, descValue: string) => {
  const titleInputRule: validation = {
    type: "title",
    value: titleValue,
    required: true,
    minLength: 4,
    maxLength: 30,
  };
  const descInputRule: validation = {
    type: "descrabtion",
    value: descValue,
    required: true,
    minLength: 10,
    maxLength: 100,
  };
  return [titleInputRule, descInputRule];
};

/**
 * @desc handle validation errors
 * @param input : input pattern validation
 * @returns error message : string
 * */
export const handleValidationErrors = (inputRule: validation): string => {
  let errorMsg: string = "";
  // required
  if (inputRule.required && inputRule.value.trim().length === 0) {
    errorMsg = `${inputRule.type} is required`;
  }
  // min Length
  if (
    inputRule.minLength &&
    inputRule.minLength > inputRule.value.trim().length
  ) {
    errorMsg = `${inputRule.type} must be at least ${inputRule.minLength} characters`;
  }
  // max Length
  if (
    inputRule.maxLength &&
    inputRule.maxLength < inputRule.value.trim().length
  ) {
    errorMsg = `${inputRule.type} must be less than ${inputRule.maxLength} characters`;
  }

  return errorMsg;
};
