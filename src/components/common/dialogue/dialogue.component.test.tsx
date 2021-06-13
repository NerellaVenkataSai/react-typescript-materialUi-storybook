import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { DialogAction, DialogComponent } from './dialogue.component';

let mockOpen = true;
const mockCallBack = jest.fn();
const mockDialogueAction = jest.fn((action: DialogAction['action']) => {
  if (action === 'Cancel') {
    mockOpen = false;
  }
  if (action === 'Update') {
    mockCallBack();
  }
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TestComoponent = (props: any) => (
  <DialogComponent
    className="personalInfo-dialog-component"
    color="primary"
    open={true}
    title="Dialogue Title"
    actions={[
      { action: 'Update', text: 'Update', color: 'primary' },
      { action: 'Cancel', text: 'Cancel', color: 'primary' },
    ]}
    onAction={mockDialogueAction}
    fullWidth={true}
    scroll="paper"
    dividers={false}
    {...props}
  />
);

describe('Dialogue Component', () => {
  test('Should render Dialogue Component', async () => {
    const { baseElement, getByRole, rerender } = render(<TestComoponent />);
    const dialogueComponent = baseElement.querySelector('.dialogue-component');
    const updateButton = getByRole('button', { name: 'Update' });
    const cancelButton = getByRole('button', { name: 'Cancel' });

    expect(baseElement.firstChild).toMatchSnapshot();
    expect(updateButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    userEvent.click(updateButton);
    expect(mockDialogueAction).toBeCalledWith('Update', 0);
    expect(mockCallBack).toBeCalled();
    userEvent.click(cancelButton);
    expect(mockDialogueAction).toBeCalledWith('Cancel', 1);
    console.log(mockOpen);
    rerender(<TestComoponent open={mockOpen} />);

    await waitFor(() => {
      expect(dialogueComponent).not.toBeInTheDocument();
    });
  });
});
