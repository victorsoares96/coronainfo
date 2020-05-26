import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Card, CardHeader, Avatar, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: 'BalooThambi2-Bold',
        margin: 8,
        lineHeight: 24 * 1.2,
        textAlign: 'center'
    },
    avatar: {
        margin: 8,
        width: 200,
        height: 200,
        alignSelf: 'center'
    },
    card: {
        marginVertical: 8,
        marginHorizontal: 8
    },
    cardContent: {
        marginHorizontal: 2,
        marginVertical: 2
    }
  });

export function Header() {
    return(
        <>
        <Avatar style={styles.avatar} size='giant' source={require('../../../../assets/corona.png')}/>
        <Text style={styles.title}>Corona Vírus</Text>
        </>
    );
}
export function Definição() {
    const Header = () => (<CardHeader title='Por que a doença foi batizada de covid-19?'/>);
    return (
      <Card style={styles.card} header={Header} status='primary'>
        <Text>
          "Co" significa corona, "vi" vem de vírus, e "d" representa 
          "doença". O número 19 indica o ano de sua aparição, 2019. 
          Esse nome substitui o de 2019-nCoV, decidido provisoriamente 
          após o surgimento da doença respiratória. O novo nome foi 
          escolhido por ser fácil de pronunciar e não ter referência 
          estigmatizante a um país ou a uma população em particular.
        </Text>
      </Card>
    );
}
  
export function Surgimento() {
    const Header = () => (<CardHeader title='Como surgiu o coronavírus?'/>);
    return (
      <Card style={styles.card} header={Header} status='primary'>
        <Text>
          Novos vírus são descobertos a todo momento. Grande parte pula 
          de outras espécies, onde passam despercebidos, para os humanos. 
          A Sars passou para os humanos a partir de um animal selvagem 
          conhecido como civeta (ou gato-de-algália, parente do guaxinim) 
          que era considerado uma iguaria na região de Guangdong, na China.
        </Text>
      </Card>
    );
  }
  
  export function Transmissão() {
    const Header = () => (<CardHeader title='Como o coronavírus se transmite?'/>);
    const sintomas = [
      'Gotículas de saliva',
      'Espirro',
      'Tosse',
      'Catarro',
      'Contato pessoal próximo (toque ou aperto de mão)',
      'Contato com objetos ou superfícies contaminadas, seguido de contato com a boca, nariz ou olhos.'
    ];
    return (
      <Card style={styles.card} header={Header} status='primary'>
        <Text>
          A transmissão dos coronavírus costuma ocorrer pelo ar ou por contato pessoal com secreções contaminadas, como:{'\n'}
          {'\n'}
        </Text>
        {sintomas.map((item, index) => <Text category='label' key={index}>{`• ${item}`} {'\n'}</Text>)}
        <Text>
        {'\n'}O vírus pode ficar incubado por duas semanas, período em que os primeiros sintomas levam para aparecer desde a infecção.
        </Text>
      </Card>
    );
  }
  
  export function Mortalidade() {
    const Header = () => (<CardHeader title='O coronavírus mata?'/>);
    return (
      <Card style={styles.card} header={Header} status='primary'>
        <Text>
        Sim. A morte pode ocorrer por complicações da infecção, 
        principalmente respiratórias. Nos casos mais graves, 
        a pessoa pode ter que ser intubada e passar semanas na UTI 
        (unidade de terapia intensiva), mas vale ressaltar que leva 
        tempo até que uma infecção resulte em recuperação ou morte.
        </Text>
      </Card>
    );
  }
  
  export function Prevenção() {
    const Header = () => (<CardHeader title='Como se prevenir e evitar o coronavírus?'/>);
    const prevencao = [
      'Evitar tocar nos olhos, nariz e boca com as mãos não lavadas.',
      'Evitar contato próximo com pessoas doentes.',
      'Ficar em casa quando estiver doente.',
      'Cobrir boca e nariz ao tossir ou espirrar com um lenço de papel e jogar no lixo, ou com o antebraço.',
      'Limpar e desinfetar objetos e superfícies tocados com frequência.',
      'Contato com objetos ou superfícies contaminadas, seguido de contato com a boca, nariz ou olhos.',
      'Evitar abraços, beijos e apertos de mãos.',
      'Manter distância de até 1 metro das pessoas.'
    ];
    return (
      <Card style={styles.card} header={Header} status='primary'>
      {prevencao.map((item, index) => <Text key={index}>{`• ${item}`} {'\n'}</Text>)}
      </Card>
    );
  }
  
  export function Mascara() {
    const Header = () => (<CardHeader title='Quando usar máscara?'/>);
    return (
      <Card style={styles.card} header={Header} status='primary'>
        <Text>
          As máscaras cirúrgicas são essenciais para as pessoas 
          doentes e recomendadas nas regiões mais afetadas, 
          mas não garantem uma proteção de 100% contra a epidemia. 
          Como não estão completamente presas ao rosto, elas deixam 
          o ar entrar sem filtragem e você pode inalar o vírus. 
          A OMS recomenda o uso também para quem cuida de pessoas doentes. 
          Se você não está doente ou cuidando de alguém doente, está 
          desperdiçando uma máscara em um momento de falta de insumos 
          no mundo todo. Os especialistas também insistem que, após algumas 
          horas, elas devem ser trocadas, aconselhando os tipos mais caros, 
          as chamadas máscaras de proteção respiratória individual, compostas 
          por uma peça facial e um dispositivo de filtragem de ar de uma vida 
          útil mais longa.
        </Text>
      </Card>
    );
  }
  
  export function Pet() {
    const Header = () => (<CardHeader title='Meu pet pode me transmitir o coronavírus?'/>);
    return (
      <Card style={styles.card} header={Header} status='primary'>
        <Text>
        Apesar de ter relato de um cachorro infectado em Hong Kong, 
        não há evidência suficiente de que animais de estimação possam 
        transmitir o vírus aos humanos.
        </Text>
      </Card>
    );
  }
  
  export function Incubação() {
    const Header = () => (<CardHeader title='Por quanto tempo a doença pode ficar incubada?'/>);
    return (
      <Card style={styles.card} header={Header} status='primary'>
        <Text>
        A doença pode ficar incubada até duas semanas após o contato 
        com o vírus. O período médio de incubação é de 5 dias, com 
        intervalo que pode chegar até a 14 dias.
        </Text>
      </Card>
    );
  }
  
  export function Detecção() {
    const Header = () => (<CardHeader title='Qual exame detecta o coronavírus?'/>);
    return (
      <Card style={styles.card} header={Header} status='primary'>
        <Text>
        Para detectar a doença é necessário realizar exames de 
        biologia molecular que detecte o RNA viral. É importante 
        seguir as orientações que estão no boletim em relação aos 
        procedimentos para o diagnóstico laboratorial.
        </Text>
      </Card>
    );
  }
  
  export function IrExame() {
    const navigation = useNavigation();
    return (
      <Card style={styles.card}>
        <Text>
          Para descobrir se você pode estar com o coronavírus realize esse pequeno exame: {'\n'} {'\n'}
        </Text>
        <Button onPress={() => {navigation.navigate('EXAME');}}>REALIZAR EXAME</Button>
      </Card>
    );
  }