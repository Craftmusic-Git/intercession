import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IntercessionTableComponent } from "./intercession-table/intercession-table.component";
import { HttpClientModule } from "@angular/common/http";
import { GoogleMap } from "@angular/google-maps";
import { IntercessionMapComponent } from "./intercession-map/intercession-map.component";
import { IntercessionEditComponent } from "./intercession-edit/intercession-edit.component";
import { IntercessionToolsComponent } from "./intercession-tools/intercession-tools.component";
import { IntercessionCreateModalComponent } from "./intercession-create-modal/intercession-create-modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    IntercessionTableComponent,
    GoogleMap,
    IntercessionMapComponent,
    IntercessionEditComponent,
    IntercessionToolsComponent,
    IntercessionCreateModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'map';
}
