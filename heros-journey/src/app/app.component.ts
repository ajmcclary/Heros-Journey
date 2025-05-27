import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroJourneyDiagramComponent } from './components/hero-journey-diagram/hero-journey-diagram.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroJourneyDiagramComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Hero\'s Journey';
}