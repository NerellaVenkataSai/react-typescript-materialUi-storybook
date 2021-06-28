/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, MenuItem, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { UseFormMethods } from 'react-hook-form';

import { AutoComplete } from '../autocomplete/autocomplete.component';
import { DatePicker } from '../date-picker/date-picker.component';
import { RadioButtonGroup } from '../radio-group/radio-group.component';
import { Select } from '../select/select.component';
import { Switch } from '../switch/switch.component';
import { TextField } from '../text-field/text-field.component';
import { FormField, FormFieldType } from './dynamic-form.container';

export type DynamicComponentProps = {
  formId: string;
  fields: Array<FormField | FormField[]>;
  form: UseFormMethods<any>;
  formActions: boolean;
  onSubmit: (event: UseFormMethods<any>) => void;
  title?: string;
};

export const DynamicFormComponent: FunctionComponent<DynamicComponentProps> = ({
  fields,
  form,
  formId,
  formActions,
  onSubmit,
  title,
}) => {
  const formField = (field: FormField, key: number | string) => {
    const { columnGridSize, type, options, label, defaultValue, errorMessage, values = [], ...restProps } = field;
    return (
      <Grid
        item
        className="filter-field"
        key={key}
        xs={columnGridSize || 12}
        sm={columnGridSize || 12}
        md={columnGridSize || 12}
        lg={columnGridSize || 12}
      >
        {type === FormFieldType.Select ? (
          <Select
            {...restProps}
            label={label}
            form={form}
            placeholder={label}
            defaultValue={defaultValue || ''}
            fullWidth={true}
          >
            {options?.map(({ id, label }) => (
              <MenuItem key={id} value={id}>
                {label}
              </MenuItem>
            ))}
          </Select>
        ) : type === FormFieldType.Text ? (
          <TextField
            {...restProps}
            form={form}
            label={label}
            placeholder={label}
            fullWidth={true}
            errorMessage={errorMessage}
            defaultValue={defaultValue}
          />
        ) : type === FormFieldType.radio ? (
          <RadioButtonGroup {...restProps} form={form} label={label} values={values} defaultValue={defaultValue} />
        ) : type === FormFieldType.swicth ? (
          <Switch {...restProps} form={form} label={label} defaultValue={defaultValue ? true : false} />
        ) : type === FormFieldType.datePicker ? (
          <DatePicker
            {...restProps}
            form={form}
            label={label}
            isEndOfDay={false}
            defaultValue={restProps?.defaultDate}
          />
        ) : type === FormFieldType.autoComplete ? (
          <AutoComplete {...restProps} form={form} label={label} options={options || []} defaultValue={defaultValue} />
        ) : (
          ''
        )}
      </Grid>
    );
  };
  const getFields = (fields: Array<FormField | FormField[]>) => {
    return fields.map((field, i: number) => {
      if (!Array.isArray(field)) {
        return <Grid container>{formField(field, `${field.name}_${i}}`)}</Grid>;
      } else {
        return (
          <Grid container spacing={1}>
            {field.map((columnField, i: number) => formField(columnField, `${columnField.name}_${i}}`))}
          </Grid>
        );
      }
    });
  };
  return (
    <>
      {title ? <Typography variant="h2">{title}</Typography> : ''}
      <div className="form-fields">
        <form
          className="dynamic-form"
          autoComplete="off"
          id={formId}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
        >
          {getFields(fields)}
          {/* purpose behind keeping styles to hide/show 
          form buttons is to get all the react hook form functionality 
          to work outside of form submit */}
          <div className="form-submit" style={{ display: formActions ? 'block' : 'none' }}>
            <Button type="submit" color="primary" variant="contained" disabled={!form.formState.isValid}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
