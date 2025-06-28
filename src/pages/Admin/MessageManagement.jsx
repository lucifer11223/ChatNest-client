import { Avatar, Box, Skeleton, Stack } from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import RenderAttachment from '../../components/shared/RenderAttachment'
import Table from '../../components/shared/Table'
import { useErrors } from '../../hooks/hook'
import { fileFormat, transFormImage } from '../../lib/features'
import { getMessages } from '../../redux/thunks/admin'


const columns = [{
  field: "id",
  headerName: "ID",
  headerClassName: "table-header",
  width: 200,
}, {
  field: "attachments",
  headerName: "Attachments",
  headerClassName: "table-header",
  width: 400,
  renderCell: (params) => {

    const { attachments } = params.row;

    return attachments?.length > 0 ? attachments.map((i) => {
      const url = i.url;
      const file = fileFormat(url);


      return (
        <Box>
          <a href={url}

            download
            target='_blank'
            style={{
              color: "black"
            }}>
            {RenderAttachment(file, url)}
          </a>
        </Box>
      )
    }) : "No Attachments";

  }
},
{
  field: "content",
  headerName: "Content",
  headerClassName: "table-header",
  width: 400,
},
{
  field: "sender",
  headerName: "Sent By",
  headerClassName: "table-header",
  width: 200,
  renderCell: (params) => (
    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
      <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
      <span>{params.row.sender.name}</span>
    </Stack>
  )
}, {
  field: "chat",
  headerName: "Chat",
  headerClassName: "table-header",
  width: 220,
},
{
  field: "groupChat",
  headerName: "Group Chat",
  headerClassName: "table-header",
  width: 100,
},
{
  field: "createdAt",
  headerName: "Time",
  headerClassName: "table-header",
  width: 250,
}]


const MessageManagement = () => {

  const dispatch = useDispatch();
  const { messages, loadingMessages, errorMessages } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  useErrors([{ isError: errorMessages, error: errorMessages }]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (messages) {
      setRows(
        messages.map((i) => ({
          id: i._id,
          content: i.content,
          attachments: i.attachments,
          sender: {
            name: i.sender.name,
            avatar: transFormImage(i.sender.avatar.url, 50),
          },
          chat: i.chat.name, // ← Flatten name from chat
          groupChat: i.chat.groupChat ? "Yes" : "No", // ← Flatten boolean as "Yes"/"No"
          createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        }))
      );
    }
  }, [messages]);

  return (
    <AdminLayout>
      {loadingMessages ? <Skeleton height={"100vh"} /> : <Table heading={"All Messages"} columns={columns} rows={rows} rowHeight={200} />}
    </AdminLayout>
  )
}

export default MessageManagement