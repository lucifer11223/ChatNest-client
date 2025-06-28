import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { Backdrop, Box, Button, CircularProgress, Drawer, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { lazy, memo, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loaders } from '../components/layout/Loaders';
import AvatarCard from '../components/shared/AvatarCard';
import UserItem from '../components/shared/UserItem';
import { Link } from "../components/styles/styledComponent";
import { orange } from '../constants/colors';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { useChatDetailsQuery, useDeleteGroupMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api.js';
import { setIsAddMember } from '../redux/reducers/misc.js';

const ConfirmDeleteDialog = lazy(() => import('../components/Dialog/ConfirmDeleteDialog'));
const AddMemberDialog = lazy(() => import('../components/Dialog/AddMemberDialog'));

const Groups = () => {
  const chatId = useSearchParams()[0].get('group');

  const navigate = useNavigate();
  const myGroups = useMyGroupsQuery("");
  const dispatch = useDispatch();

  const { isAddMember } = useSelector(state => state.misc);

  const groupdetails = useChatDetailsQuery({
    chatId, populate: true
  },
    {
      skip: !chatId
    });

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation);

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation);

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteGroupMutation);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const [members, setMembers] = useState([]);
  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupdetails.isError,
      error: groupdetails.error,
    },
  ]

  useErrors(errors);

  useEffect(() => {
    const groupdata = groupdetails.data;
    if (groupdata) {
      setGroupName(groupdata.chat.name);
      setGroupNameUpdatedValue(groupdata.chat.name);
      setMembers(groupdata.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    }
  }, [groupdetails.data]);

  const navigateBack = () => {
    navigate('/');
  };

  const handleMobile = () => {
    setIsMobileMenuOpen(prev => !prev);
  }

  const handleMobileClose = () => { setIsMobileMenuOpen(false); };

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name", { chatId, name: groupNameUpdatedValue });
  };

  const openConfirmDeleteHHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  }

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  }

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    navigate("/groups");
    closeConfirmDeleteHandler();
  }

  const removeMemberHandler = (userId) => {

    removeMember("Removing Member", { chatId, userId: userId });
  }

  // useEffect(() => {
  //   if (chatId) {
  //     setGroupName(`Group Name ${chatId}`);
  //     setGroupNameUpdatedValue(`Group Name ${chatId}`);
  //   }
  //   return () => {
  //     setGroupName("");
  //     setGroupNameUpdatedValue("");
  //     setIsEdit(false);
  //   }
  // }, [chatId]);


  const IconBtns = (
    <>
      {/* Mobile Menu Button */}
      <Box
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
          },
          position: 'fixed',
          top: '2rem',
          right: '1rem',
          color: 'white',
          borderRadius: '50%',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.9)',
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Back Button */}
      <Tooltip title="Back" placement="top">
        <IconButton
          sx={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            bgcolor: 'rgba(0,0,0,0.7)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.9)',
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );



  const GroupName = <Stack direction={"row"} alignItems="center" justifyContent="center" width="100%" position="relative" spacing={1} padding={"2rem"}>
    {isEdit ? (<>
      <TextField
        value={groupNameUpdatedValue}
        onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
      />
      <IconButton onClick={updateGroupName} disabled={isLoadingGroupName} >
        <DoneIcon />
      </IconButton>
    </>) : (<>
      <Typography variant='h5' color='text.primary'>{groupName}</Typography>
      <IconButton
        sx={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          bgcolor: 'rgba(0,0,0,0.7)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.9)',
          },
        }}
        onClick={() => setIsEdit(true)}
        disabled={isLoadingGroupName}>
        <EditIcon />
      </IconButton>
    </>)}
  </Stack>

  const ButtonGroup = (
    <Stack direction={{
      sm: "row",
      xs: "column-reverse"
    }}
      spacing={"1rem"}
      p={{
        sm: "1rem 0",
        xs: "0.5rem 1rem",
        md: "1rem 2rem"
      }} >

      <Button size='large' color='error' startIcon={<DeleteIcon />} onClick={openConfirmDeleteHHandler}>Delete Group</Button>
      <Button size='large' variant='contained' startIcon={<AddIcon />} onClick={openAddMemberHandler}>Add Member</Button>
    </Stack>
  )

  return myGroups.isLoading ? <Loaders /> : (
    <Box
      display="flex"
      height="100vh"
      flexDirection={{
        xs: 'column',
        sm: 'row',
      }}
    >
      {/* Left Sidebar (Group List) */}
      <Box
        display={{
          xs: 'none',
          sm: 'block',
        }}
        width={{
          sm: '33%',
        }}
        bgcolor={'#c19ee0'}
        p={2}
        overflow={"auto"}
      >
        <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Box>

      {/* Right Content Area */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="relative"
        p="1rem 3rem"
        sx={{
          backgroundColor: '#dec9e9',
        }}
      >

        {IconBtns}

        {groupName && <>{GroupName}
          <Typography margin={"2rem"} alignSelf={"flex-start"} variant='body1'>Members</Typography>

          <Stack maxWidth={"45rem"} width={"100%"} direction={"column"} spacing={"2rem"} padding={{
            sm: "1rem 0",
            xs: "0.5rem 1rem",
            md: "1rem 2rem"
          }} boxSizing={"border-box"}
            height={"50vh"}
            overflow={"auto"}>

            {isLoadingRemoveMember ? <CircularProgress /> :
              members.map((i) => (
                <UserItem key={i._id} user={i} isAdded
                  styling={{
                    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                  }}
                  handler={removeMemberHandler} />
              ))
            }

          </Stack>
          {ButtonGroup}
        </>
        }


      </Box>

      {
        isAddMember && <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      }

      {
        confirmDeleteDialog && <Suspense fallback={<Backdrop open />}><ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler} /></Suspense>
      }

      <Drawer
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
          }
        }} open={isMobileMenuOpen} onClose={handleMobileClose}>
        <GroupList w={"50vw"} myGroups={myGroups?.data?.groups} chatId={chatId}  />
      </Drawer>
    </Box>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack width={w}>
      {
        myGroups.length > 0 ? (
          myGroups.map((group) => (<GroupListItem key={group._id} group={group} chatId={chatId} />))
        ) : (
          <Typography textAlign={"center"} padding={"1rem"}>No Groups</Typography>
        )
      }
    </Stack>
  );
};


const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar = [], _id } = group;
  return (
    <Link to={`?group=${_id}`} onClick={(e) => {
      if (chatId === _id) {
        e.preventDefault();
      }
    }}>
      <Stack direction={"row"} alignItems={"center"} padding={"0.5rem 1rem"} sx={{
        backgroundImage:chatId === _id ? 'linear-gradient(135deg, rgba(127, 41, 130, 0.72), rgba(127, 41, 130, 0))' : 'transparent',
        cursor: "pointer"
      }} >
        <AvatarCard avatar={avatar} />
        <Typography variant='h6' color='text.primary' textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"}>{name}</Typography>
      </Stack>
    </Link>
  );
})
export default Groups;

