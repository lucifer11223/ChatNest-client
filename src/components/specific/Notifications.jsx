import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from "@mui/material";
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api';
import { setIsNotification } from '../../redux/reducers/misc';

const Notifications = () => {

  const dispatch = useDispatch();

  const { isNotification } = useSelector(state => state.misc);

  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));

    await acceptRequest("Accepting", { requestId: _id, accept });

  }

  const closeHandler = () => {
    dispatch(setIsNotification(false));
  };


  useErrors([
    { isError, error },
  ]);

  return (
    <Dialog
      open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: '1rem', sm: '2rem' }} maxWidth={"25rem"} direction={"column"}>
        <DialogTitle textAlign={"center"}>Notifications </DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : <>
          {
            data?.requests?.length > 0 ? (<>
              {data?.requests?.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  sender={notification.sender}
                  _id={notification._id}
                  handler={friendRequestHandler}
                />
              ))}
            </>) : (<Typography textAlign={"center"}>0 Notifications</Typography>)
          }
        </>
        }

      </Stack>
    </Dialog>
  )
}


const NotificationItem = memo(({ sender, _id, handler }) => {
  const { avatar, name } = sender;

  return (

    <ListItem>
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>
        <Avatar src={avatar?.url || avatar} />
        <Typography
          variant="body1"
          sx={{ flexGrow: 1, overflow: 'hidden', WebkitLineClamp: 1, WebkitBoxOrient: "vertical", textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >{`${name} sent you a friend request`}</Typography>
        <Stack direction={{ xs: "column", sm: "row" }}>

          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>Decline</Button>
        </Stack>
      </Stack>
    </ListItem>
  )
})
export default Notifications