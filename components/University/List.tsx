import * as React from 'react';
import { useUniversities } from '../../hooks/university/useUniversities';
import { ErrorState } from '../State/Error';
import { EmptyState } from '../State/Empty';
import { AutoResponsiveGridContainer } from './List.styles';
import { UniversityListItem } from './ListItem';
import { useRemoveFavoriteUniversity } from '../../hooks/university/useRemoveFavoriteUniversity';
import { useAddFavoriteUniversity } from '../../hooks/university/useAddFavoriteUniversity';
import { AnimatePresence } from 'framer-motion';
import { UniversityListLoader } from './ListLoader';

interface Props {
  keyword?: string;
  favorite?: boolean;
}

export const UniversityList: React.FC<Props> = ({
  keyword = '',
  favorite = false,
}) => {
  const { isLoading, error, data } = useUniversities({ keyword, favorite });
  const removeFavoriteUniversityIndex = useRemoveFavoriteUniversity();
  const addFavoriteUniversity = useAddFavoriteUniversity();

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
    return <UniversityListLoader />;
  }

  if (data.length < 1) {
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
      <AnimatePresence>
        {data.map((u: any, i: number) => (
          <UniversityListItem
            // The university doesn't provide unique ID, the best we can do is to use the name...
            key={u.name}
            name={u.name}
            country={u.country}
            website={u.website}
            onRemove={
              favorite ? () => removeFavoriteUniversityIndex(i) : undefined
            }
            onAdd={!favorite ? () => addFavoriteUniversity(u) : undefined}
          />
        ))}
      </AnimatePresence>
    </AutoResponsiveGridContainer>
  );
};
