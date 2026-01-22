// Example: Using Firebase Auth in your components

import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useFirebase } from '../context/FirebaseContext';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';

/**
 * Example 1: Simple Authentication Component
 */
export const SimpleAuthExample = () => {
  const { currentUser, isAuthenticated } = useFirebase();
  const { signInGoogle, signOut } = useFirebaseAuth();

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Authentication Status
      </Typography>
      
      {isAuthenticated ? (
        <Box>
          <Typography>Welcome, {currentUser.displayName || currentUser.email}</Typography>
          <Button variant="outlined" onClick={signOut} sx={{ mt: 2 }}>
            Sign Out
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography>Not signed in</Typography>
          <Button variant="contained" onClick={signInGoogle} sx={{ mt: 2 }}>
            Sign In with Google
          </Button>
        </Box>
      )}
    </Paper>
  );
};

/**
 * Example 2: Protected Component (only shows when authenticated)
 */
export const ProtectedContent = () => {
  const { isAuthenticated, currentUser } = useFirebase();

  if (!isAuthenticated) {
    return <Typography>Please sign in to view this content</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6">Protected Content</Typography>
      <Typography>Welcome {currentUser.displayName}!</Typography>
      <Typography variant="body2">Email: {currentUser.email}</Typography>
      <Typography variant="body2">UID: {currentUser.uid}</Typography>
    </Box>
  );
};

/**
 * Example 3: Complete Auth Form Component
 */
export const AuthFormExample = () => {
  const { signInGoogle, signInFacebook, loading, error } = useFirebaseAuth();
  const { isAuthenticated } = useFirebase();

  if (isAuthenticated) {
    return <Typography>Already signed in!</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Sign In Options
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        fullWidth
        variant="outlined"
        onClick={signInGoogle}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        Sign in with Google
      </Button>

      <Button
        fullWidth
        variant="outlined"
        onClick={signInFacebook}
        disabled={loading}
      >
        Sign in with Facebook
      </Button>

      {loading && <Typography sx={{ mt: 2 }}>Loading...</Typography>}
    </Box>
  );
};

/**
 * Example 4: Email/Password Auth
 */
export const EmailAuthExample = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signIn, signUp, loading, error } = useFirebaseAuth();

  const handleSignIn = async () => {
    const result = await signIn(email, password);
    if (result.success) {
      console.log('Signed in successfully');
    }
  };

  const handleSignUp = async () => {
    const result = await signUp(email, password, 'Display Name');
    if (result.success) {
      console.log('Signed up successfully');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 8 }}
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 8 }}
      />

      {error && <Typography color="error">{error}</Typography>}

      <Button onClick={handleSignIn} disabled={loading}>
        Sign In
      </Button>
      
      <Button onClick={handleSignUp} disabled={loading}>
        Sign Up
      </Button>
    </Box>
  );
};

/**
 * Example 5: Password Reset
 */
export const PasswordResetExample = () => {
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const { resetPass, loading, error } = useFirebaseAuth();

  const handleReset = async () => {
    const result = await resetPass(email);
    if (result.success) {
      setSent(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Reset Password
      </Typography>

      {sent ? (
        <Typography color="success">
          Password reset email sent! Check your inbox.
        </Typography>
      ) : (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 8 }}
          />

          {error && <Typography color="error">{error}</Typography>}

          <Button onClick={handleReset} disabled={loading}>
            Send Reset Email
          </Button>
        </>
      )}
    </Box>
  );
};
