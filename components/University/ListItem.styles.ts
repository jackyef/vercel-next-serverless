import { css } from 'emotion';

export const variants = {
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0
    };
  }
};

export const universityCard = css`
  display: flex;
  flex: 1;
  flex-direction: column;
`;