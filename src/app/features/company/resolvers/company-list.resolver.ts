import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { map, filter, first, tap } from 'rxjs';

import { selectAllCompanies } from '../state/company.selectors';
import { getAll } from '../state/company.actions';
import { LoadingService } from 'src/app/shared/services/loading.service';

export const companyListResolver: ResolveFn<boolean> = (route, state) => {
  const store = inject(Store);
  const loadingService = inject(LoadingService);

  // start loading
  loadingService.start();

  return store.pipe(
    select(selectAllCompanies),
    tap((data) => {
      if (data.length == 0) {
        console.log('resolver works');
        setTimeout(() => {
          store.dispatch(
            getAll({
              payload: {
                page: 1,
                size: 10,
                q: null,
                sort: null,
                sort_field: null,
                total: 0,
              },
            })
          );
        }, 3000);
      }
    }),
    map((data) => {
      if (data.length > 0) {
        loadingService.stop();
      }
      return data.length > 0;
    }),
    filter((data) => !!data),
    first()
  );
};
