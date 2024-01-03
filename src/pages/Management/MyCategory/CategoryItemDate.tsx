import styled from 'styled-components';
import Typography from '../../../components/Typography';
import { ReactComponent as ArrowIcon } from '../../../assets/icons/long_arrow.svg';

interface CategoryItemDateProps {
  createDate: string;
  updateDate: string;
}

function CategoryItemDate({ createDate, updateDate }: CategoryItemDateProps) {
  return (
    <Container>
      <div className="date">
        <Typography variant="caption2" color="grayScale04">
          생성 일자
        </Typography>
        <Typography variant="caption3" color="grayScale04">
          {new Date(createDate).toLocaleDateString().replace(/.$/, '')}
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
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
    </Container>
  );
}

export default CategoryItemDate;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .date {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
`;
