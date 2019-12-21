import { Validators } from '@angular/forms';
import { TM_VALIDATION_FORM_VALUES, CODE_VALIDATION_VALUES } from './validation-form-values';
import { VACANCY_VALIDATION_VALUES } from './validation-form-values';

export const TM_VALIDATORS = {
  questionTitle: [
    Validators.required,
    Validators.minLength(TM_VALIDATION_FORM_VALUES.minLength),
    Validators.maxLength(TM_VALIDATION_FORM_VALUES.maxLengthTitle),
  ],
  questionDescription: [
    Validators.required,
    Validators.minLength(TM_VALIDATION_FORM_VALUES.minLength),
    Validators.maxLength(TM_VALIDATION_FORM_VALUES.maxLengthDescription),
  ],
  questionTopics: [Validators.required],
  questionType: [Validators.required],
};
export const VACANCY_VALIDATORS = {
  title: [Validators.required, Validators.minLength(VACANCY_VALIDATION_VALUES.minLength)],
  type: [Validators.required],
  description: [Validators.required],
  link: [Validators.required],
};

export const INVITE_VALIDATORS = {
  email: [Validators.required],
};

export const CODE_VALIDATORS = {
  code: [
    Validators.required,
    Validators.maxLength(CODE_VALIDATION_VALUES.maxLength),
    Validators.minLength(CODE_VALIDATION_VALUES.minLength),
  ],
};
