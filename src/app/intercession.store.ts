import { Injectable, signal } from "@angular/core";
import { IntercessionOperation } from "../src/model/intercession/intercessionOperation";
import { Intercession } from "../src/model/intercession/intercession";

@Injectable({
  providedIn: 'root'
})
export class IntercessionStore {
  intercessions = signal<Intercession[]>([]);

  getIntercessionById( id: number ): Intercession{
    return this.intercessions().find(i => i.id === id);
  }

  updateIntercessionById( id: number, intercession: Intercession ){
    const updatedIntercession = this.intercessions().find(i => i.id === id);
    this.intercessions.set([...this.intercessions().filter(i => i.id !== id), updatedIntercession].sort((a, b) => a.id - b.id));
  }

  createIntercession( intercession: Intercession ){
    const currentIntercession = this.intercessions().filter(i => i.address === intercession.address);

    if (currentIntercession.length === 1) {
      const operations = currentIntercession[0].operations;
      intercession.operations[0].id = operations.length + 1;
      currentIntercession[0].operations.push(...intercession.operations);
      this.updateIntercessionById(currentIntercession[0].id, currentIntercession[0]);
    } else {
      intercession.id = this.intercessions().length + 1;
      intercession.operations[0].id = 1;
      this.intercessions.set([...this.intercessions(), intercession]);
    }
  }

  setIntercessions( intercessions: Intercession[] ){
    this.intercessions.set(intercessions);
  }

  constructor(){
  }
}
