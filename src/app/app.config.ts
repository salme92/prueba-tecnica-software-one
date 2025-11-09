import {
  ApplicationConfig,
  ErrorHandler,
  isDevMode,
} from '@angular/core';
import {
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';

import { appRoutes } from './app.routes';
import { GlobalErrorHandler } from './core/error-handling/global-error-handler';
import { errorInterceptor } from './core/interceptors/error.interceptors';
import { authInterceptor } from './core/interceptors/auth.interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    // ✅ Service Worker para PWA
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(), // solo en producción
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
