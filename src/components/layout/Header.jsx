import { Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Menu as MenuIcon, Notifications as NotificationsIcon, Search as SearchIcon } from '@mui/icons-material';
import {
    AppBar,
    Backdrop,
    Badge,
    Box,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { lazy, Suspense } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { server } from '../../constants/config';
import { userNotExists } from '../../redux/reducers/auth';
import { resetNotificationCount } from '../../redux/reducers/chat';
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducers/misc';


const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationsDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isSearch, isNotification, isNewGroup } = useSelector(state => state.misc);


    const { notificationCount } = useSelector(state => state.chat);


    const handleMobile = () => {
        dispatch(setIsMobile(true));
    };

    const openSearch = () => {
        dispatch(setIsSearch(true));
    };

    const openNewGroup = () => {
        dispatch(setIsNewGroup(true));
    };

    const openNotification = () => {
        dispatch(setIsNotification(true));
        dispatch(resetNotificationCount());
    };

    const LogoutHandler = async () => {
        try {
            const { data } = await axios.get(`${server}/api/v1/user/logout`, { withCredentials: true });

            dispatch(userNotExists());
            toast.success(data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    };

    const navigateToGroup = () => navigate("/groups")

    return (<>
        <Box sx={{ flexGrow: 1 }} height="4rem">
            <AppBar sx={{
                bgcolor: '#4D2D52'
            }} position="fixed">
                <Toolbar>
                    <Typography
                        variant="h5"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        ᑕᕼᗩTᑎEᔕT
                    </Typography>

                    <Box
                        sx={{
                            display: { xs: "block", sm: "none" },
                        }}
                    >
                        <IconButton color="inherit" onClick={handleMobile}>
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                    </Box>

                    <Box color='inherit' size='large'>
                        <IconBtn title={"Search"}
                            icon={<SearchIcon />}
                            onClick={openSearch}
                        />

                        <IconBtn title={"New Group"}
                            icon={<AddIcon />}
                            onClick={openNewGroup}
                        />

                        <IconBtn title={"Manage Groups"}
                            icon={<GroupIcon />}
                            onClick={navigateToGroup}
                        />

                        <IconBtn title={"Notifications"}
                            icon={<NotificationsIcon />}
                            onClick={openNotification}
                            value={notificationCount}
                        />

                        <IconBtn title={"Logout"}
                            icon={<LogoutIcon />}
                            onClick={LogoutHandler}
                        />

                    </Box>
                </Toolbar>
            </AppBar>
        </Box>

        {
            isSearch && (
                <Suspense fallback={<Backdrop open />} >
                    <SearchDialog />
                </Suspense>)
        }

        {
            isNotification && (
                <Suspense fallback={<Backdrop open />} >
                    <NotificationsDialog />
                </Suspense>)
        }

        {
            isNewGroup && (
                <Suspense fallback={<Backdrop open />} >
                    <NewGroupDialog />
                </Suspense>)
        }
    </>
    );
};

const IconBtn = ({ title, icon, onClick, value }) => {
    return (
        <Tooltip title={title}>
            <IconButton color="inherit" onClick={onClick}>
                {
                    value ? <Badge badgeContent={value} color="error"> {icon}</Badge> : (icon)
                }

            </IconButton>
        </Tooltip>
    )
}

export default Header;

