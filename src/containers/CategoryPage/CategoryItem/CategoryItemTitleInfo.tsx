import Typography from '@/components/Typography/Typography';
import styled from 'styled-components';

interface CategoryItemTitleInfoProps {
  createInfo: string;
  title: string;
}

function CategoryItemTitleInfo({
  createInfo,
  title,
}: CategoryItemTitleInfoProps) {
  return (
    <Container>
      <Typography variant="caption3" color="mainMintDark">
        {createInfo}
      </Typography>
      <div className="title-container">
        <Typography variant="body2" color="grayScale02">
          {title}
        </Typography>
      </div>
    </Container>
  );
}

export default CategoryItemTitleInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  .title-container {
    & > div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
