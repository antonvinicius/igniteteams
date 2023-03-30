import { useState } from 'react'
import { FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native'

import * as Styled from './styles'

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
  const [players, setPlayers] = useState<string[]>(['Vinícius', 'Biro', 'Paulo', 'Maria', 'João', 'Alexandre', 'Marcos', 'Ana', 'Bia'])
  const [team, setTeam] = useState('Time A')

  const { group } = useRoute().params as RouteParams

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
          placeholder='Nome da pessoa'
          autoCorrect={false}
        />

        <ButtonIcon
          icon='add'
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
        keyExtractor={item => item}
        renderItem={info => (
          <PlayerCard
            onRemove={() => { }}
            name={info.item}
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