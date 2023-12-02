import styled from 'styled-components';

interface ContentWrapperProps {
  children: React.ReactNode;
}

// 회색 라운드 박스 컴포넌트
function ContentWrapper({ children }: ContentWrapperProps) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.grayScale08};
  border-radius: 8px;
  box-shadow: 0px 0px 4px 0px rgba(189, 189, 189, 0.28);
  //min-height: calc(100vh - 65px - 190px);
  min-height: 572px;
`;

export default ContentWrapper;
