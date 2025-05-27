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
    const labelDistance = this.innerRadius + 45;
    return this.centerX + Math.cos(angleRad) * labelDistance;
  }

  getLabelY(stage: HeroStage): number {
    const angleRad = (stage.angle - 90) * Math.PI / 180;
    const labelDistance = this.innerRadius + 45;
    return this.centerY + Math.sin(angleRad) * labelDistance;
  }

  getTextAnchor(stage: HeroStage): string {
    return 'middle';
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
}