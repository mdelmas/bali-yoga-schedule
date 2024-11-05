import styled, { keyframes } from "styled-components";
import { COLORS } from "../../constants";

// Animation de rotation
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Composant Styled pour le loader
const LoaderWrapper = styled.div`
  width: 32px;
  aspect-ratio: 1;
  display: block;

  animation: ${spin} 1s infinite linear;
`;

const Arc = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg); /* Optionnel : démarre l'arc en haut */
  circle {
    fill: none;
    stroke-width: 6;
    stroke-linecap: round; /* Arrondit les bords */
  }
`;

const Loader = () => (
  <LoaderWrapper>
    <Arc viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="12" stroke={COLORS.lightblackblue[500]} />
      <circle
        cx="16"
        cy="16"
        r="12"
        stroke={`${COLORS.blackblue[500]}`}
        strokeDasharray="15 85"
      />
    </Arc>
  </LoaderWrapper>
);

export default Loader;
