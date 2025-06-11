"use client"

import { useState } from "react"
import { API_ENDPOINTS, apiService } from "../../config/appconfig"

const ProfPromotion = {
  useProfPromotion: () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Fetch employees that need updates
    const fetchEmployeesNeedingUpdate = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await apiService.get(API_ENDPOINTS.EMPLOYEES.NEED_UPDATES)
        console.log("Employés nécessitant une mise à jour:", response)
        return response
      } catch (err) {
        setError("Erreur lors de la récupération des employés nécessitant une mise à jour")
        console.error("Error fetching employees needing update:", err)
        throw err
      } finally {
        setLoading(false)
      }
    }

    // Generate update document
    const generateUpdateDocument = async (employeeIds) => {
      setLoading(true)
      setError(null)
      try {
        console.log("Génération du document pour les employés:", employeeIds)
        const response = await apiService.post(API_ENDPOINTS.EMPLOYEES.GENERATE_UPDATE_DOC, { employeeIds })
        console.log("Réponse de génération du document:", response)

        // Déterminer l'URL du document
        let documentUrl = null
        if (typeof response === "string") {
          documentUrl = response
        } else if (response && response.documentUrl) {
          documentUrl = response.documentUrl
        } else if (response) {
          // Si la réponse est un objet mais sans propriété documentUrl, on utilise l'objet lui-même
          documentUrl = response
        }

        console.log("URL du document déterminée:", documentUrl)
        return documentUrl
      } catch (err) {
        setError("Erreur lors de la génération du document de mise à jour")
        console.error("Error generating update document:", err)
        throw err
      } finally {
        setLoading(false)
      }
    }

    // Update echelons
    const updateEchelons = async (employeeIds) => {
      setLoading(true)
      setError(null)
      try {
        console.log("Mise à jour des échelons pour les employés:", employeeIds)
        const response = await apiService.post(API_ENDPOINTS.EMPLOYEES.UPDATEECHLON, { employeIds: employeeIds })
        console.log("Réponse de mise à jour des échelons:", response)
        return response
      } catch (err) {
        setError("Erreur lors de la mise à jour des échelons")
        console.error("Error updating echelons:", err)
        throw err
      } finally {
        setLoading(false)
      }
    }

    // Vérifier si un employé spécifique a besoin d'une mise à jour
    const checkEmployeeNeedsUpdate = async (employeeId) => {
      setLoading(true)
      setError(null)
      try {
        console.log("Vérification si l'employé nécessite une mise à jour:", employeeId)
        const response = await apiService.get(API_ENDPOINTS.EMPLOYEES.NEED_UPDATE(employeeId))
        console.log("Réponse de vérification:", response)
        return response
      } catch (err) {
        setError("Erreur lors de la vérification de l'employé")
        console.error("Error checking if employee needs update:", err)
        throw err
      } finally {
        setLoading(false)
      }
    }

    // Obtenir les employés concernés par une mise à jour
    const getConcernedEmployees = async () => {
      setLoading(true)
      setError(null)
      try {
        console.log("Récupération des employés concernés par une mise à jour")
        const response = await apiService.get(API_ENDPOINTS.EMPLOYEES.CONCERNED)
        console.log("Employés concernés:", response)
        return response
      } catch (err) {
        setError("Erreur lors de la récupération des employés concernés")
        console.error("Error fetching concerned employees:", err)
        throw err
      } finally {
        setLoading(false)
      }
    }

    return {
      loading,
      error,
      fetchEmployeesNeedingUpdate,
      generateUpdateDocument,
      updateEchelons,
      checkEmployeeNeedsUpdate,
      getConcernedEmployees,
    }
  },
}

export default ProfPromotion