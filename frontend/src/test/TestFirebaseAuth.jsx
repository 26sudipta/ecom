// Test Firebase Authentication Setup
import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Layout from '../core/Layout';
import { useFirebase } from '../context/FirebaseContext';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';

const TestFirebaseAuth = () => {
  const { currentUser, isAuthenticated } = useFirebase();
  const { signInGoogle, signInFacebook, signOut, loading, error } = useFirebaseAuth();

  const firebaseConfigured = !!(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID
  );

  return (
    <Layout title="Test Firebase Auth" description="Test your Firebase authentication setup">
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Firebase Authentication Test
        </Typography>

        {/* Configuration Status */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Configuration Status
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {firebaseConfigured ? (
              <>
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                <Typography>Firebase is configured</Typography>
              </>
            ) : (
              <>
                <ErrorIcon color="error" sx={{ mr: 1 }} />
                <Typography>Firebase not configured - check .env file</Typography>
              </>
            )}
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" display="block">
              API Key: {import.meta.env.VITE_FIREBASE_API_KEY ? '✓ Set' : '✗ Missing'}
            </Typography>
            <Typography variant="caption" display="block">
              Project ID: {import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✓ Set' : '✗ Missing'}
            </Typography>
            <Typography variant="caption" display="block">
              Auth Domain: {import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✓ Set' : '✗ Missing'}
            </Typography>
          </Box>
        </Paper>

        {/* Authentication Status */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Authentication Status
          </Typography>

          {isAuthenticated ? (
            <Box>
              <Alert severity="success" sx={{ mb: 2 }}>
                You are signed in!
              </Alert>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2"><strong>Name:</strong> {currentUser.displayName || 'N/A'}</Typography>
                <Typography variant="body2"><strong>Email:</strong> {currentUser.email}</Typography>
                <Typography variant="body2"><strong>UID:</strong> {currentUser.uid}</Typography>
                <Typography variant="body2"><strong>Email Verified:</strong> {currentUser.emailVerified ? 'Yes' : 'No'}</Typography>
                {currentUser.photoURL && (
                  <Box sx={{ mt: 2 }}>
                    <img src={currentUser.photoURL} alt="Profile" style={{ width: 64, height: 64, borderRadius: '50%' }} />
                  </Box>
                )}
              </Box>

              <Button variant="outlined" onClick={signOut} disabled={loading}>
                Sign Out
              </Button>
            </Box>
          ) : (
            <Alert severity="info">
              Not signed in. Try the authentication methods below.
            </Alert>
          )}
        </Paper>

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Authentication Methods */}
        {!isAuthenticated && (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Test Authentication Methods
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Click a button below to test Firebase authentication:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={signInGoogle}
                disabled={loading || !firebaseConfigured}
                fullWidth
                sx={{
                  borderColor: '#4285F4',
                  color: '#4285F4',
                  '&:hover': {
                    borderColor: '#357ae8',
                    backgroundColor: 'rgba(66, 133, 244, 0.04)',
                  },
                }}
              >
                Test Google Sign-In
              </Button>

              <Button
                variant="outlined"
                startIcon={<FacebookIcon />}
                onClick={signInFacebook}
                disabled={loading || !firebaseConfigured}
                fullWidth
                sx={{
                  borderColor: '#1877F2',
                  color: '#1877F2',
                  '&:hover': {
                    borderColor: '#166fe5',
                    backgroundColor: 'rgba(24, 119, 242, 0.04)',
                  },
                }}
              >
                Test Facebook Sign-In
              </Button>
            </Box>

            {loading && (
              <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                Authenticating...
              </Typography>
            )}
          </Paper>
        )}

        {/* Instructions */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Setup Instructions
          </Typography>

          <Typography variant="body2" paragraph>
            1. Create a Firebase project at{' '}
            <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">
              Firebase Console
            </a>
          </Typography>

          <Typography variant="body2" paragraph>
            2. Enable Authentication → Email/Password, Google, and Facebook
          </Typography>

          <Typography variant="body2" paragraph>
            3. Create <code>frontend/.env</code> file with your Firebase credentials
          </Typography>

          <Typography variant="body2" paragraph>
            4. Restart the dev server: <code>npm run dev</code>
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="text.secondary">
            See <strong>FIREBASE_AUTH_SETUP.md</strong> for detailed instructions
          </Typography>
        </Paper>
      </Container>
    </Layout>
  );
};

export default TestFirebaseAuth;
