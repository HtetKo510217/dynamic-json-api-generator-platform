import React from 'react';
import { Button, Card, CardContent, Typography, Container, Grid } from '@mui/material';

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-100 py-20">
      <Container maxWidth="lg">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Typography variant="h2" component="h1" gutterBottom className="text-gray-900 font-bold">
            Simplify Your API Development Process
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph className="text-gray-600">
            No more waiting for backend implementation. Generate dynamic JSON APIs instantly,
            <br /> customize them with ease, and start coding right away.
          </Typography>
          <div className="flex justify-center gap-4">
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="/generate"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Get Started for Free
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              href="/guide"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              View Guide
            </Button>
          </div>
        </div>

        {/* Cards Section */}
        <Grid container spacing={4}>
          {/* Why Section */}
          <Grid item xs={12} md={6}>
            <Card className="shadow-lg rounded-lg overflow-hidden h-full">
              <CardContent className="bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 p-6 flex flex-col justify-between h-full">
                <Typography variant="h5" component="h2" gutterBottom className="text-gray-900 font-semibold">
                  Why Use This Tool?
                </Typography>
                <div className="text-gray-700 flex-grow">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Speed up your development process by bypassing backend delays.</li>
                    <li>Generate mock APIs instantly and customize them with ease.</li>
                    <li>Work in parallel with your team and deliver projects faster.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* How This Works Section */}
          <Grid item xs={12} md={6}>
            <Card className="shadow-lg rounded-lg overflow-hidden h-full">
              <CardContent className="bg-gradient-to-r from-green-100 via-green-50 to-green-100 p-6 flex flex-col justify-between h-full">
                <Typography variant="h5" component="h2" gutterBottom className="text-gray-900 font-semibold">
                  How This Works
                </Typography>
                <div className="text-gray-700 flex-grow">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Build JSON schemas visually with our intuitive interface.</li>
                    <li>Generate a fully-functional API URL for immediate use in your project.</li>
                    <li>Swap out mock APIs for real backend APIs with a seamless transition.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Hero;
