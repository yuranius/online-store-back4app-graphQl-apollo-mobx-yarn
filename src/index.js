import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import BasketStore from "./store/BasketStore";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"
import {createUploadLink} from "apollo-upload-client/public/index";

let token = localStorage.length ? localStorage.getItem('token') : ''

const link = createUploadLink({
  uri: 'https://parseapi.back4app.com/graphql',
  headers: {
    "X-Parse-Application-Id": "kkWwjLM6jwGw4cW1VeN7NoLuuAWWCcQOT3nwfcZD",
    "X-Parse-Javascript-Key": "F41sCleZ0JFerYg6Kjg4zHU94Fk0hmGAu3yI6VW7",
    "X-Parse-Session-Token" : token
  },
})

export const Context = createContext(null)

const client  = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
      <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore(),
        basket: new BasketStore(),
      }}>
        <App  />
      </Context.Provider>
    </ApolloProvider>

);


