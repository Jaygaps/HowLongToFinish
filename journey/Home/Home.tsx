import type { NextPage } from "next";
import { useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";

import Layout from "../../components/Layout";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  padding: 0 16px;
  background-color: ${({ theme: { colors } }) => colors.backgroundDark};
  color: ${({ theme: { colors } }) => colors.secondary};
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 20px 0 60px 0; ;
`;

const FlexWrapper = styled.div`
  displat: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const Paragraph = styled.p`
  font-size: 40px;
  font-weight: 600;
  display: inline-block;
`;

const SmallParagraph = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-left: 14px;
  display: inline-block;
  cursor: pointer;
`;

const EpisodeInput = styled.input`
  border: 3px solid ${({ theme: { colors } }) => colors.secondary};
  display: inline-block;
  background: transparent;
  border-radius: 4px;
  padding: 20px;
  margin: 0 16px;
  color: ${({ theme: { colors } }) => colors.secondary};
  font-size: 24px;
  max-width: 100px;
  text-align: center;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const MainInput = styled.input`
  border: 3px solid ${({ theme: { colors } }) => colors.secondary};
  display: inline-block;
  background: transparent;
  border-radius: 4px;
  padding: 20px;
  color: ${({ theme: { colors } }) => colors.secondary};
  font-size: 24px;
`;

const TypeAheadWrapper = styled.div``;

const TypeAheadCard = styled.div`
  background-color: ${({ theme: { colors } }) => colors.primary};
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  padding: 30px;
  border-bottom: 1px solid white;

  cursor: pointer;
  &:hover {
    background-color: ${({ theme: { colors } }) => colors.secondary};
    color: ${({ theme: { colors } }) => colors.primary};
    transition: all 0.6s;
  }
`;

const Card = styled.div<{ imageSrc: string }>`
  ${({ theme: { colors }, imageSrc }) => css`
    background-color: ${colors.primary};
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    padding: 30px;
    border-bottom: 1px solid white;
    margin-top: 20px;

    background-image: url(${imageSrc});
    background-position: right;
    background-size: contain;
    background-repeat: no-repeat;
  `};
`;

const Span = styled.p`
  color: grey;
`;

const LargeFont = styled.p<{ inline?: boolean }>`
  ${({ inline }) => (inline ? `display: block` : `display: inline-block;`)};
  font-size: 20px;
  color: white;
  font-weight: 600;
`;

const MediumFont = styled.p<{ inline?: boolean }>`
  display: inline-block;
  font-size: 16px;
  color: grey;
  font-weight: 600;
`;

const Spacer = styled.div`
  margin-bottom: 20px;
`;

const Home: NextPage = () => {
  const [episode, setEpisode] = useState(1);
  const [showName, setShowName] = useState("");
  const [typeAheadShows, setTypeAheadShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState({});

  const handleOnChangeShow = (e: any) => {
    setSelectedShow({});
    setShowName(e.target.value);
    axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=54e8661cf9f6d1d987d2cc01a5a1e2d8&language=en-US&query=${e.target.value}`
      )
      .then((results) => setTypeAheadShows(results.data.results));
  };

  const handleSelectedShow = (showId: number) => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${showId}?api_key=54e8661cf9f6d1d987d2cc01a5a1e2d8&language=en-US`
      )
      .then((result) => setSelectedShow(result.data));
  };

  console.log(selectedShow);

  const imgSrc = `https://image.tmdb.org/t/p/w500${selectedShow.backdrop_path}`;

  const daysToCompleteShow = selectedShow.number_of_episodes / episode;

  function timeConvert(n: number) {
    const num = n;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + " hour(s) and " + rminutes + " minute(s)";
  }

  return (
    <Layout>
      <Container>
        <Title>How Long To Finish</Title>
        <FlexWrapper>
          <Paragraph>I will be watching</Paragraph>
          <EpisodeInput
            type="number"
            value={episode}
            onChange={(e) => setEpisode(e.target.value)}
          />
          <Paragraph>episodes per day...</Paragraph>
        </FlexWrapper>

        <MainInput
          placeholder="Show name"
          value={showName}
          onChange={(e) => handleOnChangeShow(e)}
        />
        {showName && showName.length ? (
          <SmallParagraph
            onClick={() => {
              setShowName("");
              setTypeAheadShows([]);
              setSelectedShow({});
            }}
          >
            Clear
          </SmallParagraph>
        ) : null}
        {selectedShow && selectedShow.name ? (
          <Card imageSrc={imgSrc}>
            <Paragraph>{selectedShow.name}</Paragraph>
            <Span>
              Number of episodes:{" "}
              <LargeFont>{selectedShow.number_of_episodes}</LargeFont>
            </Span>
            <Span>
              Number of seasons:{" "}
              <LargeFont>{selectedShow.number_of_seasons}</LargeFont>
            </Span>
            <Span>
              Episode run time:{" "}
              <LargeFont>{selectedShow.episode_run_time[0]} mins</LargeFont>
            </Span>
            <Spacer />
            <LargeFont inline>
              It will take you {Math.round(daysToCompleteShow)} days to finish
              this show{" "}
            </LargeFont>
            <MediumFont>
              {episode} episodes will take{" "}
              {timeConvert(selectedShow.episode_run_time[0] * episode)} per
              day...
            </MediumFont>
          </Card>
        ) : (
          <TypeAheadWrapper>
            {typeAheadShows && typeAheadShows !== undefined
              ? typeAheadShows.map((show, index) => (
                  <TypeAheadCard
                    key={index}
                    onClick={() => handleSelectedShow(show.id)}
                  >
                    {show.name}
                  </TypeAheadCard>
                ))
              : null}
          </TypeAheadWrapper>
        )}
      </Container>
    </Layout>
  );
};

export default Home;
