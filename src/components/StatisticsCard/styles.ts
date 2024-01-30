import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { css } from 'styled-components/native';
import { ArrowUpRight } from 'phosphor-react-native';

type ContainerProps = {
  type?: 'PRIMARY' | 'SECONDARY';
};
export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 100%;
  height: 108px;
  margin-top: 32px;
  border-radius: 8px;
  padding: 6px;

  background-color: ${({ theme, type }) =>
    type === 'PRIMARY' ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT};
`;

type ArrowStyleProps = {
  type?: 'PRIMARY' | 'SECONDARY';
};
export const Arrow = styled(ArrowUpRight)<ArrowStyleProps>`
  ${({ theme, type }) => css`
    color: ${type === 'PRIMARY'
      ? theme.COLORS.GREEN_DARK
      : theme.COLORS.RED_DARK};
    align-self: flex-end;
  `};
`;

export const Percentage = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_700};
    font-size: ${theme.FONT_SIZE[32]}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
  margin-top: -16px;
  align-self: center;
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_700};
    font-size: ${theme.FONT_SIZE[16]}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
  align-self: center;
`;
