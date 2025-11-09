import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class SettingsComponent implements OnInit {
  form!: FormGroup;

  private readonly defaultValues = {
    theme: 'light',
    language: 'es',
    emailNotifications: true,
    pushNotifications: true,
    newsletter: false,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      theme: [this.defaultValues.theme, Validators.required],
      language: [this.defaultValues.language, Validators.required],
      emailNotifications: [this.defaultValues.emailNotifications],
      pushNotifications: [this.defaultValues.pushNotifications],
      newsletter: [this.defaultValues.newsletter],
    });
  }

  reset(): void {
    this.form.reset(this.defaultValues);
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    // Aquí podrías usar ThemeService / StorageService si quieres persistirlo
    // Por ahora dejamos un log para la prueba técnica:
    console.log('Configuración guardada', value);
  }
}
