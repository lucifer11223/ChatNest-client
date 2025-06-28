import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { adminLogin, adminLogout, getAdmin, getChats, getMessages, getStats, getUsers } from "../thunks/admin";

const initialState = {
    user: null,
    isAdmin: false,
    loader: true,

    stats: null,
    loadingStats: false,
    errorStats: null,

    users: null,
    loadingUsers: false,
    errorUsers: null,

    chats: null,
    loadingChats: false,
    errorChats: null,

    messages: null,
    loadingMessages: false,
    errorMessages: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userExists: (state, action) => {
            state.user = action.payload;
            state.loader = false;
        },
        userNotExists: (state) => {
            state.user = null;
            state.loader = false;
        },
    },


    extraReducers: (builder) => {
        builder.addCase(adminLogin.fulfilled, (state, action) => {
            state.isAdmin = true;
            toast.success(action.payload.message);
        })
            .addCase(adminLogin.rejected, (state, action) => {
                state.isAdmin = false;
                toast.error(action.error.message);
            })
            .addCase(getAdmin.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isAdmin = true;
                } else {
                    state.isAdmin = false;
                }
            })
            .addCase(getAdmin.rejected, (state, action) => {
                state.isAdmin = false;
            })
            .addCase(adminLogout.fulfilled, (state, action) => {
                state.isAdmin = false;
                toast.success(action.payload.message);
            })
            .addCase(adminLogout.rejected, (state, action) => {
                state.isAdmin = true;
                toast.error(action.error.message);
            })
            .addCase(getStats.pending, (state) => {
                state.loadingStats = true;
                state.errorStats = null;
            })
            .addCase(getStats.fulfilled, (state, action) => {
                state.loadingStats = false;
                state.stats = action.payload;
            })
            .addCase(getStats.rejected, (state, action) => {
                state.loadingStats = false;
                state.stats = null;
                state.errorStats = action.error.message;
            })
            .addCase(getUsers.pending, (state) => {
                state.loadingUsers = true;
                state.errorUsers = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loadingUsers = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loadingUsers = false;
                state.users = null;
                state.errorUsers = action.error.message;
            }).addCase(getChats.pending, (state) => {
                state.loadingChats = true;
                state.errorChats = null;
            }).addCase(getChats.fulfilled, (state, action) => {
                state.loadingChats = false;
                state.chats = action.payload;
            }).addCase(getChats.rejected, (state, action) => {
                state.loadingChats = false;
                state.chats = null;
                state.errorChats = action.error.message;
            })
            .addCase(getMessages.pending, (state) => {
                state.loadingMessages = true;
                state.errorMessages = null;
            }).addCase(getMessages.fulfilled, (state, action) => {
                state.loadingMessages = false;
                state.messages = action.payload;
            }).addCase(getMessages.rejected, (state, action) => {
                state.loadingMessages = false;
                state.messages = null;
                state.errorMessages = action.error.message;
            })

    },
});

export const { userExists, userNotExists } = authSlice.actions;
export default authSlice;