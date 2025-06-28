import { Stack } from '@mui/material'
import ChatItem from '../shared/ChatItem'


const ChatList = ({ w = "100%",
    chats = [], onlineUsers = [],
    chatId,
    newMessagesAlert = [
        { chatId: "", count: "0" }
    ], handleDeleteChat, myId }) => {
    return (
        <Stack width={w} direction={'column'} overflow={"auto"} gap={1} padding={"0.5rem 0"} height={"100%"} sx={{
            backgroundColor: 'rgba(199, 189, 231, 0.69)',
        }}>
            {
                chats?.map((data, index) => {

                    const { avatar, _id, name, groupChat, members } = data;
                    const newMessageAlert = newMessagesAlert.find(
                        ({ chatId }) => chatId === _id
                    );
                    const otherMembers = members.filter(id => id !== myId);
                    const isOnline = otherMembers.some(id => onlineUsers.includes(id));
                    return <ChatItem newMessageAlert={newMessageAlert}
                        index={index}
                        isOnline={isOnline}
                        avatar={avatar}
                        name={name}
                        _id={_id}
                        key={_id}
                        groupChat={groupChat}
                        handleDeleteChat={handleDeleteChat}
                        sameSender={chatId === _id} />
                })
            }
        </Stack>
    )
}

export default ChatList

