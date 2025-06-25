import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the structure of our form data based on the database schema
export interface FormDataType {
  // Personal Information (users table)
  personalInfo: {
    email: string;
    full_name: string;
    country_id: string;
    gender_id: string;
    marital_status_id: string;
    document_type_id: string;
    document_number: string;
    birth_date: string;
    phone: string;
    is_active_member: boolean;
    category_id: string;
    ward_id: string;
    recruiter_name: string; // <-- MOVIDO aquí
  };

  // Church Information (missions, recruitment, church_info tables)
  churchInfo: {
    membership_id: string;
    is_institute_teacher: boolean;
    mission_name: string;
    mission_end_year: string;
    temple_sealed: boolean;
    calling: string;
    stake_district_mission: string;
    how_did_you_hear: string;
    // recruiter_name eliminado
  };

  // Academic & Employment (academic_info, employment tables)
  academicEmployment: {
    academic_degree: string;
    has_internet: boolean;
    device_type: string;
    has_driver_license: boolean;
    english_connect_level: string;
    attended_funval_before: boolean;
    last_grade: string;
    service_hours: string;
    company_name: string;
    job_position: string;
    pre_funval_salary: string;
    current_salary: string;
    employment_history: string;
    start_date: string;
    current_situation: string;
  };

  // Family Information (family_info table)
  familyInfo: {
    children_count: string;
    household_members: string;
    receives_donation: string;
    family_bonus_amount: string;
  };

  // References & Documents (references_social, documents tables)
  referencesDocuments: {
    family_phone_numbers: string;
    facebook_link: string;
    utility_bill_url: string;
    formal_photo_url: string;
    health_declaration_url: string;
    mutual_agreement_url: string;
    work_commitment_url: string;
    data_consent_url: string;
    scholarship_agreement_url: string;
  };
}

// Initial state for the form
const initialFormState: FormDataType = {
  // Personal Information
  personalInfo: {
    email: '',
    full_name: '',
    country_id: '',
    gender_id: '',
    marital_status_id: '',
    document_type_id: '',
    document_number: '',
    birth_date: '',
    phone: '',
    is_active_member: false,
    category_id: '',
    ward_id: '',
    recruiter_name: '', // <-- MOVIDO aquí
  },

  // Church Information
  churchInfo: {
    membership_id: '',
    is_institute_teacher: false,
    mission_name: '',
    mission_end_year: '',
    temple_sealed: false,
    calling: '',
    stake_district_mission: '',
    how_did_you_hear: '',
    // recruiter_name eliminado
  },

  // Academic & Employment
  academicEmployment: {
    academic_degree: '',
    has_internet: false,
    device_type: '',
    has_driver_license: false,
    english_connect_level: '',
    attended_funval_before: false,
    last_grade: '',
    service_hours: '',
    company_name: '',
    job_position: '',
    pre_funval_salary: '',
    current_salary: '',
    employment_history: '',
    start_date: '',
    current_situation: '',
  },

  // Family Information
  familyInfo: {
    children_count: '',
    household_members: '',
    receives_donation: 'none',
    family_bonus_amount: '',
  },

  // References & Documents
  referencesDocuments: {
    family_phone_numbers: '',
    facebook_link: '',
    utility_bill_url: '',
    formal_photo_url: '',
    health_declaration_url: '',
    mutual_agreement_url: '',
    work_commitment_url: '',
    data_consent_url: '',
    scholarship_agreement_url: '',
  }
};

// Define context type
interface FormContextType {
  formData: FormDataType;
  currentStep: number;
  totalSteps: number;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updateFormSection: (section: keyof FormDataType, data: any) => void;
}

// Create context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Provider component
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormDataType>(initialFormState);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6; // Mantén este valor para los pasos de formulario, pero permite avanzar al resumen

  const nextStep = () => {
    if (currentStep < totalSteps + 1) { // Permite avanzar hasta el resumen
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps + 1) { // Permite ir al resumen
      setCurrentStep(step);
    }
  };

  const updateFormSection = (section: keyof FormDataType, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        currentStep,
        totalSteps,
        setFormData,
        nextStep,
        prevStep,
        goToStep,
        updateFormSection,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
