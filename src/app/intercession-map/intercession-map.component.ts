import { Component, inject } from '@angular/core';
import { GoogleMap, MapMarker } from "@angular/google-maps";
import { IntercessionStore } from "../intercession.store";
import { IntercessionService } from '../intercession.service';
import { Intercession } from "../../src/model/intercession/intercession";

@Component({
  selector: 'app-intercession-map',
  standalone: true,
  imports: [
    GoogleMap,
    MapMarker
  ],
  templateUrl: './intercession-map.component.html',
  styleUrl: './intercession-map.component.scss'
})
export class IntercessionMapComponent {
  store = inject(IntercessionStore);
  service = inject(IntercessionService);


  retrieveIntercessionPosition( intercession: Intercession ){
    return  new google.maps.LatLng(intercession?.coordinates?.lat, intercession?.coordinates?.lng);
  }

  selectedIntercession( intercession: Intercession ){
    this.service.setSelectedIntercession(intercession);
  }
}
