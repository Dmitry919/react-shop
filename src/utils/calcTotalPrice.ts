import { TCartItems } from "../redux/Slices/cartSlice"

export const calcTotalPrice = (items: TCartItems[]) => {
   return items.reduce((sum, obj) => sum + obj.price * obj.count, 0)
}