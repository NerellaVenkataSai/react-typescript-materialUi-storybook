import './select.component.scss';

import { SelectProps } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

import { TextField, TextFieldComponentProps } from '../text-field/text-field.component';

export const DefaultSelectProps: SelectProps = {
  MenuProps: {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    getContentAnchorEl: null,
  },
};

export const MultipleSelectProps = {
  ...DefaultSelectProps,
  MenuProps: { ...DefaultSelectProps.MenuProps, className: 'multi-select-dropdown' },
  multiple: true,
  renderValue: (selected: string[] = []): string => selected.join(', '),
};

export const Select: FunctionComponent<TextFieldComponentProps> = (props) => (
  <TextField SelectProps={DefaultSelectProps} {...props} select={true} />
);
