import { Avatar, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { useErrors } from '../../hooks/hook'
import { transFormImage } from '../../lib/features'
import { getUsers } from '../../redux/thunks/admin'

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
    <Avatar alt={params.row.name} src={params.row.avatar} />
  )
},
{
  field: "name",
  headerName: "Name",
  headerClassName: "table-header",
  width: 200,
}, {
  field: "username",
  headerName: "Username",
  headerClassName: "table-header",
  width: 200,
}, {
  field: "friends",
  headerName: "Friends",
  headerClassName: "table-header",
  width: 150,
},
{
  field: "groups",
  headerName: "Groups",
  headerClassName: "table-header",
  width: 200,
}]

const UserManagement = () => {

  const dispatch = useDispatch();
  const { users, loadingUsers, errorUsers } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);


  useErrors([{ isError: errorUsers, error: errorUsers }]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (users) {
      setRows(users.map((i) => ({
        ...i,
        id: i._id,
        avatar: transFormImage(i.avatar, 50),
      })));
    }
  }, [users])

  return (
    <AdminLayout>

      {loadingUsers ? <Skeleton height={"100vh"} /> : <Table heading={"All Users"} columns={columns} rows={rows} />}
    </AdminLayout>
  )
}

export default UserManagement