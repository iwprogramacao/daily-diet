import { ArrowLeft } from 'phosphor-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { css } from 'styled-components/native';

type HeaderCardStyleProps = {
  type?: 'PRIMARY' | 'SECONDARY';
};

type StatisticsCardStyleProps = {
  type: 'PRIMARY' | 'SECONDARY' | 'NEUTRAL';
};

export const Container = styled(SafeAreaView)<HeaderCardStyleProps>`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const HeaderCard = styled.View<HeaderCardStyleProps>`
  background-color: ${({ theme, type }) =>
    type === 'PRIMARY' ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT};
  height: 200px;
  padding: 80px 24px;
  margin-top: -60px;
`;

export const SetaEsquerda = styled(ArrowLeft)<HeaderCardStyleProps>`
  color: ${({ theme, type }) =>
    type === 'PRIMARY' ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK};
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

export const Content = styled.View`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: -20px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  flex: 1;
  padding: 36px 24px;
`;

export const Texto = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_700};
    font-size: ${theme.FONT_SIZE[14]}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
  align-self: center;
  margin-bottom: 24px;
`;

export const SidedCards = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const Card = styled.View<StatisticsCardStyleProps>`
  background-color: ${({ theme, type }) =>
    type === 'NEUTRAL'
      ? theme.COLORS.GRAY_200
      : type === 'PRIMARY'
        ? theme.COLORS.GREEN_LIGHT
        : theme.COLORS.RED_LIGHT};
  width: ${({ type }) => (type === 'NEUTRAL' ? '327px' : '158px')};
  height: ${({ type }) => (type === 'NEUTRAL' ? '88px' : '108px')};
  justify-content: space-evenly;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 12px;
  gap: 12px;
  align-self: center;
  padding: 24px;
`;

export const CardTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_700};
    font-size: ${theme.FONT_SIZE[24]}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
  align-self: center;
`;

export const CardSubtitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_700};
    font-size: ${theme.FONT_SIZE[14]}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
  align-self: center;
  text-align: center;
`;
