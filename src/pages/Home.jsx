import { Box, Typography } from '@mui/material'
import AppLayout from '../components/layout/AppLayout'
import { gray } from '../constants/colors'

const Home = () => {
  return (
    <Box sx={{ bgcolor: '#fefee3', height: "100%" }}>
      <Typography p="2rem" variant="h5" textAlign='center'>
        Select a Friend to chat
      </Typography>
    </Box>
  )
}

export default AppLayout(Home)
