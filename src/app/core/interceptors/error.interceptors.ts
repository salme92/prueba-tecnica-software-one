import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from '../services/logger.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const logger = inject(LoggerService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      logger.error('HTTP error interceptor', {
        url: req.url,
        status: error.status,
        message: error.message,
      });

      if (error.status === 401) {
        // Simulamos un logout básico
        localStorage.removeItem('auth_token');
        // Redirigimos a algún sitio "seguro", por ejemplo dashboard
        router.navigate(['/dashboard']);
      } else if (error.status === 404) {
        router.navigate(['/dashboard']);
      }

      return throwError(() => error);
    })
  );
};
