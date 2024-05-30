import { ReactComponent as LinkIcon } from '@/assets/icons/link.svg';
import ShareLinkModal from '@/components/Modal/ShareLinkModal';
import { useState } from 'react';
import { styled } from 'styled-components';

type Props = {
  link: string;
};

function ShareLinkButton({ link }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleClickLink = () => {
    setShowModal(true);
  };

  return (
    <>
      <Wrapper onClick={handleClickLink}>
        <LinkIcon width="20px" height="20px" />
        <span>링크 공유</span>
      </Wrapper>
      {showModal && (
        <ShareLinkModal onClose={() => setShowModal(false)} link={link} />
      )}
    </>
  );
}

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;

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

export default ShareLinkButton;
