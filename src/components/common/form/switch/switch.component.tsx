import './switch.component.scss';

import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
  FormLabel,
  Switch as MuiSwicth,
} from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Controller, UseFormMethods } from 'react-hook-form';

export type SwitchComponentProps = {
  name: string;
  form: UseFormMethods;
  label: string | JSX.Element;
  alignSwitchLabel?: FormControlLabelProps['labelPlacement'];
  defaultValue?: boolean;
  errorMessage?: string;
  isReadOnly?: boolean;
};

export const Switch: FunctionComponent<SwitchComponentProps> = ({
  alignSwitchLabel = 'start',
  defaultValue,
  errorMessage,
  form,
  isReadOnly,
  label,
  name,
}) => {
  const { errors } = form;
  const error = !!errors?.[name];
  const validationText = errors?.[name]?.message as string;
  const heplerText = validationText || errorMessage || '';
  return (
    <Controller
      render={({ ...formProps }) => {
        return (
          <FormControl component="fieldset" fullWidth={true} className="switch-component">
            <FormControlLabel
              aria-label={name}
              control={
                <MuiSwicth
                  disabled={isReadOnly}
                  checked={formProps.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => formProps.onChange(e.target.checked)}
                />
              }
              label={<FormLabel component="legend">{label}</FormLabel>}
              labelPlacement={alignSwitchLabel}
            />
            <FormHelperText error={error && !!heplerText}>{heplerText}</FormHelperText>
          </FormControl>
        );
      }}
      name={name}
      control={form.control}
      defaultValue={defaultValue}
    />
  );
};
