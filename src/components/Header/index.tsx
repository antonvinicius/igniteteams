import * as Styled from './styles'

import Logo from '@assets/logo.png'

export function Header() {
  return (
    <Styled.Container>
      <Styled.Logo source={Logo} />
    </Styled.Container>
  )
}