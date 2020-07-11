import * as React from 'react';
import { Flex, useTheme, Stack, Heading, Text } from '@chakra-ui/core';
import { FaGlobeAsia, FaGlobe } from 'react-icons/fa';

interface Props {
  name: string;
  country: string;
  website: string;
}

export const UniversityListItem: React.FC<Props> = ({
  name,
  country,
  website,
}) => {
  const theme = useTheme();

  return (
    <Flex
      border={theme.borders['1px']}
      borderColor={theme.colors.blackAlpha[300]}
      flexDirection="column"
      borderRadius="lg"
      backgroundColor={theme.colors.whiteAlpha[50]}
      shadow="lg"
      marginY={theme.space[1]}
    >
      <Stack spacing={3} padding={theme.space[4]}>
        <Heading as="h2" fontSize="xl">
          {name}
        </Heading>
        <Stack spacing={2}>
          <Flex alignItems="center" as="p" fontSize="sm">
            <FaGlobeAsia fill="var(--button-bg-success)" size="1.2rem" />
            <Text as="span" marginLeft=".5rem">
              {country}
            </Text>
          </Flex>
          <Flex alignItems="center" as="p" fontSize="sm">
            <FaGlobe fill="var(--button-bg-accent)" size="1.2rem" />
            <Text as="span" marginLeft=".5rem">
              {website}
            </Text>
          </Flex>
        </Stack>
      </Stack>
    </Flex>
  );
};
