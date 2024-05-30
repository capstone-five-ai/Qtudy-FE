import { ReactComponent as CheckIcon } from '@/assets/icons/complete.svg';
import { ReactComponent as CopyIcon } from '@/assets/icons/copy-link.svg';
import { ReactComponent as LinkIcon } from '@/assets/icons/link.svg';
import LinkInputField from '@/components/InputField/LinkInputField';
import DefaultModal from '@/components/Modal/DefaultModal';
import useToast from '@/hooks/useToast';
import { useRef } from 'react';
import styled from 'styled-components';

type Props = {
  onClose: () => void;
  link: string;
};

function ShareLinkModal({ onClose, link }: Props) {
  const { fireToast } = useToast();
  const linkRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    if (!linkRef.current) return;
    linkRef.current.style.border = '1px solid rgba(62, 215, 205, 0.4)';
  };

  const handleBlur = () => {
    if (!linkRef.current) return;
    linkRef.current.style.border = '1px solid transparent';
  };

  const handleCopyClipBoard = async () => {
    await navigator.clipboard.writeText(link);
    fireToast({ icon: <CheckIcon />, message: '링크 복사 완료!' });
  };

  return (
    <DefaultModal height="192px" onClose={onClose} closeButton>
      <StyledModalContentContainer>
        <StyledLinkIcon>
          <LinkIcon />
        </StyledLinkIcon>
        <div className="title">링크를 공유하고 함께 학습하세요</div>
        <div className="link-container">
          <UrlWrapper
            tabIndex={0}
            ref={linkRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <LinkInputField link={link} />
          </UrlWrapper>
          <StyledLinkButton onClick={handleCopyClipBoard}>
            <CopyIcon />
            <span>링크 복사</span>
          </StyledLinkButton>
        </div>
      </StyledModalContentContainer>
    </DefaultModal>
  );
}

export default ShareLinkModal;

const StyledLinkIcon = styled.div`
  width: 36px;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 18px;
  background: ${({ theme }) => theme.colors.mainMint};
  box-shadow: 0px 4px 8px 0px rgba(54, 189, 180, 0.24);

  svg {
    width: 24px;
    height: 24px;
    path {
      stroke: ${({ theme }) => theme.colors.grayScale09};
    }
  }
`;

const StyledModalContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    ${({ theme }) => theme.typography.button};
    color: ${({ theme }) => theme.colors.grayScale02};
    margin-top: 16px;
  }

  .link-container {
    margin-top: 32px;

    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const UrlWrapper = styled.div`
  width: 349px;

  display: flex;
  padding: 5px 10px;
  align-items: center;

  border-radius: 4px;
  border: 1px solid transparent;
  background: ${(props) => props.theme.colors.grayScale07};
  word-break: break-all;
`;

const StyledLinkButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    ${({ theme }) => theme.typography.caption3};
    color: ${({ theme }) => theme.colors.grayScale03};
  }

  &:hover {
    span {
      ${({ theme }) => theme.typography.caption1};
    }
  }
`;
