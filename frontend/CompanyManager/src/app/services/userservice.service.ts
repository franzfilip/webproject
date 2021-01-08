import { Injectable } from '@angular/core';
import { ApolloClient } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";
import { user } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private apollo: Apollo) { }

  public activeUser: user = new user();
}
