import styled from "styled-components";
import { RefObject, useRef, useState } from "react";
import { motion } from "framer-motion";

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

type EmojiInfos = {
  id: string;
  coordinates: { x: number; y: number };
  type: EMOJI;
  rotation: number;
};

const EMOJI_SIZE = 24;

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

function Emoji({
  coordinates,
  type,
  rotation,
  parentRef,
  handleClick,
  handleDoubleClick,
}: {
  id: string;
  coordinates: { x: number; y: number };
  type: EMOJI;
  rotation: number;
  parentRef: RefObject<HTMLElement>;
  handleClick: () => void;
  handleDoubleClick: () => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Image
      src={`./emoji/${type}.png`}
      onClick={(event) => {
        if (isDragging) {
          event.stopPropagation();
          setIsDragging(false);
          return;
        }

        handleClick();
      }}
      onDoubleClick={() => {
        handleDoubleClick();
      }}
      initial={coordinates}
      drag
      dragConstraints={parentRef}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{
        rotate: rotation,
        x: `-${EMOJI_SIZE / 2}px`,
        y: `-${EMOJI_SIZE / 2}px`,
      }}
    />
  );
}

function DecorationOverlay() {
  const ref = useRef<HTMLElement>(null);

  const [insertedEmojis, setInsertedEmojis] = useState<EmojiInfos[]>([]);

  const addEmoji = (event: React.MouseEvent<HTMLDivElement>) => {
    setInsertedEmojis([
      ...insertedEmojis,
      {
        id: crypto.randomUUID(),
        coordinates: { x: event.pageX, y: event.pageY },
        rotation: getRandomNumberBetween({ min: -30, max: 30 }),
        type: getRandomEmoji(),
      },
    ]);
  };

  const changeEmoji = (id: string) => {
    setInsertedEmojis(
      insertedEmojis.map((emoji) => {
        let newType;
        do {
          newType = getRandomEmoji();
        } while (newType === emoji.type);

        return emoji.id === id ? { ...emoji, type: newType } : emoji;
      })
    );
  };

  const removeEmoji = (id: string) => {
    setInsertedEmojis(insertedEmojis.filter((emoji) => emoji.id !== id));
  };

  return (
    <>
      <EmojiOverlay ref={ref as React.MutableRefObject<HTMLDivElement>}>
        {insertedEmojis.map((emoji) => (
          <Emoji
            key={emoji.id}
            {...emoji}
            parentRef={ref}
            handleClick={() => changeEmoji(emoji.id)}
            handleDoubleClick={() => removeEmoji(emoji.id)}
          />
        ))}
      </EmojiOverlay>
      <ClickableOverlay onClick={(event) => addEmoji(event)} />
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

const Image = styled(motion.img)`
  height: ${EMOJI_SIZE}px;
  width: ${EMOJI_SIZE}px;

  position: absolute;

  pointer-events: auto;
  cursor: grab;
`;

export default DecorationOverlay;
