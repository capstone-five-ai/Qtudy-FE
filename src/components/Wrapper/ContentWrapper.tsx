import styled from 'styled-components';

interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

// 회색 라운드 박스 컴포넌트
function ContentWrapper({ children, className }: ContentWrapperProps) {
  return <StyledContainer className={className}>{children}</StyledContainer>;
}

const StyledContainer = styled.div`
  display: flex;

  max-width: 1160px;
  height: 572px;

  background: ${(props) => props.theme.colors.grayScale08};
  border-radius: 8px;
  box-shadow: 0px 0px 4px 0px rgba(189, 189, 189, 0.28);
`;

export default ContentWrapper;
