import TypeKeys, { UserActionTypes } from "../ActionTypes";
import { User } from "../model";

interface UsersReducer {
  (state: User[], action: UserActionTypes): User[];
}

const users: UsersReducer = (state = [], action) => {
  switch (action.type) {
    case TypeKeys.ADD_USER:
      return [...state, { name: action.name, id: action.id }];
    case TypeKeys.USERS_LIST:
      return action.users;
    default:
      return state;
  }
};

export default users;
