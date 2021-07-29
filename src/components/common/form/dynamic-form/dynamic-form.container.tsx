/* eslint-disable @typescript-eslint/no-explicit-any */
import './dynamic-form.component.scss';

import { GridSize, InputProps, TextFieldProps } from '@material-ui/core';
import React, { FunctionComponent, useEffect } from 'react';
import { useForm, UseFormMethods, ValidationRules } from 'react-hook-form';
import { ErrorOption } from 'react-hook-form/dist/types/form';

import { RadioComponentProps } from '../radio-group/radio-group.component';
import { SwitchComponentProps } from '../switch/switch.component';
import { DynamicFormComponent } from './dynamic-form.component';

export enum FormFieldType {
  Select = 'select',
  Text = 'text',
  radio = 'radio',
  swicth = 'swicth',
  datePicker = 'date-picker',
  autoComplete = 'auto-complete',
}

export type FieldOption = {
  id: string;
  label: string;
};

export type FormField = {
  name: string;
  label: string;
  type: FormFieldType;
  columnGridSize?: boolean | GridSize | undefined;
  errorMessage?: string;
  id?: string;
  InputProps?: InputProps;
  options?: FieldOption[];
  defaultValue?: string | number;
  rules?: ValidationRules;
  size?: TextFieldProps['size'];
  /**radio button props ----*/
  values?: string[];
  alignRadioButtons?: RadioComponentProps['alignRadioButtons'];
  /**radio button props ----*/
  /** Switch Props ---*/
  alignSwitchLabel?: SwitchComponentProps['alignSwitchLabel'];
  /** Switch Props ---*/
  /** Date Picker Props ---*/
  /** https://material-ui-pickers.dev/api/KeyboardDatePicker */
  defaultDate?: number;
  minDate?: Date;
  minDateMessage?: string;
  isEndOfDay?: boolean;
  format?: string;
  inputVariant?: 'outlined' | 'standard' | 'filled';
  onError?: (e: ErrorOption) => void;
  /** Date Picker Props ---*/
  variant?: TextFieldProps['variant'];
  [x: string]: unknown;
};

export type DynamicFormContainerProps = {
  form?: UseFormMethods<any>;
  fields: Array<FormField | FormField[]>;
  formId: string;
  formActions: boolean;
  onSubmit: (form: UseFormMethods<any>) => unknown;
  defaultValues?: Record<string, unknown>;
  formTitle?: string;
};

export const DynamicFormContainer: FunctionComponent<DynamicFormContainerProps> = ({
  form: formProp,
  formTitle,
  formId,
  formActions = true,
  fields,
  onSubmit,
  defaultValues,
}) => {
  const generateDefaultValues = (formValues: Record<string, unknown> = {}) =>
    fields.reduce((defaults, field) => {
      let defaultsClone = { ...defaults };
      if (Array.isArray(field)) {
        defaultsClone = field.reduce(
          (accumulator, { name }) => ({
            ...accumulator,
            ...defaultsClone,
            [name]:
              formValues?.[name] === 0 || formValues?.[name] === false || formValues?.[name]
                ? formValues?.[name]
                : defaultValues?.[name] || '',
          }),
          {}
        );
      } else {
        defaultsClone = {
          ...defaults,
          [field.name]:
            formValues?.[field.name] === 0 || formValues?.[field.name] === false || formValues?.[field.name]
              ? formValues?.[field.name]
              : defaultValues?.[field.name] || '',
        };
      }
      return { ...defaultsClone };
    }, {});

  const form =
    formProp ||
    useForm({
      mode: 'onChange',
      defaultValues: defaultValues || generateDefaultValues({}),
    });

  useEffect(() => {
    form?.reset(generateDefaultValues(form.getValues()));
    return () => {
      form.reset({});
    };
  }, []);

  const handleSubmit = (form: UseFormMethods<any>) => {
    onSubmit(form);
  };

  return (
    <DynamicFormComponent
      formActions={formActions}
      formId={formId}
      title={formTitle}
      form={form}
      fields={fields}
      onSubmit={handleSubmit}
    />
  );
};
