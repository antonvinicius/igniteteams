import { useNavigation } from '@react-navigation/native'

import * as Styled from './styles'

import Logo from '@assets/logo.png'

type Props = {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.navigate('groups')
  }

  return (
    <Styled.Container>
      {
        showBackButton &&
        <Styled.BackButton
          onPress={handleGoBack}
        >
          <Styled.BackIcon />
        </Styled.BackButton>
      }


      <Styled.Logo source={Logo} />
    </Styled.Container>
  )
}