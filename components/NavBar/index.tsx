import * as React from 'react';
import Router from 'next/router';
import { Flex, Text, Box, useTheme } from '@chakra-ui/core';
import { MdAccountCircle, MdSearch } from 'react-icons/md';
import { AiFillHeart, AiOutlineLogin } from 'react-icons/ai';
import { canUseDOM } from '../../utils/constants';
import { AuthContext } from '../../context/Auth';
import { maxDesktopWidth, maxMobileWidth } from '../../utils/constants/dimension';

export const NavBar: React.FC = () => {
  const theme = useTheme();
  const { isAuthenticated, signin } = React.useContext(AuthContext);
  const currentPath = canUseDOM ? Router.pathname : '';

  return (
    <>
      <Box height="64px" />
      <Flex
        position="fixed"
        width="100%"
        maxWidth={[maxMobileWidth, maxDesktopWidth]}
        flex={1}
        bottom={0}
        alignItems="center"
        justifyContent="center"
        boxShadow="var(--shadow-over)"
        backgroundColor="var(--bg-elevated)"
        paddingY="0px"
      >
        <Flex
          flex={1}
          paddingY={theme.space[1]}
          flexDirection="column"
          alignItems="center"
          onClick={() => Router.push('/')}
          backgroundColor={
            currentPath === '/' ? theme.colors.blackAlpha[50] : 'inherit'
          }
        >
          <MdSearch size={24} />
          <Text fontSize="xs">Search</Text>
        </Flex>
        {isAuthenticated ? (
          <Flex
            paddingY={theme.space[1]}
            flex={1}
            flexDirection="column"
            alignItems="center"
            onClick={() => Router.push('/favorites')}
            backgroundColor={
              currentPath === '/favorites'
                ? theme.colors.blackAlpha[50]
                : 'inherit'
            }
          >
            <AiFillHeart size={24} />
            <Text fontSize="xs">Favorites</Text>
          </Flex>
        ) : null}

        {isAuthenticated ? (
          <Flex
            paddingY={theme.space[1]}
            flex={1}
            flexDirection="column"
            alignItems="center"
            onClick={() => Router.push('/account')}
            backgroundColor={
              currentPath === '/account'
                ? theme.colors.blackAlpha[50]
                : 'inherit'
            }
          >
            <MdAccountCircle size={24} />
            <Text fontSize="xs">Account</Text>
          </Flex>
        ) : (
          <Flex
            paddingY={theme.space[1]}
            flex={1}
            flexDirection="column"
            alignItems="center"
            onClick={() => signin('google', { callbackUrl: currentPath })}
            backgroundColor="inherit"
          >
            <AiOutlineLogin size={24} />
            <Text fontSize="xs">Sign in</Text>
          </Flex>
        )}
      </Flex>
    </>
  );
};
