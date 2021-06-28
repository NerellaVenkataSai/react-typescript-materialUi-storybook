import './date-picker.component.scss';

import { KeyboardDatePicker } from '@material-ui/pickers';
import React, { FunctionComponent } from 'react';
import { Controller, UseFormMethods, ValidationRules } from 'react-hook-form';
import { setResetTime } from 'utils';

export type DatePickerProps = {
  name: string;
  form: UseFormMethods;
  isEndOfDay: boolean;
  rules?: ValidationRules;
  defaultValue?: number;
  [x: string]: unknown;
};

export const DatePicker: FunctionComponent<DatePickerProps> = ({
  form,
  name,
  isEndOfDay,
  rules,
  defaultValue = '',
  ...datePickerProps
}) => {
  const { errors } = form;
  const validationText = errors?.[name]?.message as string;
  const heplerText = validationText || '';
  return (
    <Controller
      name={name}
      control={form.control}
      defaultValue={defaultValue}
      rules={rules}
      render={(props) => {
        return (
          // <ThemeProvider theme={materialDatePickerTheme}>
          <KeyboardDatePicker
            className="date-picker-component"
            autoComplete="off"
            onChange={(date) =>
              props.onChange(date?.getTime() ? Math.floor(setResetTime(date, isEndOfDay).getTime() / 1000) : date)
            }
            autoOk
            value={props.value === undefined || props.value === null || props.value === '' ? null : props.value * 1000}
            maxDate={new Date('9999-12-31')}
            error={!!heplerText}
            helperText={heplerText}
            inputVariant="outlined"
            variant="inline"
            InputLabelProps={{ shrink: !!props.value }}
            fullWidth
            {...datePickerProps}
          />
          // </ThemeProvider>
        );
      }}
    />
  );
};
