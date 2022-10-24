import {gql} from "@apollo/client";

export const FETCH_TYPES_BRANDS_DEVICES = gql`
    query {
        types{
            count
            edges{
                node {
                    objectId
                    name
                }
            }
        }
        brands {
            count
            edges {
                node{
                    objectId
                    name
                }
            }
        }
        devices {
            count
            edges{
                node{
                    objectId
                    brandId {
                        objectId
                    }
                    img
                    name
                    price
                    rating
                    typeId {
                        objectId
                    }
                }
            }
        }
    }
`

export const CREATE_TYPE = gql`
    mutation ( $name: String! ) {
        createType (input: {
            fields: {
                name: $name
            }
        }){
            type{
                objectId
                name
            }
        }
    }
`

export const CREATE_BRAND = gql`
    mutation ( $name: String! ) {
        createBrand (input: {
            fields: {
                name: $name
            }
        }){
            brand{
                objectId
                name
            }
        }
    }
`

export const CREATE_DEVICE = gql`
    mutation ( $name: String! $price: Float! $rating: Float! $typeId: ID! $brandId: ID! $img: String! ) {
        createDevice (input: {
            fields: {
                name: $name
                price: $price
                rating: $rating
                typeId: {
                    link: $typeId
                }
                brandId: {
                    link: $brandId
                }
                img: $img
            }
        }){
            device{
                objectId
                name
                price
                img
            }
        }
    }
`

export const CREATE_FILE = gql`
    mutation ($file: Upload!) {
        createFile( input: {upload: $file}) {
            fileInfo {
                url
            }
        }
    }
`

export const CREATE_INFO = gql`
    mutation ( $title: String! $description: String! $deviceId: ID!) {
        createDevice_info(input: {
            fields: {
                description: $description,
                title: $title,
                deviceId: {link: $deviceId}
            }
        }){
            device_info {
                deviceId {
                    objectId
                }
                title
                description
            }
        }
    }
`

export const GET_DEVICE = gql`
query {
    device(id: "BdnAyrHMtd"){
        __typename
    }
}
`
