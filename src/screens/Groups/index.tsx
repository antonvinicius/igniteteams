import { useState } from 'react';
import { FlatList } from 'react-native'

import * as Styled from './styles'
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Galera da Rocket', 'Amigos', 'Grupo de Trabalho'])

  return (
    <Styled.Container>
      <Header />

      <Highlight
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={info => (
          <GroupCard
            title={info.item}
          />
        )}
      />
    </Styled.Container>
  );
}