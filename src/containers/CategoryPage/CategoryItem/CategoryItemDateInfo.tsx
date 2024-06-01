import { ReactComponent as ArrowIcon } from '@/assets/icons/long-arrow.svg';
import Typography from '@/components/Typography/Typography';
import { convertToKRTime } from '@/utils/convertToKRTime';
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
          {convertToKRTime(createDate)}
        </Typography>
      </div>
      <div
        style={{
          width: '100%',
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
            {convertToKRTime(updateDate)}
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
  width: 100%;

  .date {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
`;
