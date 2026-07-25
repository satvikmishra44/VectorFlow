# VectorFlow Frontend

VectorFlow is a web-based application for building and managing workflows using a visual flow canvas. This frontend provides an intuitive drag-and-drop interface for creating complex pipelines, integrating with a backend API for execution.

## Features

- **Flow Canvas**: Interactive canvas for designing workflows using drag-and-drop nodes.
- **Node Types**: Support for various node types including:
  - Input/Output Nodes
  - LLM Nodes (for AI/LLM integrations)
  - Conditional Nodes
  - Loop Nodes
  - Transform Nodes
  - Filter Nodes
  - Merge Nodes
  - Text Nodes
- **UI Components**: Built with shadcn/ui for a modern, accessible interface.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Real-time Collaboration**: (If applicable, add details based on backend features)

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Flow Library**: React Flow (@xyflow/react)
- **UI Library**: Radix UI (via shadcn/ui)
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: Sonner

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

## Build

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Linting

Run ESLint to check for code quality issues:
```bash
npm run lint
```

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   └── ...            # Custom components (FlowCanvas, Toolbar, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── nodes/             # Flow node definitions
│   ├── pages/             # Page components
│   └── ...
├── Dockerfile              # Docker configuration
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite configuration
```

## Usage

1. Start the development server.
2. Open your browser to the application URL.
3. Use the toolbar to add nodes to the canvas.
4. Connect nodes by dragging from output handles to input handles.
5. Configure node properties in the side panel.
6. Save and execute your workflow via the backend API.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run tests and linting.
5. Submit a pull request.

## License

[Add license information if applicable]
