// src/test.ts
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Inicializamos el entorno de testing de Angular
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: false },
  }
);

// 🔥 En vez de require.context, importamos los specs explícitamente.
// Ajusta las rutas si tu estructura difiere.

import './app/features/dashboard/dashboard.component.spec';
import './app/features/profile/profile.component.spec';
import './app/core/services/api.services.spec';
