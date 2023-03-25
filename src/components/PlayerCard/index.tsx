import * as Styled from './styles'

import { ButtonIcon } from '@components/ButtonIcon'

type Props = {
  name: string
  onRemove: () => void
}

export function PlayerCard({ name }: Props) {
  return (
    <Styled.Container>
      <Styled.Icon
        name="person"
      />

      <Styled.Name>
        {name}
      </Styled.Name>

      <ButtonIcon
        icon="close"
        type="SECONDARY"
      />
    </Styled.Container>
  )
}