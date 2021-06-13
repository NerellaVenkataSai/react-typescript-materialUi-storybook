import './dialogue.component.styles.scss';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  PropTypes,
  Typography,
} from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog';
import { Close } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';

export type DialogAction = {
  action: 'Save' | 'Update' | 'Cancel';
  text: string;
  color?: PropTypes.Color;
  isDisabled?: boolean;
  type?: 'submit' | 'normal';
  formId?: string;
};
export type DialogComponentProps = {
  actions?: DialogAction[];
  title: string;
  open: boolean;
  body?: string;
  className?: string;
  dividers?: boolean;
  onClose?: () => void;
  onAction?: (action: DialogAction['action'], index: number) => void;
} & DialogProps;

export const DialogComponent: FunctionComponent<DialogComponentProps> = ({
  actions,
  body,
  children,
  className,
  dividers,
  onClose,
  onAction,
  open,
  title,
  ...props
}) => (
  <Dialog
    className={`dialogue-component ${className}`}
    onClose={onClose}
    aria-labelledby={title}
    open={open}
    {...props}
  >
    <DialogTitle>
      <Grid container justify="flex-start" className="dialogue-header">
        <Grid item xs={10}>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        {onClose ? (
          <Grid item xs={2}>
            <IconButton aria-label="Close" className="close-button" onClick={onClose}>
              <Close />
            </IconButton>
          </Grid>
        ) : (
          ''
        )}
      </Grid>
    </DialogTitle>
    <DialogContent dividers={dividers}>
      {children ? children : <DialogContentText>{body}</DialogContentText>}
    </DialogContent>
    <DialogActions>
      {actions?.map(({ action, color, text, isDisabled, type = 'normal', formId }: DialogAction, index: number) => (
        <>
          {type === 'submit' ? (
            <Button
              key={index}
              disabled={isDisabled}
              color={color || 'default'}
              variant="contained"
              // fullWidth
              type="submit"
              form={formId || 'custom-form'}
            >
              {text}
            </Button>
          ) : (
            <Button
              key={index}
              disabled={isDisabled}
              color={color || 'default'}
              variant="contained"
              // fullWidth
              onClick={(e) => {
                e.preventDefault();
                onAction && onAction(action, index);
              }}
            >
              {text}
            </Button>
          )}
        </>
      ))}
    </DialogActions>
  </Dialog>
);
