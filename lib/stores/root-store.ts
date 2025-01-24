import { makeAutoObservable } from 'mobx';
import User from '../models/user';
import Organization from '../models/organization';

class RootStore {
  user: User | null = null;
  organization: Organization | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User) {
    this.user = user;
  }

  setOrganization(organization: Organization) {
    this.organization = organization;
  }
}

const rootStore = new RootStore();
export default rootStore;
