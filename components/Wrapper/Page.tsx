import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { Header } from '../../components/NavBar/Header';
import { NavBar } from '../../components/NavBar';
import { SideNavBar } from '../../components/NavBar/Sidebar';
import { Box, Flex, Grid } from '@chakra-ui/core';
import { hideScrollBar } from '../../styles/utils';
import { canUseDOM } from '../../utils/constants';

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
}) => {
  const currentPath = canUseDOM ? Router.pathname : '/';
  
  return (
    <Layout title={title}>
      <Box maxWidth={960} width="100vw" margin="0 auto">
        {header ? <Header backArrow={backArrow} /> : null}
        <Grid gridTemplateColumns={['1fr', '1fr', 'minmax(150px, 25%) 1fr']}>
          {sideNavBar ? (
            <Box display={['none', 'none', 'block']}>
              <SideNavBar />
            </Box>
          ) : null}
          <AnimatePresence exitBeforeEnter initial={false}>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -200 }}
              exit={{ opacity: 0, y: -200 }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            >
              <Flex
                key={currentPath}
                className={hideScrollBar}
                flexDirection="column"
                flex="1"
                padding="2.5rem 1rem"
                maxH="92vh"
                overflowY="scroll"
              >
                {children}
              </Flex>
            </motion.div>
          </AnimatePresence>
        </Grid>
        {bottomNavBar ? (
          <Box display={['block', 'block', 'none']}>
            <NavBar />
          </Box>
        ) : null}
      </Box>
    </Layout>
  );
};
