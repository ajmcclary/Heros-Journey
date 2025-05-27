# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Hero's Journey project repository. Currently in initial setup phase.

## Development Commands

### Angular Application (in `heros-journey/` directory)

- **Install dependencies**: `npm install`
- **Development server**: `npm start` (runs on http://localhost:4200/)
- **Build production**: `npm run build`
- **Run tests**: `npm test`
- **Deploy to GitHub Pages**: `npm run deploy` (manual deployment)

### GitHub Actions

The project includes automatic deployment to GitHub Pages on push to main branch.

## Architecture

### Angular Application Structure

- **Components**:
  - `HeroJourneyDiagramComponent`: Main interactive SVG diagram showing the circular hero's journey
  - `StageDetailComponent`: Modal popup displaying stage details with navigation

- **Services**:
  - `HeroJourneyService`: Contains the 12 stages data and helper methods

- **Models**:
  - `HeroStage`: Interface for stage data (id, name, description, worldType, etc.)
  - `StageGroup`: Interface for grouping stages (Departure, Initiation, Return)

- **Styling**:
  - SCSS with custom ArkCase color palette defined in `_variables.scss`
  - Responsive design with breakpoints for mobile/tablet/desktop
  - Accessibility features including keyboard navigation and ARIA labels

### Key Features

- Interactive circular SVG diagram with clickable stages
- Visual distinction between Known/Unknown worlds
- Special markers for Threshold, Abyss/Ordeal, and Return Path
- Modal popups with stage descriptions and sequential navigation
- Fully responsive and accessible design