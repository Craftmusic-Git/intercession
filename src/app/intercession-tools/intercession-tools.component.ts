import { Component, inject } from '@angular/core';
import { IntercessionStore } from "../intercession.store";
import { IntercessionService } from "../intercession.service";
import { IntercessionOperation } from "../../src/model/intercession/intercessionOperation";
import {
  IntercessionStatusEnum,
  IntercessionTypeEnum,
  parseStatus, parseType
} from "../../src/model/intercession/intercession-enum";
import { ButtonDirective } from "primeng/button";
import { FileUploadModule } from "primeng/fileupload";
import { Intercession } from "../../src/model/intercession/intercession";
import { DialogService } from "primeng/dynamicdialog";
import { IntercessionCreateModalComponent } from "../intercession-create-modal/intercession-create-modal.component";

@Component({
  selector: 'app-intercession-tools',
  standalone: true,
  providers: [
    DialogService
  ],
  imports: [
    ButtonDirective,
    FileUploadModule
  ],
  templateUrl: './intercession-tools.component.html',
  styleUrl: './intercession-tools.component.scss'
})
export class IntercessionToolsComponent {
  store = inject(IntercessionStore);
  service = inject(IntercessionService);
  dialogService = inject(DialogService);

  onFileChange( $event: any ){
    const file = $event.files[0];
    if ( file ) {
      const reader = new FileReader();
      reader.onload = () => {
        const csv = reader.result.toString();
        const intercessions = this.parseCSV(csv);
        this.service.setIntercessions(intercessions);
      }
      reader.readAsText(file);
    }
  }

  parseCSV( type: string ): Intercession[]{
    const lines = type.split('\n');
    const intercessions: Intercession[] = [];
    let intercessionId: number = 0;

    for ( let i = 1; i < lines.length - 1; i++ ) {
      const line = lines[i];
      const values = line.split(',');
      const operation = new IntercessionOperation();
      operation.id = i;
      operation.description = values[2];
      operation.type = parseType(values[1]);
      operation.status = parseStatus(values[3]);
      operation.date = new Date(values[4]);

      const intercession = intercessions.filter(( inter ) => inter.address === values[0]);
      if ( intercession.length === 1 ) {
        intercession[0].operations.push(operation);
      } else {
        const newIntercession = new Intercession();
        newIntercession.id = intercessionId++;
        newIntercession.address = values[0];
        newIntercession.operations = [operation];
        intercessions.push(newIntercession);
      }
    }

    return intercessions;
  }

  create() {
    this.dialogService.open(IntercessionCreateModalComponent, {
      header: 'Ajouter une nouvelle intervention',
      modal: true,
    });
  }

  generateCsvData(): string{
    let csvContent = "Adresse,Type d'intervention,Précision de l'intervention,Statut de l'intervention,Date de l'intervention\n";

    this.store.intercessions().forEach(intercession => {
      intercession.operations.forEach(operation => {
        const row = [
          intercession.address,
          operation.type,
          operation.description,
          operation.status,
          operation.date.toISOString().replace('T', ' ').substring(0, 19) // Format ISO avec espace au lieu de T
        ].join(',');
        csvContent += row + "\n";
      });
    });

    return csvContent;
  }



  downloadCsv( csvContent: string, fileName: string ){
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
