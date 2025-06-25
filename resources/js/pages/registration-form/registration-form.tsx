import React from 'react';
import { FormProvider } from '../../context/FormContext';
import FormContainer from '../../components/registration-form/FormContainer';
import { Head } from '@inertiajs/react';

function RegistrationForm() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Head title="Formulario de Registro" />
      <FormProvider>
        <FormContainer />
      </FormProvider>
    </div>
  );
}

export default RegistrationForm;
