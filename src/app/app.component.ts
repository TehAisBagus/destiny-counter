// app.component.ts
import { Component, OnInit } from '@angular/core';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'destiny-counter';
  counter!: number;
  lastPressed!: number;
  elapsedTime!: number;

  // Set a starting number for the counter
  startingNumber: number = 45536;

  constructor(private counterService: CounterService) { }

  ngOnInit(): void {
    this.loadCounterData();
  }

  increaseCounter() {
    this.counter++;
    this.lastPressed = Date.now();
    this.updateElapsedTime();

    // Save counter and lastPressed in the service
    this.saveCounterData();
  }

  resetCounter() {
    // Set the counter to the starting number
    this.counter = this.startingNumber;
    this.lastPressed = 0;
    this.elapsedTime = 0;

    // Save the reset data
    this.saveCounterData();
  }

  updateElapsedTime() {
    // Calculate the elapsed time since the button was pressed
    const now = Date.now();
    this.elapsedTime = now - this.lastPressed;
  }

  private saveCounterData() {
    this.counterService.setCounter(this.counter);
    this.counterService.setLastPressed(this.lastPressed);
  }

  private loadCounterData() {
    this.counter = this.counterService.getCounter() || this.startingNumber;
    this.lastPressed = this.counterService.getLastPressed();
  }

  clearSiteData() {
    // Clear the data stored in localStorage
    localStorage.clear();

    // Reset the counter and lastPressed in the service
    this.counterService.setCounter(0);
    this.counterService.setLastPressed(0);

    // Reload the counter data
    this.loadCounterData();
  }
}
