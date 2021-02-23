import { User } from '@/domain';

export default interface Player {

  user: User;

  handSize: number;

  saidBeat: boolean;

  done: number | null;

}

export function playersEqual(one: Player, another: Player): boolean {
  return (one.user.id === another.user.id);
}
