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

  const universities = data ?? [];

  if (universities.length < 1) {
    return (
      <>
        <EmptyState message="Nothing's here yet..." />
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
