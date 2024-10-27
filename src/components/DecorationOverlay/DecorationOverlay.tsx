import styled from "styled-components";
import { RefObject, useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";

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
  parentRef,
}: {
  coordinates: { x: number; y: number };
  parentRef: RefObject<HTMLElement>;
}) {
  const rotation = getRandomNumberBetween({ min: -30, max: 30 });
  const [type, setType] = useState(getRandomEmoji());
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Image
      src={`./emoji/${type}.png`}
      $coordinates={coordinates}
      $rotation={rotation}
      onClick={(event) => {
        if (isDragging) {
          event.stopPropagation();
          setIsDragging(false);
          return;
        }
        setType(getRandomEmoji());
      }}
      drag
      dragConstraints={parentRef}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{
        rotate: rotation,
        x: "-50%",
        y: "-50%",
      }}
    />
  );
}

function DecorationOverlay() {
  const ref = useRef<HTMLElement>(null);

  const [insertedEmojis, setInsertedEmojis] = useState(
    [] as React.ReactElement[]
  );

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setInsertedEmojis([
      ...insertedEmojis,
      <EmojiImage
        key={crypto.randomUUID()}
        coordinates={{ x: event.pageX, y: event.pageY }}
        parentRef={ref}
      />,
    ]);
  };

  return (
    <>
      <EmojiOverlay ref={ref as React.MutableRefObject<HTMLDivElement>}>
        {insertedEmojis}
      </EmojiOverlay>
      <ClickableOverlay onClick={(event) => handleClick(event)} />
    </>
  );
}

const ClickableOverlay = styled.div`
  min-height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  height: 100%;
  width: 100%;

  z-index: -1;

  pointer-events: auto;
`;

const EmojiOverlay = styled.div`
  min-height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  height: 100%;
  width: 100%;

  z-index: 1;

  pointer-events: none;
`;

const Image = styled(motion.img)<{
  $coordinates: { x: number; y: number };
  $rotation: number;
}>`
  height: 24px;
  width: 24px;

  position: absolute;
  top: ${(props) => props.$coordinates.y}px;
  left: ${(props) => props.$coordinates.x}px;
  transform: translate(-50%, -50%) rotate(${(props) => props.$rotation}deg);

  pointer-events: auto;
  cursor: grab;
`;

export default DecorationOverlay;
