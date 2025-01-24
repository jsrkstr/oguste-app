import { makeAutoObservable } from 'mobx';

class User {
  id: string;
  name: string;
  organization: Organization | null = null;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    makeAutoObservable(this);
  }
}

export default User;
