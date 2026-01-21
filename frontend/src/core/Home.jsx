import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore.js';
import Card from './Card.jsx';
import Search from './Search';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import ReviewSlider from '../components/ReviewSlider';
import { Box, Container, Typography } from '@mui/material';

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);

  const loadProductsBySell = () => {
    console.log('Home - Loading products by sell...');
    getProducts('sold').then((data) => {
      console.log('Home - Products by sell response:', data);
      if (data && data.error) {
        setError(data.error);
      } else if (data && Array.isArray(data)) {
        console.log('Home - Setting products by sell:', data.length, 'products');
        setProductsBySell(data);
      } else {
        console.log('Home - Products by sell: no valid data, setting empty array');
        setProductsBySell([]);
      }
    }).catch((err) => {
      console.error('Error loading products by sell:', err);
      setProductsBySell([]);
    });
  };

  const loadProductsByArrival = () => {
    console.log('Home - Loading products by arrival...');
    getProducts('createdAt').then((data) => {
      console.log('Home - Products by arrival response:', data);
      if (data && data.error) {
        setError(data.error);
      } else if (data && Array.isArray(data)) {
        console.log('Home - Setting products by arrival:', data.length, 'products');
        setProductsByArrival(data);
      } else {
        console.log('Home - Products by arrival: no valid data, setting empty array');
        setProductsByArrival([]);
      }
    }).catch((err) => {
      console.error('Error loading products by arrival:', err);
      setProductsByArrival([]);
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title=''
      description=''
      className='container-fluid'
      hideHeader={true}
    >
      <HeroBanner />
      <Search />
      <Container maxWidth='lg' sx={{ px: { xs: 2, sm: 3 } }}>
        <Box sx={{ my: { xs: 3, md: 4 } }}>
          <Typography variant='h4' gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 'bold' }}>
            New Arrivals
          </Typography>
          
          {productsByArrival.length === 0 ? (
            <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
              Loading products...
            </Typography>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: 3,
                mb: 4,
              }}
            >
              {Array.isArray(productsByArrival) && productsByArrival.map((product, i) => (
                <Card key={i} product={product} />
              ))}
            </Box>
          )}

          <Typography variant='h4' gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 'bold' }}>
            Best Sellers
          </Typography>
          
          {productsBySell.length === 0 ? (
            <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
              Loading products...
            </Typography>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: 3,
              }}
            >
              {Array.isArray(productsBySell) && productsBySell.map((product, i) => (
                <Card key={i} product={product} />
              ))}
            </Box>
          )}
        </Box>
      </Container>
      <ReviewSlider />
      <Footer />
    </Layout>
  );
};

export default Home;
