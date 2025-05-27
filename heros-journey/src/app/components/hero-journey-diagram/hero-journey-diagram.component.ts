import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroJourneyService } from '../../services/hero-journey.service';
import { HeroStage } from '../../models/hero-stage';

@Component({
  selector: 'app-hero-journey-diagram',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-journey-diagram.component.html',
  styleUrl: './hero-journey-diagram.component.scss'
})
export class HeroJourneyDiagramComponent implements OnInit {
  stages: HeroStage[] = [];
  selectedStage: HeroStage | null = null;
  currentStageIndex: number = 0;
  
  // SVG dimensions
  svgWidth = 800;
  svgHeight = 850;
  centerX = 400;
  centerY = 400;
  outerRadius = 320;
  innerRadius = 260;
  abyssRadius = 100;

  constructor(private heroJourneyService: HeroJourneyService) {}

  ngOnInit(): void {
    this.stages = this.heroJourneyService.getStages();
    // Set Stage 1 as default selected stage
    if (this.stages.length > 0) {
      this.selectedStage = this.stages[0];
      this.currentStageIndex = 0;
    }
  }

  onStageClick(stage: HeroStage): void {
    this.selectedStage = stage;
    this.currentStageIndex = stage.id - 1;
  }

  onCloseDetail(): void {
    this.selectedStage = null;
  }

  navigateStage(direction: 'prev' | 'next'): void {
    if (direction === 'prev' && this.currentStageIndex > 0) {
      this.currentStageIndex = this.currentStageIndex - 1;
      this.selectedStage = this.stages[this.currentStageIndex];
    } else if (direction === 'next' && this.currentStageIndex < this.stages.length - 1) {
      this.currentStageIndex = this.currentStageIndex + 1;
      this.selectedStage = this.stages[this.currentStageIndex];
    }
  }

  // Helper methods for SVG positioning
  getStageX(stage: HeroStage): number {
    const angleRad = (stage.angle - 90) * Math.PI / 180;
    return this.centerX + Math.cos(angleRad) * this.innerRadius;
  }

  getStageY(stage: HeroStage): number {
    const angleRad = (stage.angle - 90) * Math.PI / 180;
    return this.centerY + Math.sin(angleRad) * this.innerRadius;
  }

  getLabelX(stage: HeroStage): number {
    const angleRad = (stage.angle - 90) * Math.PI / 180;
    const labelDistance = this.getLabelDistance(stage);
    return this.centerX + Math.cos(angleRad) * labelDistance;
  }

  getLabelY(stage: HeroStage): number {
    const angleRad = (stage.angle - 90) * Math.PI / 180;
    const labelDistance = this.getLabelDistance(stage);
    let y = this.centerY + Math.sin(angleRad) * labelDistance;
    
    // Add vertical offset for specific stages to prevent overlap
    if (stage.id === 1 || stage.id === 12) {
      y -= 5; // Move stages 1 and 12 slightly up
    } else if (stage.id === 2 || stage.id === 11) {
      y += 5; // Move stages 2 and 11 slightly down
    }
    
    return y;
  }

  getTextAnchor(stage: HeroStage): string {
    // Adjust text anchor based on angle to prevent overlap
    if (stage.angle > 45 && stage.angle < 135) {
      return 'start'; // Right side
    } else if (stage.angle > 225 && stage.angle < 315) {
      return 'end'; // Left side
    }
    return 'middle'; // Top and bottom
  }

  private getLabelDistance(stage: HeroStage): number {
    // Increase distance for stages at the top where they're closer together
    if ((stage.angle >= 0 && stage.angle <= 30) || (stage.angle >= 330 && stage.angle <= 360)) {
      return this.innerRadius + 70; // Much more space at very top
    } else if ((stage.angle > 30 && stage.angle <= 60) || (stage.angle >= 300 && stage.angle < 330)) {
      return this.innerRadius + 60; // More space near top
    }
    return this.innerRadius + 50; // Standard spacing elsewhere
  }

  getPathData(): string {
    const points = this.stages.map(stage => {
      const angleRad = (stage.angle - 90) * Math.PI / 180;
      const x = this.centerX + Math.cos(angleRad) * this.innerRadius;
      const y = this.centerY + Math.sin(angleRad) * this.innerRadius;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')} Z`;
  }

  getProgressPathData(): string {
    if (!this.selectedStage) return '';
    
    const stageIndex = this.selectedStage.id;
    const points = this.stages.slice(0, stageIndex).map(stage => {
      const angleRad = (stage.angle - 90) * Math.PI / 180;
      const x = this.centerX + Math.cos(angleRad) * this.innerRadius;
      const y = this.centerY + Math.sin(angleRad) * this.innerRadius;
      return `${x},${y}`;
    });
    
    if (points.length === 0) return '';
    return `M ${points.join(' L ')}`;
  }

  getArcPath(startAngle: number, endAngle: number, radius: number): string {
    const start = this.polarToCartesian(startAngle, radius);
    const end = this.polarToCartesian(endAngle, radius);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return `M ${this.centerX} ${this.centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
  }

  private polarToCartesian(angle: number, radius: number): {x: number, y: number} {
    const angleRad = (angle - 90) * Math.PI / 180;
    return {
      x: this.centerX + Math.cos(angleRad) * radius,
      y: this.centerY + Math.sin(angleRad) * radius
    };
  }

  getStageGroups() {
    return this.heroJourneyService.getStageGroups();
  }

  formatTopicText(topic: string): { label: string; description: string } {
    const parts = topic.split(' — ');
    if (parts.length >= 2) {
      return {
        label: parts[0],
        description: parts.slice(1).join(' — ')
      };
    }
    return {
      label: '',
      description: topic
    };
  }

  getStageTopics(stageId: number): string[] {
    const topicsMap: { [key: number]: string[] } = {
      1: [
        'Pain Point / Problem — Concise phrase summarizing the core issue faced by Examiners.',
        'Experience — How examiners encounter or feel the pain point in day-to-day work (observable symptoms).',
        'Frequency — How often the problem surfaces (e.g., daily, weekly, per claim).',
        'Duration — Typical length of each occurrence or the period the issue persists (momentary vs. chronic).',
        'Time wasted — Estimated time lost per occurrence or within a typical work period due to the problem.',
        'Not their fault — Factors showing the issue stems from systemic, technological, or policy constraints beyond individual examiners\' control.'
      ],
      2: [
        'Why likely? — Primary reasons this issue exists in their environment — root-cause context.',
        'Other impacts — Secondary or collateral consequences (health, morale, quality, compliance, etc.).',
        'Keeps them up — Specific anxieties or fears the issue provokes — what they worry about after hours.'
      ],
      3: [
        'Feelings — Emotional responses the pain point elicits in examiners (frustration, anxiety, cynicism, etc.).',
        'Mistakes — Common errors examiners make while struggling with this pain point.',
        'Why — Underlying reasons those mistakes happen (cognitive load, tool gaps, policies, etc.).'
      ],
      4: [
        'Past fixes — Temporary work-arounds or prior attempts to mitigate the issue.',
        'Why them — Explanation of why this pain point affects them but not organizations with more modern tools or processes.'
      ],
      5: [
        'Ignored — Aspects or solutions stakeholders avoid confronting because they\'re stressful, costly, or complex.',
        'Cost — Tangible or intangible losses resulting from the mistakes or issue (money, reputation, risk).'
      ],
      6: [
        'Others\' reaction — How supervisors, claimants, external counsel, or auditors perceive or respond to the visible effects of the problem.'
      ],
      7: [
        'Worst-case — Most severe potential outcome if the issue remains unaddressed.'
      ],
      8: [
        '(Re-emphasise Worst-case here when dramatizing the crunch moment.)'
      ],
      9: [
        'After fix — Expected positive state once the pain point is resolved (benefits & improvements).'
      ],
      10: [
        'Other impacts (positive side) — How collateral areas start improving once the fix rolls out (quality, morale, compliance).'
      ],
      11: [
        'Mistakes / Cost (averted) — Show how the previous errors and penalties no longer occur, confirming lasting change.'
      ],
      12: [
        'Life after — Vision of the work environment and outcomes once the pain point has been fully resolved.'
      ]
    };
    
    return topicsMap[stageId] || [];
  }
}