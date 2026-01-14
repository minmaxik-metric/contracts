import { join } from "node:path";

export const PROTO_PATHS = {
  AUTH: join(__dirname, "../../proto/auth.proto"),
  ACCOUNT: join(__dirname, "../../proto/account.proto"),
} as const;
