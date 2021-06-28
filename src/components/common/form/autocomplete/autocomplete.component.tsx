import { TextField, TextFieldProps } from '@material-ui/core';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Controller, UseFormMethods, ValidationRules } from 'react-hook-form';

export type FilterFieldOption = { id: string; label: string };
export type AutocompleteProps = {
  name: string;
  form: UseFormMethods;
  defaultValue?: string;
  fullWidth?: TextFieldProps['fullWidth'];
  isAsync?: boolean;
  label?: string;
  noOptionsText?: string;
  options?: Array<FilterFieldOption & Record<string, unknown>>;
  onValueChange?: (option: FilterFieldOption | null) => void;
  placeholder?: string;
  apiFunction?: (value: string | number) => Promise<Array<FilterFieldOption & Record<string, unknown>>>;
  rules?: ValidationRules;
  startAdornment?: ReactElement;
  endAdornment?: React.ComponentType;
  value?: FilterFieldOption | null;
  variant?: TextFieldProps['variant'];
};

export const useDebounce = (value: string | number, delay: number): string | number => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export const AutoComplete: FunctionComponent<AutocompleteProps> = ({
  isAsync = false,
  apiFunction,
  defaultValue,
  label = '',
  form,
  noOptionsText,
  options = [],
  onValueChange,
  startAdornment,
  endAdornment: EndAdornment,
  ...restProps
}) => {
  const [loading, setLoading] = useState(false);
  const [searchOptions, setSeacrhOptions] = useState<Array<FilterFieldOption & Record<string, unknown>>>(
    isAsync ? [] : options
  );
  const [selectedOption, setSelectedOption] = useState<(FilterFieldOption & Record<string, unknown>) | null>(null);
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = useDebounce(searchValue, 500);
  const updatedValue = form?.watch(restProps.name);
  const { errors } = form;
  const validationText = errors?.[restProps.name]?.message as string;
  const heplerText = validationText || '';

  const onClose = () => {
    setSeacrhOptions([]);
  };

  useEffect(() => {
    if (debouncedSearchValue && apiFunction && isAsync) {
      setLoading(true);
      const value = debouncedSearchValue as string;
      (async () => {
        const data = apiFunction && (await apiFunction(value));
        setLoading(false);
        console.log('response----', data);
        setSeacrhOptions(data);
      })();
    }
    if (!debouncedSearchValue && apiFunction && isAsync) {
      setSeacrhOptions([]);
    }
  }, [debouncedSearchValue, apiFunction, isAsync]);

  useEffect(() => {
    if (selectedOption?.id !== updatedValue) {
      setSelectedOption(searchOptions?.find((o) => o.id === updatedValue) || null);
    }
  }, [updatedValue]);

  return (
    <Controller
      {...restProps}
      control={form.control}
      name={restProps.name}
      render={({ onChange, value, ...restRenderProps }) => (
        <MuiAutocomplete
          {...restProps}
          {...restRenderProps}
          onClose={() => {
            isAsync && onClose();
          }}
          noOptionsText={noOptionsText || 'No Matches'}
          value={selectedOption}
          options={searchOptions}
          getOptionLabel={(option: FilterFieldOption | string | null) =>
            (option as FilterFieldOption)?.label || (selectedOption?.id === option ? selectedOption?.label : '') || ''
          }
          renderInput={(params) => (
            <TextField
              {...params}
              {...restProps}
              label={label}
              placeholder={label}
              onChange={(e) => isAsync && setSearchValue(e.target.value)}
              InputProps={{
                ...params.InputProps,
                startAdornment,
                endAdornment: (
                  <React.Fragment>
                    {loading && EndAdornment && isAsync ? <EndAdornment /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
              inputProps={{ ...params.inputProps, ...(selectedOption && !value ? { value: '' } : {}) }}
              error={!!heplerText}
              helperText={heplerText}
            />
          )}
          onChange={(e, option: FilterFieldOption | null) => {
            setSelectedOption(option);
            onChange(option?.id ?? '');
            onValueChange && onValueChange(option);
          }}
        />
      )}
      defaultValue={defaultValue}
    />
  );
};
