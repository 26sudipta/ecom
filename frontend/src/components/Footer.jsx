import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  Store,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        mt: { xs: 4, md: 8 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Brand Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Store sx={{ fontSize: 32, mr: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                Baraz
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Your trusted destination for quality products and exceptional shopping experience.
            </Typography>
            <Box>
              <IconButton
                sx={{ color: 'white' }}
                aria-label="Facebook"
                component="a"
                href="https://facebook.com"
                target="_blank"
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{ color: 'white' }}
                aria-label="Twitter"
                component="a"
                href="https://twitter.com"
                target="_blank"
              >
                <Twitter />
              </IconButton>
              <IconButton
                sx={{ color: 'white' }}
                aria-label="Instagram"
                component="a"
                href="https://instagram.com"
                target="_blank"
              >
                <Instagram />
              </IconButton>
              <IconButton
                sx={{ color: 'white' }}
                aria-label="LinkedIn"
                component="a"
                href="https://linkedin.com"
                target="_blank"
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography
                component={Link}
                to="/"
                variant="body2"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  '&:hover': { opacity: 1, textDecoration: 'underline' },
                }}
              >
                Home
              </Typography>
              <Typography
                component={Link}
                to="/shop"
                variant="body2"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  '&:hover': { opacity: 1, textDecoration: 'underline' },
                }}
              >
                Shop
              </Typography>
              <Typography
                component={Link}
                to="/about"
                variant="body2"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  '&:hover': { opacity: 1, textDecoration: 'underline' },
                }}
              >
                About Us
              </Typography>
              <Typography
                component={Link}
                to="/contact"
                variant="body2"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  '&:hover': { opacity: 1, textDecoration: 'underline' },
                }}
              >
                Contact
              </Typography>
            </Box>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Customer Service
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography
                component={Link}
                to="/cart"
                variant="body2"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  '&:hover': { opacity: 1, textDecoration: 'underline' },
                }}
              >
                Shopping Cart
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'white', opacity: 0.9, cursor: 'pointer' }}
              >
                Track Order
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'white', opacity: 0.9, cursor: 'pointer' }}
              >
                Return Policy
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'white', opacity: 0.9, cursor: 'pointer' }}
              >
                Privacy Policy
              </Typography>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  support@baraz.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  +880 1234-567890
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOn sx={{ fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Chittagong, Bangladesh
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Copyright */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            © {new Date().getFullYear()} Baraz. All rights reserved. | Developed by{' '}
            <Typography
              component="span"
              variant="body2"
              fontWeight="bold"
              sx={{ opacity: 1 }}
            >
              Sudipta Das
            </Typography>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
