import { DialogAction } from 'components/common/dialogue/dialogue.component';
import { Dispatch, SetStateAction, useState } from 'react';

export type dialogueHookReturnType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onDialogAction: (action: DialogAction['action'], index?: number) => void;
};

export const useDialogueHook = (callBack?: () => void): dialogueHookReturnType => {
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onDialogAction = (action: DialogAction['action'], index?: number) => {
    if (action === 'Cancel') {
      setOpen(false);
    }
    if (action === 'Update' || action === 'Save') {
      callBack && callBack();
    }
  };

  return {
    open,
    setOpen,
    onDialogAction,
  };
};
