import styled from "styled-components";
import useElementDimensions from "../../hooks/useElementDimensions";
import { useRef, useState } from "react";
import useMousePosition from "../../hooks/useMousePosition";

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
  // const ref = useRef<HTMLElement>(null);
  // const { dimensions: documentDimensions } = useElementDimensions({ ref });
  const [insertedEmojis, setInsertedEmojis] = useState(
    [] as React.ReactElement[]
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("clicked!!");
    console.log("event", event.pageX, event.pageY);
    // console.log("mousePosition", mousePosition);
    // if (!mousePosition) return;

    const target = event.target as HTMLElement;

    if (!target.closest("#contentWrapper")) {
      console.log("clicked not on the interface");
      // Place un emoji si le clic n'est pas sur l'interface
      // placeEmoji(event.clientX, eevent.clientY);
    }

    setInsertedEmojis([
      ...insertedEmojis,
      <EmojiImage
        key={crypto.randomUUID()}
        coordinates={{ x: event.pageX, y: event.pageY }}
      />,
    ]);
  };

  /*
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest("#contentWrapper")) {
        // Place un emoji si le clic n'est pas sur l'interface
        placeEmoji(e.clientX, e.clientY);
      }
    };
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);
  */

  return (
    <StyledDecorationOverlay
      // ref={ref as React.MutableRefObject<HTMLDivElement>}
      onClick={handleClick}
    >
      {insertedEmojis}
    </StyledDecorationOverlay>
  );
}

const StyledDecorationOverlay = styled.button`
  min-height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  /* pointer-events: none; */

  background-color: hsla(88, 50%, 50%, 0.5);
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
