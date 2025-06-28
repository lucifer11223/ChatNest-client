import axios from 'axios';
import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoute from './components/auth/ProtectRoute';
import { Loaders } from './components/layout/Loaders';
import { server } from './constants/config';
import { userExists, userNotExists } from './redux/reducers/auth';
import { SocketProvider } from './socket';


const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Chat = lazy(() => import("./pages/Chat"))
const Groups = lazy(() => import("./pages/Groups"))
const NotFound = lazy(() => import("./pages/NotFound"))

const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"))
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"))
const UserManagement = lazy(() => import("./pages/Admin/UserManagement"))
const MessageManagement = lazy(() => import("./pages/Admin/MessageManagement"))
const ChatManagement = lazy(() => import("./pages/Admin/ChatManagement"))



const App = () => {

  const { user, loader } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${server}/api/v1/user/me`, { withCredentials: true }).then(({ data }) => dispatch(userExists(data.user))).catch(err => dispatch(userNotExists()));

  }, [dispatch])

  return loader ? (<Loaders />) : (
    <BrowserRouter>

      <Suspense fallback={<Loaders />}>
        <Routes>
          <Route element={<SocketProvider>
            <ProtectRoute user={user} />
          </SocketProvider>} >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route path="/login" element={
            <ProtectRoute user={!user} redirect='/'>
              <Login />
            </ProtectRoute>}
          />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position='bottom-center' />
    </BrowserRouter>
  )
}




export default App
