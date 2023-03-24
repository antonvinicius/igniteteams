import * as Styled from './styles'

type Props = {
  message: string
}

export function ListEmpty({ message }: Props) {
  return (
    <Styled.Container>
      <Styled.Message>{message}</Styled.Message>
    </Styled.Container>
  )
}