import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { ExchangeService } from '../../core/services/exchange.service';
import { of } from 'rxjs';
import { Subscription } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let service: ExchangeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    service = TestBed.inject(ExchangeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call exchangeLatest on ngOnInit', () => {
    const exchangeRateResponse = {
      rates: {
        PEN: 3.71
      }
    };
    const httpSpy = spyOn(service, 'exchangeLatest').and.returnValue(of(exchangeRateResponse));

    component.ngOnInit();

    expect(httpSpy).toHaveBeenCalledWith('USD', 'PEN');
    expect(component.exchangeRate).toBe(3.71);
    expect(component.sellRate).toBeCloseTo(3.72484);
    expect(component.buyRate).toBeCloseTo(3.69516);
  });

  it('should convert USD to PEN using buyRate', () => {
    component.buyRate = 3.735;
    component.amountUSD = 100;

    component.convertToPEN();

    expect(component.amountPEN).toBeCloseTo(373.5, 3);
  });

  it('should set amountPEN to null if amountUSD is null', () => {
    component.amountUSD = null;

    component.convertToPEN();

    expect(component.amountPEN).toBeNull();
  });

  it('should convert PEN to USD using sellRate', () => {
    component.sellRate = 3.765;
    component.amountPEN = 500;

    component.convertToUSD();

    expect(component.amountUSD).toBeCloseTo(132.802);
  });

  it('should set amountUSD to null if amountPEN is null', () => {
    component.amountPEN = null;

    component.convertToUSD();

    expect(component.amountUSD).toBeNull();
  });

  it('should change view type and reset values', () => {
    // Mockear el método `changeViewType`
    spyOn(component.changeViewType, 'set');

    component.amountUSD = 100;
    component.amountPEN = 375;

    component.changeValues();

    expect(component.changeViewType.set).toHaveBeenCalledWith(2);
    expect(component.amountUSD).toBeNull();
    expect(component.amountPEN).toBeNull();
  });

  it('should unsubscribe from subscriptions on ngOnDestroy', () => {
    const spy = spyOn(component.subscriptions, 'unsubscribe');

    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
  });
});
