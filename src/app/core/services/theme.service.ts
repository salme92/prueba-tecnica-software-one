import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  _theme$ = new BehaviorSubject<Theme>('light');
  readonly theme$ = this._theme$.asObservable();

  constructor() {
    // si quieres, puedes leer de localStorage aquí
    const stored = localStorage.getItem('app-theme') as Theme | null;
    const initial: Theme = stored ?? 'light';
    this.setTheme(initial);
  }

  toggleTheme(): void {
    const next: Theme = this._theme$.value === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  setTheme(theme: Theme): void {
    this._theme$.next(theme);
    localStorage.setItem('app-theme', theme);

    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }
}
