import "./App.css";
import styled from "styled-components";

import Schedule from "./components/Schedule";
import Button from "./components/Button";
import {
  ButtonSize,
  ButtonVariant,
} from "./components/Button/ButtonParameters";
import DecorationOverlay from "./components/DecorationOverlay";

function App() {
  return (
    <AppWrapper>
      <DecorationOverlay />

      <Header>
        <Logo src="./logo.svg" />
        <Button variant={ButtonVariant.OUTLINED} size={ButtonSize.SMALL}>
          CANGGU
        </Button>
      </Header>

      <Schedule />

      <Footer>
        <p>
          Built and developped by{" "}
          <Link href="https://github.com/mdelmas">@mdelmas</Link>
        </p>
        <p>
          <Link href="mailto:morgane.delmas@pm.me">Shoot me a message</Link> for
          any suggestion ✦
        </p>
      </Footer>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 64px;

  min-height: 100%;

  max-width: 640px;

  margin: 0 auto;
  padding: 32px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 16px;
`;
const Logo = styled.img`
  user-select: none;
`;

const Footer = styled.div`
  font-size: ${10 / 16}rem;

  text-align: center;
`;

const Link = styled.a`
  text-decoration: underline;
`;

export default App;
