import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  protected title = 'frontend';
  message: string = '';
  counter: number = 5;
  isLoading: boolean = true;
  private counterSubscription?: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Start the countdown
    this.startCountdown();
  }

  ngOnDestroy() {
    // Clean up subscription
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }

  private startCountdown() {
    // Create a counter that decrements every second
    this.counterSubscription = interval(1000)
      .pipe(take(5)) // Take only 5 emissions (0 to 4)
      .subscribe({
        next: (value) => {
          this.counter = 5 - (value + 1);
          
          // When counter reaches 0, call the API
          if (this.counter === 0) {
            this.callBackendApi();
          }
        }
      });
  }

  private callBackendApi() {
    this.http.get('http://localhost:3000/api', { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.message = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching data:', error);
          this.message = 'Error loading data from backend';
          this.isLoading = false;
        }
      });
  }
}
