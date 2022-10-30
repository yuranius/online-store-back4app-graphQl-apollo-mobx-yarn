import {gql} from "@apollo/client";

export const REGISTRATION = gql`
    mutation SignUp ( $username: String! $email: String! $password: String! $role: String! ){
        signUp (input: {
            fields: {
                username: $username
                email: $email
                password: $password
                role: $role
            }
        }){
            viewer{
                user{
                    objectId
                    createdAt
                    username
                    email
                    role
                }
                sessionToken
            }
        }
    }
`

export const CREATE_BASKET = gql`
    mutation ($userId: ID!) {
        createBasket(input: {fields: {userId: {link: $userId}}}){
            basket {
                objectId
                userId {
                    username
                }
            }
        }
    }
`



export const LOGIN = gql`
    mutation LogIn ( $username: String! $password: String! ){
        logIn(input: {
            username: $username
            password: $password
        }){
            viewer{
                user{
                    objectId
                    username
                    role
                    
                }
                sessionToken
            }
        }
    }
`

export const GET_LOGGED_USER = gql`
    query GetCurrentUser {
        viewer {
            sessionToken
            user {
                objectId
                username
                role
            }
        }
    }
`



