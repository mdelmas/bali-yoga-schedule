import styled from "styled-components";
import useElementDimensions from "../../hooks/useElementDimensions";
import { useRef, useState } from "react";
import useMousePosition from "../../hooks/useMousePosition";
import { X } from "lucide-react";

import Button from "../Button";
import { ButtonSize, ButtonVariant } from "../Button/ButtonParameters";

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

const getRandomEmoji = () => {
  const random = getRandomNumberBetween({
    min: 0,
    max: Object.keys(EMOJI).length - 1,
  });
  return Object.values(EMOJI)[random] as EMOJI;
};

function EmojiImage({
  coordinates,
}: {
  coordinates: { x: number; y: number };
}) {
  const type = getRandomEmoji();
  // const coordinates = { x: 50, y: 50 };
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
  const [emojiMode, setEmojiMode] = useState(false);
  const [insertedEmojis, setInsertedEmojis] = useState(
    [] as React.ReactElement[]
  );

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setInsertedEmojis([
      ...insertedEmojis,
      <EmojiImage
        key={crypto.randomUUID()}
        coordinates={{ x: event.pageX, y: event.pageY }}
      />,
    ]);
  };

  return (
    <StyledDecorationOverlay
      onClick={(event) => handleClick(event)}
      $emojiMode={emojiMode}
    >
      {insertedEmojis}
      <StyledButton
        variant={emojiMode ? ButtonVariant.FILLED : ButtonVariant.LIGHT_FILLED}
        size={ButtonSize.SMALL}
        onClick={(event) => {
          setEmojiMode(!emojiMode);
          event.stopPropagation();
        }}
      >
        {emojiMode ? <X size={10} /> : "play with emoji mode ✨"}
      </StyledButton>
    </StyledDecorationOverlay>
  );
}
const StyledButton = styled(Button)`
  position: absolute;

  bottom: 32px;
  right: 32px;

  pointer-events: auto;
`;

const StyledDecorationOverlay = styled.div<{ $emojiMode: boolean }>`
  min-height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  pointer-events: ${(props) => (props.$emojiMode ? "auto" : "none")};
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
  transform: translate(-50%, -50%) rotate(${(props) => props.$rotation}deg);
`;

export default DecorationOverlay;
