import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/services/storage.service';
import { Theme, ThemeService } from '../../core/services/theme.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

interface SettingsFormValue {
  theme: Theme;
  language: 'es' | 'en';
  emailNotifications: boolean;
  pushNotifications: boolean;
}

const SETTINGS_STORAGE_KEY = 'user_settings';
const LANGUAGE_COOKIE_KEY = 'app_language';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  lastVisit: string | null = null;

  themeOptions: { value: Theme; label: string }[] = [
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Oscuro' },
  ];

  languageOptions = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'Inglés' },
  ];

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private themeService: ThemeService
  ) {
    this.form = this.fb.group<SettingsFormValue>({
      theme: 'light',
      language: 'es',
      emailNotifications: true,
      pushNotifications: false,
    });
  }

  ngOnInit(): void {
    // Cargar settings previos desde localStorage
    const saved =
      this.storage.getLocal<SettingsFormValue>(SETTINGS_STORAGE_KEY);

    if (saved) {
      this.form.patchValue(saved);
      this.themeService.setTheme(saved.theme);
    }

    // Cargar idioma desde cookie si existe
    const lang = this.storage.getCookie(LANGUAGE_COOKIE_KEY) as
      | 'es'
      | 'en'
      | null;
    if (lang) {
      this.form.patchValue({ language: lang });
    }

    // Guardar "última visita" en sessionStorage
    const now = new Date().toISOString();
    this.storage.setSession('settings_last_visit', now);
    this.lastVisit = this.storage.getSession<string>('settings_last_visit') ?? null;
  }

  onSave(): void {
    const value = this.form.value as SettingsFormValue;

    // Guardar en localStorage
    this.storage.setLocal(SETTINGS_STORAGE_KEY, value);

    // Guardar idioma en cookie
    this.storage.setCookie(LANGUAGE_COOKIE_KEY, value.language, 365);

    // Actualizar tema global
    this.themeService.setTheme(value.theme);

    alert('Configuración guardada (simulado)');
  }
}
