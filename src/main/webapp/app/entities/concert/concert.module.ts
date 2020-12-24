import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MonolithicAppSharedModule } from 'app/shared/shared.module';
import { ConcertComponent } from './concert.component';
import { ConcertDetailComponent } from './concert-detail.component';
import { ConcertUpdateComponent } from './concert-update.component';
import { ConcertDeleteDialogComponent } from './concert-delete-dialog.component';
import { concertRoute } from './concert.route';

@NgModule({
  imports: [MonolithicAppSharedModule, RouterModule.forChild(concertRoute)],
  declarations: [ConcertComponent, ConcertDetailComponent, ConcertUpdateComponent, ConcertDeleteDialogComponent],
  entryComponents: [ConcertDeleteDialogComponent],
})
export class MonolithicAppConcertModule {}
