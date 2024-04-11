import styled from 'styled-components';
import { ReactComponent as CheckIcon } from '../../assets/icons/complete.svg';
import { ReactComponent as CopyIcon } from '../../assets/icons/copy.svg';
import { ReactComponent as LinkIcon } from '../../assets/icons/link_white.svg';

import useToast from '../../hooks/useToast';
import LinkInput from '../Input/LinkInput';
import Typography from '../Typography';
import ModalContainer from './ModalContainer';

type Props = {
  onClose: () => void;
  link: string;
};

function ShareLinkModal({ onClose, link }: Props) {
  const { fireToast } = useToast();
  const handleCopyClipBoard = async () => {
    await navigator.clipboard.writeText(link);
    fireToast('링크 복사 완료!', <CheckIcon />);
  };

  return (
    <ModalContainer onClose={onClose}>
      <Wrapper>
        <Header>
          <LinkCircle>
            <LinkIcon />
          </LinkCircle>
          <Typography variant="button">링크를 공유하고 함께 학습하세요</Typography>
        </Header>
        <LinkWrapper>
          <UrlWrapper>
            <LinkInput link={link} />
          </UrlWrapper>
          <Copy type="button" onClick={async () => handleCopyClipBoard()}>
            <CopyIcon />
            <Typography variant="caption3" color="grayScale03" hoverVariant="caption1">
              링크 복사
            </Typography>
          </Copy>
        </LinkWrapper>
      </Wrapper>
    </ModalContainer>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 20px;

  gap: 32px;

  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 16px;
`;

const LinkCircle = styled.div`
  display: flex;
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  background: ${(props) => props.theme.colors.mainMint};
  box-shadow: 0px 4px 8px 0px rgba(54, 189, 180, 0.24);
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const UrlWrapper = styled.div`
  width: 347px;

  display: flex;
  padding: 5px 10px;
  align-items: center;

  border-radius: 4px;
  background: ${(props) => props.theme.colors.grayScale07};
  word-break: break-all;
`;

const Copy = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;

  cursor: pointer;
`;

export default ShareLinkModal;
