import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <Container maxWidth='lg' sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box component='img' src='/images/not-found.svg' sx={{ height: 4/5 }}></Box>
      <Typography variant='h2'>
        صفحه مورد نظر یافت نشد
      </Typography>
      <Link href="/">
        <Button size='large'>
          بازگشت به خانه
        </Button>
      </Link>
    </Container>
  )
}