import { useNavigation } from '@react-navigation/native'

import * as Styled from './styles'

import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'

export function NewGroup() {
  const navigation = useNavigation()

  function handleNew() {
    navigation.navigate('players', {
      group: 'rockets'
    })
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