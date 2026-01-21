import React from 'react';
import Layout from './Layout';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  Security,
  LocalShipping,
  Support,
  Verified,
  TrendingUp,
  Group,
} from '@mui/icons-material';

const About = () => {
  const features = [
    {
      icon: <Security sx={{ fontSize: 50 }} />,
      title: 'Secure Shopping',
      description: 'Your data and transactions are protected with industry-leading security measures.',
    },
    {
      icon: <LocalShipping sx={{ fontSize: 50 }} />,
      title: 'Fast Delivery',
      description: 'Get your products delivered quickly with our reliable shipping partners.',
    },
    {
      icon: <Support sx={{ fontSize: 50 }} />,
      title: '24/7 Support',
      description: 'Our customer support team is always ready to help you with any questions.',
    },
    {
      icon: <Verified sx={{ fontSize: 50 }} />,
      title: 'Quality Products',
      description: 'We ensure all products meet our high quality standards before listing.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 50 }} />,
      title: 'Best Prices',
      description: 'Competitive pricing with regular deals and discounts for our customers.',
    },
    {
      icon: <Group sx={{ fontSize: 50 }} />,
      title: 'Community Driven',
      description: 'Join thousands of satisfied customers in our growing community.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Products' },
    { number: '500+', label: 'Brands' },
    { number: '99%', label: 'Satisfaction Rate' },
  ];

  return (
    <Layout
      title="About Us"
      description="Learn more about our e-commerce platform"
      className="container"
    >
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, sm: 3 } }}>
        {/* Hero Section */}
        <Box sx={{ mb: { xs: 4, md: 8 }, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            About Baraz
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mt: 2 }}>
            Your trusted destination for quality products and exceptional shopping experience
          </Typography>
        </Box>

        {/* Story Section */}
        <Paper elevation={3} sx={{ p: 6, mb: 6 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Our Story
              </Typography>
              <Typography variant="body1" paragraph>
                Founded in 2024, Baraz began with a simple mission: to make online
                shopping easier, safer, and more enjoyable for everyone. We recognized the need
                for a platform that combines cutting-edge technology with personalized service.
              </Typography>
              <Typography variant="body1" paragraph>
                Today, we're proud to serve thousands of customers worldwide, offering a curated
                selection of products from trusted brands. Our commitment to quality, security,
                and customer satisfaction drives everything we do.
              </Typography>
              <Typography variant="body1">
                We leverage advanced technologies including AI-powered recommendations and secure
                payment processing to ensure you have the best shopping experience possible.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop"
                alt="Our Team"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Stats Section */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Typography variant="h3" color="primary" fontWeight="bold">
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold" sx={{ mb: 6 }}>
            Why Choose Us
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 3,
                    textAlign: 'center',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 80,
                      height: 80,
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Mission & Vision */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
                Our Mission
              </Typography>
              <Typography variant="body1" color="text.secondary">
                To revolutionize online shopping by providing a seamless, secure, and personalized
                experience that connects customers with quality products. We strive to make
                e-commerce accessible, trustworthy, and enjoyable for everyone.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
                Our Vision
              </Typography>
              <Typography variant="body1" color="text.secondary">
                To become the most trusted and innovative e-commerce platform globally, where
                technology and human connection create exceptional shopping experiences. We envision
                a future where every customer finds exactly what they need, effortlessly.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Values Section */}
        <Paper elevation={3} sx={{ p: 6, bgcolor: 'grey.50' }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
            Our Core Values
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
                  Integrity
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We operate with honesty and transparency in all our dealings
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
                  Innovation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We continuously improve and adopt new technologies
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
                  Customer First
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your satisfaction and success are our top priorities
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
                  Excellence
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We strive for the highest standards in everything we do
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default About;
