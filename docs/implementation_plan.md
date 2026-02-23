# Gradius Frontend Implementation Plan

## Goal

Develop a dynamic, interactive Next.js application that visualizes the degree path as a map, summarizes the user's progress, and interacts with the Gradius Backend API.

## Proposed Changes

### Dependencies

- Add `@xyflow/react` (React Flow) for rendering the subject map with nodes and edges.
- Add components (either basic Tailwind or Shadcn) for UI elements.
- Add `axios` or configured `fetch` wrapper for API calls.

### Core Features

- **Authentication**: `Login` and `Register` pages acting as the entry point. Stores JWT in local storage/cookies.
- **Dashboard Summary**: A header or side panel displaying the summary KPIs: Total Subjects, Pending Subjects, Approved Subjects.
- **Career Path Upload**: A drag-and-drop or file select component calling the backend upload endpoint.
- **Interactive Map**:
  - Leverages React Flow to draw subjects (nodes) and prerequisites (edges).
  - Uses a custom Subject Card component as the custom node for React Flow. It reflects the status graphically (e.g., color-coded: Gray = Pending, Yellow = Regular, Green = Approved).
  - Clicking a Subject Card calls the backend to toggle the status and reflect the new state immediately on the map and the summary.

## Verification

- Local dev testing (`npm run dev`) navigating the map rendering visually.
- Validating the React Flow edge and node alignment.
- Testing auth flows and status cycle toggles by interacting manually with the components from the browser tool or local access.
