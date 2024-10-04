import { Routes } from '@angular/router';
import { ROUTES } from './core/models/routers';
import { WelcomeComponent } from './views/welcome/welcome.component';
import { RemittanceComponent } from './views/remittance/remittance.component';
import { CalculatorComponent } from './views/calculator/calculator.component';
import { welcomeGuard } from './core/guards/welcome.guard';
export const routes: Routes = [
    {
        path: ROUTES.APP.WELCOME.FULL_PATH,
        component: WelcomeComponent,
        canActivate: [welcomeGuard]
    },
    {
        path: ROUTES.APP.REMITTANCE.FULL_PATH,
        component: RemittanceComponent,
        canActivate: [welcomeGuard]
    },
    {
        path: ROUTES.APP.CALCULATOR.FULL_PATH,
        component: CalculatorComponent,
        canActivate: [welcomeGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: ROUTES.APP.WELCOME.FULL_PATH,
    },
    {
        path: '**',
        redirectTo: ROUTES.APP.WELCOME.FULL_PATH,
    },
];
