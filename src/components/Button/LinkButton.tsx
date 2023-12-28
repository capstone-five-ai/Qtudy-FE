import { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as LinkIcon } from '../../assets/icons/link.svg';
import ShareLinkModal from '../Modal/ShareLinkModal';
import Typography from '../Typography';

type Props = {
  link: string;
};

function LinkButton({ link }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleClickLink = () => {
    setShowModal(true);
  };

  return (
    <>
      <Wrapper onClick={handleClickLink}>
        <LinkIcon />
        <Typography variant="caption3" color="grayScale03">
          링크 공유
        </Typography>
      </Wrapper>

      {showModal && <ShareLinkModal onClose={() => setShowModal(false)} link={link} />}
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

export default LinkButton;
