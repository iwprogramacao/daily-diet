import { ArrowLeft } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from 'src/theme';
import styled from 'styled-components/native';
import { css } from 'styled-components/native';

type BooleanButtonStyleProps = {
  type: 'DEFAULT' | 'PRIMARY' | 'SECONDARY';
  isBotaoSelecionado: boolean | null;
};

type BooleanButtonIndicatorStyle = {
  type: 'PRIMARY' | 'SECONDARY';
};

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const HeaderCard = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GRAY_300};
  height: 130px;
  padding: 68px 24px 0px;
  margin-top: -60px;
`;

export const SetaEsquerda = styled(ArrowLeft)`
  color: ${({ theme }) => theme.COLORS.GRAY_600};
`;

export const HeaderTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_700};
    font-size: ${theme.FONT_SIZE[18]}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
  align-self: center;
  margin-top: -24px;
`;

export const Content = styled.View`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: -20px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  flex: 1;
  padding: 36px 24px 0px;
`;

export const InputTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_700};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE[14]}px;
  `}
  margin-bottom: 6px;
`;

export const InputText = styled.TextInput`
  min-height: 48px;
  max-height: 48px;
  width: 100%;
  border: 0.5px solid ${({ theme }) => theme.COLORS.GRAY_400};
  border-radius: 6px;
  padding: 12px;
  font-size: ${({ theme }) => theme.FONT_SIZE[16]}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-bottom: 32px;
`;

export const LargeInputText = styled.TextInput`
  min-height: 130px;
  max-height: 130px;
  width: 100%;
  border: 0.5px solid ${({ theme }) => theme.COLORS.GRAY_400};
  border-radius: 6px;
  padding: 12px;
  font-size: ${({ theme }) => theme.FONT_SIZE[16]}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-bottom: 32px;
`;

export const SidedInputs = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const BooleanButton = styled(TouchableOpacity)<BooleanButtonStyleProps>`
  width: 48.5%;
  min-height: 50px;
  max-height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  flex-direction: row;

  ${({ theme, type, isBotaoSelecionado }) => css`
    background-color: ${theme.COLORS.GRAY_300};
    border: 1px solid
      ${!isBotaoSelecionado
        ? theme.COLORS.GRAY_300
        : type === 'PRIMARY'
          ? theme.COLORS.GREEN_DARK
          : theme.COLORS.RED_DARK};
    background-color: ${!isBotaoSelecionado
      ? theme.COLORS.GRAY_300
      : type === 'PRIMARY'
        ? theme.COLORS.GREEN_LIGHT
        : theme.COLORS.RED_LIGHT};
  `}
`;

export const BooleanButtonText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_700};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE[14]}px;
  `}
`;

export const BooleanButtonIndicator = styled.View<BooleanButtonIndicatorStyle>`
  border-radius: 50%;
  width: 8px;
  height: 8px;
  margin-right: 8px;

  background-color: ${({ theme, type }) =>
    type === 'PRIMARY' ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK};
`;
