import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Arrow, Container, Percentage, Subtitle } from './styles';

type Props = TouchableOpacityProps & {
  type?: 'PRIMARY' | 'SECONDARY';
  percentage: string;
};

export function StatisticsCard({
  type = 'PRIMARY',
  percentage,
  ...rest
}: Props) {
  return (
    <Container type={type} {...rest}>
      <Arrow type={type} />
      <Percentage>{percentage}</Percentage>
      <Subtitle>das refeições dentro da dieta</Subtitle>
    </Container>
  );
}
