import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { ToursActions } from '../actions/tours.actions';
import { ToursService } from 'src/services/tours.service';
import { IHttpTour } from '../models/tours/ITour.model';
import { Router } from '@angular/router';
import IPaginator from 'src/interfaces/custom/IPaginator.model';

@Injectable()
export class ToursEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToursActions.getAll.request.type),
      mergeMap(
        (action: { params: { limit: number; page: number }; type: string }) => {
          return this.toursService.getAll(action.params).pipe(
            map((response) => {
              const { itemsCount, total, page, maxPage, items } = response;
              const paginator: IPaginator = {
                total,
                pages: maxPage,
                count: itemsCount,
                current: page,
              };
              return ToursActions.getAll.success({ items, paginator });
            }),
            catchError(() => {
              return of(ToursActions.getAll.failure());
            })
          );
        }
      )
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToursActions.search.request.type),
      mergeMap((action: { target: string; type: string }) => {
        return this.toursService.search(action.target).pipe(
          map((response) => {
            console.log(response);
            return ToursActions.search.success({ items: response });
          }),
          catchError(() => {
            return of(ToursActions.search.failure());
          })
        );
      })
    )
  );

  getTourServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToursActions.getServices.request.type),
      mergeMap(() =>
        this.toursService.getServices().pipe(
          map((services) => {
            return ToursActions.getServices.success({ services });
          }),
          catchError(() => {
            return of(ToursActions.getServices.failure());
          })
        )
      )
    )
  );

  createTour$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToursActions.create.request.type),
      mergeMap((action: { tour: IHttpTour; type: string }) =>
        this.toursService.create(action.tour).pipe(
          map(() => {
            this.router.navigateByUrl('/tours');
            return ToursActions.create.success();
          }),
          catchError(() => {
            this.toaster.error(
              'Error :(',
              'Hotel was not created.',
              this.toasterOptions
            );
            return of(ToursActions.create.failure);
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private toursService: ToursService,
    private toaster: NotificationsService,
    private router: Router
  ) {}

  private toasterOptions = {
    animate: 'fade',
    timeOut: 3000,
    showProgressBar: true,
  };
}
