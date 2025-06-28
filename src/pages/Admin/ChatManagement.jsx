import { Avatar, Skeleton, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AvatarCard from '../../components/shared/AvatarCard'
import Table from '../../components/shared/Table'
import { useErrors } from '../../hooks/hook'
import { transFormImage } from '../../lib/features'
import { getChats } from '../../redux/thunks/admin'

const columns = [{
  field: "id",
  headerName: "ID",
  headerClassName: "table-header",
  width: 200,
}, {
  field: "avatar",
  headerName: "Avatar",
  headerClassName: "table-header",
  width: 150,
  renderCell: (params) => (
    <AvatarCard avatar={params.row.avatar} />
  )
},
{
  field: "name",
  headerName: "Name",
  headerClassName: "table-header",
  width: 300,
},
{
  field: "groupChat",
  headerName: "Group",
  headerClassName: "table-header",
  width: 100,
}, {
  field: "totalMembers",
  headerName: "Toatal Members",
  headerClassName: "table-header",
  width: 120,
}, {
  field: "members",
  headerName: "Members",
  headerClassName: "table-header",
  width: 400,
  renderCell: (params) => (<AvatarCard max={100} avatar={params.row.members} />)
},
{
  field: "totalMessages",
  headerName: "Total Messages",
  headerClassName: "table-header",
  width: 120,
},
{
  field: "creator",
  headerName: "Created By",
  headerClassName: "table-header",
  width: 250,
  renderCell: (params) => (
    <Stack direction="row" alignItems={"center"} spacing={"1rem"}>
      <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
      <span>{params.row.creator.name}</span>
    </Stack>
  )
}]

const ChatManagement = () => {

  const dispatch = useDispatch();
  const { chats, loadingChats, errorChats } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  useErrors([{ isError: errorChats, error: errorChats }]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (chats) {
      setRows(chats.map((i) => ({
        ...i, id: i._id, avatar: i.avatar.map(i => transFormImage(i, 50)),
        members: i.members.map((i) => transFormImage(i.avatar, 50)),
        creator: {
          name: i.creator.name,
          avatar: transFormImage(i.creator.avatar, 50),
        },
      }))
      );
    }
  }, [chats])

  return (
    <AdminLayout>
      {loadingChats ? <Skeleton height={"100vh"} /> : <Table heading={"All Chats"} columns={columns} rows={rows} />}
    </AdminLayout>
  )
}

export default ChatManagement