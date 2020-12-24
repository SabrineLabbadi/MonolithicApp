import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'concert',
        loadChildren: () => import('./concert/concert.module').then(m => m.MonolithicAppConcertModule),
      },
      {
        path: 'band',
        loadChildren: () => import('./band/band.module').then(m => m.MonolithicAppBandModule),
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.MonolithicAppCustomerModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class MonolithicAppEntityModule {}
