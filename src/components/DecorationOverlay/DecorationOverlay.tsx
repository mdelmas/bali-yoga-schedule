import styled from "styled-components";
import { motion } from "framer-motion";
import useElementDimensions from "../../hooks/useElementDimensions";
import { RefObject, useEffect, useRef, useState } from "react";

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

const EMOJI_LIMIT = 40;

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

type EmojiImageProps = {
  documentDimensions: { width: number; height: number };
  parentRef: RefObject<HTMLElement>;
};
function EmojiImage({ documentDimensions, parentRef }: EmojiImageProps) {
  const type = getRandomEmoji();
  const coordinates = getRandomCoordinates(documentDimensions);
  const rotation = getRandomNumberBetween({ min: -30, max: 30 });

  return (
    <Image
      src={`./emoji/${type}.png`}
      $coordinates={coordinates}
      $rotation={rotation}
      drag
      dragConstraints={parentRef}
    />
  );
}

function DecorationOverlay() {
  const ref = useRef<HTMLElement>(null);
  const { dimensions: documentDimensions } = useElementDimensions({ ref });

  const [insertedEmojis, setInsertedEmojis] = useState([
    <EmojiImage
      key={crypto.randomUUID()}
      documentDimensions={{ width: 100, height: 100 }}
      parentRef={ref}
    />, // to remove, for testing purpose
  ] as React.ReactElement[]);

  useEffect(() => {
    console.log("inserted emoji: ", insertedEmojis.length);
    if (insertedEmojis.length > EMOJI_LIMIT) {
      console.log("reached emoji limit...");
      return;
    }

    const interval = setInterval(() => {
      if (!documentDimensions) return;

      setInsertedEmojis((prevInsertedEmojis) => [
        ...prevInsertedEmojis,
        <EmojiImage
          key={crypto.randomUUID()}
          documentDimensions={documentDimensions}
          parentRef={ref}
        />,
      ]);
    }, 5000); // change toutes les 5 secondes

    return () => clearInterval(interval);
  }, [insertedEmojis.length, documentDimensions]);

  return (
    <StyledDecorationOverlay
      ref={ref as React.MutableRefObject<HTMLDivElement>}
    >
      {insertedEmojis}
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

  /* background-color: hsla(88, 50%, 50%, 0.5); */

  z-index: 1;
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
  transform: rotate(${(props) => props.$rotation}deg);

  pointer-events: auto;
`;

export default DecorationOverlay;
