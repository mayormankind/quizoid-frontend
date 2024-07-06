import axios from 'axios';

const API_URL = 'http://localhost:3000/api/exams';

interface ExamData {
    instruction: string;
    questions: any[];
}

export const createExam = async (examData: ExamData) => {
    try {
        const response = await axios.post(API_URL, examData, {
            headers: { 'x-auth-token': localStorage.getItem('token') as string },
        });
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const getExams = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: { 'x-auth-token': localStorage.getItem('token') as string },
        });
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const getExamsByLecturerID = async (lecturerID:string) => {
    try {
      const response = await axios.get(`${API_URL}/${lecturerID}`);
      return response.data;
    }
    catch (error: any) {
        throw error.response.data;
    }
};

export const getExamById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: { 'x-auth-token': localStorage.getItem('token') as string },
        });
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const updateExam = async (id: string, examData: ExamData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, examData, {
            headers: { 'x-auth-token': localStorage.getItem('token') as string },
        });
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};


export const deleteExam = async (courseCode: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${courseCode}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete exam');
  }
};

export const checkExam = async (courseCode:string) => {
  const response = await axios.get(`${API_URL}/check/${courseCode}`);
  return response;
};
