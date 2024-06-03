import styled from 'styled-components';

interface DefaultSidebarProps {
  children?: React.ReactNode;
  className?: string;
}

function DefaultSidebar({ children, className }: DefaultSidebarProps) {
  return <StyledContainer className={className}>{children}</StyledContainer>;
}

export default DefaultSidebar;

const StyledContainer = styled.div`
  width: 360px;
  padding: 0 36px;
  margin: 24px 0;
  border-left: 1px solid ${({ theme }) => theme.colors.grayScale06};
`;
