import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { render as rtlRender, RenderResult } from '@testing-library/react';
import React, { FunctionComponent, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';

const reducerInitialState: any = {};
type storeType = {
  initialState?: any;
  store?: Store;
};
//override render method
export const render = (
  ui: ReactElement,
  {
    initialState = reducerInitialState,
    store = createStore((state) => state, initialState),
    ...renderOptions
  }: storeType = {}
): RenderResult => {
  const Wrapper: FunctionComponent = ({ children }) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>{children}</Provider>
    </MuiPickersUtilsProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';
