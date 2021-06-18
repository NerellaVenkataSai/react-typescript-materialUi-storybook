import './radio-group.component.scss';

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Controller, UseFormMethods, ValidationRules } from 'react-hook-form';

export type RadioComponentProps = {
  name: string;
  form: UseFormMethods;
  rules?: ValidationRules;
  label: string | JSX.Element;
  values: string[];
  alignRadioButtons?: 'horizontal' | 'vertical';
  defaultValue?: string;
  error?: boolean;
  isReadOnly?: boolean;
  radioLabels?: string[];
};

export const RadioButtonGroup: FunctionComponent<RadioComponentProps> = ({
  alignRadioButtons = 'vertical',
  defaultValue,
  name,
  form,
  rules,
  label,
  values,
  radioLabels = [],
  isReadOnly,
}) => {
  const { errors } = form;
  const validationText = errors?.[name]?.message as string;
  const heplerText = validationText || '';
  return (
    <Controller
      render={({ ...formProps }) => {
        return (
          <FormControl>
            <FormGroup row={alignRadioButtons === 'horizontal'} className="form-radio">
              <FormLabel component="legend">{label}</FormLabel>
              <RadioGroup
                id={name}
                aria-label={name}
                name={name}
                value={formProps.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => formProps.onChange(e.target.value)}
                row={alignRadioButtons === 'horizontal'}
              >
                {values.map((value, i: number) => (
                  <FormControlLabel
                    key={`${value}_${i}`}
                    value={value}
                    control={<Radio />}
                    label={radioLabels[i] || value}
                    disabled={isReadOnly}
                  />
                ))}
              </RadioGroup>
            </FormGroup>
            <FormHelperText error={!!heplerText}>{heplerText}</FormHelperText>
          </FormControl>
        );
      }}
      name={name}
      rules={rules}
      control={form.control}
      defaultValue={defaultValue}
    />
  );
};
