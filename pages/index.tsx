import React from 'react';
import { Flex, Divider, Heading, Input, Text } from '@chakra-ui/core';
import Layout from '../components/Layout';
import { UniversityList } from '../components/University/List';
import { PageWrapper } from '../components/Wrapper/Page';

const Index: React.FC = () => {
  const [keyword, setKeyword] = React.useState('');
  const keywordRef = React.useRef(null);
  const updaterTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateKeyword = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;

    if (updaterTimeout.current) {
      clearTimeout(updaterTimeout.current);
    }

    updaterTimeout.current = setTimeout(() => {
      setKeyword(value);
    }, 300); // throttle for 300ms
  };

  return (
    <Layout title="Home">
      <PageWrapper title="Search for universities" header bottomNavBar>
        <Heading as="h1">Search</Heading>
        <Flex flexDirection="column" flex="1" paddingY="1rem">
          <Input
            type="text"
            name="university-name"
            ref={keywordRef}
            placeholder="Search for universities by name..."
            onChange={updateKeyword}
          />
          {keyword ? (
            <Heading marginY="1rem" fontSize="md">
              Showing results for &quot;{keyword}&quot;...
            </Heading>
          ) : null}
          <UniversityList keyword={keyword} />
          <Divider />
        </Flex>
      </PageWrapper>
    </Layout>
  );
};

export default Index;
