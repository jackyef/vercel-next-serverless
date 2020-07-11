import React from 'react';
import { Flex, Divider } from '@chakra-ui/core';
import Layout from '../components/Layout';
import { UniversityList } from '../components/University/List';
import { PageWrapper } from '../components/Wrapper/Page';

const Index: React.FC = () => {
  return (
    <Layout title="Home">
      <PageWrapper header={false} bottomNavBar>
        <Flex flexDirection="column" flex="1" padding={['1rem']}>
          <UniversityList keyword="middle" />
          <Divider />
        </Flex>
      </PageWrapper>
    </Layout>
  );
};

export default Index;
