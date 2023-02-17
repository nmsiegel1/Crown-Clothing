import {CATEGORIES_ACTION_TYPES, Category} from "./category.types";

import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";

// export const setCategories = (categories) =>
//   createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriersSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categories: Category[]): FetchCategoriersSuccess =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories));

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));
