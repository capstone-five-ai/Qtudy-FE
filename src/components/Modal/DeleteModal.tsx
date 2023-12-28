import styled from 'styled-components';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import DefaultButton from '../Button/DefaultButton';
import Typography from '../Typography';
import ModalContainer from './ModalContainer';

type Props = {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
};

function DeleteModal({ title, onCancel, onConfirm }: Props) {
  return (
    <ModalContainer>
      <Wrapper>
        <Header>
          <DeleteCircle>
            <DeleteIcon />
          </DeleteCircle>
          <Typography variant="button">{title}</Typography>
        </Header>

        <ButtonWrapper>
          <DefaultButton size="small" onClick={onCancel} theme="gray">
            취소
          </DefaultButton>
          <DefaultButton size="small" onClick={onConfirm}>
            삭제
          </DefaultButton>
        </ButtonWrapper>
      </Wrapper>
    </ModalContainer>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 44px;

  padding: 44px 0 21px 0;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const DeleteCircle = styled.div`
  display: flex;
  width: 36px;
  height: 36px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  background: var(--grayscale08, #fcfcfc);
  box-shadow: 0px 4px 8px 0px rgba(54, 189, 180, 0.24);
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 36px;
`;

export default DeleteModal;
