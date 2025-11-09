import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  QueryList,
  ViewChild,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../../core/models/app.models';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'completed', 'userId'];
  dataSource = new MatTableDataSource<Todo>([]);
  loading = false;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Ejemplo de ViewChildren: referenciamos las filas del tbody
  @ViewChildren('activityRow')
  rows!: QueryList<ElementRef<HTMLTableRowElement>>;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.loadTodos();
  }

  ngAfterViewInit(): void {
    // Cuando ya tengamos el paginator, lo conectamos al dataSource
    this.dataSource.paginator = this.paginator;
  }

  loadTodos(): void {
    this.loading = true;
    this.error = null;
    this.cdr.markForCheck();

    this.api.getTodos().subscribe({
      next: (todos) => {
        this.dataSource.data = todos;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error cargando histórico', err);
        this.error = 'No se pudo cargar el histórico de actividades.';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  applyFilter(value: string): void {
    const filterValue = value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  scrollToFirstCompleted(): void {
    const firstCompletedIndex = this.dataSource.data.findIndex(
      (t) => t.completed
    );
    if (firstCompletedIndex < 0) {
      return;
    }

    // Usamos ViewChildren para acceder a la fila correspondiente
    const rowsArray = this.rows.toArray();
    const row = rowsArray[firstCompletedIndex];
    if (row) {
      row.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      row.nativeElement.classList.add('highlight');
      setTimeout(() => {
        row.nativeElement.classList.remove('highlight');
      }, 1500);
    }
  }
}
