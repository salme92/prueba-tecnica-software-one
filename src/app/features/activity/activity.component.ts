import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface ActivityItem {
  id: number;
  type: 'post' | 'profile' | 'settings' | 'system';
  title: string;
  description: string;
  date: Date;
  icon?: string;
}

@Component({
  selector: 'app-activity',
  standalone: true,
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatCardModule, MatIconModule, DatePipe],
})
export class ActivityComponent {
  // Datos de ejemplo para el histórico
  activities: ActivityItem[] = [
    {
      id: 1,
      type: 'post',
      title: 'Nuevo post creado',
      description: 'Has creado un nuevo post de prueba desde el dashboard.',
      date: new Date(),
      icon: 'post_add',
    },
    {
      id: 2,
      type: 'profile',
      title: 'Perfil actualizado',
      description: 'Has actualizado tu información de perfil.',
      date: new Date(new Date().getTime() - 1000 * 60 * 30),
      icon: 'person',
    },
    {
      id: 3,
      type: 'settings',
      title: 'Preferencias guardadas',
      description: 'Has modificado la configuración de tema y notificaciones.',
      date: new Date(new Date().getTime() - 1000 * 60 * 60 * 3),
      icon: 'settings',
    },
    {
      id: 4,
      type: 'system',
      title: 'Sesión iniciada',
      description: 'Inicio de sesión en el dashboard.',
      date: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
      icon: 'login',
    },
  ];

  trackByActivity(index: number, item: ActivityItem): number {
    return item.id;
  }
}
