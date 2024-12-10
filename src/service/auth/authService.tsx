import { API_URL } from "@service/config";
import { useAuthStore } from "@state/authStore";
import { tokenStorage } from "@state/storage";
import { resetAndNavigate } from "@utils/NavigationUtils";
import axios, { Axios, AxiosError } from "axios";
import { appAxios } from "./apiInterceptors";


interface CustomError {
    response?: {
        data?: {
            message?: string
        }
    }
}

export const customerLogin = async (phone: string) => {
    try {
        // console.log("Login request", phone)
        console.log(`${API_URL}/customer/login`)
        const response = await axios.post(`${API_URL}/customer/login`, { phone })
        // console.log(response);
        // console.log("Login response", response.data)
        const { accessToken, refreshToken, customer, message } = response.data
        tokenStorage.set("accessToken", accessToken)
        tokenStorage.set("refreshToken", refreshToken)
        const { setUser } = useAuthStore.getState()
        setUser(customer)
        return { success: true, user: customer, message }
    } catch (error) {
        console.log("Login error", error)
        return { success: false, error }
    }
}
export const deliveryLogin = async (email: string, password: string) => {
    try {
        console.log("Login request", email, password)
        console.log(`${API_URL}/delivery-partner/login`)
        const response = await axios.post(`${API_URL}/delivery-partner/login`, { email, password })
        console.log("Login response", response)
        const { accessToken, refreshToken, deliveryPartner } = response.data
        tokenStorage.set("accessToken", accessToken)
        tokenStorage.set("refreshToken", refreshToken)
        const { setUser } = useAuthStore.getState()
        setUser(deliveryPartner)
        return { success: true, user: deliveryPartner }
    } catch (error) {
        const err = error as CustomError;
        console.log("Login error: ", err.response?.data?.message)
        return { success: false, message: err.response?.data?.message }
    }
}


export const refetchUser = async (setUser: any) => {
    try {
        const response = await appAxios.get(`/user`)
        setUser(response.data.user)
    } catch (error) {
        console.log("Fetching user error", error)
    }
}


export const refreshAccessToken = async () => {
    try {
        const refreshToken = tokenStorage.getString("refreshToken")
        const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken })
        const newAccessToken = response.data.accessToken
        const newRefreshToken = response.data.refreshToken
        tokenStorage.set("accessToken", newAccessToken)
        tokenStorage.set("refreshToken", newRefreshToken)
        return newAccessToken
    } catch (error) {
        console.log("Refresh token error", error)
        tokenStorage.clearAll()
        resetAndNavigate("CustomerLogin")
    }
}