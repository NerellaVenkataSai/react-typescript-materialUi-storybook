import { Grid, Typography } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import { Switch, SwitchComponentProps } from 'components/common/form';
import React from 'react';
import { useForm } from 'react-hook-form';

export default {
  title: 'react-hook-form/Swicth',
  component: Switch,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} as Meta;

export const SimpleSwitch: Story<SwitchComponentProps> = ({ label, defaultValue, ...args }) => {
  const form = useForm({ mode: 'onChange' });
  return (
    <Grid container direction="column" justify="flex-start">
      <Typography variant="h6">Try playing with the controls</Typography>
      <Grid item md={4}>
        <Switch {...args} form={form} name="swicth" label={label || 'Switch'} defaultValue={defaultValue} />
      </Grid>
    </Grid>
  );
};

export const SwitchAlignment: Story<SwitchComponentProps> = ({ label, ...args }) => {
  const form = useForm({ mode: 'onChange' });
  return (
    <Grid container direction="column" justify="flex-start">
      <Typography variant="h6">Try playing with the controls</Typography>

      <Grid item md={4}>
        <Switch {...args} form={form} name="swicth" label={label || 'Switch'} alignSwitchLabel="top" />
      </Grid>
    </Grid>
  );
};

export const SwitchWithDefaultValue: Story<SwitchComponentProps> = ({ label, ...args }) => {
  const form = useForm({ mode: 'onChange' });
  return (
    <Grid container direction="column" justify="flex-start">
      <Typography variant="h6">Try playing with the controls</Typography>

      <Grid item md={4}>
        <Switch {...args} form={form} name="swicth" label={label || 'Switch'} defaultValue={true} />
      </Grid>
    </Grid>
  );
};
