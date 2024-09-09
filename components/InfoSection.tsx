'use client';
import React from 'react';
import { Card, CardContent, Typography, Container, Grid } from '@mui/material';
import { MdApi, MdBuild, MdLink } from 'react-icons/md'; 

const features = [
  {
    title: 'API Generation',
    description: 'Easily generate customizable JSON APIs tailored to your project needs. No coding required, just configure and deploy.',
    icon: <MdApi size={40} className="text-blue-500" />
  },
  {
    title: 'CRUD Operations',
    description: 'Manage your data effortlessly with built-in Create, Read, Update, and Delete operations for your APIs.',
    icon: <MdBuild size={40} className="text-green-500" />
  },
  {
    title: 'Instant API URLs',
    description: 'Get instant, ready-to-use API endpoints upon creation, allowing you to integrate them into your projects immediately.',
    icon: <MdLink size={40} className="text-red-500" />
  }
];

const InfoSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className="shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <Typography variant="h6" component="div" className="font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="text-gray-600">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default InfoSection;
