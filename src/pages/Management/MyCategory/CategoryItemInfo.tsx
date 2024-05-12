import styled from 'styled-components';
import Typography from '../../../components/Typography';

interface CategoryItemInfoProps {
  createInfo: string;
  title: string;
}

function CategoryItemInfo({ createInfo, title }: CategoryItemInfoProps) {
  return (
    <Container>
      <Typography variant="caption3" color="mainMintDark">
        {createInfo} 생성
      </Typography>
      <div className="title-container">
        <Typography variant="body2" color="grayScale02">
          {title}
        </Typography>
      </div>
    </Container>
  );
}

export default CategoryItemInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title-container {
    & > div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
