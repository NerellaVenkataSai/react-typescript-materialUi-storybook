import { InputProps, TextField as MUITextField, TextFieldProps } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Controller, UseFormMethods, ValidationRules } from 'react-hook-form';

export type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type TextFieldComponentProps = {
  name: string;
  form: UseFormMethods<any>;
  defaultValue?: string | number | Array<unknown>;
  error?: TextFieldProps['error'];
  errorMessage?: string;
  helperText?: TextFieldProps['helperText'];
  inputProps?: InputProps['inputProps'];
  onChange?: (event: Event) => void;
  onBlur?: (event: Event) => void;
  rules?: ValidationRules;
  transformer?: (event: Event) => string | number;
  value?: string | number;
  [x: string]: unknown;
} & TextFieldProps;

export const TextField: FunctionComponent<TextFieldComponentProps> = ({
  form: { control, errors },
  onBlur,
  onChange,
  name,
  inputProps,
  rules,
  defaultValue,
  errorMessage,
  transformer = (e) => e?.target.value,
  ...props
}) => {
  const validationText = errors?.[name]?.message as string;
  const heplerText = validationText || errorMessage;
  return (
    <Controller
      render={({ ...formProps }) => {
        return (
          <MUITextField
            aria-label={name}
            {...props}
            {...formProps}
            onChange={(e: Event) => {
              formProps.onChange(transformer(e));
              onChange && onChange(e);
            }}
            onBlur={(e: Event) => {
              onBlur && onBlur(e);
            }}
            inputProps={{
              ...inputProps,
              ...('value' in props ? { value: props?.value } : {}),
            }}
            error={!!errors?.[name]}
            helperText={errors?.[name] ? heplerText || 'This field is required' : ''}
          />
        );
      }}
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
    />
  );
};
