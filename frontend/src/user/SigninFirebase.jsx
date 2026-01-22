// Enhanced Signin with Firebase Auth (Google & Facebook)
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Layout from '../core/Layout.jsx';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Copyright from '../core/Copyright.jsx';
import { signin, authenticate, isAuthenticated } from '../auth/index.js';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const FormContainer = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const SocialButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  padding: theme.spacing(1.5),
  textTransform: 'none',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(3, 0),
}));

export default function SigninFirebase() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
    rememberMe: false,
  });

  const { email, password, loading, error, redirectToReferrer, rememberMe } = values;
  const { user } = isAuthenticated();
  
  const { 
    signInGoogle, 
    signInFacebook,
    loading: firebaseLoading,
    error: firebaseError 
  } = useFirebaseAuth();

  const handleChange = (name) => (event) => {
    const value = name === 'rememberMe' ? event.target.checked : event.target.value;
    setValues({ ...values, error: '', [name]: value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    // Traditional backend authentication
    signin({ email, password, rememberMe }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({ ...values, redirectToReferrer: true });
        });
      }
    });
  };

  const handleGoogleSignIn = async () => {
    setValues({ ...values, error: '', loading: true });
    const result = await signInGoogle();
    
    if (result.success) {
      // Sync Firebase user with your backend
      await syncFirebaseUserWithBackend(result.user);
      setValues({ ...values, redirectToReferrer: true, loading: false });
    } else {
      setValues({ ...values, error: result.error || 'Google sign-in failed', loading: false });
    }
  };

  const handleFacebookSignIn = async () => {
    setValues({ ...values, error: '', loading: true });
    const result = await signInFacebook();
    
    if (result.success) {
      // Sync Firebase user with your backend
      await syncFirebaseUserWithBackend(result.user);
      setValues({ ...values, redirectToReferrer: true, loading: false });
    } else {
      setValues({ ...values, error: result.error || 'Facebook sign-in failed', loading: false });
    }
  };

  // Sync Firebase user with backend
  const syncFirebaseUserWithBackend = async (firebaseUser) => {
    try {
      const idToken = await firebaseUser.getIdToken();
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/firebase-signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        }),
      });

      const data = await response.json();
      
      if (data.token) {
        authenticate(data, () => {
          console.log('User synced with backend');
        });
      }
    } catch (err) {
      console.error('Error syncing user with backend:', err);
      setValues({ ...values, error: 'Failed to sync with server', loading: false });
    }
  };

  const showError = () =>
    (error || firebaseError) && (
      <Alert severity='error' sx={{ width: '100%', mb: 2 }}>
        {error || firebaseError}
      </Alert>
    );

  const showLoading = () =>
    (loading || firebaseLoading) && (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
        <CircularProgress />
      </Box>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Navigate to='/admin/dashboard' />;
      } else {
        return <Navigate to='/user/dashboard' />;
      }
    }
    if (isAuthenticated()) {
      return <Navigate to='/' />;
    }
  };

  const signInForm = () => (
    <FormContainer onSubmit={clickSubmit}>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
        autoFocus
        value={email}
        onChange={handleChange('email')}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
        autoComplete='current-password'
        value={password}
        onChange={handleChange('password')}
      />
      <FormControlLabel
        control={
          <Checkbox
            value='remember'
            color='primary'
            checked={rememberMe}
            onChange={handleChange('rememberMe')}
          />
        }
        label='Remember me'
      />
      <SubmitButton
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        disabled={loading || firebaseLoading}
      >
        Sign In
      </SubmitButton>

      <StyledDivider>OR</StyledDivider>
      
      <SocialButton
        fullWidth
        variant='outlined'
        startIcon={<GoogleIcon />}
        onClick={handleGoogleSignIn}
        disabled={loading || firebaseLoading}
        sx={{
          borderColor: '#4285F4',
          color: '#4285F4',
          '&:hover': {
            borderColor: '#357ae8',
            backgroundColor: 'rgba(66, 133, 244, 0.04)',
          },
        }}
      >
        Continue with Google
      </SocialButton>

      <SocialButton
        fullWidth
        variant='outlined'
        startIcon={<FacebookIcon />}
        onClick={handleFacebookSignIn}
        disabled={loading || firebaseLoading}
        sx={{
          borderColor: '#1877F2',
          color: '#1877F2',
          '&:hover': {
            borderColor: '#166fe5',
            backgroundColor: 'rgba(24, 119, 242, 0.04)',
          },
        }}
      >
        Continue with Facebook
      </SocialButton>

      <Grid container sx={{ mt: 2 }}>
        <Grid item xs>
          <Link to='/forgot-password' style={{ fontSize: '0.875rem' }}>
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link to='/signup' style={{ fontSize: '0.875rem' }}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </FormContainer>
  );

  return (
    <Layout
      title='Signin'
      description='Signin to MERN E-commerce'
      className='container col-md-8 offset-md-2'
    >
      {showLoading()}
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <StyledAvatar>
            <LockOutlinedIcon />
          </StyledAvatar>
          <Typography component='h1' variant='h5'>
            Sign In
          </Typography>
          {showError()}
          {signInForm()}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      {redirectUser()}
    </Layout>
  );
}
