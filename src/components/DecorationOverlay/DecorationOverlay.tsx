import styled from "styled-components";
import useElementDimensions from "../../hooks/useElementDimensions";
import { useRef } from "react";

enum EMOJI {
  Coconut = "coconut",
  Hibiscus = "hibiscus",
  Monkey = "monkey",
  Ocean = "ocean",
  PalmTree = "palm_tree",
  Shell = "shell",
  Sparkles = "sparkles",
  Sunny = "sunny",
  WomanMeditating = "woman_in_lotus_position",
  WomanSurfing = "woman-surfing",
}

const getRandomNumberBetween = ({ min, max }: { min: number; max: number }) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomCoordinates = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return {
    x: getRandomNumberBetween({ min: 0, max: width - 24 * 3 }),
    y: getRandomNumberBetween({
      min: 0,
      max: height - 24 * 3,
    }),
  };
};

const getRandomEmoji = () => {
  const random = getRandomNumberBetween({
    min: 0,
    max: Object.keys(EMOJI).length - 1,
  });
  return Object.values(EMOJI)[random] as EMOJI;
};

function EmojiImage({
  documentDimensions,
}: {
  documentDimensions: { width: number; height: number };
}) {
  const type = getRandomEmoji();
  const coordinates = getRandomCoordinates(documentDimensions);
  const rotation = getRandomNumberBetween({ min: -30, max: 30 });

  return (
    <Image
      src={`./emoji/${type}.png`}
      $coordinates={coordinates}
      $rotation={rotation}
    />
  );
}

function DecorationOverlay() {
  const ref = useRef<HTMLElement>(null);
  const { dimensions: documentDimensions } = useElementDimensions({ ref });

  return (
    <StyledDecorationOverlay
      ref={ref as React.MutableRefObject<HTMLDivElement>}
    >
      {documentDimensions && (
        <EmojiImage documentDimensions={documentDimensions} />
      )}
    </StyledDecorationOverlay>
  );
}

const StyledDecorationOverlay = styled.div`
  min-height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  pointer-events: none;

  background-color: hsla(88, 50%, 50%, 0.5);

  z-index: 1;
`;

const Image = styled.img<{
  $coordinates: { x: number; y: number };
  $rotation: number;
}>`
  height: 24px;
  width: 24px;

  position: absolute;
  top: ${(props) => props.$coordinates.y}px;
  left: ${(props) => props.$coordinates.x}px;
  transform: rotate(${(props) => props.$rotation}deg);
`;

export default DecorationOverlay;
