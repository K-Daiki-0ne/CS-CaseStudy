import { FC, useState } from 'react';
import { 
  IconButton, 
  Dialog, 
  Box, 
  DialogTitle, 
  DialogContent, 
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@apollo/client';
import { DELETE_STUDY } from '../../graphql/graphql';
import { DeleteStudyMutation } from '../../generated/graphql';

type Props = {
  studyId: number
}

export const StudyDeleteButton: FC<Props> = ({ studyId }) => {
  const [open, setOpen] = useState<boolean>(false);

  const [deleteStudy] = useMutation<DeleteStudyMutation>(DELETE_STUDY)

  const handleClickDeleteStudy = async () => {
    await deleteStudy({
      variables: {
        studyId: studyId
      }
    });
    setOpen(false);
  };

  return (
    <Box component='div'>
      <IconButton aria-label="delete" size="large" onClick={() => setOpen(true)} sx={{ textAlign: 'center' }}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='delete-dialog-title'
        aria-describedby='delete-dialog-description'
      >
        <DialogTitle id='delete-dialog-title'>削除</DialogTitle>
        <DialogContent>
          <DialogContentText id='delete-dialog-description'>
            選択した学習を削除してよろしいですか? <br />
            削除した学習は戻すことができませんがよろしいですか?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={() => setOpen(false)}
          >
            CANCEL
          </Button>
          <Button
            variant='contained'
            onClick={handleClickDeleteStudy}
          >
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
