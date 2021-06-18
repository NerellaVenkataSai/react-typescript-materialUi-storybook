import { Checkbox, Chip, Grid, ListItemText, MenuItem, Typography } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import { MultipleSelectProps, Select } from 'components/common/form';
import React from 'react';
import { useForm } from 'react-hook-form';

export default {
  title: 'react-hook-form/Select',
  component: Select,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} as Meta;

export const SimpleSelect: Story = () => {
  const form = useForm({ mode: 'onChange' });
  const options = [
    { id: 'male', label: 'Male' },
    { id: 'female', label: 'Female' },
  ];
  return (
    <>
      <Typography variant="h6">Controls wont work as it is causing issue while rendering Select component</Typography>
      <Grid container md={4}>
        <Select form={form} name="selectField" label={'Simple Select'} placeholder="Gender" fullWidth={true}>
          {options?.map(({ id, label }) => (
            <MenuItem key={id} value={id}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </>
  );
};

export const SelectWithDefaultValue: Story = () => {
  const form = useForm({ mode: 'onChange' });
  const options = [
    { id: 'male', label: 'Male' },
    { id: 'female', label: 'Female' },
  ];
  return (
    <>
      <Typography variant="h6">Controls wont work as it is causing issue while rendering Select component</Typography>
      <Grid container md={4}>
        <Select
          form={form}
          name="selectField"
          label={'Gender'}
          placeholder="Gender"
          fullWidth={true}
          defaultValue={'male'}
        >
          {options?.map(({ id, label }) => (
            <MenuItem key={id} value={id}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </>
  );
};

export const MultiSelectWithMandatory: Story = () => {
  const form = useForm({ mode: 'onChange' });
  const options = [
    { id: 'ap', label: 'Andhra Pradesh' },
    { id: 'ts', label: 'Telangana' },
    { id: 'nw', label: 'Newyork' },
    { id: 'nj', label: 'NewJersy' },
  ];
  return (
    <>
      <Typography variant="h6">Controls wont work as it is causing issue while rendering Select component</Typography>
      <Grid container md={4}>
        <Select
          SelectProps={MultipleSelectProps as Record<string, unknown>}
          form={form}
          name="selectField"
          label={'States'}
          placeholder="States"
          fullWidth={true}
          defaultValue={[]}
          rules={{
            validate: (value: string[]) => value.length !== 0 || 'Please Select atleast one option',
          }}
        >
          {options?.map(({ id, label }) => (
            <MenuItem key={id} value={id}>
              <Checkbox checked={false} className="checkbox-not-selected" />
              <Checkbox checked={true} className="checkbox-selected" />
              <ListItemText primary={label} />
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </>
  );
};

export const CustomMultiSelect: Story = () => {
  const form = useForm({ mode: 'onChange' });
  const options = [
    { id: 'andhra', label: 'Andhra Pradesh' },
    { id: 'telangana', label: 'Telangana' },
    { id: 'newyork', label: 'Newyork' },
    { id: 'newjersy', label: 'NewJersy' },
  ];
  const selectProps = {
    ...MultipleSelectProps,
    renderValue: (selectedValue: string[]) => selectedValue.map((value) => <Chip key={value} label={value} />),
  };
  return (
    <>
      <Typography variant="h6">Controls wont work as it is causing issue while rendering Select component</Typography>
      <Grid container md={4}>
        <Select
          SelectProps={selectProps as Record<string, unknown>}
          form={form}
          name="selectField"
          label={'States'}
          placeholder="States"
          fullWidth={true}
          defaultValue={[]}
          rules={{
            validate: (value: string[]) => value.length !== 0 || 'Please Select atleast one option',
          }}
        >
          {options?.map(({ id, label }) => (
            <MenuItem key={id} value={id}>
              <Checkbox checked={false} className="checkbox-not-selected" />
              <Checkbox checked={true} className="checkbox-selected" />
              <ListItemText primary={label} />
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </>
  );
};
