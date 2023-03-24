import * as Styled from './styles'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'

export function Players() {
  return (
    <Styled.Container>
      <Header
        showBackButton
      />

      <Highlight
        title='Nome da turma'
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
    </Styled.Container>
  )
}