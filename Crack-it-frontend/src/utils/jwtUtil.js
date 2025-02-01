
export const setToken = (token) => {
    localStorage.setItem("token", token); // Store JWT token in localStorage
  };
  
  export const getToken = () => {
    return localStorage.getItem("token"); // Retrieve JWT token from localStorage
  };
  
  export const removeToken = () => {
    localStorage.removeItem("token"); // Remove JWT token from localStorage
  };
  
  export const isTokenExpired = (token) => {
    if (!token) return true;
  
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    const exp = payload.exp;
    const currentTime = Math.floor(Date.now() / 1000); // Current timestamp
  
    return exp < currentTime; // Return true if token is expired
  };
  
  export const getAuthHeader = () => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      removeToken();
      return null; // If expired or no token, return null
    }
    return { Authorization: `Bearer ${token}` }; // Return the Authorization header
  };