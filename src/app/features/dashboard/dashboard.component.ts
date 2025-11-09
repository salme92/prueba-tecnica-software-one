import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Post } from '../../core/services/api.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  posts: Post[] = [];
  loading = false;
  error: string | null = null;

  currentPage = 1;
  readonly pageSize = 10;
  searchTerm = '';

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.error = null;
    this.cdr.markForCheck();

    this.api.getPosts(this.currentPage, this.pageSize, this.searchTerm).subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error cargando posts', err);
        this.error = 'No se pudieron cargar los datos. Inténtalo de nuevo.';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  reload(): void {
    this.currentPage = 1;
    this.loadPosts();
  }

  nextPage(): void {
    this.currentPage++;
    this.loadPosts();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPosts();
    }
  }

  applySearch(value: string): void {
    this.searchTerm = value;
    this.currentPage = 1;
    this.loadPosts();
  }

  trackByPostId(_: number, item: Post): number | undefined {
    return item.id;
  }
}
