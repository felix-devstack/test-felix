const requiredField = (fieldName = 'This field') => v => !!v || `${fieldName} is required`;
const requiredRadioField = v => v === null ? '': true;
const requiredRuleForField = fieldName => requiredField(fieldName);
const percentValues = v => v != null && v >= 0 && v <= 100 || 'Type in a value between 0-100';

export {
  requiredRadioField,
  requiredRuleForField,
  percentValues
};