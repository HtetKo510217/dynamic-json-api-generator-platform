import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const features = [
  {
    title: 'API Generation',
    description: 'Quickly generate dynamic JSON APIs tailored to your needs.'
  },
  {
    title: 'CRUD Operations',
    description: 'Perform Create, Read, Update, and Delete operations seamlessly.'
  },
  {
    title: 'User Authentication',
    description: 'Secure your APIs with built-in user authentication.'
  }
];

const InfoSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-lg">
              <CardContent>
                <Typography variant="h5" component="div">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
