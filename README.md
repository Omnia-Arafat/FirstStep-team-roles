# First Step Team Roles

A Next.js full-stack application for managing and displaying First Step team roles and responsibilities.

## Features

- 🌗 **Dark/Light Theme**: Toggle between light and dark modes with persistent preferences
- 🌐 **Bilingual Support**: Switch between English and Arabic with full RTL support
- 👨‍💼 **Admin Mode**: Edit team member details with inline editing
- 📱 **Responsive Design**: Fully responsive grid layout
- 💾 **Data Persistence**: Changes persist during the session via API
- 🎨 **Role-Based Styling**: Color-coded roles with custom overlays

## Team Members

The application includes 12 team members with complete bilingual data:
- Owner & Co-Founder
- CTO
- Project Manager
- Product Designer
- Frontend & Backend Developers
- Flutter Developer
- Customer Support & Sales
- Marketer
- Graphic Designer

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS Variables
- **State Management**: React Context API
- **API**: Next.js API Routes

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Omnia-Arafat/FirstStep-team-roles.git
cd FirstStep-team-roles
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Theme Toggle
Click the 🌗 button in the top-right to switch between light and dark themes.

### Language Toggle
Click the "EN / AR" button to switch between English and Arabic. The interface will automatically adjust to RTL layout for Arabic.

### Admin Mode
1. Click the "Admin" button to enable editing
2. Click any team member card
3. Edit the name, description, or responsibilities
4. Click "Save Changes" to persist your edits
5. A success notification will appear

### Viewing Details
Click any team member card to view their full responsibilities and details.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── team/         # API routes for team data
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Main page component
│   └── globals.css       # Global styles and CSS variables
├── components/
│   ├── Controls.tsx      # Theme/Language/Admin controls
│   ├── TeamCard.tsx      # Individual team member card
│   ├── TeamGrid.tsx      # Grid layout for team cards
│   ├── TeamModal.tsx     # Modal for viewing/editing details
│   └── Toast.tsx         # Success notification toast
├── contexts/
│   └── AppContext.tsx    # Global state management
├── data/
│   ├── teamData.ts       # Team member data
│   └── teamStore.ts      # In-memory data store
├── types/
│   └── team.ts           # TypeScript type definitions
└── tailwind.config.ts    # Tailwind configuration
```

## Color Scheme

### Light Mode
- Background: `#f5f6fa`
- Card: `#ffffff`
- Text: `#1c1c1c`
- Muted: `#555`

### Dark Mode
- Background: `#0f1328`
- Card: `#1f2552`
- Text: `#f5f7ff`
- Muted: `#d0d4ff`

### Role Colors
- Owner: `#B92C28`
- CTO: `#3f6cff`
- PM: `#4BB484`
- Design: `#8e24aa`
- Frontend: `#039be5`
- Backend: `#5e35b1`
- Mobile: `#fb8c00`
- Support: `#7cb342`

## Notes

- The current implementation uses in-memory storage for team data, which resets on server restart
- For production use, integrate with a real database (MongoDB, PostgreSQL, etc.)
- Admin mode currently has no authentication - add proper authentication for production
- Theme and language preferences are stored in localStorage

## License

ISC

## Author

First Step Team
