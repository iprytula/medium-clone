import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PersistenceService } from './persistence.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const persistenceService = inject(PersistenceService);
  const token = persistenceService.get('accessToken');

  req = req.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : ''
    }
  })

  return next(req);
};
