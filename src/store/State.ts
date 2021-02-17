import User from '@/models/User';

export default class State {

  public accessToken: string | null = null;

  public loggedInUser: User | null = null;

  public users: User[] = [];

}
