import GameState from '@/model/GameState';
import User from '@/model/User';

export default class State {

  public accessToken: string | null = null;

  public loggedInUser: User | null = null;

  public users: User[] = [];

  public gameId: string | null = '0c52f37c-399c-4304-9d39-34d08b3ae1ba';

  public gameState: GameState | null = null;

}
