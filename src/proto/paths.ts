import { existsSync } from "node:fs";
import { join } from "node:path";

const protoRootCandidates = [
  join(__dirname, "../../../proto/"),
  join(__dirname, "../../proto/"),
];

const protoRoot =
  protoRootCandidates.find((candidate) => existsSync(candidate)) ??
  protoRootCandidates[0];

const protoPath = (filename: string) => join(protoRoot, filename);

export const PROTO_PATHS = {
  ROOT: protoRoot,
  AUTH: protoPath("auth.proto"),
  ACCOUNT: protoPath("account.proto"),
  USERS: protoPath("users.proto"),
  ANALYTICS: protoPath("analytics.proto"),
} as const;
