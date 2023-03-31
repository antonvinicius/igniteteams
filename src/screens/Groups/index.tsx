import { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import * as Styled from './styles'

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { groupsGetAll } from '@storage/group/groupGetAll';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  async function fetchGroups() {
    try {
      const data = await groupsGetAll()
      setGroups(data)
    } catch (error) {
      console.error(error)
    }
  }

  function handleNewGroup() {
    navigation.navigate('new')
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, [])
  )

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
            onPress={() => handleOpenGroup(info.item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && {
          flex: 1
        }}
        ListEmptyComponent={_ => (
          <ListEmpty
            message='Que tal cadastrar a primeira turma?'
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Styled.Container>
  );
}