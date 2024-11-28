# Copilot Instructions

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Redux Toolkit
- React Router
- Lucide React

## Project Structure

```
src/
  ├───assets/        # Static files
  ├───components/    # Shared components
  │   └───ui/       # shadcn/ui components
  ├───config/       # App configuration
  │   └───routers/  # Route configs
  ├───constants/    # Constants and enums
  ├───hooks/        # Custom hooks
  ├───layouts/      # Layout components
  ├───lib/         # Library configs
  ├───pages/       # Route pages
  ├───redux/       # State management
  ├───services/    # API services
  ├───types/       # Type definitions
  └───utils/       # Utility functions
```

## TypeScript Guidelines

```typescript
// Use interfaces for objects
interface ComponentProps {
  prop: string;
  children?: React.ReactNode;
}

// Component template
import { FC } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

export const Component: FC<ComponentProps> = ({ prop, children }) => {
  const dispatch = useAppDispatch();
  return <div>{children}</div>;
};

// Redux slice template
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "feature",
  initialState,
  reducers: {},
});
```

## Key Points

- Use TypeScript strict mode
- Avoid `any` type
- Follow folder structure
- Use proper imports (@/ alias)
- Implement error handling
- Add JSDoc when needed
- Use shadcn/ui components
- Follow Tailwind practices
- Generated by Copilot

## Common Types

```typescript
// API Response
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Redux State
interface RootState {
  // State structure
}

// Route Params
interface RouteParams {
  id: string;
}
```