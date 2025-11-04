import axios from 'axios';

const adminApi = axios.create({
  baseURL: 'http://localhost:8087/api/eullafied',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // Accept 302 (FOUND) as a valid response status
  validateStatus: function (status) {
    return status >= 200 && status < 400; // Accept 2xx and 3xx status codes
  }
});

export async function getAllAdminsDocuments(token) {
  try {
    const response = await adminApi.get('http://localhost:8087/api/eullafied/document/admin', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Admin documents response:', response.status, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin documents:', error);
    throw error;
  }
}

// Download admin document
export async function downloadAdminDocument(documentId, token, fileName) {
  try {
    const response = await adminApi.get(`/download/${documentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob', // Important for file downloads
    });

    // Create blob link to download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName || `document_${documentId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    return response;
  } catch (error) {
    throw error;
  }
}
