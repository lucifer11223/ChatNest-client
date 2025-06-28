import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api'
import { setIsAddMember } from '../../redux/reducers/misc'
import UserItem from '../shared/UserItem'


const AddMemberDialog = ({ chatId }) => {

    const dispatch = useDispatch();

    const {isAddMember} = useSelector(state => state.misc);

    const {isLoading, data,isError, error} = useAvailableFriendsQuery(chatId);


    const [addMembers, isLoadingAddMembers] = useAsyncMutation(useAddGroupMembersMutation);

    const [selectedMembers, setSelectedMembers] = useState([]);

    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) =>
            prev.includes(id) ? prev.filter(memberId => memberId !== id) : [...prev, id]
        );
    }

    const addMemberSubmitHandler = () => {
        addMembers("Adding Members...", { chatId, members: selectedMembers });
        closeHandler();
    }
    const closeHandler = () => {
        dispatch(setIsAddMember(false));
    }


    useErrors([{
        isError,
        error,
    }]);

    return (
        <Dialog open={isAddMember} onClose={closeHandler}>
            <Stack p={{ xs: '1rem', sm: '2rem' }} width={{xs:"100%",sm:"25rem"}} direction={"column"}>
                <DialogTitle>Add Member</DialogTitle>
                <Stack spacing={"1rem"}>
                    { isLoading ? <Skeleton/> : data?.friends?.length > 0 ? data?.friends?.map((i) => (
                        <UserItem key={i._id} user={i} handler={selectMemberHandler}
                            isAdded={selectedMembers.includes(i._id)} />
                    )) : (
                        <Typography textAlign={"center"} padding={"1rem"}>No Friends</Typography>
                    )}
                </Stack>
                <Stack direction={"row"} spacing={"1rem"} mt={"1rem"} justifyContent={"space-evenly"}>
                    <Button color="error" onClick={closeHandler}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={addMemberSubmitHandler} disabled={isLoadingAddMembers}>Add</Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog