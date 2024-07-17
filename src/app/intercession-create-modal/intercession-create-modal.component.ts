import { Component, inject, signal } from '@angular/core';
import {  FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IntercessionStatusEnum, IntercessionTypeEnum } from "../../src/model/intercession/intercession-enum";
import { DropdownModule } from "primeng/dropdown";
import { KeyValuePipe } from "@angular/common";
import { CalendarModule } from "primeng/calendar";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { AutoCompleteCompleteEvent, AutoCompleteModule } from "primeng/autocomplete";
import { AddressResponse, Feature } from "../../src/model/address/address";
import { AddressApiService } from '../address-api.service';
import { IntercessionService } from '../intercession.service';
import { Intercession } from '../../src/model/intercession/intercession';
import { IntercessionOperation } from "../../src/model/intercession/intercessionOperation";
import { DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: 'app-intercession-create-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    KeyValuePipe,
    CalendarModule,
    InputTextareaModule,
    InputTextModule,
    AutoCompleteModule
  ],
  templateUrl: './intercession-create-modal.component.html',
  styleUrl: './intercession-create-modal.component.scss'
})
export class IntercessionCreateModalComponent {
  addressApi = inject(AddressApiService);
  service = inject(IntercessionService);
  ref = inject(DynamicDialogRef);

  fb = inject(FormBuilder);
  form = this.fb.group({
    address: ['', Validators.required],
    description: ['', Validators.required],
    date: [new Date(), Validators.required],
    type: [IntercessionTypeEnum.TECHNIC, Validators.required],
    status: [IntercessionStatusEnum.TO_PLAN, Validators.required]
  });

  filteredAddresses = signal<Feature[]>([]);

  get autocompleteAddress(){
    return this.filteredAddresses();
  }

  searchAddress( $event: AutoCompleteCompleteEvent ){
    this.addressApi.searchAddress($event.query).subscribe((response: AddressResponse) => {
      this.filteredAddresses.set(response.features);
    });
  }


  protected readonly intercessionTypeEnum = IntercessionTypeEnum;
  protected readonly intercessionStatusEnum = IntercessionStatusEnum;

  create(){
    const intercession = Object.assign(new Intercession(), {
      address: this.form.value.address,
      operations: [
        {
          description: this.form.value.description,
          date: this.form.value.date,
          status: this.form.value.status,
          type: this.form.value.type
        } as IntercessionOperation,
      ]
    } as Intercession);
    this.service.addIntercession(intercession);
    this.ref.close()
  }

  protected readonly Intercession = Intercession;
}
