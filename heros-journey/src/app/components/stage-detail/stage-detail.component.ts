import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroStage } from '../../models/hero-stage';

@Component({
  selector: 'app-stage-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stage-detail.component.html',
  styleUrl: './stage-detail.component.scss'
})
export class StageDetailComponent {
  @Input() stage!: HeroStage;
  @Input() stageNumber!: number;
  @Input() totalStages!: number;
  @Output() close = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<'prev' | 'next'>();

  onClose(): void {
    this.close.emit();
  }

  onNavigate(direction: 'prev' | 'next'): void {
    this.navigate.emit(direction);
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('stage-detail-overlay')) {
      this.onClose();
    }
  }
}