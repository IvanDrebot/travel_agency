import { createAction, props } from '@ngrx/store';
import { createActionType } from '../helpers/effects';
import IPaginator from 'src/interfaces/custom/IPaginator.model';
import { IHotelForm, IHotelResponse } from '../models/hotel/IHttpHotels.model';

const CREATE_HOTEL = createActionType('[HOTEL CREATE] setAll');
const UPLOAD_IMAGES = createActionType('[HOTEL UPLOAD IMAGES] setAll');
const GET_ALL = createActionType('[HOTEL GET ALL] setAll');
const SEARCH = createActionType('[HOTEL SEARCH] setAll');
const GET_BY_ID = createActionType('[HOTEL GET BY ID] setAll');

export const createHotel = {
  request: createAction(
    CREATE_HOTEL.REQUEST,
    props<{ hotelForm: IHotelForm; images: File[] }>()
  ),
  success: createAction(
    CREATE_HOTEL.SUCCESS,
    props<{ id: number; images: FormData[] }>()
  ),
  failure: createAction(CREATE_HOTEL.FAILURE),
};

export const uploadImages = {
  request: createAction(
    UPLOAD_IMAGES.REQUEST,
    props<{ hotelId: number; image: FormData }>()
  ),
  success: createAction(UPLOAD_IMAGES.SUCCESS),
  failure: createAction(UPLOAD_IMAGES.FAILURE),
};

export const getAll = {
  request: createAction(
    GET_ALL.REQUEST,
    props<{ params: { limit: number; page: number } }>()
  ),
  success: createAction(
    GET_ALL.SUCCESS,
    props<{ items: IHotelResponse[]; paginator: IPaginator }>()
  ),
  failure: createAction(GET_ALL.FAILURE),
};

export const search = {
  request: createAction(
    SEARCH.REQUEST,
    props<{ params: { limit: number; page: number; target: string } }>()
  ),
  success: createAction(
    SEARCH.SUCCESS,
    props<{ items: IHotelResponse[]; paginator: IPaginator }>()
  ),
  failure: createAction(SEARCH.FAILURE),
};

export const getById = {
  request: createAction(GET_BY_ID.REQUEST, props<{ id: number }>()),
  success: createAction(GET_BY_ID.SUCCESS, props<{ item: IHotelResponse }>()),
  failure: createAction(GET_BY_ID.FAILURE),
};

export const HotelActions = {
  createHotel,
  uploadImages,
  getAll,
  search,
  getById,
};
