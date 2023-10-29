import styled from 'styled-components';
import type { Width, Height } from '../../types';

export const ScalableSVG = styled.svg<Width & Height>`
  width: ${({ width }) => width || '1.5rem'};
  width: ${({ height }) => height || '1.5rem'};
`;
