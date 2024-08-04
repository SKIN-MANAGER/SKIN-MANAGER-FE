import React from 'react';
import Head from 'next/head';
import { Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Container>
        <Typography variant="h1">Welcome to Next.js with TypeScript</Typography>
      </Container>
    </>
  );
};

export default Home;
