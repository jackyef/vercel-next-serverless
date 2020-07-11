import qs from 'querystring';
import { useQuery } from 'react-query';

const searchEndpoint = `http://universities.hipolabs.com/search`;

export const useUniversities = ({ keyword = '' }) => {
  return useQuery(`universities-${keyword}`, () =>
    fetch(
      `${searchEndpoint}?${qs.stringify({ name: keyword })}`,
    ).then((res) => res.json()),
    {
      enabled: keyword.length > 0,
      staleTime: 60 * 60 * 24, // we know these data are mostly static, let's just keep them in cache to avoid refetching
    }
  );
};
