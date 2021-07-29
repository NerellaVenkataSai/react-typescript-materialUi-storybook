import { UseFormMethods } from 'react-hook-form';

/**
 * https://react-hook-form.com/api/useform/setvalue/
 */
export const formValueSetter = (form: UseFormMethods, fields: Record<string, unknown>): void => {
  for (const i in fields) {
    form.setValue(i, fields[i], { shouldDirty: true, shouldValidate: true });
  }
};
