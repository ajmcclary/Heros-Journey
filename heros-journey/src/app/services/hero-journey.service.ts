import { Injectable } from '@angular/core';
import { HeroStage, StageGroup } from '../models/hero-stage';

@Injectable({
  providedIn: 'root'
})
export class HeroJourneyService {
  private stages: HeroStage[] = [
    {
      id: 1,
      name: 'Ordinary World',
      description: 'Introduces the hero in their normal, everyday environment. This stage sets the scene and the hero\'s baseline life.',
      worldType: 'known',
      angle: 0
    },
    {
      id: 2,
      name: 'Call to Adventure',
      description: 'The hero is presented with a challenge, problem, or invitation that calls them to leave their ordinary life and undertake a quest.',
      worldType: 'known',
      angle: 30
    },
    {
      id: 3,
      name: 'Refusal of the Call',
      description: 'Initially, the hero hesitates or refuses the call due to fear, insecurity, or a sense of duty to their current life.',
      worldType: 'known',
      angle: 60
    },
    {
      id: 4,
      name: 'Meeting the Mentor',
      description: 'The hero encounters a mentor figure who provides guidance, wisdom, or tools that will help on the adventure.',
      worldType: 'known',
      angle: 75
    },
    {
      id: 5,
      name: 'Crossing the Threshold',
      description: 'The hero leaves the Known World and crosses into the Unknown World of adventure. This is the moment of actual departure.',
      worldType: 'known',
      angle: 120,
      isThreshold: true
    },
    {
      id: 6,
      name: 'Tests, Allies, and Enemies',
      description: 'Now in the Unknown World, the hero faces initial trials, makes friends, and encounters foes.',
      worldType: 'unknown',
      angle: 150
    },
    {
      id: 7,
      name: 'Approach to the Inmost Cave',
      description: 'The hero and their allies make preparations for a major challenge deep within the Unknown World.',
      worldType: 'unknown',
      angle: 180
    },
    {
      id: 8,
      name: 'Ordeal',
      description: 'The hero faces the greatest challenge yet, often a life-or-death crisis. This is the climactic Abyss of the journey.',
      worldType: 'unknown',
      angle: 210,
      isAbyss: true
    },
    {
      id: 9,
      name: 'Reward (Seizing the Sword)',
      description: 'Having survived the Ordeal, the hero earns a Reward. This could be a physical treasure, new knowledge, or reconciled relationship.',
      worldType: 'unknown',
      angle: 240
    },
    {
      id: 10,
      name: 'The Road Back',
      description: 'The hero begins the journey back to the Ordinary World. This stage often introduces a chase or final obstacles.',
      worldType: 'unknown',
      angle: 270,
      isReturnPath: true
    },
    {
      id: 11,
      name: 'Resurrection',
      description: 'The hero faces a final test at the threshold of home, where they must apply all they have learned.',
      worldType: 'known',
      angle: 300,
      isReturnPath: true
    },
    {
      id: 12,
      name: 'Return with the Elixir',
      description: 'The hero returns to the Ordinary World with the elixir that can heal or improve their community. The journey is complete.',
      worldType: 'known',
      angle: 330,
      isReturnPath: true
    }
  ];

  private stageGroups: StageGroup[] = [
    {
      name: 'Departure',
      stages: [1, 2, 3, 4, 5],
      description: 'The hero leaves the familiar world'
    },
    {
      name: 'Initiation',
      stages: [6, 7, 8, 9],
      description: 'The hero faces challenges in the unknown world'
    },
    {
      name: 'Return',
      stages: [10, 11, 12],
      description: 'The hero returns transformed'
    }
  ];

  getStages(): HeroStage[] {
    return this.stages;
  }

  getStageById(id: number): HeroStage | undefined {
    return this.stages.find(stage => stage.id === id);
  }

  getStageGroups(): StageGroup[] {
    return this.stageGroups;
  }

  getStagesByGroup(groupName: string): HeroStage[] {
    const group = this.stageGroups.find(g => g.name === groupName);
    if (!group) return [];
    return this.stages.filter(stage => group.stages.includes(stage.id));
  }
}