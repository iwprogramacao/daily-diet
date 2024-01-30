import React, { useState } from 'react';
import {
  Container,
  Content,
  HeaderCard,
  HeaderTitle,
  InputText,
  InputTitle,
  LargeInputText,
  SetaEsquerda,
} from './styles';
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from 'styled-components';
import { Functions } from 'src/Utils/Functions';
import { Button } from '@components/Button';

type onChangeProps = {
  type: string;
};
export function CadastroRefeicao() {
  const functions = new Functions();

  const [data, setData] = useState<Date>(new Date());
  const [hora, setHora] = useState<Date>(new Date());
  const [horaUTCBrasil, setHoraUTCBrasil] = useState<string>('');
  const [horaFormatada, setHoraFormatada] = useState<string>('');
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const [showPickerTime, setShowPickerTime] = useState<boolean>(false);
  const theme = useTheme();

  function toggleDatePicker() {
    setShowPicker(!showPicker);
  }
  function toggleDateTimePicker() {
    setShowPickerTime(!showPickerTime);
  }

  const onChange = ({ type }: onChangeProps, date: Date | undefined) => {
    if (date === undefined) {
      return;
    }
    if (type === 'set') {
      setData(date);

      if (Platform.OS === 'android') {
        toggleDatePicker();
      }
    } else {
      toggleDatePicker();
    }
  };

  const onChangeTime = ({ type }: onChangeProps, date: Date | undefined) => {
    if (date === undefined) {
      return;
    }
    if (type === 'set') {
      setHoraUTCBrasil(date.toLocaleTimeString('pt-BR'));

      if (Platform.OS === 'android') {
        toggleDateTimePicker();
      }
    } else {
      toggleDateTimePicker();
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: theme.COLORS.GRAY_100,
        flex: 1,
      }}
    >
      <Container>
        <HeaderCard>
          <TouchableOpacity>
            <SetaEsquerda />
          </TouchableOpacity>
          <HeaderTitle>Nova refeição</HeaderTitle>
        </HeaderCard>
        <Content>
          <InputTitle>Nome</InputTitle>
          <InputText />
          <InputTitle>Descrição</InputTitle>
          <LargeInputText numberOfLines={4} multiline />

          <View>
            <InputTitle>Data</InputTitle>
            {showPicker && (
              <DateTimePicker
                value={data}
                mode="date"
                display="spinner"
                locale="pt-br"
                onChange={onChange}
              />
            )}
            {!showPicker && (
              <Pressable onPress={toggleDatePicker}>
                <InputText
                  value={data.toLocaleDateString('pt-br')}
                  editable={false}
                  onPressIn={toggleDatePicker}
                />
              </Pressable>
            )}
            {showPicker && Platform.OS === 'ios' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.COLORS.GRAY_600,
                    paddingHorizontal: 32,
                    paddingVertical: 12,
                    borderRadius: 6,
                  }}
                  onPress={toggleDatePicker}
                >
                  <Text
                    style={{
                      fontSize: theme.FONT_SIZE[16],
                      fontFamily: theme.FONT_FAMILY.BOLD,
                      color: theme.COLORS.WHITE,
                    }}
                  >
                    Confirmar
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View>
            <InputTitle>Hora</InputTitle>
            {showPickerTime && (
              <DateTimePicker
                value={hora}
                mode="time"
                display="spinner"
                locale="pt-br"
                onChange={onChangeTime}
              />
            )}
            {!showPickerTime && (
              <Pressable onPress={toggleDateTimePicker}>
                <InputText
                  value={functions.converterHoraMinuto(horaUTCBrasil)}
                  editable={false}
                  onPressIn={toggleDateTimePicker}
                />
              </Pressable>
            )}
            {showPickerTime && Platform.OS === 'ios' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.COLORS.GRAY_600,
                    paddingHorizontal: 32,
                    paddingVertical: 12,
                    borderRadius: 6,
                  }}
                  onPress={toggleDateTimePicker}
                >
                  <Text
                    style={{
                      fontSize: theme.FONT_SIZE[16],
                      fontFamily: theme.FONT_FAMILY.BOLD,
                      color: theme.COLORS.WHITE,
                    }}
                  >
                    Confirmar
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Button title="Cadastrar refeição" style={{ marginTop: 42 }} />
        </Content>
      </Container>
    </ScrollView>
  );
}
