import { API_ENDPOINTS, apiService } from "../../config/appconfig"

// Service for employee data operations
const EmployeeService = {
  // Get all employees
  getAllEmployees: async () => {
    try {
      const response = await apiService.get(API_ENDPOINTS.EMPLOYEES.GET_ALL)
      return response
    } catch (error) {
      console.error("Error fetching employees:", error)
      throw error
    }
  },

  // Add a new employee
  addEmployee: async (employeeData) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.EMPLOYEES.ADD, employeeData)
      return response
    } catch (error) {
      console.error("Error adding employee:", error)
      throw error
    }
  },

  // Update an existing employee
  updateEmployee: async (employeeData) => {
    try {
      const response = await apiService.put(API_ENDPOINTS.EMPLOYEES.UPDATE, employeeData)
      return response
    } catch (error) {
      console.error("Error updating employee:", error)
      throw error
    }
  },

  // Delete an employee
  deleteEmployee: async (employeeId) => {
    try {
      const response = await apiService.delete(API_ENDPOINTS.EMPLOYEES.DELETE, { id: employeeId })
      return response
    } catch (error) {
      console.error("Error deleting employee:", error)
      throw error
    }
  },

  filterEmployees: async (filterCriteria) => {
  try {
    console.log("Critères de filtrage envoyés:", filterCriteria); // Ajoutez ceci
    
    const response = await apiService.post(API_ENDPOINTS.EMPLOYEES.FILTER, filterCriteria)
    
    console.log("Réponse du serveur:", response); // Ajoutez ceci
    
    return response.data || []
  } catch (error) {
    console.error("Détails de l'erreur:", error.message, error.stack); // Ajoutez ceci
    console.error("Error filtering employees:", error)
    throw error
  }
},

  // Map backend employee data to frontend format
  mapEmployeeData: (backendEmployee) => {
    return {
      id: backendEmployee.id,
      nom: backendEmployee.nom,
      prenom: backendEmployee.prenom,
      email: backendEmployee.email,
      telephone: backendEmployee.telephone,
      adresse: backendEmployee.adresse,
      dateNaissance: backendEmployee.dateNaissance,
      departement: backendEmployee.departement,
      poste: backendEmployee.poste,
      categorie: backendEmployee.idCategorie, // Map to frontend field
      niveauGrade: backendEmployee.idGrade, // Map to frontend field
      echelon: backendEmployee.idEchlant, // Map to frontend field
      dateDeRecrutement: backendEmployee.dateDeRecrutement,
      dateDeGrade: backendEmployee.dateDeGrade,
      AncienneteEchelon: backendEmployee.AncienneteEchelon,
      typeContrat: backendEmployee.typeContrat,
      statut: backendEmployee.statut,
      // Add any additional fields needed by the frontend
    }
  },

  // Map frontend employee data to backend format for saving
  mapEmployeeDataForBackend: (frontendEmployee) => {
    return {
      id: frontendEmployee.id,
      nom: frontendEmployee.nom,
      prenom: frontendEmployee.prenom,
      email: frontendEmployee.email,
      telephone: frontendEmployee.telephone,
      adresse: frontendEmployee.adresse,
      dateNaissance: frontendEmployee.dateNaissance,
      departement: frontendEmployee.departement,
      poste: frontendEmployee.poste,
      dateDeRecrutement: frontendEmployee.dateDeRecrutement,
      dateDeGrade: frontendEmployee.dateDeGrade,
      AncienneteEchelon: frontendEmployee.AncienneteEchelon,
      typeContrat: frontendEmployee.typeContrat,
      statut: frontendEmployee.statut,
      idCategorie: frontendEmployee.categorie, // Map from frontend field
      idGrade: frontendEmployee.niveauGrade, // Map from frontend field
      idEchlant: frontendEmployee.echelon, // Map from frontend field
      // Add any additional fields needed by the backend
    }
  },
}

export default EmployeeService
