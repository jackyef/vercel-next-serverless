import * as React from 'react';
import Layout from '../../components/Layout';
import { Header } from '../../components/NavBar/Header';
import { NavBar } from '../../components/NavBar';
import { SideNavBar } from '../../components/NavBar/Sidebar';
import { Box, Flex, Grid } from '@chakra-ui/core';
import { hideScrollBar } from '../../styles/utils';

interface WrapperProps {
  title?: string;
  header?: boolean;
  bottomNavBar?: boolean;
  backArrow?: boolean;
  sideNavBar?: boolean;
}

export const PageWrapper: React.FC<WrapperProps> = ({
  children,
  title = '',
  header = true,
  bottomNavBar = false,
  backArrow = false,
  sideNavBar = true,
}) => (
  <Layout title={title}>
    <Box maxWidth={960} width="100vw" margin="0 auto">
      {header ? <Header backArrow={backArrow} /> : null}
      <Grid gridTemplateColumns={['1fr', 'minmax(150px, 25%) 1fr']}>
        {sideNavBar ? (
          <Box display={['none', 'block']}>
            <SideNavBar />
          </Box>
        ) : null}
        <Flex className={hideScrollBar} flexDirection="column" flex="1" padding="2.5rem 1rem" maxH="92vh" overflowY="scroll">
          {children}
        </Flex>
      </Grid>
      {bottomNavBar ? (
        <Box display={['block', 'none']}>
          <NavBar />
        </Box>
      ) : null}
    </Box>
  </Layout>
);
