import { State , Selector , Action , StateContext } from '@ngxs/store';
import { Users } from './dummy.data';

@State({
  name : 'user' ,
  defaults : Users
})
export class UserState{

  constructor(){}

  @Selector() static users(state:any[]){ return state; }

  @Selector()
  static userByIndex(state:any[]){
    return (index) => { return state[index]; };
  }
}
