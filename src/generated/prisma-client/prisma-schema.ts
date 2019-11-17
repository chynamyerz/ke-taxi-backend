// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

enum Role {
  ADMIN
  DRIVER
  PASSANGER
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  cell: String!
  email: String!
  image: String
  name: String!
  password: String!
  oneTimePin: String
  oneTimePinExpiry: DateTime
  role: [Role!]!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  cell: String!
  email: String!
  image: String
  name: String!
  password: String!
  oneTimePin: String
  oneTimePinExpiry: DateTime
  role: UserCreateroleInput
}

input UserCreateroleInput {
  set: [Role!]
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  cell_ASC
  cell_DESC
  email_ASC
  email_DESC
  image_ASC
  image_DESC
  name_ASC
  name_DESC
  password_ASC
  password_DESC
  oneTimePin_ASC
  oneTimePin_DESC
  oneTimePinExpiry_ASC
  oneTimePinExpiry_DESC
}

type UserPreviousValues {
  id: ID!
  cell: String!
  email: String!
  image: String
  name: String!
  password: String!
  oneTimePin: String
  oneTimePinExpiry: DateTime
  role: [Role!]!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  cell: String
  email: String
  image: String
  name: String
  password: String
  oneTimePin: String
  oneTimePinExpiry: DateTime
  role: UserUpdateroleInput
}

input UserUpdateManyMutationInput {
  cell: String
  email: String
  image: String
  name: String
  password: String
  oneTimePin: String
  oneTimePinExpiry: DateTime
  role: UserUpdateroleInput
}

input UserUpdateroleInput {
  set: [Role!]
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  cell: String
  cell_not: String
  cell_in: [String!]
  cell_not_in: [String!]
  cell_lt: String
  cell_lte: String
  cell_gt: String
  cell_gte: String
  cell_contains: String
  cell_not_contains: String
  cell_starts_with: String
  cell_not_starts_with: String
  cell_ends_with: String
  cell_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  oneTimePin: String
  oneTimePin_not: String
  oneTimePin_in: [String!]
  oneTimePin_not_in: [String!]
  oneTimePin_lt: String
  oneTimePin_lte: String
  oneTimePin_gt: String
  oneTimePin_gte: String
  oneTimePin_contains: String
  oneTimePin_not_contains: String
  oneTimePin_starts_with: String
  oneTimePin_not_starts_with: String
  oneTimePin_ends_with: String
  oneTimePin_not_ends_with: String
  oneTimePinExpiry: DateTime
  oneTimePinExpiry_not: DateTime
  oneTimePinExpiry_in: [DateTime!]
  oneTimePinExpiry_not_in: [DateTime!]
  oneTimePinExpiry_lt: DateTime
  oneTimePinExpiry_lte: DateTime
  oneTimePinExpiry_gt: DateTime
  oneTimePinExpiry_gte: DateTime
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`