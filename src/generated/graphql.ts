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

export type FollowUserResult = {
  __typename?: 'FollowUserResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
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
  followUser: FollowUserResult;
  login: LoginResult;
  readMessage: CommonResult;
  sendMessage: SendMessageResult;
  toggleLikePhoto: CommonResult;
  unfollowUser: UnfollowUserResult;
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
  searchHashtags: SearchHashtagsResult;
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
  seeRecommendPhotos: SeeRecommendPhotosResult;
  seeRecommendUsers: SeeRecommendUsersResult;
  seeRoom: SeeRoomResult;
  seeRooms: SeeRoomsResult;
  seeUsers: SeeUsersResult;
};


export type QuerySearchHashtagsArgs = {
  name: Scalars['String'];
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
  latestMessage?: Maybe<Message>;
  messages?: Maybe<Array<Maybe<Message>>>;
  totalUnreadMessages: Scalars['Int'];
  updatedAt: Scalars['String'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type SearchHashtagsResult = {
  __typename?: 'SearchHashtagsResult';
  hashtags?: Maybe<Array<Maybe<Hashtag>>>;
  message: Scalars['String'];
  ok: Scalars['Boolean'];
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
  lastPhotoId?: Maybe<Scalars['Int']>;
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

export type SeeMeResult = {
  __typename?: 'SeeMeResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
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

export type SeeRecommendPhotosResult = {
  __typename?: 'SeeRecommendPhotosResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  photos?: Maybe<Array<Maybe<Photo>>>;
};

export type SeeRecommendUsersResult = {
  __typename?: 'SeeRecommendUsersResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  users?: Maybe<Array<Maybe<User>>>;
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

export type SeeUsersResult = {
  __typename?: 'SeeUsersResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type SendMessageResult = {
  __typename?: 'SendMessageResult';
  id?: Maybe<Scalars['Int']>;
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

export type UnfollowUserResult = {
  __typename?: 'UnfollowUserResult';
  message: Scalars['String'];
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
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
  totalPhotos: Scalars['Int'];
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

export type CreateCommentMutationVariables = Exact<{
  photoId: Scalars['Int'];
  text: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommonResult', ok: boolean, message: string, id?: number | null } };

export type DeleteAccountMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: { __typename?: 'CommonResult', ok: boolean, message: string } };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['Int'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'CommonResult', ok: boolean, message: string, id?: number | null } };

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['Int'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: { __typename?: 'CommonResult', ok: boolean, message: string, id?: number | null } };

export type DeletePhotoMutationVariables = Exact<{
  photoId: Scalars['Int'];
}>;


export type DeletePhotoMutation = { __typename?: 'Mutation', deletePhoto: { __typename?: 'CommonResult', ok: boolean, message: string, id?: number | null } };

export type EditCommentMutationVariables = Exact<{
  commentId: Scalars['Int'];
  text: Scalars['String'];
}>;


export type EditCommentMutation = { __typename?: 'Mutation', editComment: { __typename?: 'CommonResult', ok: boolean, message: string, id?: number | null } };

export type EditPhotoMutationVariables = Exact<{
  photoId: Scalars['Int'];
  caption: Scalars['String'];
}>;


export type EditPhotoMutation = { __typename?: 'Mutation', editPhoto: { __typename?: 'CommonResult', ok: boolean, message: string, id?: number | null } };

export type EditProfileMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['Upload']>;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'CommonResult', ok: boolean, message: string } };

export type FollowUserMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: { __typename?: 'FollowUserResult', ok: boolean, message: string, user?: { __typename?: 'User', id: number, name?: string | null, username: string } | null } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', ok: boolean, message: string, token?: string | null } };

export type ReadMessageMutationVariables = Exact<{
  messageId: Scalars['Int'];
}>;


export type ReadMessageMutation = { __typename?: 'Mutation', readMessage: { __typename?: 'CommonResult', ok: boolean, message: string, id?: number | null } };

export type SendMessageMutationVariables = Exact<{
  text?: InputMaybe<Scalars['String']>;
  roomId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'SendMessageResult', ok: boolean, message: string, id?: number | null, room?: { __typename?: 'Room', id: number } | null } };

export type ToggleLikePhotoMutationVariables = Exact<{
  photoId: Scalars['Int'];
}>;


export type ToggleLikePhotoMutation = { __typename?: 'Mutation', toggleLikePhoto: { __typename?: 'CommonResult', ok: boolean, message: string } };

export type UnfollowUserMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser: { __typename?: 'UnfollowUserResult', ok: boolean, message: string, user?: { __typename?: 'User', id: number, name?: string | null, username: string } | null } };

export type UploadPhotoMutationVariables = Exact<{
  photo: Scalars['Upload'];
  caption?: InputMaybe<Scalars['String']>;
}>;


export type UploadPhotoMutation = { __typename?: 'Mutation', uploadPhoto: { __typename?: 'UploadPhotoResult', ok: boolean, message: string, photo?: { __typename?: 'Photo', id: number, photoUrl: string, caption?: string | null, totalLikes: number, totalComments: number, isMe: boolean, isLiked: boolean, createdAt: string, user: { __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null }, hashtags?: Array<{ __typename?: 'Hashtag', id: number, name: string } | null> | null } | null } };

export type SearchHashtagsQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type SearchHashtagsQuery = { __typename?: 'Query', searchHashtags: { __typename?: 'SearchHashtagsResult', ok: boolean, message: string, hashtags?: Array<{ __typename?: 'Hashtag', id: number, name: string, totalPhotos?: number | null } | null> | null } };

export type SearchPhotosQueryVariables = Exact<{
  keyword: Scalars['String'];
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type SearchPhotosQuery = { __typename?: 'Query', searchPhotos: { __typename?: 'SearchPhotosResult', ok: boolean, message: string, photos?: Array<{ __typename?: 'Photo', id: number, photoUrl: string, totalLikes: number, totalComments: number, user: { __typename?: 'User', id: number, username: string } } | null> | null } };

export type SearchUsersQueryVariables = Exact<{
  username: Scalars['String'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers: { __typename?: 'SearchUsersResult', ok: boolean, message: string, users?: Array<{ __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null } | null> | null } };

export type SeeCommentsQueryVariables = Exact<{
  photoId: Scalars['Int'];
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type SeeCommentsQuery = { __typename?: 'Query', seeComments: { __typename?: 'SeeCommentsResult', ok: boolean, message: string, comments?: Array<{ __typename?: 'Comment', id: number, text: string, isMe: boolean, createdAt: string, user: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null, isMe: boolean } } | null> | null } };

export type SeeFeedQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type SeeFeedQuery = { __typename?: 'Query', seeFeed: { __typename?: 'SeeFeedResult', ok: boolean, message: string, lastPhotoId?: number | null, photos?: Array<{ __typename?: 'Photo', id: number, photoUrl: string, caption?: string | null, totalLikes: number, totalComments: number, isMe: boolean, isLiked: boolean, createdAt: string, user: { __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null }, hashtags?: Array<{ __typename?: 'Hashtag', id: number, name: string } | null> | null, comments?: Array<{ __typename?: 'Comment', id: number, text: string, isMe: boolean, createdAt: string, user: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } } | null> | null } | null> | null } };

export type SeeFollowersQueryVariables = Exact<{
  username: Scalars['String'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type SeeFollowersQuery = { __typename?: 'Query', seeFollowers: { __typename?: 'SeeFollowersResult', ok: boolean, message: string, followers?: Array<{ __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null, isFollowing: boolean, isMe: boolean } | null> | null } };

export type SeeFollowingQueryVariables = Exact<{
  username: Scalars['String'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type SeeFollowingQuery = { __typename?: 'Query', seeFollowing: { __typename?: 'SeeFollowingResult', ok: boolean, message: string, following?: Array<{ __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null, isFollowing: boolean, isMe: boolean } | null> | null } };

export type SeeHashtagQueryVariables = Exact<{
  name: Scalars['String'];
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type SeeHashtagQuery = { __typename?: 'Query', seeHashtag: { __typename?: 'SeeHashtagResult', ok: boolean, message: string, hashtag?: { __typename?: 'Hashtag', id: number, name: string, totalPhotos?: number | null, photos?: Array<{ __typename?: 'Photo', id: number, photoUrl: string, totalLikes: number, totalComments: number, isLiked: boolean, caption?: string | null, createdAt: string, user: { __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null } } | null> | null } | null } };

export type SeeMeQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeMeQuery = { __typename?: 'Query', seeMe: { __typename?: 'SeeMeResult', ok: boolean, message: string, user?: { __typename?: 'User', id: number, name?: string | null, username: string, email: string, avatarUrl?: string | null, bio?: string | null, isMe: boolean } | null } };

export type SeePhotoQueryVariables = Exact<{
  photoId: Scalars['Int'];
}>;


export type SeePhotoQuery = { __typename?: 'Query', seePhoto: { __typename?: 'SeePhotoResult', ok: boolean, message: string, photo?: { __typename?: 'Photo', id: number, photoUrl: string, caption?: string | null, totalLikes: number, totalComments: number, isMe: boolean, isLiked: boolean, createdAt: string, user: { __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null }, hashtags?: Array<{ __typename?: 'Hashtag', id: number, name: string } | null> | null, comments?: Array<{ __typename?: 'Comment', id: number, text: string, isMe: boolean, user: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } } | null> | null } | null } };

export type SeePhotoLikesQueryVariables = Exact<{
  photoId: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type SeePhotoLikesQuery = { __typename?: 'Query', seePhotoLikes: { __typename?: 'SeePhotoLikesResult', ok: boolean, message: string, users?: Array<{ __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null, isFollowing: boolean, isMe: boolean } | null> | null } };

export type SeeProfileQueryVariables = Exact<{
  username: Scalars['String'];
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type SeeProfileQuery = { __typename?: 'Query', seeProfile: { __typename?: 'SeeProfileResult', ok: boolean, message: string, user?: { __typename?: 'User', id: number, name?: string | null, username: string, bio?: string | null, avatarUrl?: string | null, totalFollowing: number, totalFollowers: number, totalPhotos: number, isFollowing: boolean, isMe: boolean, photos?: Array<{ __typename?: 'Photo', id: number, photoUrl: string, isLiked: boolean, totalLikes: number, totalComments: number, caption?: string | null, createdAt: string, user: { __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null } } | null> | null, following?: Array<{ __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null, isFollowing: boolean } | null> | null, followers?: Array<{ __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null, isFollowing: boolean } | null> | null } | null } };

export type SeeRecommendPhotosQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeRecommendPhotosQuery = { __typename?: 'Query', seeRecommendPhotos: { __typename?: 'SeeRecommendPhotosResult', ok: boolean, message: string, photos?: Array<{ __typename?: 'Photo', id: number, photoUrl: string, caption?: string | null, totalLikes: number, totalComments: number, isMe: boolean, isLiked: boolean, createdAt: string, user: { __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null }, hashtags?: Array<{ __typename?: 'Hashtag', id: number, name: string } | null> | null, comments?: Array<{ __typename?: 'Comment', id: number, text: string, isMe: boolean, createdAt: string, user: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } } | null> | null } | null> | null } };

export type SeeRecommendUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeRecommendUsersQuery = { __typename?: 'Query', seeRecommendUsers: { __typename?: 'SeeRecommendUsersResult', ok: boolean, message: string, users?: Array<{ __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null, isFollowing: boolean, isMe: boolean } | null> | null } };

export type SeeRoomQueryVariables = Exact<{
  roomId: Scalars['Int'];
}>;


export type SeeRoomQuery = { __typename?: 'Query', seeRoom: { __typename?: 'SeeRoomResult', ok: boolean, message: string, room?: { __typename?: 'Room', id: number, users?: Array<{ __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null, isFollowing: boolean, isMe: boolean } | null> | null, messages?: Array<{ __typename?: 'Message', id: number, text: string, read: boolean, createdAt: string, user: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null, isMe: boolean } } | null> | null } | null } };

export type SeeRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeRoomsQuery = { __typename?: 'Query', seeRooms: { __typename?: 'SeeRoomsResult', ok: boolean, message: string, rooms?: Array<{ __typename?: 'Room', id: number, totalUnreadMessages: number, createdAt: string, updatedAt: string, users?: Array<{ __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null, isFollowing: boolean, isMe: boolean } | null> | null, messages?: Array<{ __typename?: 'Message', id: number, text: string, createdAt: string } | null> | null, latestMessage?: { __typename?: 'Message', id: number, text: string, createdAt: string } | null } | null> | null } };

export type SeeUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeUsersQuery = { __typename?: 'Query', seeUsers: { __typename?: 'SeeUsersResult', ok: boolean, message: string, users?: Array<{ __typename?: 'User', id: number, username: string, avatarUrl?: string | null, isFollowing: boolean, name?: string | null, email: string, bio?: string | null, isMe: boolean, following?: Array<{ __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null, isFollowing: boolean } | null> | null, followers?: Array<{ __typename?: 'User', id: number, name?: string | null, username: string, avatarUrl?: string | null, isFollowing: boolean } | null> | null } | null> | null } };

export type CommentUpdatesSubscriptionVariables = Exact<{
  photoId: Scalars['Int'];
}>;


export type CommentUpdatesSubscription = { __typename?: 'Subscription', commentUpdates?: { __typename?: 'Comment', id: number, text: string, isMe: boolean, createdAt: string, user: { __typename?: 'User', id: number, name?: string | null, username: string, email: string, avatarUrl?: string | null }, photo: { __typename?: 'Photo', id: number, photoUrl: string, caption?: string | null, totalLikes: number, totalComments: number, isMe: boolean, isLiked: boolean } } | null };

export type FollowUpdatesSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type FollowUpdatesSubscription = { __typename?: 'Subscription', followUpdates?: { __typename?: 'User', id: number, name?: string | null, username: string, email: string, avatarUrl?: string | null, totalFollowing: number, totalFollowers: number, totalPhotos: number, isFollowing: boolean, isMe: boolean, createdAt: string, updatedAt: string } | null };

export type LikeUpdatesSubscriptionVariables = Exact<{
  photoId: Scalars['Int'];
}>;


export type LikeUpdatesSubscription = { __typename?: 'Subscription', likeUpdates?: { __typename?: 'Like', id: number, createdAt: string, photo: { __typename?: 'Photo', id: number, photoUrl: string }, user: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } } | null };

export type MessageUpdatesSubscriptionVariables = Exact<{
  roomId: Scalars['Int'];
}>;


export type MessageUpdatesSubscription = { __typename?: 'Subscription', messageUpdates?: { __typename?: 'Message', id: number, text: string, read: boolean, user: { __typename?: 'User', id: number, name?: string | null, username: string, email: string, avatarUrl?: string | null }, room: { __typename?: 'Room', id: number, totalUnreadMessages: number, latestMessage?: { __typename?: 'Message', id: number, text: string } | null } } | null };


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
export const DeleteAccountDocument = gql`
    mutation DeleteAccount($userId: Int!) {
  deleteAccount(userId: $userId) {
    ok
    message
  }
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: Int!) {
  deleteComment(commentId: $commentId) {
    ok
    message
    id
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageId: Int!) {
  deleteMessage(messageId: $messageId) {
    ok
    message
    id
  }
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const DeletePhotoDocument = gql`
    mutation DeletePhoto($photoId: Int!) {
  deletePhoto(photoId: $photoId) {
    ok
    message
    id
  }
}
    `;
export type DeletePhotoMutationFn = Apollo.MutationFunction<DeletePhotoMutation, DeletePhotoMutationVariables>;

/**
 * __useDeletePhotoMutation__
 *
 * To run a mutation, you first call `useDeletePhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePhotoMutation, { data, loading, error }] = useDeletePhotoMutation({
 *   variables: {
 *      photoId: // value for 'photoId'
 *   },
 * });
 */
export function useDeletePhotoMutation(baseOptions?: Apollo.MutationHookOptions<DeletePhotoMutation, DeletePhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePhotoMutation, DeletePhotoMutationVariables>(DeletePhotoDocument, options);
      }
export type DeletePhotoMutationHookResult = ReturnType<typeof useDeletePhotoMutation>;
export type DeletePhotoMutationResult = Apollo.MutationResult<DeletePhotoMutation>;
export type DeletePhotoMutationOptions = Apollo.BaseMutationOptions<DeletePhotoMutation, DeletePhotoMutationVariables>;
export const EditCommentDocument = gql`
    mutation EditComment($commentId: Int!, $text: String!) {
  editComment(commentId: $commentId, text: $text) {
    ok
    message
    id
  }
}
    `;
export type EditCommentMutationFn = Apollo.MutationFunction<EditCommentMutation, EditCommentMutationVariables>;

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useEditCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditCommentMutation, EditCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCommentMutation, EditCommentMutationVariables>(EditCommentDocument, options);
      }
export type EditCommentMutationHookResult = ReturnType<typeof useEditCommentMutation>;
export type EditCommentMutationResult = Apollo.MutationResult<EditCommentMutation>;
export type EditCommentMutationOptions = Apollo.BaseMutationOptions<EditCommentMutation, EditCommentMutationVariables>;
export const EditPhotoDocument = gql`
    mutation EditPhoto($photoId: Int!, $caption: String!) {
  editPhoto(photoId: $photoId, caption: $caption) {
    ok
    message
    id
  }
}
    `;
export type EditPhotoMutationFn = Apollo.MutationFunction<EditPhotoMutation, EditPhotoMutationVariables>;

/**
 * __useEditPhotoMutation__
 *
 * To run a mutation, you first call `useEditPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPhotoMutation, { data, loading, error }] = useEditPhotoMutation({
 *   variables: {
 *      photoId: // value for 'photoId'
 *      caption: // value for 'caption'
 *   },
 * });
 */
export function useEditPhotoMutation(baseOptions?: Apollo.MutationHookOptions<EditPhotoMutation, EditPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPhotoMutation, EditPhotoMutationVariables>(EditPhotoDocument, options);
      }
export type EditPhotoMutationHookResult = ReturnType<typeof useEditPhotoMutation>;
export type EditPhotoMutationResult = Apollo.MutationResult<EditPhotoMutation>;
export type EditPhotoMutationOptions = Apollo.BaseMutationOptions<EditPhotoMutation, EditPhotoMutationVariables>;
export const EditProfileDocument = gql`
    mutation EditProfile($name: String, $username: String, $email: String, $password: String, $bio: String, $avatar: Upload) {
  editProfile(
    name: $name
    username: $username
    email: $email
    password: $password
    bio: $bio
    avatar: $avatar
  ) {
    ok
    message
  }
}
    `;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      name: // value for 'name'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      bio: // value for 'bio'
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($username: String!) {
  followUser(username: $username) {
    ok
    message
    user {
      id
      name
      username
    }
  }
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
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
export const ReadMessageDocument = gql`
    mutation ReadMessage($messageId: Int!) {
  readMessage(messageId: $messageId) {
    ok
    message
    id
  }
}
    `;
export type ReadMessageMutationFn = Apollo.MutationFunction<ReadMessageMutation, ReadMessageMutationVariables>;

/**
 * __useReadMessageMutation__
 *
 * To run a mutation, you first call `useReadMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readMessageMutation, { data, loading, error }] = useReadMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useReadMessageMutation(baseOptions?: Apollo.MutationHookOptions<ReadMessageMutation, ReadMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadMessageMutation, ReadMessageMutationVariables>(ReadMessageDocument, options);
      }
export type ReadMessageMutationHookResult = ReturnType<typeof useReadMessageMutation>;
export type ReadMessageMutationResult = Apollo.MutationResult<ReadMessageMutation>;
export type ReadMessageMutationOptions = Apollo.BaseMutationOptions<ReadMessageMutation, ReadMessageMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($text: String, $roomId: Int, $userId: Int) {
  sendMessage(text: $text, roomId: $roomId, userId: $userId) {
    ok
    message
    room {
      id
    }
    id
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      text: // value for 'text'
 *      roomId: // value for 'roomId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
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
export const UnfollowUserDocument = gql`
    mutation UnfollowUser($username: String!) {
  unfollowUser(username: $username) {
    ok
    message
    user {
      id
      name
      username
    }
  }
}
    `;
export type UnfollowUserMutationFn = Apollo.MutationFunction<UnfollowUserMutation, UnfollowUserMutationVariables>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUnfollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, options);
      }
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>;
export type UnfollowUserMutationResult = Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const UploadPhotoDocument = gql`
    mutation UploadPhoto($photo: Upload!, $caption: String) {
  uploadPhoto(photo: $photo, caption: $caption) {
    ok
    message
    photo {
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
      totalLikes
      totalComments
      isMe
      isLiked
      createdAt
    }
  }
}
    `;
export type UploadPhotoMutationFn = Apollo.MutationFunction<UploadPhotoMutation, UploadPhotoMutationVariables>;

/**
 * __useUploadPhotoMutation__
 *
 * To run a mutation, you first call `useUploadPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadPhotoMutation, { data, loading, error }] = useUploadPhotoMutation({
 *   variables: {
 *      photo: // value for 'photo'
 *      caption: // value for 'caption'
 *   },
 * });
 */
export function useUploadPhotoMutation(baseOptions?: Apollo.MutationHookOptions<UploadPhotoMutation, UploadPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadPhotoMutation, UploadPhotoMutationVariables>(UploadPhotoDocument, options);
      }
export type UploadPhotoMutationHookResult = ReturnType<typeof useUploadPhotoMutation>;
export type UploadPhotoMutationResult = Apollo.MutationResult<UploadPhotoMutation>;
export type UploadPhotoMutationOptions = Apollo.BaseMutationOptions<UploadPhotoMutation, UploadPhotoMutationVariables>;
export const SearchHashtagsDocument = gql`
    query SearchHashtags($name: String!) {
  searchHashtags(name: $name) {
    ok
    message
    hashtags {
      id
      name
      totalPhotos
    }
  }
}
    `;

/**
 * __useSearchHashtagsQuery__
 *
 * To run a query within a React component, call `useSearchHashtagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchHashtagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchHashtagsQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSearchHashtagsQuery(baseOptions: Apollo.QueryHookOptions<SearchHashtagsQuery, SearchHashtagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchHashtagsQuery, SearchHashtagsQueryVariables>(SearchHashtagsDocument, options);
      }
export function useSearchHashtagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchHashtagsQuery, SearchHashtagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchHashtagsQuery, SearchHashtagsQueryVariables>(SearchHashtagsDocument, options);
        }
export type SearchHashtagsQueryHookResult = ReturnType<typeof useSearchHashtagsQuery>;
export type SearchHashtagsLazyQueryHookResult = ReturnType<typeof useSearchHashtagsLazyQuery>;
export type SearchHashtagsQueryResult = Apollo.QueryResult<SearchHashtagsQuery, SearchHashtagsQueryVariables>;
export const SearchPhotosDocument = gql`
    query SearchPhotos($keyword: String!, $cursor: Int) {
  searchPhotos(keyword: $keyword, cursor: $cursor) {
    ok
    message
    photos {
      id
      photoUrl
      user {
        id
        username
      }
      totalLikes
      totalComments
    }
  }
}
    `;

/**
 * __useSearchPhotosQuery__
 *
 * To run a query within a React component, call `useSearchPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPhotosQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSearchPhotosQuery(baseOptions: Apollo.QueryHookOptions<SearchPhotosQuery, SearchPhotosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPhotosQuery, SearchPhotosQueryVariables>(SearchPhotosDocument, options);
      }
export function useSearchPhotosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPhotosQuery, SearchPhotosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPhotosQuery, SearchPhotosQueryVariables>(SearchPhotosDocument, options);
        }
export type SearchPhotosQueryHookResult = ReturnType<typeof useSearchPhotosQuery>;
export type SearchPhotosLazyQueryHookResult = ReturnType<typeof useSearchPhotosLazyQuery>;
export type SearchPhotosQueryResult = Apollo.QueryResult<SearchPhotosQuery, SearchPhotosQueryVariables>;
export const SearchUsersDocument = gql`
    query SearchUsers($username: String!, $cursor: String) {
  searchUsers(username: $username, cursor: $cursor) {
    ok
    message
    users {
      id
      name
      username
      avatarUrl
    }
  }
}
    `;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      username: // value for 'username'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export const SeeCommentsDocument = gql`
    query SeeComments($photoId: Int!, $cursor: Int) {
  seeComments(photoId: $photoId, cursor: $cursor) {
    ok
    message
    comments {
      id
      text
      user {
        id
        username
        avatarUrl
        isMe
      }
      isMe
      createdAt
    }
  }
}
    `;

/**
 * __useSeeCommentsQuery__
 *
 * To run a query within a React component, call `useSeeCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeCommentsQuery({
 *   variables: {
 *      photoId: // value for 'photoId'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSeeCommentsQuery(baseOptions: Apollo.QueryHookOptions<SeeCommentsQuery, SeeCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeCommentsQuery, SeeCommentsQueryVariables>(SeeCommentsDocument, options);
      }
export function useSeeCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeCommentsQuery, SeeCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeCommentsQuery, SeeCommentsQueryVariables>(SeeCommentsDocument, options);
        }
export type SeeCommentsQueryHookResult = ReturnType<typeof useSeeCommentsQuery>;
export type SeeCommentsLazyQueryHookResult = ReturnType<typeof useSeeCommentsLazyQuery>;
export type SeeCommentsQueryResult = Apollo.QueryResult<SeeCommentsQuery, SeeCommentsQueryVariables>;
export const SeeFeedDocument = gql`
    query SeeFeed($cursor: Int) {
  seeFeed(cursor: $cursor) {
    ok
    message
    lastPhotoId
    photos {
      id
      photoUrl
      caption
      totalLikes
      totalComments
      isMe
      isLiked
      createdAt
      user {
        id
        name
        username
        avatarUrl
      }
      hashtags {
        id
        name
      }
      comments {
        id
        text
        isMe
        createdAt
        user {
          id
          username
          avatarUrl
        }
      }
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
export const SeeFollowersDocument = gql`
    query SeeFollowers($username: String!, $cursor: String) {
  seeFollowers(username: $username, cursor: $cursor) {
    ok
    message
    followers {
      id
      name
      username
      avatarUrl
      isFollowing
      isMe
    }
  }
}
    `;

/**
 * __useSeeFollowersQuery__
 *
 * To run a query within a React component, call `useSeeFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeFollowersQuery({
 *   variables: {
 *      username: // value for 'username'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSeeFollowersQuery(baseOptions: Apollo.QueryHookOptions<SeeFollowersQuery, SeeFollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeFollowersQuery, SeeFollowersQueryVariables>(SeeFollowersDocument, options);
      }
export function useSeeFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeFollowersQuery, SeeFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeFollowersQuery, SeeFollowersQueryVariables>(SeeFollowersDocument, options);
        }
export type SeeFollowersQueryHookResult = ReturnType<typeof useSeeFollowersQuery>;
export type SeeFollowersLazyQueryHookResult = ReturnType<typeof useSeeFollowersLazyQuery>;
export type SeeFollowersQueryResult = Apollo.QueryResult<SeeFollowersQuery, SeeFollowersQueryVariables>;
export const SeeFollowingDocument = gql`
    query SeeFollowing($username: String!, $cursor: String) {
  seeFollowing(username: $username, cursor: $cursor) {
    ok
    message
    following {
      id
      name
      username
      avatarUrl
      isFollowing
      isMe
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
export const SeeHashtagDocument = gql`
    query SeeHashtag($name: String!, $cursor: Int) {
  seeHashtag(name: $name) {
    ok
    message
    hashtag {
      id
      name
      photos(cursor: $cursor) {
        id
        photoUrl
        user {
          id
          name
          username
          avatarUrl
        }
        totalLikes
        totalComments
        isLiked
        caption
        createdAt
      }
      totalPhotos
    }
  }
}
    `;

/**
 * __useSeeHashtagQuery__
 *
 * To run a query within a React component, call `useSeeHashtagQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeHashtagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeHashtagQuery({
 *   variables: {
 *      name: // value for 'name'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSeeHashtagQuery(baseOptions: Apollo.QueryHookOptions<SeeHashtagQuery, SeeHashtagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeHashtagQuery, SeeHashtagQueryVariables>(SeeHashtagDocument, options);
      }
export function useSeeHashtagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeHashtagQuery, SeeHashtagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeHashtagQuery, SeeHashtagQueryVariables>(SeeHashtagDocument, options);
        }
export type SeeHashtagQueryHookResult = ReturnType<typeof useSeeHashtagQuery>;
export type SeeHashtagLazyQueryHookResult = ReturnType<typeof useSeeHashtagLazyQuery>;
export type SeeHashtagQueryResult = Apollo.QueryResult<SeeHashtagQuery, SeeHashtagQueryVariables>;
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
export const SeePhotoDocument = gql`
    query SeePhoto($photoId: Int!) {
  seePhoto(photoId: $photoId) {
    ok
    message
    photo {
      id
      user {
        id
        name
        username
        avatarUrl
      }
      photoUrl
      caption
      totalLikes
      totalComments
      isMe
      isLiked
      createdAt
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
      }
    }
  }
}
    `;

/**
 * __useSeePhotoQuery__
 *
 * To run a query within a React component, call `useSeePhotoQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeePhotoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeePhotoQuery({
 *   variables: {
 *      photoId: // value for 'photoId'
 *   },
 * });
 */
export function useSeePhotoQuery(baseOptions: Apollo.QueryHookOptions<SeePhotoQuery, SeePhotoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeePhotoQuery, SeePhotoQueryVariables>(SeePhotoDocument, options);
      }
export function useSeePhotoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeePhotoQuery, SeePhotoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeePhotoQuery, SeePhotoQueryVariables>(SeePhotoDocument, options);
        }
export type SeePhotoQueryHookResult = ReturnType<typeof useSeePhotoQuery>;
export type SeePhotoLazyQueryHookResult = ReturnType<typeof useSeePhotoLazyQuery>;
export type SeePhotoQueryResult = Apollo.QueryResult<SeePhotoQuery, SeePhotoQueryVariables>;
export const SeePhotoLikesDocument = gql`
    query SeePhotoLikes($photoId: Int!, $cursor: String) {
  seePhotoLikes(photoId: $photoId, cursor: $cursor) {
    ok
    message
    users {
      id
      name
      username
      avatarUrl
      isFollowing
      isMe
    }
  }
}
    `;

/**
 * __useSeePhotoLikesQuery__
 *
 * To run a query within a React component, call `useSeePhotoLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeePhotoLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeePhotoLikesQuery({
 *   variables: {
 *      photoId: // value for 'photoId'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSeePhotoLikesQuery(baseOptions: Apollo.QueryHookOptions<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>(SeePhotoLikesDocument, options);
      }
export function useSeePhotoLikesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>(SeePhotoLikesDocument, options);
        }
export type SeePhotoLikesQueryHookResult = ReturnType<typeof useSeePhotoLikesQuery>;
export type SeePhotoLikesLazyQueryHookResult = ReturnType<typeof useSeePhotoLikesLazyQuery>;
export type SeePhotoLikesQueryResult = Apollo.QueryResult<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>;
export const SeeProfileDocument = gql`
    query SeeProfile($username: String!, $cursor: Int) {
  seeProfile(username: $username) {
    ok
    message
    user {
      id
      name
      username
      bio
      avatarUrl
      totalFollowing
      totalFollowers
      totalPhotos
      isFollowing
      isMe
      photos(cursor: $cursor) {
        id
        user {
          id
          name
          username
          avatarUrl
        }
        photoUrl
        isLiked
        totalLikes
        totalComments
        caption
        createdAt
      }
      following {
        id
        name
        username
        avatarUrl
        isFollowing
      }
      followers {
        id
        name
        username
        avatarUrl
        isFollowing
      }
    }
  }
}
    `;

/**
 * __useSeeProfileQuery__
 *
 * To run a query within a React component, call `useSeeProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeProfileQuery({
 *   variables: {
 *      username: // value for 'username'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSeeProfileQuery(baseOptions: Apollo.QueryHookOptions<SeeProfileQuery, SeeProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeProfileQuery, SeeProfileQueryVariables>(SeeProfileDocument, options);
      }
export function useSeeProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeProfileQuery, SeeProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeProfileQuery, SeeProfileQueryVariables>(SeeProfileDocument, options);
        }
export type SeeProfileQueryHookResult = ReturnType<typeof useSeeProfileQuery>;
export type SeeProfileLazyQueryHookResult = ReturnType<typeof useSeeProfileLazyQuery>;
export type SeeProfileQueryResult = Apollo.QueryResult<SeeProfileQuery, SeeProfileQueryVariables>;
export const SeeRecommendPhotosDocument = gql`
    query SeeRecommendPhotos {
  seeRecommendPhotos {
    ok
    message
    photos {
      id
      photoUrl
      caption
      totalLikes
      totalComments
      isMe
      isLiked
      createdAt
      user {
        id
        name
        username
        avatarUrl
      }
      hashtags {
        id
        name
      }
      comments {
        id
        text
        isMe
        createdAt
        user {
          id
          username
          avatarUrl
        }
      }
    }
  }
}
    `;

/**
 * __useSeeRecommendPhotosQuery__
 *
 * To run a query within a React component, call `useSeeRecommendPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeRecommendPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeRecommendPhotosQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeRecommendPhotosQuery(baseOptions?: Apollo.QueryHookOptions<SeeRecommendPhotosQuery, SeeRecommendPhotosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeRecommendPhotosQuery, SeeRecommendPhotosQueryVariables>(SeeRecommendPhotosDocument, options);
      }
export function useSeeRecommendPhotosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeRecommendPhotosQuery, SeeRecommendPhotosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeRecommendPhotosQuery, SeeRecommendPhotosQueryVariables>(SeeRecommendPhotosDocument, options);
        }
export type SeeRecommendPhotosQueryHookResult = ReturnType<typeof useSeeRecommendPhotosQuery>;
export type SeeRecommendPhotosLazyQueryHookResult = ReturnType<typeof useSeeRecommendPhotosLazyQuery>;
export type SeeRecommendPhotosQueryResult = Apollo.QueryResult<SeeRecommendPhotosQuery, SeeRecommendPhotosQueryVariables>;
export const SeeRecommendUsersDocument = gql`
    query SeeRecommendUsers {
  seeRecommendUsers {
    ok
    message
    users {
      id
      name
      username
      avatarUrl
      isFollowing
      isMe
    }
  }
}
    `;

/**
 * __useSeeRecommendUsersQuery__
 *
 * To run a query within a React component, call `useSeeRecommendUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeRecommendUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeRecommendUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeRecommendUsersQuery(baseOptions?: Apollo.QueryHookOptions<SeeRecommendUsersQuery, SeeRecommendUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeRecommendUsersQuery, SeeRecommendUsersQueryVariables>(SeeRecommendUsersDocument, options);
      }
export function useSeeRecommendUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeRecommendUsersQuery, SeeRecommendUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeRecommendUsersQuery, SeeRecommendUsersQueryVariables>(SeeRecommendUsersDocument, options);
        }
export type SeeRecommendUsersQueryHookResult = ReturnType<typeof useSeeRecommendUsersQuery>;
export type SeeRecommendUsersLazyQueryHookResult = ReturnType<typeof useSeeRecommendUsersLazyQuery>;
export type SeeRecommendUsersQueryResult = Apollo.QueryResult<SeeRecommendUsersQuery, SeeRecommendUsersQueryVariables>;
export const SeeRoomDocument = gql`
    query SeeRoom($roomId: Int!) {
  seeRoom(roomId: $roomId) {
    ok
    message
    room {
      id
      users {
        id
        name
        username
        avatarUrl
        isFollowing
        isMe
      }
      messages {
        id
        text
        read
        createdAt
        user {
          id
          username
          avatarUrl
          isMe
        }
      }
    }
  }
}
    `;

/**
 * __useSeeRoomQuery__
 *
 * To run a query within a React component, call `useSeeRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeRoomQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useSeeRoomQuery(baseOptions: Apollo.QueryHookOptions<SeeRoomQuery, SeeRoomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeRoomQuery, SeeRoomQueryVariables>(SeeRoomDocument, options);
      }
export function useSeeRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeRoomQuery, SeeRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeRoomQuery, SeeRoomQueryVariables>(SeeRoomDocument, options);
        }
export type SeeRoomQueryHookResult = ReturnType<typeof useSeeRoomQuery>;
export type SeeRoomLazyQueryHookResult = ReturnType<typeof useSeeRoomLazyQuery>;
export type SeeRoomQueryResult = Apollo.QueryResult<SeeRoomQuery, SeeRoomQueryVariables>;
export const SeeRoomsDocument = gql`
    query SeeRooms {
  seeRooms {
    ok
    message
    rooms {
      id
      users {
        id
        name
        username
        avatarUrl
        isFollowing
        isMe
      }
      messages {
        id
        text
        createdAt
      }
      totalUnreadMessages
      latestMessage {
        id
        text
        createdAt
      }
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useSeeRoomsQuery__
 *
 * To run a query within a React component, call `useSeeRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeRoomsQuery(baseOptions?: Apollo.QueryHookOptions<SeeRoomsQuery, SeeRoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeRoomsQuery, SeeRoomsQueryVariables>(SeeRoomsDocument, options);
      }
export function useSeeRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeRoomsQuery, SeeRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeRoomsQuery, SeeRoomsQueryVariables>(SeeRoomsDocument, options);
        }
export type SeeRoomsQueryHookResult = ReturnType<typeof useSeeRoomsQuery>;
export type SeeRoomsLazyQueryHookResult = ReturnType<typeof useSeeRoomsLazyQuery>;
export type SeeRoomsQueryResult = Apollo.QueryResult<SeeRoomsQuery, SeeRoomsQueryVariables>;
export const SeeUsersDocument = gql`
    query SeeUsers {
  seeUsers {
    ok
    message
    users {
      id
      username
      avatarUrl
      isFollowing
      name
      email
      bio
      isMe
      following {
        id
        name
        username
        avatarUrl
        isFollowing
      }
      followers {
        id
        name
        username
        avatarUrl
        isFollowing
      }
    }
  }
}
    `;

/**
 * __useSeeUsersQuery__
 *
 * To run a query within a React component, call `useSeeUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeUsersQuery(baseOptions?: Apollo.QueryHookOptions<SeeUsersQuery, SeeUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeUsersQuery, SeeUsersQueryVariables>(SeeUsersDocument, options);
      }
export function useSeeUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeUsersQuery, SeeUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeUsersQuery, SeeUsersQueryVariables>(SeeUsersDocument, options);
        }
export type SeeUsersQueryHookResult = ReturnType<typeof useSeeUsersQuery>;
export type SeeUsersLazyQueryHookResult = ReturnType<typeof useSeeUsersLazyQuery>;
export type SeeUsersQueryResult = Apollo.QueryResult<SeeUsersQuery, SeeUsersQueryVariables>;
export const CommentUpdatesDocument = gql`
    subscription CommentUpdates($photoId: Int!) {
  commentUpdates(photoId: $photoId) {
    id
    text
    user {
      id
      name
      username
      email
      avatarUrl
    }
    photo {
      id
      photoUrl
      caption
      totalLikes
      totalComments
      isMe
      isLiked
    }
    isMe
    createdAt
  }
}
    `;

/**
 * __useCommentUpdatesSubscription__
 *
 * To run a query within a React component, call `useCommentUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCommentUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentUpdatesSubscription({
 *   variables: {
 *      photoId: // value for 'photoId'
 *   },
 * });
 */
export function useCommentUpdatesSubscription(baseOptions: Apollo.SubscriptionHookOptions<CommentUpdatesSubscription, CommentUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CommentUpdatesSubscription, CommentUpdatesSubscriptionVariables>(CommentUpdatesDocument, options);
      }
export type CommentUpdatesSubscriptionHookResult = ReturnType<typeof useCommentUpdatesSubscription>;
export type CommentUpdatesSubscriptionResult = Apollo.SubscriptionResult<CommentUpdatesSubscription>;
export const FollowUpdatesDocument = gql`
    subscription FollowUpdates($userId: Int!) {
  followUpdates(userId: $userId) {
    id
    name
    username
    email
    avatarUrl
    totalFollowing
    totalFollowers
    totalPhotos
    isFollowing
    isMe
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useFollowUpdatesSubscription__
 *
 * To run a query within a React component, call `useFollowUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFollowUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowUpdatesSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowUpdatesSubscription(baseOptions: Apollo.SubscriptionHookOptions<FollowUpdatesSubscription, FollowUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<FollowUpdatesSubscription, FollowUpdatesSubscriptionVariables>(FollowUpdatesDocument, options);
      }
export type FollowUpdatesSubscriptionHookResult = ReturnType<typeof useFollowUpdatesSubscription>;
export type FollowUpdatesSubscriptionResult = Apollo.SubscriptionResult<FollowUpdatesSubscription>;
export const LikeUpdatesDocument = gql`
    subscription LikeUpdates($photoId: Int!) {
  likeUpdates(photoId: $photoId) {
    id
    photo {
      id
      photoUrl
    }
    user {
      id
      username
      avatarUrl
    }
    createdAt
  }
}
    `;

/**
 * __useLikeUpdatesSubscription__
 *
 * To run a query within a React component, call `useLikeUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLikeUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLikeUpdatesSubscription({
 *   variables: {
 *      photoId: // value for 'photoId'
 *   },
 * });
 */
export function useLikeUpdatesSubscription(baseOptions: Apollo.SubscriptionHookOptions<LikeUpdatesSubscription, LikeUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<LikeUpdatesSubscription, LikeUpdatesSubscriptionVariables>(LikeUpdatesDocument, options);
      }
export type LikeUpdatesSubscriptionHookResult = ReturnType<typeof useLikeUpdatesSubscription>;
export type LikeUpdatesSubscriptionResult = Apollo.SubscriptionResult<LikeUpdatesSubscription>;
export const MessageUpdatesDocument = gql`
    subscription MessageUpdates($roomId: Int!) {
  messageUpdates(roomId: $roomId) {
    id
    text
    read
    user {
      id
      name
      username
      email
      avatarUrl
    }
    room {
      id
      totalUnreadMessages
      latestMessage {
        id
        text
      }
    }
  }
}
    `;

/**
 * __useMessageUpdatesSubscription__
 *
 * To run a query within a React component, call `useMessageUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageUpdatesSubscription({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useMessageUpdatesSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageUpdatesSubscription, MessageUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageUpdatesSubscription, MessageUpdatesSubscriptionVariables>(MessageUpdatesDocument, options);
      }
export type MessageUpdatesSubscriptionHookResult = ReturnType<typeof useMessageUpdatesSubscription>;
export type MessageUpdatesSubscriptionResult = Apollo.SubscriptionResult<MessageUpdatesSubscription>;