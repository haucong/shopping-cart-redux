import {createSlice} from '@reduxjs/toolkit';
  import {toast } from 'react-toastify'
const initialState = {
    cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity : 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart :(state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if(itemIndex >= 0){
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(
                  `increased ${state.cartItems[itemIndex].name} cart quantity`,
                  {
                    position: 'top-left',
                  }
                )
            }else{
                const tempProduct = {...action.payload, cartQuantity: 1};
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} added to cart`,{
                    position:'top-left',
                })
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        removeFromCart(state, action){
            const nextCartItems = state.cartItems.filter(
                (cartItem) => cartItem.id !== action.payload.id
            );
            state.cartItems = nextCartItems;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

            toast.error(`${action.payload.name} removed from cart`, {
                position: 'top-left',
            })
        },

        decreaseCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                cartitem => cartitem.id ===action.payload.id
            )
            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1

            toast.info(` Decrease${action.payload.name} cart quantity`, {
              position: 'top-left',
            })
        }else if(state.cartItems[itemIndex].cartQuantity === 1){
            const nextCartItems = state.cartItems.filter(
              (cartItem) => cartItem.id !== action.payload.id
            );
            state.cartItems = nextCartItems;
            toast.error(`${action.payload.name} removed from cart`, {
                position: 'top-left',
            })
            }
        },
        clearCart(state,action) {
            state.cartItems = [];
            toast.error(`Clear all cart` ,{
                position: 'bottom-left',
            });
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        getTotals(state, action) {
            let{total, quantity} = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity} = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity
                    return cartTotal;
                },
                {
                    total:0,
                    quantity: 0,
                }
            );
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        

},
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } = cartSlice.actions
export default cartSlice.reducer;