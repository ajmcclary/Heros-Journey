import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroJourneyService } from '../../services/hero-journey.service';
import { HeroStage } from '../../models/hero-stage';
import { StageDetailComponent } from '../stage-detail/stage-detail.component';

@Component({
  selector: 'app-hero-journey-diagram',
  standalone: true,
  imports: [CommonModule, StageDetailComponent],
  templateUrl: './hero-journey-diagram.component.html',
  styleUrl: './hero-journey-diagram.component.scss'
})
export class HeroJourneyDiagramComponent implements OnInit {
  stages: HeroStage[] = [];
  selectedStage: HeroStage | null = null;
  currentStageIndex: number = 0;
  
  // SVG dimensions
  svgWidth = 800;
  svgHeight = 800;
  centerX = 400;
  centerY = 400;
  outerRadius = 350;
  innerRadius = 280;
  abyssRadius = 120;

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
    if (direction === 'prev') {
      this.currentStageIndex = this.currentStageIndex > 0 ? this.currentStageIndex - 1 : this.stages.length - 1;
    } else {
      this.currentStageIndex = (this.currentStageIndex + 1) % this.stages.length;
    }
    this.selectedStage = this.stages[this.currentStageIndex];
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
    return this.centerX + Math.cos(angleRad) * (this.outerRadius - 20);
  }

  getLabelY(stage: HeroStage): number {
    const angleRad = (stage.angle - 90) * Math.PI / 180;
    return this.centerY + Math.sin(angleRad) * (this.outerRadius - 20);
  }

  getTextAnchor(stage: HeroStage): string {
    if (stage.angle > 90 && stage.angle < 270) {
      return 'end';
    } else if (stage.angle === 90 || stage.angle === 270) {
      return 'middle';
    }
    return 'start';
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