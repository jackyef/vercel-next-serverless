import { useMutation, queryCache } from 'react-query';
import { favoriteUniversitiesCacheKey } from './useRemoveFavoriteUniversity';
import { useToast } from '@chakra-ui/core';

const addFavoriteEndpoint = '/api/user/add-favorite';

export const useAddFavoriteUniversity = () => {
  const toast = useToast();
  const [addFavoriteUniversityIndex] = useMutation(
    ({ name, country, website }: any) => {
      toast({
        description: 'Adding to your favorites...',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });

      return fetch(addFavoriteEndpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ name, country, website }),
      });
    },
    {
      onSuccess: () => {
        toast({
          title: `Success`,
          description: 'Added the university to your favorites!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      },
      // After success or failure, refetch thefavoriteUniversitiesCacheKey query
      onSettled: () => {
        queryCache.invalidateQueries(favoriteUniversitiesCacheKey);
      },
    },
  );

  return addFavoriteUniversityIndex;
};
