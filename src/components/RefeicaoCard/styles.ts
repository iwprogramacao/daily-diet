import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { css } from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  border-radius: 6px;
  border: 0.5px solid ${({ theme }) => theme.COLORS.GRAY_400};
  padding: 14px 12px;
  flex-direction: row;
  align-items: center;
`;

export const Hora = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_700};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE[14]}px;
  `}
`;

export const Separator = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_400};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE[16]}px;
    border: 0.5px solid ${theme.COLORS.GRAY_400};
  `}
  margin: 0 12px;
`;

export const Refeicao = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_600};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE[16]}px;
  `}
  width: 217px;
`;

type IndicatorProps = {
  isDentroDaDieta: boolean;
};
export const DietaIndicator = styled.View<IndicatorProps>`
  border-radius: 50%;
  width: 16px;
  height: 16px;
  margin-left: 12px;
  background-color: ${({ theme, isDentroDaDieta }) =>
    isDentroDaDieta ? theme.COLORS.GREEN_MID : theme.COLORS.RED_MID};
`;

export const DietaContainerTitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE[18]}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GRAY_700};
    background-color: ${theme.COLORS.GRAY_100};
  `}
  padding-top: 26px;
  padding-bottom: 8px;
  width: 100%;
`;
