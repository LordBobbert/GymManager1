import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAssessmentsForClient, createAssessment, updateAssessment, deleteAssessment } from '../api/assessmentApi';

interface Assessment {
    id: number;
    type: string;
    status: string;
    date: string;
    // Add other assessment fields as needed
}

interface AssessmentContextProps {
    assessments: Assessment[];
    loadAssessments: (clientId: number) => Promise<void>;
    addAssessment: (clientId: number, assessmentData: any) => Promise<void>;
    editAssessment: (assessmentId: number, assessmentData: any) => Promise<void>;
    removeAssessment: (assessmentId: number) => Promise<void>;
}

export const AssessmentContext = createContext<any>(null);


export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [assessments, setAssessments] = useState<Assessment[]>([]);

    const loadAssessments = async (clientId: number) => {
        const data = await fetchAssessmentsForClient(clientId);
        setAssessments(data);
    };

    const addAssessment = async (clientId: number, assessmentData: any) => {
        const newAssessment = await createAssessment(clientId, assessmentData);
        setAssessments([...assessments, newAssessment]);
    };

    const editAssessment = async (assessmentId: number, assessmentData: any) => {
        const updatedAssessment = await updateAssessment(assessmentId, assessmentData);
        setAssessments(assessments.map((assessment) =>
            assessment.id === assessmentId ? updatedAssessment : assessment
        ));
    };

    const removeAssessment = async (assessmentId: number) => {
        await deleteAssessment(assessmentId);
        setAssessments(assessments.filter((assessment) => assessment.id !== assessmentId));
    };

    return <AssessmentContext.Provider value={{ assessments, loadAssessments, addAssessment, editAssessment, removeAssessment }}>{children}</AssessmentContext.Provider>;}

export const useAssessment = () => {
    const context = useContext(AssessmentContext);
    if (!context) {
        throw new Error('useAssessment must be used within an AssessmentProvider');
    }
    return context;
};
