import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import * as Styled from './styles'

import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { groupCreate } from '@storage/group/groupCreate'

export function NewGroup() {
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  async function handleNew() {
    await groupCreate(group)
    navigation.navigate('players', { group })
  }

  return (
    <Styled.Container>
      <Header showBackButton />

      <Styled.Content>
        <Styled.Icon />
        <Highlight
          title='Nova turma'
          subtitle='Crie a turma para adicionar as pessoas'
        />

        <Input
          value={group}
          onChangeText={setGroup}
          placeholder='Nome da turma'
        />

        <Button
          title='Criar'
          style={{
            marginTop: 20
          }}
          onPress={handleNew}
        />
      </Styled.Content>
    </Styled.Container>
  )
}