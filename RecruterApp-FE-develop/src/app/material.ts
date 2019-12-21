import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatExpansionModule,
} from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

const imports = [
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatMenuModule,
  MatSnackBarModule,
  MatTableModule,
  MatIconModule,
  MatDialogModule,
  MatIconModule,
  MatChipsModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSortModule,
  DragDropModule,
  MatListModule,
  MatExpansionModule,
];

@NgModule({
  imports: [...imports],
  exports: [...imports],
})
export class MaterialModule {}
