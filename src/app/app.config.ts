import { ApplicationConfig, ErrorHandler } from '@angular/core';
import {
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { GlobalErrorHandler } from './core/error-handling/global-error-handler';
import { errorInterceptor } from './core/interceptors/error.interceptors';
import { authInterceptor } from './core/interceptors/auth.interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
};
