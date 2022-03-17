import {
	gql
} from "@apollo/client";

export const PODCASTS = gql`
  query($keyword:  String!, $limit: Int!) {
    contentCards(filter: {limit: $limit, keywords: $keyword, types: [PODCAST]}) {
      edges {
        ... on Podcast {
          id
          name
          image {
            uri
						originalName 
          }
          categories {
          	name
          } 
 			    experts {
  					firstName
    				lastName
    				title
  					company 
					}
        }
      }
    }
  }
`;