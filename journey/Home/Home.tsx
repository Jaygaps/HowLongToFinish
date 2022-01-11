import type { NextPage } from "next";
import { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";

import Layout from "../../components/Layout";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.backgroundDark};
  color: ${({ theme: { colors } }) => colors.secondary};
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 20px 0 60px 0; ;
`;

const Paragraph = styled.p`
  font-size: 40px;
  font-weight: 600;
`;

const EpisodeInput = styled.input`
  border: 2px solid ${({ theme: { colors } }) => colors.secondary};
`;

const Home: NextPage = () => {
  const themeContext = useContext(ThemeContext);
  const [episode, setEpisode] = useState(0);

  console.log(themeContext);
  return (
    <Layout>
      <Container>
        <Title>How Long To Finish</Title>
        <Paragraph>I will be watching</Paragraph>
        <EpisodeInput
          type="number"
          value={episode}
          onChange={(e) => setEpisode(e.target.value)}
        />
      </Container>
    </Layout>
  );
};

export default Home;
