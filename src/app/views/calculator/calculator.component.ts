import { Component, inject, signal } from '@angular/core';
import { ExchangeService } from '../../core/services/exchange.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {

  subscriptions = new Subscription();
  exchangeRate: number = 0;
  exchangeServiceLatest = inject(ExchangeService);
  margin = 0.02;
  sellRate: number = 0;
  buyRate: number = 0;
  amountUSD: number | null = null;
  amountPEN: number | null = null;
  changeViewType = signal(1);

  ngOnInit() {
    this.exchangeLatest();

  }

  exchangeLatest() {
    const subscription = this.exchangeServiceLatest.exchangeLatest("USD", "PEN").subscribe((response) => {
      this.exchangeRate = response.rates.PEN;
      // Artificio de margen compra y venta
      const margin = 0.004;
      this.sellRate = this.exchangeRate * (1 + margin);
      this.buyRate = this.exchangeRate * (1 - margin);
    });
    this.subscriptions.add(subscription);
  }

  convertToPEN(): void {

    this.amountPEN = this.amountUSD ? Number((this.amountUSD * this.buyRate).toFixed(3)) : null;
  }

  convertToUSD(): void {

    this.amountUSD = this.amountPEN ? Number((this.amountPEN / this.sellRate).toFixed(3)) : null;
  }

  changeValues(): void {

    this.changeViewType() == 1 ? this.changeViewType.set(2) : this.changeViewType.set(1);

    this.amountUSD = null;
    this.amountPEN = null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
