import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import {
  Box,
  Container,
  Typography,
  Paper,
  Rating,
  Avatar,
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const url = `${apiUrl}/reviews?limit=10`;
      console.log('ReviewSlider - Fetching reviews from:', url);
      
      const response = await fetch(url);
      console.log('ReviewSlider - Response status:', response.status);
      
      const data = await response.json();
      console.log('ReviewSlider - Reviews data:', data);
      
      if (data && Array.isArray(data)) {
        console.log('ReviewSlider - Setting reviews, count:', data.length);
        setReviews(data);
      } else {
        console.log('ReviewSlider - Data is not an array:', data);
      }
    } catch (err) {
      console.error('ReviewSlider - Error loading reviews:', err);
    }
  };

  const settings = {
    dots: true,
    infinite: reviews.length > 1,
    speed: 500,
    slidesToShow: Math.min(3, reviews.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, reviews.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (reviews.length === 0) {
    return null;
  }

  return (
    <Box sx={{ bgcolor: 'grey.50', py: { xs: 4, md: 8 }, my: { xs: 3, md: 6 }, px: { xs: 2, sm: 0 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: { xs: 4, md: 6 }, fontWeight: 'bold', fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
        
          Customer Reviews
        </Typography>

        <Slider {...settings}>
          {reviews.map((review, index) => (
            <Box key={index} sx={{ px: 2 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  borderRadius: 2,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <FormatQuoteIcon
                  sx={{
                    fontSize: 48,
                    color: 'primary.main',
                    opacity: 0.2,
                    position: 'absolute',
                    top: 16,
                    right: 16,
                  }}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      mr: 2,
                      width: 56,
                      height: 56,
                    }}
                  >
                    {review.userName?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {review.userName}
                    </Typography>
                    <Rating value={review.rating} readOnly size="small" />
                  </Box>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    flexGrow: 1,
                    fontStyle: 'italic',
                    color: 'text.secondary',
                  }}
                >
                  "{review.comment}"
                </Typography>

                {review.product && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 'auto' }}
                  >
                    Product: {review.product.name}
                  </Typography>
                )}

                <Typography variant="caption" color="text.secondary">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default ReviewSlider;
