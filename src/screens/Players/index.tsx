import { useState, useEffect, useRef } from 'react'
import { FlatList, Alert, TextInput } from 'react-native'
import { useRoute } from '@react-navigation/native'

import * as Styled from './styles'

import { AppError } from '@utils/AppError'

import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/playerStorageDTO'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

type RouteParams = {
  group: string
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [team, setTeam] = useState('Time A')

  const { group } = useRoute().params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
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
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.')
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  async function handleRemovePlayer(item: PlayerStorageDTO) {
    try {
      await playerRemoveByGroup(item.name, group)
      fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover Pessoa', 'Não foi possível remover essa pessoa.')
    }
  }

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
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />

        <ButtonIcon
          icon='add'
          onPress={handleAddPlayer}
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

      <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            onRemove={() => handleRemovePlayer(item)}
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

      <Button
        title='Remover Turma'
        type='SECONDARY'
        style={{ marginTop: 10 }}
      />
    </Styled.Container>
  )
}