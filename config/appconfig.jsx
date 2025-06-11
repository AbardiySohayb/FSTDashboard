// API base URL configuration
const API_BASE_URL ="http://localhost:8000/api"

// API endpoints
export const API_ENDPOINTS = {
  // Employee endpoints
  EMPLOYEES: {
    GET_ALL: `${API_BASE_URL}/employes`,
    ADD: `${API_BASE_URL}/employes/add`,
    DELETE: `${API_BASE_URL}/employes/delete`,
    UPDATE: `${API_BASE_URL}/employes/update`,
    GET_INDICE: (id) => `${API_BASE_URL}/employes/${id}/indice`,
    FILTER: `${API_BASE_URL}/employes/filter`,
    NEED_UPDATE: (id) => `${API_BASE_URL}/employes/need-update/${id}`,
    NEED_UPDATES: `${API_BASE_URL}/employes/need-updates`,
    GENERATE_UPDATE_DOC: `${API_BASE_URL}/employes/generate-update-doc`,
    CONCERNED: `${API_BASE_URL}/employes/concerned`, // Ajout de l'endpoint pour les employés concernés
    UPDATEECHLON: `${API_BASE_URL}/employes/updateEchlon`,
  },
}

// Default headers for API requests
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
}

// API request helper functions
export const apiService = {
  // GET request
  async get(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: DEFAULT_HEADERS,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API GET request failed:", error)
      throw error
    }
  },

  // POST request
  async post(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API POST request failed:", error)
      throw error
    }
  },

  // PUT request
  async put(url, data) {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API PUT request failed:", error)
      throw error
    }
  },

  // DELETE request
  async delete(url, data) {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API DELETE request failed:", error)
      throw error
    }
  },
}
