import styled from 'styled-components';

export const CenteredLayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const CenteredLayoutContent = styled.div`
  /* Replace the values below with the desired dimensions for your div */
  /* width: 300px;
  height: 200px; */
  /* Centering styles */
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
