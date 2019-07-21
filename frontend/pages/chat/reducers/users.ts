import TypeKeys, { UserActionTypes } from "../ActionTypes";
import { User } from "../model";

interface UsersReducer {
  (state: User[], action: User & { users: User[] } & UserActionTypes): User[];
}

const users: UsersReducer = (state = [], action) => {
  switch (action.type) {
    case TypeKeys.ADD_USER:
      //TODO: Check if interfaces are correctly written as before it was possible to distinct action properties by its type
      return [...state, { name: action.name, id: action.id }];
    case TypeKeys.USERS_LIST:
      return action.users;
    default:
      return state;
  }
};

export default users;
