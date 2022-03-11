import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  isMe: Scalars['Boolean'];
  photo: Photo;
  text: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export type CommonResult = {
  __typename?: 'CommonResult';
  id?: Maybe<Scalars['Int']>;
  message: Scalars['String'];
  ok: Scalars['Boolean'];
};

export type Hashtag = {
  __typename?: 'Hashtag';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  photos?: Maybe<Array<Maybe<Photo>>>;
  totalPhotos?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['String'];
};


export type HashtagPhotosArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  photo: Photo;
  updatedAt: Scalars['String'];
  user: User;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  read: Scalars['Boolean'];
  room: Room;
  text: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: CommonResult;
  createComment: CommonResult;
  deleteAccount: CommonResult;
  deleteComment: CommonResult;
  deleteMessage: CommonResult;
  deletePhoto: CommonResult;
  editComment: CommonResult;
  editPhoto: CommonResult;
  editProfile: CommonResult;
  followUser: CommonResult;
  login: LoginResult;
  readMessage: CommonResult;
  sendMessage: SendMessageResult;
  toggleLikePhoto: CommonResult;
  unfollowUser: CommonResult;
  uploadPhoto: UploadPhotoResult;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  photoId: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationDeleteAccountArgs = {
  userId: Scalars['Int'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Int'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['Int'];
};


export type MutationDeletePhotoArgs = {
  photoId: Scalars['Int'];
};


export type MutationEditCommentArgs = {
  commentId: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationEditPhotoArgs = {
  caption: Scalars['String'];
  photoId: Scalars['Int'];
};


export type MutationEditProfileArgs = {
  avatar?: InputMaybe<Scalars['Upload']>;
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationFollowUserArgs = {
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationReadMessageArgs = {
  messageId: Scalars['Int'];
};


export type MutationSendMessageArgs = {
  roomId?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
};


export type MutationToggleLikePhotoArgs = {
  photoId: Scalars['Int'];
};


export type MutationUnfollowUserArgs = {
  username: Scalars['String'];
};


export type MutationUploadPhotoArgs = {
  caption?: InputMaybe<Scalars['String']>;
  photo: Scalars['Upload'];
};

export type Photo = {
  __typename?: 'Photo';
  caption?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt: Scalars['String'];
  hashtags?: Maybe<Array<Maybe<Hashtag>>>;
  id: Scalars['Int'];
  isLiked: Scalars['Boolean'];
  isMe: Scalars['Boolean'];
  photoUrl: Scalars['String'];
  totalComments: Scalars['Int'];
  totalLikes: Scalars['Int'];
  updatedAt: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  searchPhotos: SearchPhotosResult;
  searchUsers: SearchUsersResult;
  seeComments: SeeCommentsResult;
  seeFeed: SeeFeedResult;
  seeFollowers: SeeFollowersResult;
  seeFollowing: SeeFollowingResult;
  seeHashtag: SeeHashtagResult;
  seeMe: SeeMeResult;
  seePhoto: SeePhotoResult;
  seePhotoLikes: SeePhotoLikesResult;
  seeProfile: SeeProfileResult;
  seeRoom: SeeRoomResult;
  seeRooms: SeeRoomsResult;
};


export type QuerySearchPhotosArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  keyword: Scalars['String'];
};


export type QuerySearchUsersArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};


export type QuerySeeCommentsArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  photoId: Scalars['Int'];
};


export type QuerySeeFeedArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
};


export type QuerySeeFollowersArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};


export type QuerySeeFollowingArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};


export type QuerySeeHashtagArgs = {
  name: Scalars['String'];
};


export type QuerySeePhotoArgs = {
  photoId: Scalars['Int'];
};


export type QuerySeePhotoLikesArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  photoId: Scalars['Int'];
};


export type QuerySeeProfileArgs = {
  username: Scalars['String'];
};


export type QuerySeeRoomArgs = {
  roomId: Scalars['Int'];
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  messages?: Maybe<Array<Maybe<Message>>>;
  totalUnreadMessages: Scalars['Int'];
  updatedAt: Scalars['String'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type SearchPhotosResult = {
  __typename?: 'SearchPhotosResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  photos?: Maybe<Array<Maybe<Photo>>>;
};

export type SearchUsersResult = {
  __typename?: 'SearchUsersResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type SeeCommentsResult = {
  __typename?: 'SeeCommentsResult';
  comments?: Maybe<Array<Maybe<Comment>>>;
  message: Scalars['String'];
  ok: Scalars['Boolean'];
};

export type SeeFeedResult = {
  __typename?: 'SeeFeedResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  photos?: Maybe<Array<Maybe<Photo>>>;
};

export type SeeFollowersResult = {
  __typename?: 'SeeFollowersResult';
  followers?: Maybe<Array<Maybe<User>>>;
  message: Scalars['String'];
  ok: Scalars['Boolean'];
};

export type SeeFollowingResult = {
  __typename?: 'SeeFollowingResult';
  following?: Maybe<Array<Maybe<User>>>;
  message: Scalars['String'];
  ok: Scalars['Boolean'];
};

export type SeeHashtagResult = {
  __typename?: 'SeeHashtagResult';
  hashtag?: Maybe<Hashtag>;
  message: Scalars['String'];
  ok: Scalars['Boolean'];
};

export type SeePhotoLikesResult = {
  __typename?: 'SeePhotoLikesResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type SeePhotoResult = {
  __typename?: 'SeePhotoResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  photo?: Maybe<Photo>;
};

export type SeeProfileResult = {
  __typename?: 'SeeProfileResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type SeeRoomResult = {
  __typename?: 'SeeRoomResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  room?: Maybe<Room>;
};

export type SeeRoomsResult = {
  __typename?: 'SeeRoomsResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  rooms?: Maybe<Array<Maybe<Room>>>;
};

export type SendMessageResult = {
  __typename?: 'SendMessageResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  room?: Maybe<Room>;
};

export type Subscription = {
  __typename?: 'Subscription';
  commentUpdates?: Maybe<Comment>;
  followUpdates?: Maybe<User>;
  likeUpdates?: Maybe<Like>;
  messageUpdates?: Maybe<Message>;
};


export type SubscriptionCommentUpdatesArgs = {
  photoId: Scalars['Int'];
};


export type SubscriptionFollowUpdatesArgs = {
  userId: Scalars['Int'];
};


export type SubscriptionLikeUpdatesArgs = {
  photoId: Scalars['Int'];
};


export type SubscriptionMessageUpdatesArgs = {
  roomId: Scalars['Int'];
};

export type UploadPhotoResult = {
  __typename?: 'UploadPhotoResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  photo?: Maybe<Photo>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  id: Scalars['Int'];
  isFollowing: Scalars['Boolean'];
  isMe: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<Maybe<Photo>>>;
  totalFollowers: Scalars['Int'];
  totalFollowing: Scalars['Int'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};


export type UserPhotosArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
};

export type SeeMeResult = {
  __typename?: 'seeMeResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type CreateAccountMutationVariables = Exact<{
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'CommonResult', ok: boolean, message: string } };

export type CreateCommentMutationVariables = Exact<{
  photoId: Scalars['Int'];
  text: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommonResult', ok: boolean, message: string, id?: number | null } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', ok: boolean, message: string, token?: string | null } };

export type ToggleLikePhotoMutationVariables = Exact<{
  photoId: Scalars['Int'];
}>;


export type ToggleLikePhotoMutation = { __typename?: 'Mutation', toggleLikePhoto: { __typename?: 'CommonResult', ok: boolean, message: string } };

export type SeeFeedQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type SeeFeedQuery = { __typename?: 'Query', seeFeed: { __typename?: 'SeeFeedResult', ok: boolean, message: string, photos?: Array<{ __typename?: 'Photo', id: number, photoUrl: string, caption?: string | null, totalLikes: number, totalComments: number, isMe: boolean, isLiked: boolean, createdAt: string, user: { __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null }, hashtags?: Array<{ __typename?: 'Hashtag', id: number, name: string } | null> | null, comments?: Array<{ __typename?: 'Comment', id: number, text: string, isMe: boolean, createdAt: string, user: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } } | null> | null } | null> | null } };

export type SeeFollowingQueryVariables = Exact<{
  username: Scalars['String'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type SeeFollowingQuery = { __typename?: 'Query', seeFollowing: { __typename?: 'SeeFollowingResult', ok: boolean, message: string, following?: Array<{ __typename?: 'User', username: string, avatarUrl?: string | null } | null> | null } };

export type SeeMeQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeMeQuery = { __typename?: 'Query', seeMe: { __typename?: 'seeMeResult', ok: boolean, message: string, user?: { __typename?: 'User', id: number, name?: string | null, username: string, email: string, avatarUrl?: string | null, bio?: string | null, isMe: boolean } | null } };


export const CreateAccountDocument = gql`
    mutation CreateAccount($email: String!, $name: String, $username: String!, $password: String!) {
  createAccount(
    email: $email
    name: $name
    username: $username
    password: $password
  ) {
    ok
    message
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($photoId: Int!, $text: String!) {
  createComment(photoId: $photoId, text: $text) {
    ok
    message
    id
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      photoId: // value for 'photoId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ok
    message
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ToggleLikePhotoDocument = gql`
    mutation ToggleLikePhoto($photoId: Int!) {
  toggleLikePhoto(photoId: $photoId) {
    ok
    message
  }
}
    `;
export type ToggleLikePhotoMutationFn = Apollo.MutationFunction<ToggleLikePhotoMutation, ToggleLikePhotoMutationVariables>;

/**
 * __useToggleLikePhotoMutation__
 *
 * To run a mutation, you first call `useToggleLikePhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikePhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikePhotoMutation, { data, loading, error }] = useToggleLikePhotoMutation({
 *   variables: {
 *      photoId: // value for 'photoId'
 *   },
 * });
 */
export function useToggleLikePhotoMutation(baseOptions?: Apollo.MutationHookOptions<ToggleLikePhotoMutation, ToggleLikePhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleLikePhotoMutation, ToggleLikePhotoMutationVariables>(ToggleLikePhotoDocument, options);
      }
export type ToggleLikePhotoMutationHookResult = ReturnType<typeof useToggleLikePhotoMutation>;
export type ToggleLikePhotoMutationResult = Apollo.MutationResult<ToggleLikePhotoMutation>;
export type ToggleLikePhotoMutationOptions = Apollo.BaseMutationOptions<ToggleLikePhotoMutation, ToggleLikePhotoMutationVariables>;
export const SeeFeedDocument = gql`
    query SeeFeed($cursor: Int) {
  seeFeed(cursor: $cursor) {
    ok
    message
    photos {
      id
      user {
        id
        name
        username
        avatarUrl
      }
      photoUrl
      caption
      hashtags {
        id
        name
      }
      comments {
        id
        text
        user {
          id
          username
          avatarUrl
        }
        isMe
        createdAt
      }
      totalLikes
      totalComments
      isMe
      isLiked
      createdAt
    }
  }
}
    `;

/**
 * __useSeeFeedQuery__
 *
 * To run a query within a React component, call `useSeeFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeFeedQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSeeFeedQuery(baseOptions?: Apollo.QueryHookOptions<SeeFeedQuery, SeeFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeFeedQuery, SeeFeedQueryVariables>(SeeFeedDocument, options);
      }
export function useSeeFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeFeedQuery, SeeFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeFeedQuery, SeeFeedQueryVariables>(SeeFeedDocument, options);
        }
export type SeeFeedQueryHookResult = ReturnType<typeof useSeeFeedQuery>;
export type SeeFeedLazyQueryHookResult = ReturnType<typeof useSeeFeedLazyQuery>;
export type SeeFeedQueryResult = Apollo.QueryResult<SeeFeedQuery, SeeFeedQueryVariables>;
export const SeeFollowingDocument = gql`
    query SeeFollowing($username: String!, $cursor: String) {
  seeFollowing(username: $username, cursor: $cursor) {
    ok
    message
    following {
      username
      avatarUrl
    }
  }
}
    `;

/**
 * __useSeeFollowingQuery__
 *
 * To run a query within a React component, call `useSeeFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeFollowingQuery({
 *   variables: {
 *      username: // value for 'username'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSeeFollowingQuery(baseOptions: Apollo.QueryHookOptions<SeeFollowingQuery, SeeFollowingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeFollowingQuery, SeeFollowingQueryVariables>(SeeFollowingDocument, options);
      }
export function useSeeFollowingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeFollowingQuery, SeeFollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeFollowingQuery, SeeFollowingQueryVariables>(SeeFollowingDocument, options);
        }
export type SeeFollowingQueryHookResult = ReturnType<typeof useSeeFollowingQuery>;
export type SeeFollowingLazyQueryHookResult = ReturnType<typeof useSeeFollowingLazyQuery>;
export type SeeFollowingQueryResult = Apollo.QueryResult<SeeFollowingQuery, SeeFollowingQueryVariables>;
export const SeeMeDocument = gql`
    query SeeMe {
  seeMe {
    ok
    message
    user {
      id
      name
      username
      email
      avatarUrl
      bio
      isMe
    }
  }
}
    `;

/**
 * __useSeeMeQuery__
 *
 * To run a query within a React component, call `useSeeMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeMeQuery(baseOptions?: Apollo.QueryHookOptions<SeeMeQuery, SeeMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeMeQuery, SeeMeQueryVariables>(SeeMeDocument, options);
      }
export function useSeeMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeMeQuery, SeeMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeMeQuery, SeeMeQueryVariables>(SeeMeDocument, options);
        }
export type SeeMeQueryHookResult = ReturnType<typeof useSeeMeQuery>;
export type SeeMeLazyQueryHookResult = ReturnType<typeof useSeeMeLazyQuery>;
export type SeeMeQueryResult = Apollo.QueryResult<SeeMeQuery, SeeMeQueryVariables>;