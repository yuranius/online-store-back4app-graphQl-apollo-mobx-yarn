import {gql} from "@apollo/client";

export const ADD_RATE = gql`
	mutation ( $deviceId: ID! $userId: ID! $rate: Float! ) {
			createRatings(input: {
					fields: {
							deviceId: {
									link: $deviceId
							}
							userId: {
									link: $userId
							},
							rate: $rate,
					}
			}){
					ratings {
							objectId
							userId {
									objectId
              }
							deviceId {
									objectId
              }
							rate
          }
			}
	}
`

export const CHANGE_RATE = gql`
	mutation ( $id: ID! $rate: Float! ) {
			updateRatings(input: {id: $id, fields: {rate: $rate}}){
					ratings {
              objectId
              userId {
                  objectId
              }
              deviceId {
                  objectId
              }
              rate
          }
			}
	}
`

export const DELETE_RATE = gql`
	mutation ( $id: ID! ) {
			deleteRatings(input: {id: $id}) {
          ratings {
              objectId
              userId {
                  objectId
              }
              deviceId {
                  objectId
              }
              rate
          }
			}
	}
`

export const GET_RATING_DEVICE = gql`
	query ( $deviceId: ID! ) {
			ratings (where: {deviceId: {have: {objectId: {equalTo: $deviceId}}}}){
					count
					edges {
							node {
									rate
									objectId
              }
          }
			}
	}
`