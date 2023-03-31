import { useState, useEffect, useRef } from 'react'
import { FlatList, Alert, TextInput, Keyboard } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import * as Styled from './styles'

import { AppError } from '@utils/AppError'

import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/playerStorageDTO'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [team, setTeam] = useState('Time A')

  const route = useRoute()
  const navigation = useNavigation()

  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handlePlayerAdd() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa para adicionar.')
    }

    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(newPlayer, group)
      fetchPlayersByTeam()
      setNewPlayerName('')

      newPlayerNameInputRef.current?.blur()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Pessoa', error.message)
      } else {
        console.error(error)
        Alert.alert('Nova Pessoa', 'Não foi possível inserir esta pessoa no time.')
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)

      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePlayerRemove(item: PlayerStorageDTO) {
    try {
      await playerRemoveByGroup(item.name, group)
      fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover Pessoa', 'Não foi possível remover essa pessoa.')
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)

      navigation.navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Remover Grupo', 'Não foi possível remover o grupo')
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remover',
      'Deseja remover a turma?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupRemove() }
      ]
    )
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Styled.Container>
      <Header
        showBackButton
      />

      <Highlight
        title={group}
        subtitle='Adicione a galera e separe os times'
      />

      <Styled.Form>
        <Input
          inputRef={newPlayerNameInputRef}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          onSubmitEditing={handlePlayerAdd}
          returnKeyType='done'
        />

        <ButtonIcon
          icon='add'
          onPress={handlePlayerAdd}
        />
      </Styled.Form>

      <Styled.HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={info => (
            <Filter
              title={info.item}
              isActive={info.item === team}
              onPress={() => setTeam(info.item)}
            />
          )}
          horizontal
        />

        <Styled.NumberOfPlayers>{players.length}</Styled.NumberOfPlayers>
      </Styled.HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              onRemove={() => handlePlayerRemove(item)}
              name={item.name}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty
              message="Não há pessoas neste time."
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
        />
      )}

      <Button
        title='Remover turma'
        type='SECONDARY'
        onPress={handleGroupRemove}
      />
    </Styled.Container>
  )
}