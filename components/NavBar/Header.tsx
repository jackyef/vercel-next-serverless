import * as React from 'react';
import Router from 'next/router';
import { Flex, Box, useTheme, useColorMode, Heading } from '@chakra-ui/core';
import { MdArrowBack } from 'react-icons/md';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Button } from '../Button';
import { maxMobileWidth, maxDesktopWidth } from '../../utils/constants/dimension';

// this is just to quick testing on development
function ColorModeExample() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex fontSize="2xl">
      <Button onClick={toggleColorMode} variant="ghost">
        {colorMode === 'light' ? <FaSun /> : <FaMoon />}
      </Button>
    </Flex>
  );
}

interface Props {
  backArrow?: boolean;
}

export const Header: React.FC<Props> = ({ backArrow = false }) => {
  const theme = useTheme();

  return (
    <>
      <Flex
        height="56px"
        position="fixed"
        paddingTop={theme.space[1]}
        paddingX={theme.space[4]}
        width="100%"
        maxWidth={[maxMobileWidth, maxDesktopWidth]}
        fontSize="2xl"
        flex={1}
        top={0}
        alignItems="center"
        justifyContent="space-between"
        boxShadow="var(--shadow-under)"
        backgroundColor="var(--bg-elevated)"
      >
        <Box>
          <strong>UniversitySearch</strong>
          {backArrow ? <MdArrowBack onClick={() => Router.back()} /> : null}
        </Box>
        <ColorModeExample />
      </Flex>
      <Box height="56px" />
    </>
  );
};
