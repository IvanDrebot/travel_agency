import { Action, createReducer, on } from '@ngrx/store';
import { ToursActions } from '../actions/tours.actions';
import IPaginator from 'src/interfaces/custom/IPaginator.model';
import { ITour } from 'src/interfaces/basics/tour.model';
import { IService } from '../models/tours/ITour.model';

export interface IToursState {
  services: IService[];
  items: ITour[];
  paginator: IPaginator;
  loading: boolean;
}

const initState = (): IToursState => ({
  services: null,
  items: null,
  paginator: null,
  loading: false,
});

const toursReducer = createReducer(
  initState(),
  on(ToursActions.getAll.request, (state) => ({
    ...state,
    items: null,
    loading: false,
    paginator: null,
  })),
  on(ToursActions.getAll.success, (state, action) => ({
    ...state,
    items: action.items,
    loading: false,
    paginator: action.paginator,
  })),
  on(ToursActions.getAll.failure, (state) => ({
    ...state,
    items: null,
    loading: false,
    paginator: null,
  })),
  on(ToursActions.getServices.request, (state) => ({
    ...state,
    services: null,
  })),
  on(ToursActions.getServices.success, (state, { services }) => ({
    ...state,
    services,
  })),
  on(ToursActions.getServices.failure, (state) => ({
    ...state,
    services: null,
  })),

  on(ToursActions.create.request, (state) => ({
    ...state,
  })),
  on(ToursActions.create.request, (state) => ({ ...state })),
  on(ToursActions.create.failure, (state) => ({ ...state })),
  on(ToursActions.search.request, (state) => ({
    ...state,
    items: null,
    paginator: null,
    loading: false,
  })),
  on(ToursActions.search.success, (state, action) => ({
    ...state,
    items: action.items,
    paginator: null,
    loading: false,
  })),
  on(ToursActions.search.failure, (state) => ({
    ...state,
    paginator: null,
    items: null,
    loading: false,
  }))
);

export function reducer(state: IToursState | undefined, action: Action) {
  return toursReducer(state, action);
}
