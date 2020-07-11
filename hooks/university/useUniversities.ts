import * as React from 'react';
import qs from 'querystring';
import { useQuery } from 'react-query';
import { favoriteUniversitiesCacheKey } from './useRemoveFavoriteUniversity';

const searchEndpoint = `http://universities.hipolabs.com/search`;
const favoriteEndpoint = `/api/user/favorite-universities`;

export const useUniversities = ({ keyword = '', favorite = false }) => {
  const { data, isLoading, error } = useQuery(
    favorite ? favoriteUniversitiesCacheKey : `universities-${keyword}`,
    () => {
      if (!favorite) {
        return fetch(
          `${searchEndpoint}?${qs.stringify({ name: keyword })}`,
        ).then((res) => res.json());
      }
      return fetch(favoriteEndpoint).then((res) => res.json());
    },
    {
      enabled: keyword.length > 0 || favorite,
      staleTime: favorite ? 0 : 60 * 60 * 24, // non favorite data can just be kept in cache for a long time
    },
  );

  // only show 100 university at most, avoid perf issue for now
  // the API we are using does not support pagination
  const universities = React.useMemo(() => {
    return (Array.isArray(data) ? data.slice(0, 100) : []).map((d: any) => ({
      name: d.name,
      country: d.country,
      website: d.website || d.web_pages?.[0],
    }));
  }, [data]);

  return {
    data: universities,
    isLoading,
    error,
  };
};
