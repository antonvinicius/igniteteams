import { TouchableOpacityProps } from 'react-native'
import * as Styled from './styles'

type Props = TouchableOpacityProps & Styled.FilterStyleProps & {
  title: string
}

export function Filter({ title, isActive = false, ...rest }: Props) {
  return (
    <Styled.Container isActive={isActive} {...rest}>
      <Styled.Title>
        {title}
      </Styled.Title>
    </Styled.Container>
  )
}