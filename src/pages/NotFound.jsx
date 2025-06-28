import { Error as ErrorIcon } from '@mui/icons-material'
import { Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container maxWidth='lg' sx={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Stack alignItems={"center"} spacing={2} justifyContent={"center"}>
        <ErrorIcon fontSize='large' />
        <Typography variant='h1'>404</Typography>
        <Typography variant='h2'>Not Found</Typography>
        <Link to="/">Go back to home</Link>
      </Stack>
    </Container>
  )
}

export default NotFound
