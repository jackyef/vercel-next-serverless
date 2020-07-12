import * as React from 'react';
import { Skeleton } from '@chakra-ui/core';
import { AutoResponsiveGridContainer } from './List.styles';
import { UniversityListItem } from './ListItem';

export const UniversityListLoader = () => {
  return (
    <AutoResponsiveGridContainer>
      <Skeleton>
        <UniversityListItem
          name="randomName"
          country="Indonesia"
          website="placeholderwebsite"
        />
      </Skeleton>
      <Skeleton>
        <UniversityListItem
          name="randomName"
          country="Indonesia"
          website="placeholderwebsite"
        />
      </Skeleton>
      <Skeleton>
        <UniversityListItem
          name="randomName"
          country="Indonesia"
          website="placeholderwebsite"
        />
      </Skeleton>
      <Skeleton>
        <UniversityListItem
          name="randomName"
          country="Indonesia"
          website="placeholderwebsite"
        />
      </Skeleton>
    </AutoResponsiveGridContainer>
  );
};
