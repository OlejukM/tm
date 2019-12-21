import { Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Question } from 'src/app/questions/question';

@Injectable({
  providedIn: 'root',
})
export class DragAndDropService {
  constructor() {}

  drop(event: CdkDragDrop<Question[]>): void {
    if (event.container.id === event.previousContainer.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
