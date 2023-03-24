import { TouchableOpacityProps } from 'react-native'
import * as Styled from './styles'

type Props = TouchableOpacityProps & {
  title: string
}

export function GroupCard({ title, ...rest }: Props) {
  return (
    <Styled.Container {...rest}>
      <Styled.Icon />

      <Styled.Title>{title}</Styled.Title>
    </Styled.Container>
  )
}