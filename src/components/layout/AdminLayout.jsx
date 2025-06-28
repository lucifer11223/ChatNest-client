import { Box, Drawer, IconButton, Stack, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ManageAccounts as ManageAccountsIcon,
  Groups as GroupsIcon,
  Message as MessageIcon,
  ExitToApp as ExitToAppIcon
} from "@mui/icons-material";
import { useLocation, Link as Linkcomponent, Navigate } from 'react-router-dom';
import { gray } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../redux/thunks/admin';

const Link = styled(Linkcomponent)`
  text-decoration: none;
  border-radius: 2rem;
  color: black;
  padding: 1rem 2rem;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

export const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupsIcon />
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />
  }
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(adminLogout());
  };

  return (
    <Stack width={"70vw"} direction="column" p="3rem">
      <Typography variant="h5">ChatNest</Typography>

      <Stack spacing="1rem" mt={2}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                bgcolor: "lightsteelblue",
                color: "white"
              }
            }
          >
            <Stack direction="row" alignItems="center" spacing="1rem">
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}

        <Box onClick={logoutHandler}>
          <Stack direction="row" alignItems="center" spacing="1rem" p={"1rem 2rem"}>
            <ExitToAppIcon />
            <Typography>Logout</Typography>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};


const AdminLayout = ({ children }) => {

  const {isAdmin} = useSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };

  const handleClose = () => {
    setIsMobile(false);
  };

  if (!isAdmin) return <Navigate to="/admin" />;

  return (
    <Box display="flex" minHeight="100vh" flexDirection={{ xs: "column", md: "row" }}>
      {/* Mobile Menu Toggle */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
          zIndex: 1300
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* Sidebar for Desktop */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: { md: "30%", lg: "25%" }
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          width: { xs: "100%", md: "70%", lg: "75%" },
          bgcolor: gray,
          flexGrow: 1
        }}
      >
        {children}
      </Box>

      {/* Sidebar for Mobile Drawer */}
      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Box>
  );
};

export default AdminLayout;
