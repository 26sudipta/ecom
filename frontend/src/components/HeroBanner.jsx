import React from 'react';
import Slider from 'react-slick';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HeroBanner = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: 'linear',
    pauseOnHover: true,
  };

  const slides = [
    {
      id: 1,
      title: 'Welcome to Our Store',
      subtitle: 'Discover Amazing Products at Unbeatable Prices',
      description: 'Shop the latest trends in electronics, fashion, and more',
      buttonText: 'Shop Now',
      buttonLink: '/shop',
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
    },
    {
      id: 2,
      title: 'New Arrivals',
      subtitle: 'Fresh Collection Just Landed',
      description: 'Explore our newest products and be the first to own them',
      buttonText: 'View Collection',
      buttonLink: '/shop',
      backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200',
    },
    {
      id: 3,
      title: 'Special Offers',
      subtitle: 'Up to 50% Off on Selected Items',
      description: 'Don\'t miss out on our exclusive deals and discounts',
      buttonText: 'Get Deals',
      buttonLink: '/shop',
      backgroundColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200',
    },
  ];

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', mb: 4 }}>
      <Slider {...settings}>
        {slides.map((slide) => (
          <Box key={slide.id}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: '400px', sm: '500px', md: '600px' },
                background: slide.backgroundColor,
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              {/* Background Image with Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.3,
                  zIndex: 0,
                }}
              />

              {/* Content */}
              <Container
                maxWidth="lg"
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                    mb: 2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    animation: 'fadeInUp 0.8s ease-out',
                    '@keyframes fadeInUp': {
                      from: {
                        opacity: 0,
                        transform: 'translateY(30px)',
                      },
                      to: {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                  }}
                >
                  {slide.title}
                </Typography>

                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
                    mb: 2,
                    textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
                    animation: 'fadeInUp 0.8s ease-out 0.2s backwards',
                  }}
                >
                  {slide.subtitle}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
                    mb: 4,
                    maxWidth: '600px',
                    mx: 'auto',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    animation: 'fadeInUp 0.8s ease-out 0.4s backwards',
                  }}
                >
                  {slide.description}
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate(slide.buttonLink)}
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    fontWeight: 'bold',
                    backgroundColor: 'white',
                    color: 'primary.main',
                    animation: 'fadeInUp 0.8s ease-out 0.6s backwards',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {slide.buttonText}
                </Button>
              </Container>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroBanner;
