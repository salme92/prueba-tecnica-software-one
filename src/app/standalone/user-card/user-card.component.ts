import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, User } from '../../core/services/api.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, MatCardModule],
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
}
