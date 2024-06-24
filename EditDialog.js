import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

function EditDialog({ open, onClose, onSave, title, setTitle }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>주제 이름 변경</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="주제 제목"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          취소
        </Button>
        <Button onClick={onSave} color="primary">
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
