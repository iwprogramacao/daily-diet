import React from 'react';
import { Container, Icon, Title } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  icon?: keyof typeof MaterialIcons.glyphMap;
  type?: 'PRIMARY' | 'SECONDARY';
  title: string;
};
export function Button({ icon, type = 'PRIMARY', title, ...rest }: Props) {
  return (
    <Container type={type} {...rest}>
      <Icon type={type} name={icon} />
      <Title type={type}>{title}</Title>
    </Container>
  );
}
