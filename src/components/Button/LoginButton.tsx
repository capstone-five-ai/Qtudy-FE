import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as KakaoIcon } from '../../assets/icons/icon_kakao.svg';
import Typography from '../Typography';

type Props = {
  onClick?: () => void;
  children: ReactNode;
};

LoginButton.defaultProps = {
  onClick() {},
};

function LoginButton({ onClick, children }: Props) {
  return (
    <Container>
      <Button type="button" onClick={onClick}>
        <KakaoIcon />
        <Text>
          <Typography variant="button" color="kakaoBlack">
            {children}
          </Typography>
        </Text>
      </Button>
    </Container>
  );
}

const Container = styled.div`
  width: 300px;
  height: 45px;
  border-radius: 8px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.kakaoYellow};

  padding: 0px 20px;
  gap: 15px;

  cursor: pointer;
`;

const Text = styled.div`
  flex: 1;
`;

export default LoginButton;
