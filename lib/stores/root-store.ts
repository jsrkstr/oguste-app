import { makeAutoObservable } from 'mobx';
import User from '../models/user';
import Organisation from '../models/organisation';

class RootStore {
  user: User | null = null;
  organisation: Organisation | null = null;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User) {
    this.user = user;
  }

  setOrganisation(organisation: Organisation) {
    this.organisation = organisation;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }
}

const rootStore = new RootStore();
export default rootStore;
