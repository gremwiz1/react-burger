import { ITypeData } from '../../utils/types';
import { ADDED_ITEM, DELETE_ITEM, DELETE_ITEM_ON_INDEX, CHANGE_ORDER_INGREDIENT_IN_BURGER, CLEAR_CART, TCartBurgerConstructorActions } from '../actions/index';
import { cartBurgerConstructorReducer } from './cart-burger-constructor';
type TCartInitialStateBurgerConstructor = {
    ingredients: ITypeData[]
}
const cartInitialStateBurgerConstructor : TCartInitialStateBurgerConstructor = {
    ingredients: []
};
const testIngredient1 = {
    _id: "testId1",
            name: "testName1",
            type: "bun",
            proteins: 11,
            fat: 11,
            carbohydrates: 11,
            calories: 11,
            price: 11,
            image: "testImage1",
            image_mobile: "testImage1",
            image_large: "testImage1",
            __v: 11,
            quantity: undefined
};
const testIngredient2 = {
    _id: "testId2",
            name: "testName2",
            type: "sauce",
            proteins: 11,
            fat: 11,
            carbohydrates: 11,
            calories: 11,
            price: 11,
            image: "testImage2",
            image_mobile: "testImage2",
            image_large: "testImage2",
            __v: 11,
            quantity: undefined
};
describe('cartBurgerConstructorReducer', () => {
    it('should return the initial state', () => {
      expect(cartBurgerConstructorReducer(undefined, {} as TCartBurgerConstructorActions)).toEqual(cartInitialStateBurgerConstructor);
    });
    it('should handle ADDED_ITEM', () => {
      expect(
        cartBurgerConstructorReducer(cartInitialStateBurgerConstructor, {
          type: ADDED_ITEM, item: testIngredient1
        })
      ).toEqual(
        expect.objectContaining({
          ...cartInitialStateBurgerConstructor,
          ingredients: [testIngredient1]
        })
      );
    });
    it('should handle DELETE_ITEM', () => {
        expect(
          cartBurgerConstructorReducer({
            ingredients: [testIngredient1] 
          }, {
            type: DELETE_ITEM, id: "testId1"
          })
        ).toEqual(
          expect.objectContaining({
            ...cartInitialStateBurgerConstructor,
            ingredients: []
          })
        );
      });
      it('should handle DELETE_ITEM_ON_INDEX', () => {
        expect(
          cartBurgerConstructorReducer({
            ingredients: [testIngredient1, testIngredient2] 
          }, {
            type: DELETE_ITEM_ON_INDEX, index: 1
          })
        ).toEqual(
          expect.objectContaining({
            ...cartInitialStateBurgerConstructor,
            ingredients: [testIngredient1]
          })
        );
      });
      it('should handle CHANGE_ORDER_INGREDIENT_IN_BURGER', () => {
        expect(
          cartBurgerConstructorReducer({
            ingredients: [testIngredient1, testIngredient2] 
          }, {
            type: CHANGE_ORDER_INGREDIENT_IN_BURGER, ingredients: [testIngredient2, testIngredient1]
          })
        ).toEqual(
          expect.objectContaining({
            ...cartInitialStateBurgerConstructor,
            ingredients: [testIngredient2, testIngredient1]
          })
        );
      });
      it('should handle CLEAR_CART', () => {
        expect(
          cartBurgerConstructorReducer({
            ingredients: [testIngredient1, testIngredient2] 
          }, {
            type: CLEAR_CART
          })
        ).toEqual(
          expect.objectContaining({
            ...cartInitialStateBurgerConstructor,
            ingredients: []
          })
        );
      });
});