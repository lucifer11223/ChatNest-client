import { Box, Drawer, Skeleton } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { NEW_MESSAGE, NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/events';
import { useErrors, useSocketEvents } from '../../hooks/hook';
import { getOrSaveFromStorage } from '../../lib/features';
import { useMyChatsQuery } from '../../redux/api/api';
import { incrementNotification, setNewMessagesAlert } from '../../redux/reducers/chat';
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducers/misc';
import { useSocket } from '../../socket';
import DeleteChatMenu from '../Dialog/DeleteChatMenu';
import Title from '../shared/Title';
import ChatList from '../specific/ChatList';
import Profile from '../specific/Profile';
import Header from './Header';


const AppLayout = (WrappedComponent) => {
  return (props) => {

    const { chatId } = useParams();
    const deleteMenuAnchor = useRef(null);

    const [onlineUsers, setOnlineUsers] = useState([]);

    const navigate = useNavigate();


    const dispatch = useDispatch();
    const { isMobile } = useSelector(state => state.misc);
    const { user } = useSelector(state => state.auth);
    const { newMessagesAlert } = useSelector(state => state.chat);

    const socket = useSocket();
    const { isLoading, data, error, isError, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);


    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    }

    const newMessageAlertHandler = useCallback((data) => {
      if (data.chatId === chatId) return;
      dispatch(setNewMessagesAlert(data));
    }, [chatId]);
    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch])

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUsersListener = useCallback((data) => {
      setOnlineUsers(data);
    }, [data]);


    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    }

    const eventHandlers = {
      [NEW_MESSAGE]: newMessageAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener
    };


    useSocketEvents(socket, eventHandlers);


    return (
      <>
        <Title />
        <Header />

        <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />

        {
          isLoading ? <Skeleton /> : (
            <Drawer open={isMobile} onClose={handleMobileClose}>
              <ChatList
                w='70vw'
                chats={data?.chats}
                chatId={chatId}
                newMessagesAlert={newMessagesAlert}
                handleDeleteChat={handleDeleteChat}
                onlineUsers={onlineUsers}
                myId={user?._id}
              />
            </Drawer>
          )
        }

        <Box
          sx={{
            height: { xs: 'calc(100vh - 2rem)', sm: 'calc(100vh - 4rem)'},
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {/* Left Sidebar */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'block' },
              width: { xs: '100%', sm: '33%', md: '25%' },
              bgcolor:'#826C7F',
              overflowY: 'auto',
              height: '100%'
            }}
          >
            {
              isLoading ? <Skeleton variant='rectangular' height={"100vh"} /> : <ChatList chats={data?.chats} chatId={chatId} handleDeleteChat={handleDeleteChat} newMessagesAlert={newMessagesAlert} onlineUsers={onlineUsers} w='100%' />
            }
          </Box>

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
            }}
          >
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Box>

          {/* Right Sidebar */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              width: { md: '25%' },
              bgcolor: '#3B413C',
              color: 'white',
              padding: '2rem',
            }}
          >
            <Profile user={user} />
          </Box>
        </Box>
      </>
    );
  };
};

export default AppLayout;

