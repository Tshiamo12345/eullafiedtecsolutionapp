import axios from 'axios';

// You can set up a default instance with baseURL and common headers
const api = axios.create({
  baseURL: 'http://localhost:8087/api/eullafied/user', // Change to your API base URL
  timeout: 10000, // Optional: set request timeout
  headers: {
    'Content-Type': 'application/json',
  },
});


// GET request with token
export async function getDataWithToken(endpoint, token, params = {}) {
  try {
    const response = await api.get(endpoint, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


// POST request with token
export async function postDataWithToken(endpoint, data, token) {    
  try {
    const response = await api.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Upload file function
export async function uploadDocument(file, fileName, userId, token) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('userId', userId);

    const response = await api.post('http://localhost:8087/api/eullafied/document', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

// Get user documents
export async function getUserDocuments(userId, token) {
  try {
    const response = await api.get(`http://localhost:8087/api/eullafied/document/user?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Download user document
export async function downloadUserDocument(documentId, token, fileName) {
  
  
  try {
    const response = await api.get(`http://localhost:8087/api/eullafied/document/download`, {
      params: { documentId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob', // Important for file downloads
    });
    const safeFileName = fileName && fileName.endsWith('.pdf')
  ? fileName
  : (fileName ? fileName + '.pdf' : `document_${documentId}.pdf`);
    // Create blob link to download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', safeFileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    return response;
  } catch (error) {
    throw error;
  }
}
