/* eslint-disable @typescript-eslint/no-explicit-any */
import { lightGreen } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const materialDatePickerTheme = (createMuiTheme as any)({
  palette: {
    primary: {
      main: lightGreen[700],
    },
  },
  overrides: {
    MuiFormControlMarginNormal: {
      marginTop: '0px',
    },
    MuiOutlinedInputAdornedEnd: {
      paddingRight: '0px',
    },
  },
});
