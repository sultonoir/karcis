// Generated by Xata Codegen 0.28.2. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "nextauth_users",
    columns: [
      { name: "email", type: "email" },
      { name: "emailVerified", type: "datetime" },
      { name: "name", type: "string" },
      { name: "image", type: "string" },
      { name: "banner", type: "file", file: { defaultPublicAccess: true } },
      { name: "about", type: "text" },
      { name: "facebook", type: "string" },
      { name: "instagram", type: "string" },
      { name: "twitter", type: "string" },
      { name: "tiktok", type: "string" },
      { name: "imageId", type: "string" },
    ],
    revLinks: [
      { column: "user", table: "nextauth_accounts" },
      { column: "user", table: "nextauth_users_accounts" },
      { column: "user", table: "nextauth_users_sessions" },
      { column: "user", table: "nextauth_sessions" },
      { column: "author", table: "events" },
      { column: "user", table: "purchase" },
      { column: "user", table: "notify" },
    ],
  },
  {
    name: "nextauth_accounts",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "type", type: "string" },
      { name: "provider", type: "string" },
      { name: "providerAccountId", type: "string" },
      { name: "refresh_token", type: "string" },
      { name: "access_token", type: "string" },
      { name: "expires_at", type: "int" },
      { name: "token_type", type: "string" },
      { name: "scope", type: "string" },
      { name: "id_token", type: "text" },
      { name: "session_state", type: "string" },
    ],
    revLinks: [{ column: "account", table: "nextauth_users_accounts" }],
  },
  {
    name: "nextauth_verificationTokens",
    columns: [
      { name: "identifier", type: "string" },
      { name: "token", type: "string" },
      { name: "expires", type: "datetime" },
    ],
  },
  {
    name: "nextauth_users_accounts",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "account", type: "link", link: { table: "nextauth_accounts" } },
    ],
  },
  {
    name: "nextauth_users_sessions",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "session", type: "link", link: { table: "nextauth_sessions" } },
    ],
  },
  {
    name: "nextauth_sessions",
    columns: [
      { name: "sessionToken", type: "string" },
      { name: "expires", type: "datetime" },
      { name: "user", type: "link", link: { table: "nextauth_users" } },
    ],
    revLinks: [{ column: "session", table: "nextauth_users_sessions" }],
  },
  {
    name: "events",
    columns: [
      { name: "title", type: "string", unique: true },
      { name: "slug", type: "string" },
      { name: "author", type: "link", link: { table: "nextauth_users" } },
      { name: "term", type: "text", notNull: true, defaultValue: "" },
      { name: "description", type: "text", notNull: true, defaultValue: "" },
      { name: "category", type: "string", notNull: true, defaultValue: "" },
      { name: "location", type: "string", notNull: true, defaultValue: "" },
      { name: "tag", type: "multiple" },
      { name: "place", type: "string", defaultValue: "" },
      { name: "image", type: "file", file: { defaultPublicAccess: true } },
      {
        name: "startDate",
        type: "datetime",
        notNull: true,
        defaultValue: "now",
      },
      { name: "time", type: "string", notNull: true, defaultValue: "" },
      { name: "endDate", type: "datetime", notNull: true, defaultValue: "now" },
      { name: "oneBuy", type: "bool", notNull: true, defaultValue: "false" },
      { name: "blur", type: "text", notNull: true, defaultValue: "" },
    ],
    revLinks: [
      { column: "event", table: "tikets" },
      { column: "events", table: "purchase" },
      { column: "event", table: "notify" },
    ],
  },
  {
    name: "tikets",
    columns: [
      { name: "event", type: "link", link: { table: "events" } },
      { name: "title", type: "string" },
      { name: "price", type: "float", notNull: true, defaultValue: "0" },
      { name: "count", type: "int", notNull: true, defaultValue: "0" },
      { name: "max", type: "int", notNull: true, defaultValue: "5" },
      { name: "description", type: "text" },
      { name: "isFree", type: "bool", notNull: true, defaultValue: "false" },
    ],
  },
  {
    name: "purchase",
    columns: [
      { name: "totalPrice", type: "float", notNull: true, defaultValue: "0" },
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "amount", type: "int", notNull: true, defaultValue: "0" },
      { name: "events", type: "link", link: { table: "events" } },
      {
        name: "status",
        type: "string",
        notNull: true,
        defaultValue: "processing",
      },
    ],
    revLinks: [
      { column: "purchase", table: "ticketdetail" },
      { column: "purchase", table: "notify" },
    ],
  },
  {
    name: "notify",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "message", type: "text", notNull: true, defaultValue: "" },
      { name: "event", type: "link", link: { table: "events" } },
      { name: "purchase", type: "link", link: { table: "purchase" } },
      { name: "isRead", type: "bool", notNull: true, defaultValue: "false" },
      { name: "isOpen", type: "bool", notNull: true, defaultValue: "false" },
      { name: "type", type: "string", notNull: true, defaultValue: "payment" },
    ],
  },
  {
    name: "ticketdetail",
    columns: [
      { name: "ticketId", type: "string", notNull: true, defaultValue: "" },
      { name: "totalticket", type: "int", notNull: true, defaultValue: "0" },
      { name: "purchase", type: "link", link: { table: "purchase" } },
      { name: "ticketName", type: "string", notNull: true, defaultValue: "" },
    ],
  },
  {
    name: "imageBucket",
    columns: [
      { name: "img", type: "file", file: { defaultPublicAccess: true } },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type NextauthUsers = InferredTypes["nextauth_users"];
export type NextauthUsersRecord = NextauthUsers & XataRecord;

export type NextauthAccounts = InferredTypes["nextauth_accounts"];
export type NextauthAccountsRecord = NextauthAccounts & XataRecord;

export type NextauthVerificationTokens =
  InferredTypes["nextauth_verificationTokens"];
export type NextauthVerificationTokensRecord = NextauthVerificationTokens &
  XataRecord;

export type NextauthUsersAccounts = InferredTypes["nextauth_users_accounts"];
export type NextauthUsersAccountsRecord = NextauthUsersAccounts & XataRecord;

export type NextauthUsersSessions = InferredTypes["nextauth_users_sessions"];
export type NextauthUsersSessionsRecord = NextauthUsersSessions & XataRecord;

export type NextauthSessions = InferredTypes["nextauth_sessions"];
export type NextauthSessionsRecord = NextauthSessions & XataRecord;

export type Events = InferredTypes["events"];
export type EventsRecord = Events & XataRecord;

export type Tikets = InferredTypes["tikets"];
export type TiketsRecord = Tikets & XataRecord;

export type Purchase = InferredTypes["purchase"];
export type PurchaseRecord = Purchase & XataRecord;

export type Notify = InferredTypes["notify"];
export type NotifyRecord = Notify & XataRecord;

export type Ticketdetail = InferredTypes["ticketdetail"];
export type TicketdetailRecord = Ticketdetail & XataRecord;

export type ImageBucket = InferredTypes["imageBucket"];
export type ImageBucketRecord = ImageBucket & XataRecord;

export type DatabaseSchema = {
  nextauth_users: NextauthUsersRecord;
  nextauth_accounts: NextauthAccountsRecord;
  nextauth_verificationTokens: NextauthVerificationTokensRecord;
  nextauth_users_accounts: NextauthUsersAccountsRecord;
  nextauth_users_sessions: NextauthUsersSessionsRecord;
  nextauth_sessions: NextauthSessionsRecord;
  events: EventsRecord;
  tikets: TiketsRecord;
  purchase: PurchaseRecord;
  notify: NotifyRecord;
  ticketdetail: TicketdetailRecord;
  imageBucket: ImageBucketRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Sulton-s-workspace-4sbl61.ap-southeast-2.xata.sh/db/karcis",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
