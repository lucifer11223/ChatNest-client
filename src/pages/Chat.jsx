import { useInfiniteScrollTop } from "6pp";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { Box, IconButton, Skeleton, Stack } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileMenu from "../components/Dialog/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import { TypingLoader } from "../components/layout/Loaders";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/styledComponent";
import { gray } from "../constants/colors";
import { ALERT, CHAT_JOINED, CHAT_LEFT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../constants/events";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { setIsFileMenu } from "../redux/reducers/misc";
import { useSocket } from "../socket";



const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const bottonRef = useRef(null);
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const skip = !chatId;
  const chatDetails = useChatDetailsQuery({ chatId, populate: true }, { skip });

  const oldMessagesChunk = useGetMessagesQuery({
    chatId,
    page
  });

  const members = chatDetails?.data?.chat?.members;


  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [{ isError: chatDetails.isError, error: chatDetails.error }, { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error }];


  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);


  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping && Array.isArray(members)) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      if (Array.isArray(members)) socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000])

  };


  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim() || !Array.isArray(members)) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    if (!Array.isArray(members)) return;

    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessages([]);
      setPage(1);
      setMessage("");
      setOldMessages([]);
      socket.emit(CHAT_LEFT, { userId: user._id, members });
    }
  }, [chatId]);

  useEffect(() => {
    if (bottonRef.current) {
      bottonRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");

  }, [chatDetails.isError]);

  const newMessagesHandler = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setMessages(prev => [...prev, data.messageForRealTime]);

  }, [chatId]);

  const startTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setUserTyping(true);
  }, [chatId]);

  const stopTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setUserTyping(false);
  }, [chatId]);

  const alertListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    const messageForAlert = {
      content: data,
      sender: {
        _id: "AdminkiId",
        name: "Admin",
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, messageForAlert]);
  }, [chatId]);

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesHandler,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,

  };


  useSocketEvents(socket, eventHandler);
  useErrors(errors);


  const allMessages = [...oldMessages, ...messages];
  return chatDetails.isLoading ? (<Skeleton />) : (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      bgcolor="#FED4E7"
      position="relative"
    >
      {/* Scrollable Messages Area */}
      <Box
        ref={containerRef}
        flex={1}
        overflow="auto"
        px={2}
        py={1}
      >
        <Stack spacing={1}>
          {allMessages.reverse().map((message, index) => (
            <MessageComponent key={message.id || `${message.chat}-${message.sender._id}-${index}`} user={user} message={message} />
          ))}

          {userTyping && <TypingLoader />}
          <div ref={bottonRef} />
        </Stack>
      </Box>

      {/* Input Area (Bottom, but not overlapping) */}
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          backgroundColor: gray,
          padding: "0.8rem",
          borderTop: "1px solid #ccc",
          bgcolor: "#FAE3E3",
        }}
      >

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          position="relative"
          width="100%"
        >
          <IconButton sx={{ position: "absolute", left: "1rem" }} onClick={handleFileOpen} >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type messages here..."
            sx={{ padding: "0.7rem 3rem" }} value={message} onChange={messageOnChange}
          />

          <IconButton
            type="submit"
            sx={{ position: "absolute", right: "1rem" }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </Box>

      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
    </Box>
  );
};

export default AppLayout(Chat);
