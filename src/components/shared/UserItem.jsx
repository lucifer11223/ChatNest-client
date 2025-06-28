import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import React, { memo } from 'react'
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { transFormImage } from '../../lib/features';

const UserItem = ({ user, handler, handlerIsLoading, isAdded = false, styling = {} }) => {

    const { name, _id, avatar } = user;
    return (
        <ListItem>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}
                {...styling} sx={{
                    backgroundImage: 'linear-gradient(135deg, rgba(127, 41, 130, 0.72), rgba(127, 41, 130, 0))',
                    backdropFilter: 'blur(20px)',
                    padding: '5px',
                    borderRadius: '2rem',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}>
                <Avatar src={transFormImage(avatar?.url || avatar)} />
                <Typography
                    variant="body1"
                    sx={{ flexGrow: 1, overflow: 'hidden', WebkitLineClamp: 1, WebkitBoxOrient: "vertical", textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >{name}</Typography>
                <IconButton
                    sx={{
                        color: 'white'
                        , backgroundColor: isAdded ? 'error.main' : 'primary.main', '&:hover': { backgroundColor: isAdded ? 'error.dark' : 'primary.dark' }
                    }}
                    onClick={() => handler(_id)} disabled={handlerIsLoading}>

                    {
                        isAdded ? <RemoveIcon /> : <AddIcon />
                    }
                </IconButton>
            </Stack>
        </ListItem>
    )
}

export default memo(UserItem)