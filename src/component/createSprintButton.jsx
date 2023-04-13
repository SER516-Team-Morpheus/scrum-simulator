import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import SprintTab from './SprintTab';

function CreateSprintButton() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>Create Sprint</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Sprint</DialogTitle>
        <DialogContent>
          <SprintTab />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateSprintButton;
