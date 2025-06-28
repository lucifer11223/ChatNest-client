import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/config";

const config = {
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
};

const adminLogin = createAsyncThunk("admin/verify", async (secretKey) => {
    try {
        const { data } = await axios.post(`${server}/api/v1/admin/verify`, { secretKey }, config);
        return data.message;
    } catch (error) {
        throw error.response.data.message;
    }
});

const getAdmin = createAsyncThunk("admin/get", async () => {
    try {
        const { data } = await axios.get(`${server}/api/v1/admin/`, config);
        return data.admin;
    } catch (error) {
        throw error.response.data.message;
    }
});

const adminLogout = createAsyncThunk("admin/logout", async () => {
    try {
        const { data } = await axios.get(`${server}/api/v1/admin/logout`, config);
        return data.message;
    } catch (error) {
        throw error.response.data.message;
    }
});

const getStats = createAsyncThunk("admin/stats", async () => {
    try {
        const { data } = await axios.get(`${server}/api/v1/admin/stats`, config);
        return data.stats;
    } catch (error) {
        throw error.response.data.message;
    }
});

const getUsers = createAsyncThunk("admin/users", async () => {
    try {
        const { data } = await axios.get(`${server}/api/v1/admin/users`, config);
        return data.users;
    } catch (error) {
        throw error.response.data.message;
    }
});

const getChats = createAsyncThunk("admin/chats", async () => {
    try {
        const { data } = await axios.get(`${server}/api/v1/admin/chats`, config);
        return data.chats;
    } catch (error) {
        throw error.response.data.message;
    }
});

const getMessages = createAsyncThunk("admin/messages", async () => {
    try {
        const { data } = await axios.get(`${server}/api/v1/admin/messages`, config);
        return data.messages;
    } catch (error) {
        throw error.response.data.message;
    }
});

export { adminLogin, adminLogout, getAdmin, getChats, getMessages, getStats, getUsers };
