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
  createdAt: Scalars['String'];
  hashtags?: Maybe<Array<Maybe<Hashtag>>>;
  id: Scalars['Int'];
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

export type CreateAccountMutationVariables = Exact<{
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'CommonResult', ok: boolean, message: string } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', ok: boolean, message: string, token?: string | null } };


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