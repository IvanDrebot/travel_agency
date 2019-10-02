import { Action, createReducer, on } from '@ngrx/store';
import { HotelActions } from '../actions/hotel.actions';
import { IHotel } from 'src/interfaces/basics/hotel.model';
import IPaginator from 'src/interfaces/custom/IPaginator.model';

export interface IHotelState {
  loadedImgCounter: number;
  items: IHotel[];
  item: IHotel[];
  loading: boolean;
  paginator: IPaginator;
}

const initState = (): IHotelState => ({
  loadedImgCounter: null,
  items: null,
  item: null,
  paginator: null,
  loading: false,
});

const hotelReducer = createReducer(
  initState(),
  // create
  on(HotelActions.createHotel.request, (state) => ({
    ...state,
    loadedImgCounter: null,
  })),
  on(HotelActions.createHotel.success, (state) => {
    return {
      ...state,
      loadedImgCounter: null,
    };
  }),
  on(HotelActions.createHotel.failure, (state) => ({
    ...state,
    loadedImgCounter: null,
  })),

  // upload images
  on(HotelActions.uploadImages.request, (state) => ({
    ...state,
  })),
  on(HotelActions.uploadImages.success, (state) => ({
    ...state,
    loadedImgCounter: state.loadedImgCounter + 1,
  })),
  on(HotelActions.uploadImages.failure, (state) => ({
    ...state,
    loadedImgCounter: null,
  })),

  // get all
  on(HotelActions.getAll.request, (state) => ({ ...state, loading: true })),
  on(HotelActions.getAll.success, (state, action) => ({
    ...state,
    items: action.items,
    loading: false,
    paginator: action.paginator,
  })),
  on(HotelActions.getAll.failure, (state) => ({
    ...state,
    items: null,
    paginator: null,
    loading: false,
  }))
);

export function reducer(state: IHotelState | undefined, action: Action) {
  return hotelReducer(state, action);
}
