import Scrollbar from '@/components/Scrollbar/Scrollbar';
import Typography from '@/components/Typography/Typography';
import { GenerateUserSummaryItem } from '@/types/summary.type';
import styled from 'styled-components';

interface SummaryCheckFormProps {
  summary: GenerateUserSummaryItem;
}

function SummaryCheckForm({ summary }: SummaryCheckFormProps) {
  return (
    <>
      <StyledTitleWrapper>
        <Typography variant="subtitle" color="mainMintDark">
          제목
        </Typography>
        <Typography variant="subtitle" color="grayScale02">
          {summary.summaryTitle}
        </Typography>
      </StyledTitleWrapper>
      <StyledContentWrapper>
        <div className="content">{summary.summaryContent}</div>
      </StyledContentWrapper>
    </>
  );
}

export default SummaryCheckForm;

const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const StyledContentWrapper = styled.div`
  overflow-y: scroll;
  ${Scrollbar};

  .content {
    ${({ theme }) => theme.typography.body3};
    color: ${({ theme }) => theme.colors.grayScale02};
    white-space: pre-wrap;
  }
`;
