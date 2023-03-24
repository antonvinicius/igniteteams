import * as Styled from './styles'
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';

export function Groups() {
  return (
    <Styled.Container>
      <Header />

      <Highlight
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />

      <GroupCard title='Galera do Ignite' />
    </Styled.Container>
  );
}