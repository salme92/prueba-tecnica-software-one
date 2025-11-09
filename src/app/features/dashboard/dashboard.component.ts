import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserCardComponent } from '../../standalone/user-card/user-card.component';
import { PostItemComponent } from '../../shared/components/post-item/post-item.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Post, PostsByUser } from '../../core/models/app.models';
import { ApiService } from '../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// importa también tu ApiService, modelos, etc.

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Angular
    NgIf,
    NgFor,
    NgClass,
    FormsModule,
    // Material
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    // Componentes propios
    UserCardComponent,
    LoadingSpinnerComponent,
    PostItemComponent,
  ],
})
export class DashboardComponent {
  posts: Post[] = [];
  loading = false;
  error: string | null = null;

  currentPage = 1;
  readonly pageSize = 10;
  searchTerm = '';

  // Post en edición / creación
  editablePost: Post = { title: '', body: '' };
  isEditing = false;

  // Datos para el gráfico
  postsByUser: PostsByUser[] = [];
  maxPostsPerUser = 1;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.error = null;
    this.cdr.markForCheck();

    this.api
      .getPosts(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe({
        next: (posts) => {
          this.posts = posts;
          this.loading = false;
          this.computeStats();
          this.cdr.markForCheck();
        },
        error: () => {
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

  // ===== CRUD =====

  selectPost(post: Post): void {
    this.isEditing = true;
    this.editablePost = { ...post };
    this.cdr.markForCheck();
  }

  newPost(): void {
    this.isEditing = false;
    this.editablePost = { title: '', body: '' };
    this.cdr.markForCheck();
  }

  savePost(): void {
    if (!this.editablePost.title || !this.editablePost.body) {
      alert('Título y cuerpo son obligatorios');
      return;
    }

    if (this.isEditing && this.editablePost.id) {
      // UPDATE
      const id = this.editablePost.id;
      this.api.updatePost(id, this.editablePost).subscribe({
        next: (updated) => {
          this.posts = this.posts.map((p) =>
            p.id === id ? updated : p
          );
          this.computeStats();
          this.newPost();
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error actualizando post', err);
          alert('No se pudo actualizar el post');
        },
      });
    } else {
      // CREATE
      this.api.createPost(this.editablePost).subscribe({
        next: (created) => {
          this.posts = [created, ...this.posts];
          this.computeStats();
          this.newPost();
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error creando post', err);
          alert('No se pudo crear el post');
        },
      });
    }
  }

  deletePost(): void {
    if (!this.isEditing || !this.editablePost.id) return;
    const id = this.editablePost.id;
    if (!confirm('¿Seguro que quieres borrar este post?')) return;

    this.api.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter((p) => p.id !== id);
        this.computeStats();
        this.newPost();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error eliminando post', err);
        alert('No se pudo eliminar el post');
      },
    });
  }

  // ===== Estadísticas para el gráfico =====

  private computeStats(): void {
    const map = new Map<number, number>();

    for (const post of this.posts) {
      const id = post.userId ?? 0;
      map.set(id, (map.get(id) ?? 0) + 1);
    }

    this.postsByUser = Array.from(map.entries())
      .map(([userId, count]) => ({ userId, count }))
      .sort((a, b) => a.userId - b.userId);

    const max = this.postsByUser.reduce(
      (acc, item) => (item.count > acc ? item.count : acc),
      1
    );
    this.maxPostsPerUser = max || 1;
  }

  // ===== Notificación push simulada (bonus PWA) =====

  simulatePushNotification(): void {
    this.snackBar.open(
      'Tienes una nueva actividad en tu dashboard (notificación simulada)',
      'Cerrar',
      {
        duration: 3000,
      }
    );
  }
}
