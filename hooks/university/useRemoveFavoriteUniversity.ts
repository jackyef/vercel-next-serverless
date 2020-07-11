import { useMutation, queryCache } from 'react-query';

const removeFavoriteEndpoint = '/api/user/remove-favorite';
export const favoriteUniversitiesCacheKey = 'universities-favorite';

export const useRemoveFavoriteUniversity = () => {
  const [removeFavoriteUniversityIndex] = useMutation(
    (index: any) =>
      fetch(removeFavoriteEndpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ index }),
      }),
    {
      // Optimistically update the cache value on mutate, but store
      // the old value and return it so that it's accessible in case of
      // an error
      onMutate: (index) => {
        queryCache.cancelQueries(favoriteUniversitiesCacheKey);

        const previousValue = queryCache.getQueryData(
          favoriteUniversitiesCacheKey,
        );

        queryCache.setQueryData(favoriteUniversitiesCacheKey, (old) => [
          // @ts-expect-error
          ...old.slice(0, index),
          // @ts-expect-error
          ...old.slice(index + 1),
        ]);

        return previousValue;
      },
      // On failure, roll back to the previous value
      onError: (_err, _variables, previousValue) =>
        queryCache.setQueryData(favoriteUniversitiesCacheKey, previousValue),
      // After success or failure, refetch thefavoriteUniversitiesCacheKey query
      onSettled: () => {
        queryCache.invalidateQueries(favoriteUniversitiesCacheKey);
      },
    },
  );

  return removeFavoriteUniversityIndex;
};
