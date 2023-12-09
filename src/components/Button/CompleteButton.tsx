import styled from 'styled-components';
import Typography from '../Typography';

function CompleteButton({ ...props }) {
  return (
    <Button {...props}>
      <Typography variant="detail" color="mainMintDark">
        완료
      </Typography>
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--main-mint_dark, #36bdb4);
  background: var(--grayscale09, #fff);

  cursor: pointer;
`;

export default CompleteButton;
