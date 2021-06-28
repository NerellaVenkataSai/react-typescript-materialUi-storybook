import { Typography } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import { TextField, TextFieldComponentProps } from 'components/common/form';
import React from 'react';
import { useForm } from 'react-hook-form';

export default {
  title: 'react-hook-form/TextField',
  component: TextField,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} as Meta;

export const SimpleTextField: Story<TextFieldComponentProps> = ({ label, defaultValue, ...args }) => {
  const form = useForm({ mode: 'onChange' });
  return (
    <TextField
      {...args}
      form={form}
      name="textField"
      label={label || 'Text Field'}
      defaultValue={defaultValue || 'Default Value Form'}
    />
  );
};

export const SimpleValidationTextField: Story<TextFieldComponentProps> = ({ label, ...args }) => {
  const form = useForm({ mode: 'onChange' });
  return (
    <>
      <Typography variant="h6"> Make the Field Dirty to get the validation error</Typography>
      <TextField
        {...args}
        form={form}
        name="validated"
        label={label || 'Text Field'}
        rules={{ required: true }}
        required
      />
    </>
  );
};

export const CustomValidationTextField: Story<TextFieldComponentProps> = ({ label, ...args }) => {
  const form = useForm({ mode: 'onChange' });
  const isEven = (value: number) => value % 2 === 0 || 'Please enter only even numbers';
  return (
    <>
      <Typography variant="h6">
        (Even number and mandatory validation) used tranfomer prop to take only integers on key type
      </Typography>
      <TextField
        {...args}
        form={form}
        name="customValidation"
        label={label || 'Text Field'}
        rules={{ required: { value: true, message: 'This field is mandatory' }, validate: isEven }}
        transformer={(e: any) =>
          Number(e.target.value.replace(/[^\d]/g, '')) ? Number(e.target.value.replace(/[^\d]/g, '')) : ''
        }
        required
      />
    </>
  );
};

export const MobileNumberValidationTextField: Story<TextFieldComponentProps> = ({ label, ...args }) => {
  const form = useForm({ mode: 'onChange' });
  const formatPhoneNumber = (value: string | undefined): string | undefined => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (value.length) {
      if (cvLength < 3) return `${currentValue}`;
      if (cvLength < 7) return `${currentValue.slice(0, 3)}${currentValue.slice(3)}`;

      return `(${currentValue.slice(0, 3)})${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
  };
  return (
    <>
      <Typography variant="h6">
        (Mobile Number format validation) used tranfomer prop to take only integers on key type
      </Typography>
      <TextField
        {...args}
        form={form}
        name="customValidation"
        label={label || 'Text Field'}
        rules={{ pattern: { value: /[(]\d{3}[)]\d{3}-\d{4}$/, message: 'Number should be in (XXX)XXX-XXXX' } }}
        transformer={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          formatPhoneNumber(e.target.value)
        }
        required
      />
    </>
  );
};
