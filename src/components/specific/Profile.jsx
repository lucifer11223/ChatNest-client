import {
    CalendarMonth as CalendarIcon,
    Face as FaceIcon, AlternateEmail as UserNameIcon
} from "@mui/icons-material"
import { Avatar, Stack, Typography } from '@mui/material'
import moment from "moment"
import { transFormImage } from '../../lib/features'

const Profile = ({ user }) => {
    return (
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"} justifyContent={"center"}>
            <Avatar sx={{
                width: 200,
                height: 200,
                objectFit: "contain",
                marginBottom: "1rem",
                border: "5px solid #F2F5EA",
            }} src={transFormImage(user?.avatar?.url)} />
            <ProfileCard heading={"Bio"} text={user?.bio} />
            <ProfileCard heading={"Username"} text={user?.username} Icon={<UserNameIcon />} />
            <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
            <ProfileCard heading={"Joined"} text={moment(user?.createdAt).fromNow()} Icon={<CalendarIcon />} />
        </Stack>
    )
}


const ProfileCard = ({ text, Icon, heading }) => <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
>
    {Icon && Icon}
    <Stack>
        <Typography variant='body1'>
            {text}
        </Typography >
        <Typography color='gray' variant='caption'>
            {heading}
        </Typography>
    </Stack>

</Stack>
export default Profile