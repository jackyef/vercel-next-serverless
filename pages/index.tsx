import React from 'react';
import { Flex, Divider, Box } from '@chakra-ui/core';
import Layout from '../components/Layout';
import { NavBar } from '../components/NavBar';

const Index: React.FC = () => {
  return (
    <Layout title="Home">
      <Box maxWidth={480} width="100%" margin="0 auto">
        <Flex flexDirection="column" flex="1" padding={['1rem']}>
          Hello world!
          <Divider />
        </Flex>
        <NavBar />
      </Box>
    </Layout>
  );
};

export default Index;
