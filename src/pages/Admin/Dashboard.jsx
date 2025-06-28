import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material'
import { Box, Container, Paper, Skeleton, Stack, Typography } from '@mui/material'
import moment from 'moment'
import AdminLayout from '../../components/layout/AdminLayout'
import { DoughnutChart, LineChart } from '../../components/specific/Charts'
// import { Loaders } from '../../components/specific/Loaders'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CurveButton, SearchField } from '../../components/styles/styledComponent'
import { useErrors } from '../../hooks/hook'
import { getStats } from '../../redux/thunks/admin'


const Dashboard = () => {

    const dispatch = useDispatch();
    const { stats, loadingStats, errorStats } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getStats());
    }, [dispatch]);


    useErrors([{ isError: errorStats, error: errorStats }]);
    const Appbar = <Paper
        elevation={3}
        sx={{
            padding: "2rem", margin: "2rem 0", borderRadius: "1rem"
        }}>
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} overflow={'auto'} >
            <AdminPanelSettingsIcon sx={{fontSize:{xs:"2rem",sm:"3rem"} }} />
            <SearchField placeholder='Search...' sx={{fontSize:{xs:"1rem",sm:"1.5rem"}}} />
            <CurveButton>Search</CurveButton>
            <Box flexGrow={1} />

            <Typography display={
                {
                    xs: "none",
                    lg: "block"
                }
            }
                textAlign={"center"} color={"rgba(0,0,0,0.7)"}>{moment().format("dddd, D MMMM YYYY")}</Typography>
            <NotificationsIcon />
        </Stack>
    </Paper>

    const Widgets = (
        <Stack
            direction={{
                xs: 'column',
                sm: "row",
            }}
            spacing={'2rem'}
            alignItems={'center'}
            justifyContent={"center"}
            margin={"2rem 0"}
        >
            <Widget title={"Users"} value={stats?.usersCount || 0} icon={<PersonIcon />} />
            <Widget title={"Chats"} value={stats?.totalChatsCount || 0} icon={<GroupIcon />} />
            <Widget title={"Messages"} value={stats?.messagesCount || 0} icon={<MessageIcon />} />
        </Stack>)


    return (
        <AdminLayout>
            {loadingStats ? <Skeleton height={"100vh"} /> : <> <Container component={"main"}>
                {Appbar}

                <Stack direction={{
                    xs: "column",
                    lg: 'row',
                }} spacing={"2rem"} flexWrap={"wrap"}
                    justifyContent={'center'}
                    alignItems={{
                        xs: "center",
                        lg: 'stretch'
                    }}>
                    <Paper elevation={3}
                        sx={{
                            padding:{xs:"1rem",sm: "2rem 3.5rem"},
                            borderRadius: "1rem",
                            width: "100%",
                            maxWidth: "45rem",
                        }}>
                        <Typography variant='h4' margin={"2rem 0"}>Last Messages</Typography>
                        <LineChart value={stats?.messagesChart || []} />
                    </Paper>

                    <Paper elevation={3}
                        sx={{
                            padding: "1rem",
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            width: { xs: "100%", sm: "50%" },
                            position: 'relative',
                            maxWidth: "25rem",
                        }}>
                        <DoughnutChart
                            value={[stats?.totalChatsCount - stats?.groupsCount || 0, stats?.groupsCount || 0]} labels={["SingleChats", "GroupChats"]} />
                        <Stack
                            position={'absolute'}
                            direction={'row'}
                            justifyContent={'center'}
                            width={'100%'}
                            height={"100%"}
                            alignItems={'center'}
                        >
                            <GroupIcon /> <Typography>Vs</Typography>
                            <PersonIcon />
                        </Stack>
                    </Paper>
                </Stack>
                {Widgets}

            </Container></>}
        </AdminLayout>
    )
}

const Widget = ({ title, value, icon }) => (
    <Paper
        elevation={3}
        sx={{
            padding: '2rem',
            margin: '2rem 0',
            width: '20rem',
            borderRadius: '1.5rem',
        }}>
        <Stack spacing={'1rem'} alignItems={'center'}>
            <Typography sx={{
                color: 'rgba(0,0,0,0.7)',
                border: '5px solid rgba(0,0,0,0.9)',
                borderRadius: "5rem",
                width: '5rem',
                height: '5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {value}
            </Typography>
            <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
                {icon}
                <Typography>{title}</Typography>
            </Stack>
        </Stack>
    </Paper>
)

export default Dashboard