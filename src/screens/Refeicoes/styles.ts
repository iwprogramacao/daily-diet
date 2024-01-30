import { SafeAreaView } from 'react-native-safe-area-context';
import { css } from 'styled-components';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  padding: 24px;
`;

export const Logo = styled.Image`
  height: 36px;
  width: 82px;
`;

export const ButtonTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_700};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE[16]}px;
  `}
  margin-top: 38px;
  margin-bottom: 8px;
`;
