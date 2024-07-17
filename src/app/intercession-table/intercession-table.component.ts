import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { IntercessionStore } from "../intercession.store";
import { IntercessionService } from "../intercession.service";
import { TableModule } from "primeng/table";
import { IntercessionOperation } from "../../src/model/intercession/intercessionOperation";
import { IntercessionStatusEnum, IntercessionTypeEnum } from "../../src/model/intercession/intercession-enum";
import { GoogleMap, MapMarker } from "@angular/google-maps";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Button } from "primeng/button";
import { Ripple } from "primeng/ripple";
import { FormsModule } from "@angular/forms";
import { KeyValuePipe, NgClass } from "@angular/common";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { Intercession } from "../../src/model/intercession/intercession";

@Component({
  selector: 'app-intercession-table',
  standalone: true,
  imports: [
    TableModule,
    MapMarker,
    Button,
    Ripple,
    FormsModule,
    KeyValuePipe,
    CalendarModule,
    DropdownModule,
    NgClass
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './intercession-table.component.html',
  styleUrl: './intercession-table.component.scss'
})
export class IntercessionTableComponent {
  store = inject(IntercessionStore);
  service = inject(IntercessionService);

  protected readonly IntercessionStatusEnum = IntercessionStatusEnum;
  protected readonly IntercessionTypeEnum = IntercessionTypeEnum;
  protected readonly Intercession = Intercession;
}
