import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ApiService } from '../../core/services/api.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { User } from '../../core/models/app.models';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, MatCardModule, MatIconModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent implements OnInit {
  @Input() userId!: number;

  user: User | null = null;
  loading = false;
  error: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    if (!this.userId) {
      this.error = 'No se ha proporcionado un ID de usuario';
      return;
    }

    this.loading = true;
    this.api.getUser(this.userId).subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando usuario', err);
        this.error = 'No se pudo cargar la información del usuario.';
        this.loading = false;
      },
    });
  }

  /** Iniciales del usuario para el avatar */
  get initials(): string {
    if (!this.user?.name) {
      return '';
    }
    const parts = this.user.name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (
      parts[0].charAt(0).toUpperCase() +
      parts[parts.length - 1].charAt(0).toUpperCase()
    );
  }
}
