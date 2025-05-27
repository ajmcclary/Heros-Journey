# Hero's Journey - Interactive Educational Web Application

An interactive web application that visualizes Joseph Campbell's Hero's Journey model through an engaging circular diagram. Built with Angular and designed for educational purposes, this tool helps students and educators explore the classic narrative structure that underlies countless stories.

🌐 **Live Demo**: [https://ajmcclary.github.io/Heros-Journey/](https://ajmcclary.github.io/Heros-Journey/)

## Overview

The Hero's Journey is a common story structure where a hero ventures out from the familiar world, faces challenges and transformation, and returns home changed. This application presents all 12 stages of the journey in an intuitive, interactive format.

### Key Features

- **Interactive Circular Diagram**: Click on any of the 12 stages to explore detailed descriptions
- **Visual World Distinction**: Clear separation between Known World and Unknown World segments
- **Special Markers**: Highlighting for threshold crossings, the central crisis (Abyss), and return path
- **Side Panel Details**: Stage information appears in a dedicated panel for easy reading
- **Sequential Navigation**: Move through stages in order with Previous/Next buttons
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **Journey Phases**: Grouped overview showing Departure, Initiation, and Return phases

## The 12 Stages

1. **Ordinary World** - The hero's starting point in the Known World
2. **Call to Adventure** - The invitation to begin the journey
3. **Refusal of the Call** - Initial hesitation and doubts
4. **Meeting the Mentor** - Gaining wisdom and tools for the journey
5. **Crossing the Threshold** - Leaving the Known World behind
6. **Tests, Allies, and Enemies** - Early challenges in the Unknown World
7. **Approach to the Inmost Cave** - Preparing for the greatest challenge
8. **Ordeal** - The central crisis and symbolic death/rebirth
9. **Reward (Seizing the Sword)** - Victory and gaining the prize
10. **The Road Back** - Beginning the return journey
11. **Resurrection** - Final test and transformation
12. **Return with the Elixir** - Coming home transformed with gifts to share

## Technical Stack

- **Framework**: Angular 19
- **Language**: TypeScript
- **Styling**: SCSS with custom ArkCase color palette
- **Graphics**: SVG for the circular diagram
- **Deployment**: GitHub Pages with GitHub Actions

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ajmcclary/Heros-Journey.git
cd Heros-Journey/heros-journey
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200/`

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment

The application automatically deploys to GitHub Pages when changes are pushed to the main branch. You can also manually deploy using:

```bash
npm run deploy
```

## Project Structure

```
heros-journey/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── hero-journey-diagram/    # Main diagram component
│   │   ├── models/
│   │   │   └── hero-stage.ts           # TypeScript interfaces
│   │   ├── services/
│   │   │   └── hero-journey.service.ts # Data service
│   │   └── app.component.*              # Root component
│   ├── styles/
│   │   └── _variables.scss              # Color palette and variables
│   └── index.html                       # Main HTML file
├── .github/
│   └── workflows/
│       └── deploy.yml                   # GitHub Pages deployment
└── angular.json                         # Angular configuration
```

## Color Palette

The application uses the ArkCase color scheme:
- **Primary**: #009AD7 (Blue)
- **Known World**: #70B7E2 (Light Blue)
- **Unknown World**: #00CD92 (Caribbean Green)
- **Threshold**: #FF9A15 (Orange)
- **Abyss/Ordeal**: #D83506 (Red)

## Educational Use

This tool is designed for classroom use and self-study:

- **For Educators**: Use the diagram to teach narrative structure, with the ability to click through stages during lessons
- **For Students**: Explore each stage at your own pace, understanding how stories follow this pattern
- **For Writers**: Reference the journey structure when crafting your own narratives

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Based on Joseph Campbell's monomyth structure from "The Hero with a Thousand Faces"
- Adapted using Christopher Vogler's simplified 12-stage interpretation
- Built with Angular and the ArkCase design system

## Contact

For questions or feedback, please open an issue on the [GitHub repository](https://github.com/ajmcclary/Heros-Journey/issues).