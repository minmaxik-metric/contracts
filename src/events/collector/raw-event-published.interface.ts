interface _RawEventPublished<T = unknown, P = unknown> {
  id: string;
  source: "github";
  type: T;

  publishedAt: Date;

  payload: P;

  repositoryOwner: {
    id: string;
    name: string;
    url: string;
    avatarUrl: string;
  };

  repository: {
    id: string;
    name: string;
    url: string;
  };
}

interface UserPayload {
  id: string;
  login: string;
}

interface CommitEventPayload {
  sha: string;
  message: string;
  author: UserPayload;
  stats: {
    additions: number;
    deletions: number;
  };
  committedAt: Date;
}

interface IssueCreatedEventPayload {
  id: string;
  number: number;
  author: UserPayload;
  title: string;
  description: string | null;
  state: "open" | "closed";
  commentCount: number;

  createdAt: Date;
  closedAt: Date | null;
}

interface IssueStateChangedEventPayload {
  eventId: string;
  issueId: string;
  actor: UserPayload;
  event: "closed" | "reopened";

  createdAt: Date;
}

interface IssueAssigneeEventPayload {
  eventId: string;
  issueId: string;
  event: "assigned" | "unassigned";
  actor: UserPayload;
  assignee: UserPayload;

  createdAt: Date;
}

interface IssueLabelEventPayload {
  eventId: string;
  issueId: string;
  actor: UserPayload;
  event: "labeled" | "unlabeled";
  label: string;

  createdAt: Date;
}

interface IssueCommentEventPayload {
  eventId: string;
  issueId: string;
  actor: UserPayload;
  event: "commented";
  body: string;

  createdAt: Date;
}

interface PullRequestCreatedPayload {
  id: string;
  number: number;
  name: string;
  description: string | null;
  state: "open" | "closed";
  author: UserPayload;
  commentCount: number;
  additions: number;
  deletions: number;

  createdAt: Date;
  updatedAt: Date;
  closedAt: Date | null;
  closedBy: UserPayload | null;
}

interface PullRequestStateChangedEventPayload {
  eventId: string;
  prId: string;
  event: "reopened" | "merged" | "closed";
  actor: UserPayload;

  createdAt: Date;
}

interface PullRequestAssigneeEventPayload {
  eventId: string;
  prId: string;
  event: "assigned" | "unassigned";
  actor: UserPayload;
  assignee: UserPayload;

  createdAt: Date;
}

interface PullRequestLabelEventPayload {
  eventId: string;
  issueId: string;
  actor: UserPayload;
  event: "labeled" | "unlabeled";
  label: string;

  createdAt: Date;
}

interface PullRequestReviewRequestEventPayload {
  eventId: string;
  prId: string;
  event: "review_requested";
  actor: UserPayload;
  requestedReviewer: UserPayload;

  createdAt: Date;
}

interface PullRequestReviewEventPayload {
  eventId: string;
  prId: string;
  event: "reviewed";
  actor: UserPayload;
  body: string;

  createdAt: Date;
  updatedAt: Date;
}

interface PullRequestCommentEventPayload {
  eventId: string;
  prId: string;
  event: "commented";
  actor: UserPayload;
  body: string;

  createdAt: Date;
  updatedAt: Date;
}

export type RawEventPublished =
  | _RawEventPublished<"commit.created", CommitEventPayload>
  | _RawEventPublished<"issue.created", IssueCreatedEventPayload>
  | _RawEventPublished<"issue.state_changed", IssueStateChangedEventPayload>
  | _RawEventPublished<"issue.assigned", IssueAssigneeEventPayload>
  | _RawEventPublished<"issue.labeled", IssueLabelEventPayload>
  | _RawEventPublished<"issue.commented", IssueCommentEventPayload>
  | _RawEventPublished<"pull_request.created", PullRequestCreatedPayload>
  | _RawEventPublished<
      "pull_request.state_changed",
      PullRequestStateChangedEventPayload
    >
  | _RawEventPublished<"pull_request.assigned", PullRequestAssigneeEventPayload>
  | _RawEventPublished<"pull_request.labeled", PullRequestLabelEventPayload>
  | _RawEventPublished<
      "pull_request.review_requested",
      PullRequestReviewRequestEventPayload
    >
  | _RawEventPublished<"pull_request.reviewed", PullRequestReviewEventPayload>
  | _RawEventPublished<
      "pull_request.commented",
      PullRequestCommentEventPayload
    >;
