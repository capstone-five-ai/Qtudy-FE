import { ReactComponent as Arrow } from '@/assets/icons/long-arrow.svg';
import Typography from '@/components/Typography';
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  icon: ReactNode;
  title: string;
  subTitle: string;
  content: string;
  svgType: 'fill' | 'stroke';
  selected: boolean;
  selectedIdx: number;
  path: string;
};

function Card({
  icon,
  title,
  subTitle,
  content,
  svgType,
  selected,
  selectedIdx,
  path,
}: Props) {
  const navigate = useNavigate();

  const handleClickMenu = () => {
    navigate(path);
  };

  const fillOption = {
    fill: selected ? '#3ED7CD' : '#9e9e9e',
  };

  const strokeOption = {
    stroke: selected ? '#3ED7CD' : '#9e9e9e',
  };

  const getOption = () => {
    if (svgType === 'fill') return { ...fillOption };
    return { ...strokeOption };
  };

  return (
    <Container
      $selected={selected}
      $selectedIdx={selectedIdx}
      onClick={handleClickMenu}
    >
      <Center>
        <TitleContainer>
          {React.cloneElement(icon as React.ReactElement, getOption())}
          <TextContainer>
            <Typography variant="h2">{title}</Typography>
            <Typography variant="h4" color="grayScale03">
              {subTitle}
            </Typography>
          </TextContainer>
        </TitleContainer>
        <TextContainer>
          <Typography variant="body1" color="grayScale04">
            {content}
          </Typography>
        </TextContainer>
      </Center>
      {selected && (
        <ArrowWrapper>
          <Arrow />
        </ArrowWrapper>
      )}
    </Container>
  );
}

const Container = styled.div<{ $selected: boolean; $selectedIdx: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 296px;
  height: 420px;

  gap: 64px;

  border-radius: 12px;
  background: ${(props) => props.theme.colors.grayScale09};
  box-shadow: 0px 0px 24px 0px rgba(189, 189, 189, 0.2);

  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 24px 0px rgba(54, 189, 180, 0.2);

    transform: ${(props) => props.$selected && 'scale(105%)'};
    transition: 300ms;
  }

  transform: ${(props) =>
    props.$selectedIdx > -1 && !props.$selected && 'scale(95%)'};
  transition: 300ms;
`;

const Center = styled.div`
  width: 160px;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 64px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  > div {
    text-align: center;
    white-space: pre-wrap;
  }
`;

const ArrowWrapper = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
`;

export default Card;
