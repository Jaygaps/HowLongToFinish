import type { NextPage } from "next";
import { useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";

import Layout from "../../components/Layout";
import Link from "next/link";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  padding: 0 16px;
  background-color: ${({ theme: { colors } }) => colors.backgroundDark};
  color: ${({ theme: { colors } }) => colors.secondary};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin: 20px 0 60px 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  ${({ theme: { media } }) => css`
    ${media.up("tablet")} {
      flex-direction: row;
    }
  `};
`;

const Title = styled.h2``;

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
  margin: 0 16px;
  display: inline-block;
  background: transparent;
  border-radius: 4px;
  padding: 20px;
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
  margin-bottom: 20px;
`;

const TypeAheadWrapper = styled.div`
  ${({ theme: { media } }) => css`
    display: grid;
    grid-template-columns: 1fr;

    ${media.up("tablet")} {
      grid-template-columns: 1fr 1fr;
    }

    ${media.up("desktop")} {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  `};
  gap: 20px;
`;

const TypeAheadCard = styled.div`
  background-color: ${({ theme: { colors } }) => colors.primary};
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  border-radius: 20px;
  position: relative;

  border: 1px solid #222;

  > img {
    border-radius: 20px;
  }

  cursor: pointer;
  &:hover {
    background-color: ${({ theme: { colors } }) => colors.secondary};
    color: ${({ theme: { colors } }) => colors.primary};
    transition: all 0.6s;
  }
`;

const Card = styled.div<{ imageSrc: string }>`
  ${({ theme: { colors, media }, imageSrc }) => css`
    background-color: ${colors.primary};
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    padding: 30px;
    border-bottom: 1px solid white;
    margin-top: 20px;

    background-image: none;

    ${media.up("tablet")} {
      background-image: url(${imageSrc});
    }
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

const MobileImage = styled.img`
  width: 100%;
  margin-top: 24px;
  border-radius: 13px;

  ${({ theme: { media } }) => css`
    ${media.up("tablet")} {
      display: none;
    }
  `};
`;

const Dev = styled.p`
  color: grey;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #f8f8f8;
  }
`;

const Popularity = styled.div`
  position: absolute;
  right: 0;
  background-color: white;
  padding: 10px;
  border-radius: 20px;
  color: black;
  font-weight: bold;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  min-height: 750px;
  background-color: white;
  border-radius: 20px;
  min-height: 296px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Home: NextPage = () => {
  const [episode, setEpisode] = useState(1);
  const [showName, setShowName] = useState("");
  const [typeAheadShows, setTypeAheadShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState<any>({});

  const handleOnChangeShow = (e: any) => {
    if (e.target.value === "") {
      setShowName("");
      setSelectedShow({});

      return;
    }
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

  const imgSrc = `https://image.tmdb.org/t/p/w500${selectedShow.backdrop_path}`;

  const daysToCompleteShow = selectedShow.number_of_episodes / episode ?? 1;

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
        <Header>
          <Title>How Long To Binge</Title>
          <div>
            <Link href="https://www.linkedin.com/in/jayraj-surti-b736bb138/">
              <Dev>Dev by JayGaps</Dev>
            </Link>
            <label>ZINC Development</label>
          </div>
        </Header>

        <FlexWrapper>
          <Paragraph>I will be watching</Paragraph>
          <EpisodeInput
            type="number"
            value={episode}
            onChange={(e) => setEpisode(e.target.value)}
          />
          <Paragraph>episode(s) per day...</Paragraph>
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
          <>
            <MobileImage src={imgSrc} />
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
          </>
        ) : (
          <TypeAheadWrapper>
            {typeAheadShows && typeAheadShows !== undefined
              ? typeAheadShows.map((show: any, index) => (
                  <TypeAheadCard
                    key={index}
                    onClick={() => handleSelectedShow(show.id)}
                  >
                    <Popularity>{show.vote_average * 10}%</Popularity>
                    {show.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                        width="100%"
                      />
                    ) : show.backdrop_path ? (
                      <img
                        width="100%"
                        src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
                      />
                    ) : (
                      <PlaceholderImage>No image</PlaceholderImage>
                    )}
                    <CardContent>
                      <h3>{show.name}</h3>
                    </CardContent>
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
