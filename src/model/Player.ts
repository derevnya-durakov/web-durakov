import User from '@/model/User';

export default class Player {

  constructor(readonly user: User, readonly handSize: number) {}

}
