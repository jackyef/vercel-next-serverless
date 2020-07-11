import * as React from 'react';
import Router from 'next/router';
import { Flex, Text, useTheme, Stack, useColorMode } from '@chakra-ui/core';
import { MdAccountCircle, MdSearch } from 'react-icons/md';
import { AiFillHeart, AiOutlineLogin } from 'react-icons/ai';
import { canUseDOM } from '../../utils/constants';
import { AuthContext } from '../../context/Auth';

export const SideNavBar: React.FC = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { isAuthenticated, signin } = React.useContext(AuthContext);
  const currentPath = canUseDOM ? Router.pathname : '';
  const usedAlpha = colorMode === 'light' ? 'blackAlpha' : 'whiteAlpha';

  return (
    <>
      <Flex
        width="100%"
        height="100%"
        flex={1}
        flexDirection="column"
        paddingY="2.5rem"
        borderRight="1px solid"
        borderColor={theme.colors[usedAlpha][200]}
      >
        <Stack spacing={4}>
          <Flex
            flex={1}
            padding="0.5rem 1rem"
            flexDirection="row"
            alignItems="center"
            onClick={() => Router.push('/')}
            backgroundColor={
              currentPath === '/' ? theme.colors[usedAlpha][100] : 'inherit'
            }
          >
            <MdSearch size={32} />
            <Text fontSize="xl" marginLeft="1rem">Search</Text>
          </Flex>
          {isAuthenticated ? (
            <Flex
              padding="0.5rem 1rem"
              flex={1}
              flexDirection="row"
              alignItems="center"
              onClick={() => Router.push('/favorites')}
              backgroundColor={
                currentPath === '/favorites'
                  ? theme.colors[usedAlpha][100]
                  : 'inherit'
              }
            >
              <AiFillHeart size={32} />
              <Text fontSize="xl" marginLeft="1rem">Favorites</Text>
            </Flex>
          ) : null}

          {isAuthenticated ? (
            <Flex
              padding="0.5rem 1rem"
              flex={1}
              flexDirection="row"
              alignItems="center"
              onClick={() => Router.push('/account')}
              backgroundColor={
                currentPath === '/account'
                  ? theme.colors[usedAlpha][100]
                  : 'inherit'
              }
            >
              <MdAccountCircle size={32} />
              <Text fontSize="xl" marginLeft="1rem">Account</Text>
            </Flex>
          ) : (
            <Flex
              padding="0.5rem 1rem"
              flex={1}
              flexDirection="row"
              alignItems="center"
              onClick={() => signin('google', { callbackUrl: currentPath })}
              backgroundColor="inherit"
            >
              <AiOutlineLogin size={32} />
              <Text fontSize="xl" marginLeft="1rem">Sign in</Text>
            </Flex>
          )}
        </Stack>
      </Flex>
    </>
  );
};
