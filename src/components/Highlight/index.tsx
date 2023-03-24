import * as Styled from './styles'

type Props = {
  title: string
  subtitle: string
}

export function Highlight({ title, subtitle }: Props) {
  return (
    <Styled.Container>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Subtitle>{subtitle}</Styled.Subtitle>
    </Styled.Container>
  )
}