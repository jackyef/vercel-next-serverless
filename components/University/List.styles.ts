import styled from '@emotion/styled';

export const AutoResponsiveGridContainer = styled.div(`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`);