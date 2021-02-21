import User from '@/model/User';

export default interface Player {

  user: User;

  handSize: number;

  saidBeat: boolean;

}
