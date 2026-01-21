import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Rating,
  Avatar,
  Divider,
  Alert,
} from '@mui/material';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/reviews/product/${productId}`
      );
      const data = await response.json();
      if (data && Array.isArray(data)) {
        setReviews(data);
      }
    } catch (err) {
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography>Loading reviews...</Typography>;
  }

  if (reviews.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No reviews yet. Be the first to review this product!
      </Alert>
    );
  }

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Customer Reviews ({reviews.length})
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating value={averageRating} readOnly precision={0.1} />
          <Typography variant="body1">
            {averageRating.toFixed(1)} out of 5
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {reviews.map((review, index) => (
          <Paper key={index} sx={{ p: 3 }} elevation={1}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                {review.userName?.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {review.userName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {review.comment}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ProductReviews;
