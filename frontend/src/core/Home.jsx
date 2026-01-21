import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore.js';
import Card from './Card.jsx';
import Search from './Search';
import Copyright from './Copyright.jsx';
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
      title='Home page'
      description='MERN E-commerce App'
      className='container-fluid'
    >
      <Search />
      <Container maxWidth='lg'>
        <Box sx={{ my: 4 }}>
          {/* Debug info */}
          <Typography variant='caption' color='text.secondary' sx={{ mb: 2, display: 'block' }}>
            New Arrivals: {productsByArrival.length} products | Best Sellers: {productsBySell.length} products
          </Typography>
          
          <Typography variant='h4' gutterBottom>
            New Arrivals
          </Typography>
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

          <Typography variant='h4' gutterBottom>
            Best Sellers
          </Typography>
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
        </Box>
      </Container>
      <Copyright />
    </Layout>
  );
};

export default Home;
