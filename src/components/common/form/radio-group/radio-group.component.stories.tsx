import { Grid, Typography } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import { RadioButtonGroup, RadioComponentProps } from 'components/common/form';
import React from 'react';
import { useForm } from 'react-hook-form';

export default {
  title: 'react-hook-form/RadioGroup',
  component: RadioButtonGroup,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} as Meta;

export const RadioGroupVertical: Story<RadioComponentProps> = ({ label, values, ...args }) => {
  const form = useForm({ mode: 'onChange' });
  return (
    <Grid container direction="column" alignContent="center">
      <Grid item>
        <RadioButtonGroup
          {...args}
          form={form}
          name="radio"
          label={label || 'Radio Vertical'}
          values={values || ['Female', 'Male']}
        />
      </Grid>
    </Grid>
  );
};

export const RadioGroupHorizontal: Story<RadioComponentProps> = ({ label, values, ...args }) => {
  const form = useForm({ mode: 'onChange' });
  return (
    <Grid container direction="column" alignContent="center">
      <Grid item>
        <RadioButtonGroup
          {...args}
          form={form}
          name="radio"
          label={label || 'Radio Horizontal'}
          values={values || ['Female', 'Male']}
          alignRadioButtons="horizontal"
        />
      </Grid>
    </Grid>
  );
};

export const RadioGroupDefaultValue: Story<RadioComponentProps> = ({ label, ...args }) => {
  const form = useForm({ mode: 'onChange' });
  return (
    <Grid container direction="column" alignContent="center">
      <Grid item>
        <Typography variant="h6">Select unknown value to get validation error</Typography>
        <RadioButtonGroup
          {...args}
          form={form}
          name="radio"
          label={label || 'Default Radio With Validation'}
          values={['Female', 'Male', 'Unknown']}
          defaultValue="Male"
          rules={{ validate: (value: string) => value !== 'Unknown' || 'Please Select proper gender' }}
        />
      </Grid>
    </Grid>
  );
};
