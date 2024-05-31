import { ReactComponent as DeleteIcon } from '@/assets/icons/trash.svg';
import SaveToCategoryButton from '@/components/Button/SaveToCategoryButton';
import ShareLinkButton from '@/components/Button/ShareLinkButton';
import Sidebar from '@/components/Sidebar/Sidebar';
import styled from 'styled-components';

interface CategorySidebarProps {
  isAuthenticated: boolean;
}

function CategorySidebar({ isAuthenticated }: CategorySidebarProps) {
  return (
    <StyledSidebar>
      <StyledContentContainer>
        <StyledOtherItemContainer>
          <button type="button" className="other-item">
            <span className="title">Pre</span>
            <p className="content">
              Q. 인공지능은 무엇을 모방할 수 있는 기술 및 연구 분야인가요?
            </p>
          </button>
          <div className="current-item">
            <p className="content">
              Q. 인공지능은 무엇을 모방할 수 있는 기술 및 연구 분야인가요?
            </p>
            <DeleteIcon width={20} height={20} cursor="pointer" />
          </div>
          <button type="button" className="other-item">
            <span className="title">Next</span>
            <p className="content">
              Q. 인공지능은 무엇을 모방할 수 있는 기술 및 연구 분야인가요?
            </p>
          </button>
        </StyledOtherItemContainer>
        <StyledButtonContainer>
          <ShareLinkButton link="" />
          <SaveToCategoryButton disabled={!isAuthenticated} />
        </StyledButtonContainer>
      </StyledContentContainer>
    </StyledSidebar>
  );
}

export default CategorySidebar;

const StyledSidebar = styled(Sidebar)`
  padding: 0;
`;

const StyledContentContainer = styled.div`
  height: 100%;
  padding: 16px 36px 0 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledOtherItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    width: 276px;
    padding-left: 28px;

    ${({ theme }) => theme.typography.caption3};
    color: ${({ theme }) => theme.colors.grayScale03};
    white-space: pre-line;
    word-break: break-all;
  }

  .other-item {
    display: flex;
    flex-direction: column;
    text-align: left;

    .title {
      ${({ theme }) => theme.typography.body2};
      color: rgba(54, 189, 180, 0.72);
      padding-left: 28px;
    }
  }

  .current-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
    position: relative;

    .content {
      color: ${({ theme }) => theme.colors.grayScale01};
    }

    &::before {
      content: '';
      width: 2px;
      height: 100%;
      position: absolute;
      top: 0;
      left: -1px;
      background-color: ${({ theme }) => theme.colors.mainMint};
    }
  }
`;

const StyledButtonContainer = styled.div`
  padding-left: 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 30px;
`;
