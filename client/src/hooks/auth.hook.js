import {useState, useCallback, useEffect} from "react"

const storageName = "userData"

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    const login = useCallback( (jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({
            userId : id, token : jwtToken
        }))
    }, [])

    const logout = useCallback( () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if(data && data.token) {
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])

    const checkTokenExpiration = () => {

        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        if (tokenData.exp < currentTime) {
            logout();
        }

    };

    return {login, logout, token, userId, ready, checkTokenExpiration}
}