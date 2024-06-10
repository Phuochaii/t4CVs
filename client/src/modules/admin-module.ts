import axios from "axios";

export const isAdmin = async (token: string) => {
    const result = await axios.get(`http://localhost:3000/admin/check`, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
        .then(res => res.data as boolean)
    return result;
}

export const getProfile = async (token: string) => {
    const result = await axios.get(`http://localhost:3000/admin/profile`, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
        .then(res => res.data as { name: string, picture?: string })
    return result;
}