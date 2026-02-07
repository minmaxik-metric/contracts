# gRPC Contracts

This package contains Protocol Buffer definitions and generated TypeScript types for all microservices in the SCM Service ecosystem.

## Overview

The contracts package provides:
- **Proto definitions** - `.proto` files defining gRPC service contracts
- **Generated TypeScript types** - Type-safe interfaces and decorators for NestJS
- **Shared enums and messages** - Common data types used across services

## Proto Files

### SCM Service Contracts

- **`organizations.proto`** - Organization management service
- **`repositories.proto`** - Repository management service  
- **`scm-users.proto`** - SCM user management service
- **`issues.proto`** - Issue tracking service
- **`pull-requests.proto`** - Pull request management service
- **`commits.proto`** - Git commit tracking service
- **`repository-memberships.proto`** - Repository membership management
- **`issue-assignees.proto`** - Issue assignee management

### Other Services

- **`auth.proto`** - Authentication service
- **`users.proto`** - User management service
- **`account.proto`** - Account management service
- **`metrics.proto`** - Metrics aggregation service
- **`scm.proto`** - Legacy SCM service (repository collection management)

## Generating TypeScript Types

### Prerequisites

```bash
yarn install
```

### Generate Types

```bash
yarn generate
```

This command:
1. Creates the `gen/ts/` directory
2. Runs `protoc` with the `ts-proto` plugin
3. Generates TypeScript files with NestJS decorators

### Build Package

```bash
yarn build
```

This compiles both the generated types and any additional TypeScript files.

## Usage in NestJS Services

### 1. Install the Package

In your service's `package.json`:

```json
{
  "dependencies": {
    "@citec-spbu/contracts": "workspace:*"
  }
}
```

### 2. Import Generated Types

```typescript
import {
  OrganizationsServiceControllerMethods,
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  Organization
} from "@citec-spbu/contracts/gen/ts/organizations"
```

### 3. Implement gRPC Controller

```typescript
import { Controller } from "@nestjs/common"
import {
  OrganizationsServiceControllerMethods,
  CreateOrganizationRequest
} from "@citec-spbu/contracts/gen/ts/organizations"

@Controller()
@OrganizationsServiceControllerMethods()
export class OrganizationGrpcController {
  public async createOrganization(data: CreateOrganizationRequest) {
    // Implementation
    return { organization: { ... } }
  }
}
```

### 4. Configure gRPC Client

```typescript
import { ClientsModule, Transport } from "@nestjs/microservices"
import { join } from "path"

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORGANIZATIONS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'organizations.v1',
          protoPath: join(__dirname, '../../../contracts/proto/organizations.proto'),
          url: 'localhost:5000'
        }
      }
    ])
  ]
})
```

## Adding New Contracts

### 1. Create Proto File

Create a new `.proto` file in the `proto/` directory:

```protobuf
syntax = "proto3";

package myservice.v1;

import "google/protobuf/timestamp.proto";

service MyService {
  rpc GetItem(GetItemRequest) returns (GetItemResponse);
}

message GetItemRequest {
  string id = 1;
}

message GetItemResponse {
  Item item = 1;
}

message Item {
  string id = 1;
  string name = 2;
  google.protobuf.Timestamp created_at = 3;
}
```

### 2. Generate Types

```bash
yarn generate
```

### 3. Build Package

```bash
yarn build
```

### 4. Implement Service

Use the generated types in your NestJS service as shown above.

## Proto Best Practices

### Naming Conventions

- **Packages**: Use `service_name.v1` format (e.g., `organizations.v1`)
- **Services**: Use `PascalCase` with `Service` suffix (e.g., `OrganizationsService`)
- **Messages**: Use `PascalCase` (e.g., `Organization`)
- **Fields**: Use `snake_case` (e.g., `external_id`)
- **Enums**: Use `SCREAMING_SNAKE_CASE` with prefix (e.g., `ISSUE_STATE_OPEN`)

### Common Imports

```protobuf
import "google/protobuf/timestamp.proto";  // For dates
import "auth.proto";                        // For Provider enum
```

### Optional Fields

Use `optional` keyword for nullable fields:

```protobuf
message Organization {
  string id = 1;
  optional string description = 2;  // Can be null
}
```

### Timestamps

Always use `google.protobuf.Timestamp`:

```protobuf
import "google/protobuf/timestamp.proto";

message Item {
  google.protobuf.Timestamp created_at = 1;
  optional google.protobuf.Timestamp closed_at = 2;
}
```

## TypeScript Integration

### Generated Files Structure

```
gen/ts/
├── organizations.ts
├── repositories.ts
├── issues.ts
├── pull-requests.ts
├── commits.ts
├── repository-memberships.ts
├── issue-assignees.ts
├── scm-users.ts
└── ...
```

### Type Safety

All generated types are fully type-safe:

```typescript
// Request/Response types
type CreateOrganizationRequest = {
  name: string
  provider: Provider
  externalId: number
  url: string
  avatarUrl: string
}

// Entity types
type Organization = {
  id: string
  name: string
  provider: Provider
  externalId: number
  url: string
  avatarUrl: string
}
```

### NestJS Decorators

The `ts-proto` plugin generates decorators for NestJS:

- `@{Service}ControllerMethods()` - Automatically maps methods to gRPC handlers
- Method names match proto service definitions exactly

## Versioning

The package follows semantic versioning:

- **Major**: Breaking changes to proto contracts
- **Minor**: New services or backward-compatible additions
- **Patch**: Bug fixes, documentation updates

Current version: `1.0.10`

## Publishing

To publish a new version:

1. Update version in `package.json`
2. Build the package: `yarn build`
3. Publish: `npm publish` or `yarn publish`

## Troubleshooting

### Types Not Found

Make sure you've run `yarn generate` and `yarn build` in the contracts package.

### Import Errors

Check that your import paths match the generated file structure:

```typescript
// Correct
import { ... } from "@citec-spbu/contracts/gen/ts/organizations"

// Wrong
import { ... } from "@citec-spbu/contracts/organizations"
```

### Protoc Not Found

Install Protocol Buffer compiler:

```bash
# macOS
brew install protobuf

# Ubuntu/Debian
sudo apt install -y protobuf-compiler

# Windows
choco install protoc
```

## Development Workflow

1. **Modify proto files** in `proto/` directory
2. **Generate types**: `yarn generate`
3. **Build package**: `yarn build`
4. **Test in service**: Import and use generated types
5. **Commit changes**: Include both `.proto` and generated `.ts` files

## Resources

- [Protocol Buffers Documentation](https://protobuf.dev/)
- [ts-proto GitHub](https://github.com/stephenh/ts-proto)
- [NestJS Microservices](https://docs.nestjs.com/microservices/grpc)
- [gRPC Documentation](https://grpc.io/docs/)