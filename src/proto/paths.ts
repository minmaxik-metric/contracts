import { join } from "node:path";

export const PROTO_PATHS = {
  AUTH: join(__dirname, "../../proto/auth.proto"),
} as const;
