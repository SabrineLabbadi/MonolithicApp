import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICustomer, Customer } from 'app/shared/model/customer.model';
import { CustomerService } from './customer.service';
import { IConcert } from 'app/shared/model/concert.model';
import { ConcertService } from 'app/entities/concert/concert.service';

@Component({
  selector: 'jhi-customer-update',
  templateUrl: './customer-update.component.html',
})
export class CustomerUpdateComponent implements OnInit {
  isSaving = false;
  concerts: IConcert[] = [];

  editForm = this.fb.group({
    id: [],
    dob: [],
    address: [],
    firstName: [],
    lastName: [],
    concertId: [],
  });

  constructor(
    protected customerService: CustomerService,
    protected concertService: ConcertService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customer }) => {
      if (!customer.id) {
        const today = moment().startOf('day');
        customer.dob = today;
      }

      this.updateForm(customer);

      this.concertService.query().subscribe((res: HttpResponse<IConcert[]>) => (this.concerts = res.body || []));
    });
  }

  updateForm(customer: ICustomer): void {
    this.editForm.patchValue({
      id: customer.id,
      dob: customer.dob ? customer.dob.format(DATE_TIME_FORMAT) : null,
      address: customer.address,
      firstName: customer.firstName,
      lastName: customer.lastName,
      concertId: customer.concertId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customer = this.createFromForm();
    if (customer.id !== undefined) {
      this.subscribeToSaveResponse(this.customerService.update(customer));
    } else {
      this.subscribeToSaveResponse(this.customerService.create(customer));
    }
  }

  private createFromForm(): ICustomer {
    return {
      ...new Customer(),
      id: this.editForm.get(['id'])!.value,
      dob: this.editForm.get(['dob'])!.value ? moment(this.editForm.get(['dob'])!.value, DATE_TIME_FORMAT) : undefined,
      address: this.editForm.get(['address'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      concertId: this.editForm.get(['concertId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomer>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IConcert): any {
    return item.id;
  }
}
