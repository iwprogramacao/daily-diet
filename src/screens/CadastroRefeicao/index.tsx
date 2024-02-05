import React, { useCallback, useRef, useState } from 'react';
import {
  BooleanButton,
  BooleanButtonIndicator,
  BooleanButtonText,
  Container,
  Content,
  HeaderCard,
  HeaderTitle,
  InputText,
  InputTitle,
  LargeInputText,
  SetaEsquerda,
  SidedInputs,
} from './styles';
import {
  Alert,
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
import { cadastrarNovaRefeicao } from '@storage/refeicao/cadastrarNovaRefeicao';
import { RefeicaoDTO } from 'src/interfaces/RefeicaoDTO';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { editarRefeicao } from '@storage/refeicao/editarRefeicao';

type onChangeProps = {
  type: string;
};
type RouteParams = {
  refeicao: RefeicaoDTO;
};
export function CadastroRefeicao() {
  const functions = new Functions();

  const [data, setData] = useState<Date>(new Date());
  const [hora, setHora] = useState<Date>(new Date());
  const [horaUTCBrasil, setHoraUTCBrasil] = useState<string>(
    hora.toLocaleTimeString('pt-BR')
  );
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [isDentroDaDieta, setIsDentroDaDieta] = useState<boolean | null>(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [isEdicao, setIsEdicao] = useState(false);

  const scrollViewRef = useRef<ScrollView | null>(null);

  const [showPickerTime, setShowPickerTime] = useState<boolean | null>(null);
  const theme = useTheme();
  const navigation = useNavigation();

  const route = useRoute();
  const { refeicao } = route.params as RouteParams;

  function toggleDatePicker() {
    setShowPicker(!showPicker);
    handleInputFocus();
  }
  function toggleDateTimePicker() {
    setShowPickerTime(!showPickerTime);
    handleInputFocus();
  }
  function handleInputFocus() {
    // Adiar a execução de scrollToEnd em 500ms
    setTimeout(() => {
      // Verificar se scrollViewRef.current não é nulo antes de chamar scrollToEnd
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 200);
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
    setData(date);
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
    setHora(date);
  };
  function handleIsDentroDaDieta(botaoClicado: boolean) {
    setIsDentroDaDieta(botaoClicado);
  }
  async function handleSalvarRefeicao() {
    try {
      if (nome.trim().length === 0) {
        return Alert.alert('Refeição', 'O campo Nome é obrigatório!');
      }
      if (descricao.trim().length === 0) {
        return Alert.alert('Refeição', 'O campo Descrição é obrigatório!');
      }
      if (isDentroDaDieta === null) {
        return Alert.alert(
          'Refeição',
          'Você deve marcar se a refeição está ou não dentro da dieta!'
        );
      }
      const refeicaoParaArmazenar: RefeicaoDTO = {
        nome,
        descricao,
        data,
        hora,
        isDentroDaDieta,
      };
      await cadastrarNovaRefeicao(refeicaoParaArmazenar);
      navigation.navigate('refeicoes');
    } catch (error) {
      Alert.alert('Nova refeição', 'Não foi possível registrar esta refeição');
      console.log(error);
    }
  }
  function handleGoToRefeicoes() {
    navigation.navigate('refeicoes');
  }
  function carregarRefeicao() {
    if (refeicao) {
      setIsEdicao(true);
      setData(refeicao.data);
      setDescricao(refeicao.descricao);
      setHora(refeicao.hora);
      setNome(refeicao.nome);
      setIsDentroDaDieta(refeicao.isDentroDaDieta);
      setHoraUTCBrasil(refeicao.hora.toLocaleTimeString('pt-BR'));
      console.log('Chamou');
    }
  }

  async function handleEditarRefeicao() {
    const refeicaoEditada: RefeicaoDTO = {
      data,
      descricao,
      hora,
      isDentroDaDieta: isDentroDaDieta === null || false ? false : true,
      nome,
    };
    if (await editarRefeicao(refeicao, refeicaoEditada)) {
      navigation.navigate('refeicoes');
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarRefeicao();
    }, [])
  );

  return (
    <ScrollView
      style={{
        backgroundColor: theme.COLORS.GRAY_100,
        flex: 1,
      }}
      ref={scrollViewRef}
    >
      <Container>
        <HeaderCard>
          <TouchableOpacity onPress={handleGoToRefeicoes}>
            <SetaEsquerda />
          </TouchableOpacity>
          <HeaderTitle>
            {isEdicao ? 'Editar refeição' : 'Nova refeição'}
          </HeaderTitle>
        </HeaderCard>
        <Content>
          <InputTitle>Nome</InputTitle>
          <InputText onChangeText={setNome} value={nome} />
          <InputTitle>Descrição</InputTitle>
          <LargeInputText
            numberOfLines={4}
            multiline
            onChangeText={setDescricao}
            value={descricao}
          />

          <View>
            <InputTitle>Data</InputTitle>

            <Pressable onPress={toggleDatePicker}>
              <InputText
                value={data.toLocaleDateString('pt-br')}
                editable={false}
                onPressIn={toggleDatePicker}
              />
            </Pressable>
            {showPicker && (
              <DateTimePicker
                value={data}
                mode="date"
                display="spinner"
                locale="pt-br"
                onChange={onChange}
              />
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
            <Pressable onPress={toggleDateTimePicker}>
              <InputText
                onFocus={handleInputFocus}
                value={functions.converterHoraMinuto(horaUTCBrasil)}
                editable={false}
                onPressIn={toggleDateTimePicker}
              />
            </Pressable>
            {showPickerTime && (
              <DateTimePicker
                value={hora}
                mode="time"
                display="spinner"
                locale="pt-br"
                onChange={onChangeTime}
              />
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

          <InputTitle>Está dentro da dieta?</InputTitle>
          <SidedInputs>
            <BooleanButton
              isBotaoSelecionado={
                isDentroDaDieta === null ? null : isDentroDaDieta
              }
              onPress={() => handleIsDentroDaDieta(true)}
              type="PRIMARY"
            >
              <BooleanButtonIndicator type="PRIMARY" />
              <BooleanButtonText>Sim</BooleanButtonText>
            </BooleanButton>
            <BooleanButton
              isBotaoSelecionado={
                isDentroDaDieta === null ? null : !isDentroDaDieta
              }
              onPress={() => handleIsDentroDaDieta(false)}
              type="SECONDARY"
            >
              <BooleanButtonIndicator type="SECONDARY" />

              <BooleanButtonText>Não</BooleanButtonText>
            </BooleanButton>
          </SidedInputs>
          {isEdicao ? (
            <Button
              title="Editar refeição"
              style={{ marginTop: 42 }}
              onPress={handleEditarRefeicao}
            />
          ) : (
            <Button
              title="Cadastrar refeição"
              style={{ marginTop: 42 }}
              onPress={handleSalvarRefeicao}
            />
          )}
        </Content>
      </Container>
    </ScrollView>
  );
}
