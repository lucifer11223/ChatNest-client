import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import moment from 'moment';
import { memo } from 'react';
import { fileFormat } from '../../lib/features';
import RenderAttachment from './RenderAttachment';

const MessageComponent = ({ message, user }) => {
  const { sender, content, createdAt, attachments = [] } = message;
  const sameSender = user?._id === sender?._id;
  const timeAgo = moment(createdAt).fromNow();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: sameSender ? 'flex-end' : 'flex-start',
        px: 2,
        py: 0.5,
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: sameSender ? "100%" : "-100%" }}
        whileInView={{ opacity: 1, x: 0 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: sameSender ? 'flex-end' : 'flex-start' }}
      >
        <Paper
          elevation={4}
          sx={{
            backgroundColor: sameSender ? '#E8E9F3' : '#E5D0E3',
            color: 'black',
            padding: '0.75rem 1rem',
            borderRadius: '1.25rem',
            borderTopRightRadius: sameSender ? 0 : '1.25rem',
            borderTopLeftRadius: sameSender ? '1.25rem' : 0,
            maxWidth: '75vw',
            width: 'fit-content',
          }}
        >
          <Stack spacing={0.75}>
            <Stack direction={"row"} gap={1}>
              {!sameSender ? sender?.avatar && (
                <Avatar src={sender.avatar.url} sx={{ width: 20, height: 20 }} />
              ) : (
                user?.avatar && <Avatar src={user.avatar.url} sx={{ width: 20, height: 20 }} />
              )}
              {!sameSender ? sender?.name && (
                <Typography variant="caption" fontWeight={600} color="primary">
                  {sender.name}
                </Typography>
              ) : (
                <Typography variant="caption" fontWeight={600} color="primary">
                  You
                </Typography>)}
            </Stack>

            {content && (
              <Typography
                variant="body1"
                sx={{
                  wordBreak: 'break-word',
                  fontSize: '0.95rem',
                }}
              >
                {content}
              </Typography>
            )}

            {attachments.length > 0 &&
              attachments.map((attachment, index) => {
                const url = attachment.url;
                const file = fileFormat(url);
                return (
                  <Box key={index} mt={0.5}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {RenderAttachment(file, url)}
                    </a>
                  </Box>
                );
              })}

            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                alignSelf: 'flex-end',
                fontSize: '0.7rem',
              }}
            >
              {timeAgo}
            </Typography>
          </Stack>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default memo(MessageComponent);
