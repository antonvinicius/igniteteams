import { TouchableOpacityProps } from 'react-native';
import * as Styled from './styles'

type Props = TouchableOpacityProps & {
  title: string;
  type?: Styled.ButtonTypeStyleProps
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
  return (
    <Styled.Container type={type} {...rest}>
      <Styled.Title>
        {title}
      </Styled.Title>
    </Styled.Container>
  )
}