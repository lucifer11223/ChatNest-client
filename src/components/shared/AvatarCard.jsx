import { Avatar, AvatarGroup, Box, Drawer, Stack, useMediaQuery } from '@mui/material'
import React from 'react'
import { transFormImage } from '../../lib/features'
import { useState } from 'react';

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={"0.5"}>
      <AvatarGroup max={max} sx={{
        position: "relative",
      }}>
        <Box width={"5rem"} height={"3rem"}>
          {
            avatar.map((i, index) => (
              <Avatar
                key={Math.random() * 100}
                src={transFormImage(i)}
                alt={`Avatar ${index}`}
                style={{
                  width: "3rem",
                  height: "3rem",
                  position: "absolute",
                  left: {
                    xs: `${0.5 + index}rem`,
                    sm: `${index}rem`
                  }
                }}
                onClick={() => handleAvatarClick(user)} />

            ))
          }
        </Box>
      </AvatarGroup>
    </Stack>




  )
}

export default AvatarCard;