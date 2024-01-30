import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { css } from 'styled-components/native';

type StyleProps = {
  type: 'PRIMARY' | 'SECONDARY';
};

export const Container = styled(TouchableOpacity)<StyleProps>`
  min-height: 54px;
  max-height: 54px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 8px;

  background-color: ${({ theme, type }) =>
    type === 'PRIMARY' ? theme.COLORS.GRAY_600 : theme.COLORS.WHITE};
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const Icon = styled(MaterialIcons).attrs<StyleProps>(
  ({ theme, type }) => ({
    color: type === 'PRIMARY' ? theme.COLORS.WHITE : theme.COLORS.GRAY_700,
    size: 24,
  })
)`
  margin-right: 12px;
`;

export const Title = styled.Text<StyleProps>`
  ${({ theme, type }) => css`
    color: ${type === 'PRIMARY' ? theme.COLORS.WHITE : theme.COLORS.GRAY_700};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE[16]};
  `}
`;
