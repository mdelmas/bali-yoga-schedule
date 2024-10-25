import "./App.css";
import styled from "styled-components";

import Schedule from "./components/Schedule";
import Button from "./components/Button";
import {
  ButtonSize,
  ButtonVariant,
} from "./components/Button/ButtonParameters";

function App() {
  return (
    <AppWrapper>
      <Header>
        <Logo src="../public/logo.svg" />
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
  display: flex;
  flex-direction: column;
  gap: 64px;

  max-width: 600px;

  margin: 64px auto;

  min-height: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 16px;
`;
const Logo = styled.img``;

const Footer = styled.div`
  font-size: ${12 / 16}rem;

  text-align: center;
`;

const Link = styled.a`
  text-decoration: underline;
`;

export default App;
