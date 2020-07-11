import * as React from 'react';
import { useUniversities } from '../../hooks/university/useUniversities';
import { ErrorState } from '../State/Error';
import FullPageLoader from '../Spinner/FullPage';
import { EmptyState } from '../State/Empty';
import { AutoResponsiveGridContainer } from './List.styles';
import { UniversityListItem } from './ListItem';

interface Props {
  keyword?: string;
}

export const UniversityList: React.FC<Props> = ({ keyword = '' }) => {
  const { isLoading, error, data } = useUniversities({ keyword });

  console.log({ isLoading, error, data });

  if (error) {
    if (error instanceof Error) {
      console.error(`error`, error.toString());
      console.error(`stack`, error.stack);
    }

    return (
      <ErrorState message="An error happened when trying to get universities list 🙇" />
    );
  }

  if (isLoading) {
    return <FullPageLoader message="Loading universities..." />;
  }

  // only show 100 university at most, avoid perf issue for now
  // the API we are using does not support pagination
  const universities = data ? data.slice(0, 100) : []; 

  if (universities.length < 1) {
    return (
      <>
        <EmptyState
          message={
            !keyword
              ? `Nothing's here yet... Try searching for something!`
              : `We couldn't find anything that's related with the keyword "${keyword}". Try another keyword.`
          }
        />
      </>
    );
  }

  return (
    <AutoResponsiveGridContainer>
      {universities.map((u: any, i: number) => (
        <UniversityListItem
          key={`${u.name}-${i}`}
          name={u.name}
          country={u.country}
          website={u.web_pages[0]}
        />
      ))}
    </AutoResponsiveGridContainer>
  );
};
