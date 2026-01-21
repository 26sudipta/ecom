import React, { useState } from 'react';
import Layout from './Layout';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Send,
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate sending message (in real app, you'd send to backend)
      console.log('Contact form submitted:', formData);
      
      setSnackbarMessage('Thank you! Your message has been sent successfully.');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } else {
      setSnackbarMessage('Please fix the errors in the form');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Layout
      title="Contact Us"
      description="Get in touch with us"
      className="container"
    >
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Contact Us
          </Typography>
          <Typography variant="h6" color="text.secondary">
            We'd love to hear from you. Send us a message!
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Get In Touch
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Have questions? We're here to help!
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <Email sx={{ color: 'primary.main', mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Email
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    support@baraz.com
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <Phone sx={{ color: 'primary.main', mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Phone
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    +880 1234-567890
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <LocationOn sx={{ color: 'primary.main', mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Address
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Chittagong
                    <br />
                    Bangladesh
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Send Us a Message
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={Boolean(errors.subject)}
                      helperText={errors.subject}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      error={Boolean(errors.message)}
                      helperText={errors.message}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      sx={{ px: 5 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Map Section (Optional) */}
        <Box sx={{ mt: 6 }}>
          <Paper elevation={3} sx={{ p: 2, overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118830.95793767683!2d91.73553019999999!3d22.356851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a64095dfd3%3A0x5015cc5bcb6905d9!2sChittagong%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1705925523456!5m2!1sen!2sbd"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </Paper>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Contact;
