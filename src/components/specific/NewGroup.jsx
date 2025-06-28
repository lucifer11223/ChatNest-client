import { useInputValidation } from '6pp';
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api';
import { setIsNewGroup } from '../../redux/reducers/misc';
import UserItem from '../shared/UserItem';

const NewGroup = () => {

  const { isNewGroup } = useSelector(state => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();


  const [newGroup, isLoadingNewGroup, dta] = useAsyncMutation(useNewGroupMutation);

  const [selectedMembers, setSelectedMembers] = useState([]);


  const errors = [{
    isError,
    error,
  }];

  useErrors(errors);


  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter(memberId => memberId !== id) : [...prev, id]
    );
  }

  const groupName = useInputValidation("");

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");
    if (selectedMembers.length < 2) return toast.error("Select at least 2 members");
    newGroup("Create Group", { name: groupName.value, members: selectedMembers });
    closeHandler();
  }
  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  }

  return (
    <Dialog
      open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: '1rem', sm: '2rem' }} width={{ xs: '100%', sm: '25rem' }} direction={"column"}>
        <DialogTitle variant='h4' textAlign={"center"}>New Group </DialogTitle>
        <TextField
          label="Group Name"
          variant='outlined'
          fullWidth
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant='body1' color='gray' mt={'1rem'} textAlign={"center"}>
          Select Members
        </Typography>
        <Stack direction={"column"} spacing={"1rem"} mt={'1rem'} maxHeight={"20rem"} overflow={"auto"}>
          {isLoading ? (<Skeleton />) : (data?.friends.map((i) => (
            <UserItem key={i._id} user={i} handler={selectMemberHandler}
              isAdded={selectedMembers.includes(i._id)} />
          ))
          )}
        </Stack>
        <Stack direction={"row"} spacing={"1rem"} mt={'1rem'} justifyContent={"space-evenly"}>
          <Button variant='outlined' color='error' onClick={closeHandler}>Cancel</Button>
          <Button variant='contained' color='primary' onClick={submitHandler} disabled={isLoadingNewGroup} >Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup