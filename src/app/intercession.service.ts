import { inject, Injectable, signal } from '@angular/core';
import { IntercessionOperation } from "../src/model/intercession/intercessionOperation";
import { IntercessionStore } from "./intercession.store";
import { AddressApiService } from "./address-api.service";
import { AddressResponse } from "../src/model/address/address";
import { Intercession } from "../src/model/intercession/intercession";
import { IntercessionStatusEnum, IntercessionTypeEnum } from "../src/model/intercession/intercession-enum";

@Injectable({
  providedIn: 'root'
})
export class IntercessionService {
  store = inject(IntercessionStore);
  addressApi = inject(AddressApiService);

  selectedIntercession = signal<Intercession>(null);

  updateIntercession( intercession: Intercession ){
    this.selectedIntercession.set(intercession);
  }

  setSelectedIntercession( intercession: Intercession ){
    this.selectedIntercession.set(intercession);
  }

  getSelectedIntercession(): Intercession{
    return this.selectedIntercession();
  }

  getIntercessionById( id: number ): Intercession{
    return this.store.getIntercessionById(id);
  }

  updateIntercessionById( id: number, intercession: Intercession ){
    this.store.updateIntercessionById(id, intercession);
  }

  setIntercessions( intercessions: Intercession[] ){
    for ( let i = 0; i < intercessions.length; i++ ) {
      this.addressApi.getPosition(intercessions[i].address).subscribe(( response: AddressResponse ) => {
        const geo = response.features[0].geometry;
        intercessions[i].coordinates = {lng: geo?.coordinates[0], lat: geo.coordinates[1]};
      });
      this.store.setIntercessions(intercessions);
    }
  }

  addIntercession( intercession: Intercession ){
    this.addressApi.getPosition(intercession.address).subscribe(( response: AddressResponse ) => {
      const geo = response.features[0].geometry;
      intercession.coordinates = {lng: geo?.coordinates[0], lat: geo.coordinates[1]};
      this.store.createIntercession(intercession);
    });
  }
}
