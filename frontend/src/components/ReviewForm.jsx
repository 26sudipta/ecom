import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Rating,
  Typography,
  Alert,
  Paper,
} from '@mui/material';
import { isAuthenticated } from '../auth';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!comment.trim()) {
      setError('Please write a comment');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/review/create/${user._id}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId,
            rating,
            comment,
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(true);
        setComment('');
        setRating(5);
        if (onReviewSubmitted) {
          onReviewSubmitted(data);
        }
      }
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated()) {
    return (
      <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
        <Alert severity="info">
          Please sign in to leave a review
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.125rem', md: '1.25rem' } }}>
        Write a Review
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Review submitted successfully!
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            size="large"
          />
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Your Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this product..."
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          size="large"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </Box>
    </Paper>
  );
};

export default ReviewForm;
