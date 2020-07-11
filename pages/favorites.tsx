import React from 'react';
import { Flex, Divider, Heading } from '@chakra-ui/core';
import { UniversityList } from '../components/University/List';
import { PageWrapper } from '../components/Wrapper/Page';

const Index: React.FC = () => {
  return (
    <PageWrapper title="Your favorite universities" header bottomNavBar>
      <Heading as="h1">Favorites</Heading>
      <Flex flexDirection="column" flex="1" paddingY="1rem">
        <UniversityList favorite />
        <Divider />
      </Flex>
    </PageWrapper>
  );
};

export default Index;
