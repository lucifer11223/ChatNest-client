import { Container, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
    return (
        <Container sx={{
            height: "100vh",
        }}>
            <Paper
                elevation={3}
                sx={{
                    padding: '1rem 4rem',
                    overflow: 'hidden',
                    boxShadow: 'none',
                    height: '100%',
                    width: '100%',
                    margin: 'auto',
                    borderRadius: '1rem',
                }}
            >
                <Typography
                    textAlign={"center"}
                    variant='h4 '
                    sx={{
                        margin: "2rem",
                        textTransform: "uppercase",
                    }}
                >{heading}</Typography>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowBufferPx={rowHeight}
                    style={{
                        height: "80%",
                    }}
                    sx={{
                        border: "none",
                        ".table-header": {
                            bgcolor: "black",
                            color: "white",
                        }
                    }}
                ></DataGrid>
            </Paper>
        </Container>
    )
}

export default Table