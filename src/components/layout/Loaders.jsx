import { Box, Skeleton, Stack } from '@mui/material'
import { BouncingSkeleton } from '../styles/styledComponent'

const Loaders = () => {
    return (
        <>
            <Box spacing={"1rem"}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                {/* Left Sidebar */}
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        width: { sm: '33%', md: '25%' },
                        bgcolor: 'lightgray',
                        p: 2,
                    }}
                >
                    <Skeleton variant='rectangular' height={"100vh"} />
                </Box>

                {/* Main Content */}
                <Box
                    sx={{
                        flex: 1,
                        p: 2,
                    }}
                >
                    <Stack spacing={"1rem"}>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <Skeleton key={i} variant='rectangular' height={"5rem"} />
                        ))}
                    </Stack>

                </Box>

                {/* Right Sidebar */}
                <Box
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        width: { md: '25%' },
                        p: 2,
                    }}
                >
                    <Skeleton variant='rectangular' height={"100vh"} />
                </Box>
            </Box>
        </>
    )
}

const TypingLoader = () => {
    return <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <BouncingSkeleton variant='circular' height={"10px"} width={"10px"} style={{
            animationDelay: "0.1s"
        }} />

        <BouncingSkeleton variant='circular' height={"10px"} width={"10px"} style={{
            animationDelay: "0.2s"
        }} />

        <BouncingSkeleton variant='circular' height={"10px"} width={"10px"} style={{
            animationDelay: "0.4s"
        }} />

        <BouncingSkeleton variant='circular' height={"10px"} width={"10px"} style={{
            animationDelay: "0.6s"
        }} />
    </Stack>
}

export { Loaders, TypingLoader }
