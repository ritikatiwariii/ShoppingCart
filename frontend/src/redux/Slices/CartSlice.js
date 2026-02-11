import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks for backend interaction
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    const response = await fetch("https://shoppingcart-backend-5vhc.onrender.com/api/cart");
    return response.json();
});

export const addToCartAsync = createAsyncThunk("cart/add", async (product) => {
    const response = await fetch("https://shoppingcart-backend-5vhc.onrender.com/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
    });
    return response.json();
});

export const removeFromCartAsync = createAsyncThunk("cart/remove", async (productId) => {
    await fetch(`https://shoppingcart-backend-5vhc.onrender.com/api/cart/${productId}`, { method: "DELETE" });
    return productId;
});

export const CartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        // We can keep local reducers for immediate UI feedback if desired,
        // but here we'll rely on extraReducers for backend sync.
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                // This might need mapping if the backend returns just productId and quantity
                // For simplicity, let's assume the backend or frontend handles the join
                return action.payload;
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(removeFromCartAsync.fulfilled, (state, action) => {
                return state.filter((item) => item.productId !== action.payload);
            });
    },
});

export default CartSlice.reducer;