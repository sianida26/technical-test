import { createSlice } from '@reduxjs/toolkit';
import FeeType from '../../interfaces/FeeType';

const initialState: FeeType = {
    code: "",
    translations: {
        id: { name: "", description: "" },
        en: { name: "", description: "" },
        chn: { name: "", description: "" },
    },
    status: "Active"
};

export const feeTypeSlice = createSlice({
    name: "feeType",
    initialState,
    reducers: {
        setData: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },

        clear: (state) => {
            return initialState
        }
    }
})

export const { clear, setData } = feeTypeSlice.actions;

export default feeTypeSlice.reducer