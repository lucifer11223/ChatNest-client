import React, { memo } from 'react'
import { Link } from '../styles/styledComponent'
import { Box, Stack, Typography } from '@mui/material'
import AvatarCard from './AvatarCard'
import { motion } from 'framer-motion'

const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat,
}) => {

    const openProfile = () => {
        
    };

    
    return (
        <Link sx={{
            p: '0',
        }}
            to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
            <motion.div
                initial={{ opacity: 0, y: "100%" }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    padding: '1.3rem',
                    color: sameSender ? "white" : "unset",
                    backgroundImage: sameSender ? 'linear-gradient(135deg, rgba(127, 41, 130, 0.72), rgba(127, 41, 130, 0))' : "unset",
                    position: 'relative',
                    backdropFilter: sameSender ? 'blur(20px)' : "none",
                    WebkitBackdropFilter: sameSender ? 'blur(10px)' : "none",
                    borderRadius: "1rem",
                    border: sameSender ? '1px solid rgba(255, 255, 255, 0.18)' : "none",
                    boxShadow: sameSender ? '0 4px 30px rgba(0, 0, 0, 0.1)' : "none",
                }}>

                <AvatarCard avatar={avatar} onClick={openProfile} />
                <Stack>
                    <Typography variant='body1'>{name}</Typography>
                    {
                        newMessageAlert && (
                            <Typography variant='caption'>{newMessageAlert.count} New Message</Typography>
                        )
                    }
                </Stack>

                {
                    isOnline && (<Box
                        sx={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "green",
                            position: "absolute",
                            top: "50%",
                            right: "1rem",
                            transform: "translateY(-50%)",
                        }}
                    />)
                }
            </motion.div>
        </Link>
    )
}

export default memo(ChatItem)