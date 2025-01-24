import { makeAutoObservable } from 'mobx';
import Apartment from './Apartment';

class Organization {
  id: string;
  name: string;
  apartments: Apartment[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    makeAutoObservable(this);
  }

  addApartment(apartment: Apartment) {
    this.apartments.push(apartment);
  }
}

export default Organization;
