import { Component, inject } from '@angular/core';
import { IntercessionService } from '../intercession.service';
import { FormsModule } from "@angular/forms";
import { IntercessionStatusEnum, IntercessionTypeEnum } from "../../src/model/intercession/intercession-enum";
import { CalendarModule } from "primeng/calendar";
import { DropdownChangeEvent, DropdownModule } from "primeng/dropdown";
import { KeyValuePipe } from "@angular/common";
import { IntercessionOperation } from "../../src/model/intercession/intercessionOperation";
import { Intercession } from "../../src/model/intercession/intercession";


@Component({
  selector: 'app-intercession-edit',
  standalone: true,
  imports: [
    FormsModule,
    CalendarModule,
    DropdownModule,
    KeyValuePipe
  ],
  templateUrl: './intercession-edit.component.html',
  styleUrl: './intercession-edit.component.scss'
})
export class IntercessionEditComponent {
  service = inject(IntercessionService);

  updateType( $event: DropdownChangeEvent, operation: IntercessionOperation ){
    operation.type = $event.value;
    const updatedIntercession = this.service.getSelectedIntercession();
    updatedIntercession.operations.filter((op) => op.id === operation.id).map((op) => {
      op.type = operation.type;
    });
    this.service.updateIntercessionById(updatedIntercession.id, updatedIntercession);
  }

  updateStatus( $event: DropdownChangeEvent, operation: IntercessionOperation ){
    operation.status = $event.value;
    const updatedIntercession = this.service.getSelectedIntercession();
    updatedIntercession.operations.filter((op) => op.id === operation.id).map((op) => {
      op.status = operation.status;
    });
    this.service.updateIntercessionById(updatedIntercession.id, updatedIntercession);
  }

  protected readonly Intercession = Intercession;
}
