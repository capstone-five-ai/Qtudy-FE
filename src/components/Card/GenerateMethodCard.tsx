import { ReactComponent as TextIcon } from '@/assets/icons/input-text.svg';
import { ReactComponent as UploadIcon } from '@/assets/icons/upload-file.svg';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type GenerateMethodType = 'upload' | 'text';

interface GenerateMethodCardProps {
  type: GenerateMethodType;
}

const METHOD = {
  upload: {
    icon: <UploadIcon className="upload-icon" />,
    title: '파일 업로드',
    subtitle: '(.pdf, .txt, .jpg, .png)',
    path: '?method=upload',
  },
  text: {
    icon: <TextIcon className="text-icon" />,
    title: '텍스트 직접 입력',
    subtitle: '',
    path: '?method=text',
  },
};

function GenerateMethodCard({ type }: GenerateMethodCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(METHOD[type].path);
  };

  return (
    <StyledCard onClick={handleClick}>
      <StyledContent>
        {METHOD[type].icon}
        <div className="text-container">
          <span className="title">{METHOD[type].title}</span>
          {METHOD[type].subtitle !== '' && (
            <span className="subtitle">{METHOD[type].subtitle}</span>
          )}
        </div>
      </StyledContent>
    </StyledCard>
  );
}

export default GenerateMethodCard;

const StyledCard = styled.button`
  width: 220px;
  height: 220px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  background: ${({ theme }) => theme.colors.grayScale09};
  box-shadow: 0px 0px 8px 0px rgba(189, 189, 189, 0.2);

  transition: all 0.5s;

  &:hover {
    box-shadow: 0px 0px 8px 0px rgba(54, 189, 180, 0.24);

    .upload-icon {
      path {
        stroke: ${(props) => props.theme.colors.mainMint};
      }
      path:first-of-type {
        stroke: none;
        fill: ${(props) => props.theme.colors.mainMint};
      }
    }

    .text-icon {
      path {
        stroke: ${(props) => props.theme.colors.mainMint};
      }
      path:last-of-type {
        stroke: none;
        fill: ${(props) => props.theme.colors.mainMint};
      }
    }
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  .text-container {
    color: ${({ theme }) => theme.colors.grayScale02};
    display: flex;
    flex-direction: column;
    gap: 2px;

    .title {
      ${({ theme }) => theme.typography.subtitle};
    }

    .subtitle {
      ${({ theme }) => theme.typography.caption3};
    }
  }
`;
