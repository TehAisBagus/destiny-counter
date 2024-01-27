// counter.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private storageKey = 'counterData';

  private counter: number = 45536;
  private lastPressed: number = 1706344676;

  constructor() {
    // Retrieve stored data from localStorage
    const storedData = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    this.counter = storedData.counter || 0;
    this.lastPressed = storedData.lastPressed || Date.now(); // Set an initial value if not present
  }

  getCounter(): number {
    return this.counter;
  }

  setCounter(counter: number): void {
    this.counter = counter;
    this.saveData();
  }

  getLastPressed(): number {
    return this.lastPressed;
  }

  setLastPressed(lastPressed: number): void {
    this.lastPressed = lastPressed;
    this.saveData();
  }

  private saveData(): void {
    // Save data to localStorage
    const data = {
      counter: this.counter,
      lastPressed: this.lastPressed,
    };
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }
}
