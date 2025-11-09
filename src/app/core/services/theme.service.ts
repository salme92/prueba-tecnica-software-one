import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'app_theme';
const THEME_COOKIE_KEY = 'app_theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeSubject = new BehaviorSubject<Theme>('light');

  readonly theme$: Observable<Theme> = this.themeSubject.asObservable();

  constructor(private storage: StorageService) {
    // Cargar el theme desde localStorage o cookie
    const fromLocal =
      this.storage.getLocal<Theme>(THEME_STORAGE_KEY) ?? undefined;
    const fromCookie = this.storage.getCookie(THEME_COOKIE_KEY) as Theme | null;

    const initialTheme: Theme = fromLocal || fromCookie || 'light';
    this.setTheme(initialTheme);
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.storage.setLocal(THEME_STORAGE_KEY, theme);
    this.storage.setCookie(THEME_COOKIE_KEY, theme, 365);
  }

  toggleTheme(): void {
    const current = this.themeSubject.getValue();
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }
}
