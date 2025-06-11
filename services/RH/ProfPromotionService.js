"use client"

import { useState } from "react"
import { API_ENDPOINTS, apiService } from "../../config/appconfig"

// Hook for managing professor promotions
export const useProfPromotion = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [employeesNeedingUpdate, setEmployeesNeedingUpdate] = useState([])
  const [selectedEmployees, setSelectedEmployees] = useState([])
  const [documentUrl, setDocumentUrl] = useState(null)

  // Fetch all employees that need an update
  const fetchEmployeesNeedingUpdate = async () => {
    setLoading(true)
    setError(null)

    try {
      // D'abord, récupérer tous les employés
      const allEmployeesResponse = await apiService.get(API_ENDPOINTS.EMPLOYEES.GET_ALL)
      const allEmployees = Array.isArray(allEmployeesResponse)
        ? allEmployeesResponse
        : allEmployeesResponse.data
          ? allEmployeesResponse.data
          : []

      // Si aucun employé n'est trouvé, retourner un tableau vide
      if (allEmployees.length === 0) {
        setEmployeesNeedingUpdate([])
        return []
      }

      // Préparer les IDs pour l'appel à /employes/concerned
      const employeeIds = allEmployees.map((emp) => ({ id: emp.id }))

      // Utiliser l'endpoint /employes/concerned qui fonctionne
      const response = await apiService.post(API_ENDPOINTS.EMPLOYEES.CONCERNED, {
        employes: employeeIds,
      })

      // Extraire les données de la réponse
      const employeesNeedingUpdateIds = response.data || []

      // Si aucun employé n'a besoin de mise à jour, retourner un tableau vide
      if (employeesNeedingUpdateIds.length === 0) {
        setEmployeesNeedingUpdate([])
        return []
      }

      // Récupérer les détails complets des employés qui ont besoin d'une mise à jour
      // en filtrant la liste complète des employés
      const employeesNeedingUpdateDetails = allEmployees.filter((emp) =>
        employeesNeedingUpdateIds.some((needsUpdate) => needsUpdate.id === emp.id),
      )

      setEmployeesNeedingUpdate(employeesNeedingUpdateDetails)
      return employeesNeedingUpdateDetails
    } catch (err) {
      setError("Erreur lors de la récupération des employés nécessitant une mise à jour")
      console.error("Détails de l'erreur:", err)
      return []
    } finally {
      setLoading(false)
    }
  }

  // Check if a specific employee needs an update
  const checkEmployeeNeedsUpdate = async (employeeId) => {
    try {
      // Utiliser l'endpoint /employes/concerned pour un seul employé
      const response = await apiService.post(API_ENDPOINTS.EMPLOYEES.CONCERNED, {
        employes: [{ id: employeeId }],
      })

      // Si l'employé est dans la liste retournée, il a besoin d'une mise à jour
      const needsUpdate =
        response.data && response.data.length > 0 && response.data.some((emp) => emp.id === employeeId)

      return needsUpdate
    } catch (err) {
      console.error("Erreur lors de la vérification de la mise à jour:", err)
      return false
    }
  }

  // Generate update document for selected employees
  const generateUpdateDocument = async (employeeIds) => {
    setLoading(true)
    setError(null)
    setDocumentUrl(null)

    try {
      // Appel au contrôleur backend pour générer le document
      const response = await apiService.post(API_ENDPOINTS.EMPLOYEES.GENERATE_UPDATE_DOC, {
        selectedIds: employeeIds,
      })

      if (response.pdf_url) {
        setDocumentUrl(response.pdf_url)
        return response.pdf_url
      } else {
        throw new Error("URL du document non reçue")
      }
    } catch (err) {
      setError("Erreur lors de la génération du document de mise à jour")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Nouvelle fonction pour mettre à jour les échelons des employés
  const updateEmployeeEchelons = async (employeeIds) => {
    setLoading(true)
    setError(null)

    try {
      // Appel au nouvel endpoint pour mettre à jour les échelons
      const response = await apiService.post(API_ENDPOINTS.EMPLOYEES.UPDATEECHLON, {
        employeIds: employeeIds,
      })

      return {
        success: true,
        message: response.message || "Mise à jour des échelons réussie",
        updatedCount: response.updated || 0,
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour des échelons")
      console.error("Détails de l'erreur:", err)
      return {
        success: false,
        message: err.message || "Erreur lors de la mise à jour des échelons",
        updatedCount: 0,
      }
    } finally {
      setLoading(false)
    }
  }

  // Toggle selection of an employee
  const toggleEmployeeSelection = (employeeId) => {
    setSelectedEmployees((prev) => {
      if (prev.includes(employeeId)) {
        return prev.filter((id) => id !== employeeId)
      } else {
        return [...prev, employeeId]
      }
    })
  }

  // Clear all selected employees
  const clearSelectedEmployees = () => {
    setSelectedEmployees([])
  }

  // Get employee indice
  const getEmployeeIndice = async (employeeId) => {
    try {
      const response = await apiService.get(API_ENDPOINTS.EMPLOYEES.GET_INDICE(employeeId))
      return response.indice
    } catch (err) {
      console.error("Erreur lors de la récupération de l'indice:", err)
      return null
    }
  }

  // Filter employees that need update from a list
  const filterEmployeesNeedingUpdate = async (employeesList) => {
    setLoading(true)
    setError(null)

    try {
      // Préparer les IDs pour l'appel à /employes/concerned
      const employeeIds = employeesList.map((emp) => ({ id: emp.id }))

      const response = await apiService.post(API_ENDPOINTS.EMPLOYEES.CONCERNED, {
        employes: employeeIds,
      })

      // Extraire les IDs des employés qui ont besoin d'une mise à jour
      const employeesNeedingUpdateIds = response.data || []

      // Récupérer les détails complets des employés qui ont besoin d'une mise à jour
      const employeesNeedingUpdateDetails = employeesList.filter((emp) =>
        employeesNeedingUpdateIds.some((needsUpdate) => needsUpdate.id === emp.id),
      )

      return employeesNeedingUpdateDetails
    } catch (err) {
      setError("Erreur lors du filtrage des employés nécessitant une mise à jour")
      console.error(err)
      return []
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    employeesNeedingUpdate,
    selectedEmployees,
    documentUrl,
    fetchEmployeesNeedingUpdate,
    checkEmployeeNeedsUpdate,
    generateUpdateDocument,
    updateEmployeeEchelons, // Exposer la nouvelle fonction
    toggleEmployeeSelection,
    clearSelectedEmployees,
    getEmployeeIndice,
    filterEmployeesNeedingUpdate,
  }
}

// Component for managing professor promotions
const ProfPromotion = {
  useProfPromotion,
}

export default ProfPromotion
