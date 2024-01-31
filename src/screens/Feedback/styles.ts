import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { css } from 'styled-components/native';

type TitleTextStyleProps = {
  type: 'PRIMARY' | 'SECONDARY';
};

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Title = styled.Text<TitleTextStyleProps>`
  ${({ theme, type }) => css`
    color: ${type === 'PRIMARY'
      ? theme.COLORS.GREEN_DARK
      : theme.COLORS.RED_DARK};
    font-size: ${theme.FONT_SIZE[24]}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
  margin-bottom: 8px;
  margin-top: -24px;
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_700};
    font-size: ${theme.FONT_SIZE[16]}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
  margin-bottom: 42px;
  text-align: center;
`;

export const BoldSubtitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_700};
    font-size: ${theme.FONT_SIZE[16]}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`;

export const Image = styled.Image`
  width: 224px;
  height: 288px;
  margin-bottom: 60px;
`;
