import { join } from "node:path";

export const PROTO_PATHS = {
  ROOT: join(__dirname, "../../proto/"),
  AUTH: join(__dirname, "../../proto/auth.proto"),
  ACCOUNT: join(__dirname, "../../proto/account.proto"),
  USERS: join(__dirname, "../../proto/users.proto"),
  ORGANIZATIONS: join(__dirname, "../../proto/organizations.proto"),
  REPOSITORIES: join(__dirname, "../../proto/repositories.proto"),
  SCM_USERS: join(__dirname, "../../proto/scm_users.proto"),
  REPOSITORY_MEMBERSHIPS: join(
    __dirname,
    "../../proto/repository_memberships.proto",
  ),
  ISSUES: join(__dirname, "../../proto/issues.proto"),
  ISSUES_ASSIGNEES: join(__dirname, "../../proto/issue_assignees.proto"),
  PULL_REQUESTS: join(__dirname, "../../proto/pull_requests.proto"),
  COMMITS: join(__dirname, "../../proto/commits.proto"),
} as const;
