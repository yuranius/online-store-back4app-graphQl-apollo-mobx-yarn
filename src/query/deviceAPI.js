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
                    img {
                        url
                    }
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
    mutation ( $name: String! $price: Float! $rating: Float! $typeId: ID! $brandId: ID! $file: Upload! ) {
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
                img: {upload: $file}
            }
        }){
            device{
                objectId
                name
                price
                img {
                    url
                }
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

// Создание объекта

// mutation {
// 	createType (input: {
// 		fields: {
// 			name: "Микроволновки"
// 		}
// 	}){
// 		type{
// 			id
// 			name
// 		}
// 	}
// }

// query {
// 	types{
// 		count
// 		edges{
// 			node {
// 				name
// 			}
// 		}
// 	}
// }
