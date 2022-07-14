import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({content, state, backedState, response}) {
  const [open, setOpen] = React.useState(state);

  const handleClose = () => {
    setOpen(false);
    backedState(false)
    console.log("band")
  };

  const setResponse = () => {
    response(true)
    handleClose();
  }

  React.useEffect(
    () => {
        setOpen(state)
    }    
    , [state]
  )

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {content}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
            {open}
          <Button onClick={handleClose}>No</Button>
          <Button onClick={setResponse}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
