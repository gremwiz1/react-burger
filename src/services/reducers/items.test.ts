import { itemsReducer } from "./items";
import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_ERROR, TItemsActions } from '../actions/index';
import { ITypeData } from "../../utils/types";

type TInitialStateItems = {
  items: ITypeData[],
  isLoading: boolean,
  itemsError: boolean
}
const initialStateItems: TInitialStateItems = {
  items: [],
  isLoading: false,
  itemsError: false
};
describe('itemsReducer', () => {
  it('should return the initial state', () => {
    expect(itemsReducer(undefined, {} as TItemsActions)).toEqual(initialStateItems);
  });
  it('should handle GET_ITEMS_REQUEST', () => {
    expect(
      itemsReducer(initialStateItems, {
        type: GET_ITEMS_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialStateItems,
        isLoading: false
      })
    );
  });
  it('should handle GET_ITEMS_ERROR', () => {
    expect(
      itemsReducer(initialStateItems, {
        type: GET_ITEMS_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialStateItems,
        isLoading: false,
        itemsError: true
      })
    );
  });
  it('should handle GET_ITEMS_SUCCESS', () => {
    expect(
      itemsReducer(initialStateItems, {
        type: GET_ITEMS_SUCCESS, items: []
      })
    ).toEqual(
      expect.objectContaining({
        ...initialStateItems,
        isLoading: true,
        itemsError: false,
        items: []
      })
    );
  });
});