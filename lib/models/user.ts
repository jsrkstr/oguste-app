import { makeAutoObservable } from 'mobx';
import Organisation from './organisation';

class User {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  disabled?: boolean;
  metadata?: any;
  created_at?: string;
  updated_at?: string;
  organisation: Organisation | null = null;

  constructor(
      id: string,
      first_name?: string,
      last_name?: string,
      email?: string,
      password?: string,
      disabled?: boolean,
      metadata?: any,
      created_at?: string,
      updated_at?: string,
    ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.disabled = disabled;
    this.metadata = metadata;
    this.created_at = created_at;
    this.updated_at = updated_at;
    makeAutoObservable(this);
  }
}

export default User;
