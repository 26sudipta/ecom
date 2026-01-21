import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

export default function Copyright() {
  return (
    <Box mt={8} mb={4}>
      <Typography variant='body2' color='text.secondary' align='center'>
        {'© '}
        {new Date().getFullYear()}
        {' Baraz. All rights reserved. | Developed by '}
        <Link color='inherit' href='#'>
          Sudipta Das
        </Link>
      </Typography>
    </Box>
  );
}
