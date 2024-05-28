import { ReactComponent as Arrow } from '@/assets/icons/long-arrow.svg';
import Typography from '@/components/Typography';
import { cloneElement } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

type Props = {
  icon: JSX.Element;
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

  const iconWithClass = cloneElement(icon, {
    className: svgType,
  });

  return (
    <Container
      $selected={selected}
      $selectedIdx={selectedIdx}
      onClick={handleClickMenu}
    >
      <Center>
        <TitleContainer $selected={selected}>
          {iconWithClass}
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

const TitleContainer = styled.div<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;

  ${({ $selected }) =>
    !$selected &&
    css`
      .fill path {
        fill: ${({ theme }) => theme.colors.grayScale04};
      }

      .stroke path {
        stroke: ${({ theme }) => theme.colors.grayScale04};
      }
    `}
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
