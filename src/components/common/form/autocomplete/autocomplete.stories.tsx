import { CircularProgress, Grid, InputAdornment, Typography } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { Meta, Story } from '@storybook/react';
import axios from 'axios';
import { AutoComplete } from 'components/common/form';
import React from 'react';
import { useForm } from 'react-hook-form';

export default {
  title: 'react-hook-form/AutoComplete',
  component: AutoComplete,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} as Meta;

export const ClientSideAutoComplete: Story = () => {
  const form = useForm({ mode: 'onChange' });
  const Search = () => {
    return (
      <InputAdornment position="start">
        <SearchOutlined fontSize="small" />
      </InputAdornment>
    );
  };
  return (
    <Grid container>
      <Typography variant="h6">
        Typeahed to get related options and check actions to check the selected option content
      </Typography>
      <br />
      <br />
      <br />
      <Grid item md={4}>
        <AutoComplete
          form={form}
          name="autocomplete"
          label="Client Side Autocomplete"
          variant="outlined"
          rules={{ required: { value: true, message: 'This Field is required' } }}
          options={[
            { id: 'patagonia', label: 'Patagonia' },
            { id: 'uhg', label: 'UHG' },
            { id: 'icici', label: 'ICICI' },
            { id: 'starHealth', label: 'Start Health' },
          ]}
          onValueChange={(value: any) => console.log(value)}
          startAdornment={<Search />}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export const AsynchronousAutoComplete: Story = () => {
  const form = useForm({ mode: 'onChange' });
  const getCountries = async (value: any) => {
    try {
      const res = await axios.get(`https://restcountries.eu/rest/v2/name/${value}`);
      return res.data.map((country: Record<string, unknown>) => ({
        id: country?.name,
        label: country?.name,
        region: country?.region,
      }));
    } catch (err) {
      console.log(err);
      return [];
    }
  };
  const Loading = () => {
    return (
      <InputAdornment position="end">
        <CircularProgress color="inherit" size={20} />
      </InputAdornment>
    );
  };
  const Search = () => {
    return (
      <InputAdornment position="start">
        <SearchOutlined fontSize="small" />
      </InputAdornment>
    );
  };
  return (
    <Grid container>
      <Typography variant="h6">
        Typeahed to get related options and check actions to check the selected option content
      </Typography>
      <br />
      <br />
      <br />
      <Grid item md={4}>
        <AutoComplete
          form={form}
          name="autocomplete"
          label="Countries Autocomplete"
          variant="outlined"
          isAsync={true}
          rules={{ required: { value: true, message: 'This Field is required' } }}
          onValueChange={(value: any) => console.log(value)}
          startAdornment={<Search />}
          apiFunction={getCountries}
          endAdornment={Loading}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};
