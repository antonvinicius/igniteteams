import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'
import * as Styled from './styles'

export function Input({ ...rest }: TextInputProps) {
  const { COLORS } = useTheme()

  return (
    <Styled.Container 
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  )
}