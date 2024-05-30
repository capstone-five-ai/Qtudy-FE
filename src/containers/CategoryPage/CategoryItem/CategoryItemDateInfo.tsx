import { ReactComponent as ArrowIcon } from '@/assets/icons/long-arrow.svg';
import Typography from '@/components/Typography/Typography';
import styled from 'styled-components';

interface CategoryItemDateInfoProps {
  createDate: string;
  updateDate: string;
}

function CategoryItemDateInfo({
  createDate,
  updateDate,
}: CategoryItemDateInfoProps) {
  return (
    <StyledContainer>
      <div className="date">
        <Typography variant="caption2" color="grayScale04">
          생성 일자
        </Typography>
        <Typography variant="caption3" color="grayScale04">
          {new Date(createDate).toLocaleDateString().replace(/.$/, '')}
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div className="date">
          <Typography variant="caption2" color="grayScale04">
            최근 수정
          </Typography>
          <Typography variant="caption3" color="grayScale04">
            {new Date(updateDate).toLocaleDateString().replace(/.$/, '')}
          </Typography>
        </div>
        <ArrowIcon className="icon" />
      </div>
    </StyledContainer>
  );
}

export default CategoryItemDateInfo;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .date {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
`;
