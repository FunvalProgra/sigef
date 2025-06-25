import React, { useEffect, useState } from 'react';
import { GraduationCap, User, Church, UsersRound, FileText, ArrowLeft, ArrowRight, CheckCircle, Sun, Moon } from 'lucide-react';
import { useFormContext } from '@/context/FormContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PersonalInfoForm } from '@/components/registration-form/steps/PersonalInfoForm';
import { ChurchInfoForm } from '@/components/registration-form/steps/ChurchInfoForm';
import { AcademicEmploymentForm } from '@/components/registration-form/steps/AcademicEmploymentForm';
import { FamilyInfoForm } from '@/components/registration-form/steps/FamilyInfoForm';
import { ReferencesDocumentsForm } from '@/components/registration-form/steps/ReferencesDocumentsForm';
import FormSummary from '@/components/registration-form/steps/FormSummary';

const FormContainer: React.FC = () => {
  const { currentStep, totalSteps, nextStep, prevStep, goToStep, formData } = useFormContext();
  const [isDark, setIsDark] = useState(() =>
    typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  // Calculate progress percentage
  const progress = (currentStep / totalSteps) * 100;

  // Define steps with their components and icons
  const steps = [
    { id: 1, title: "Información Personal", component: <PersonalInfoForm />, icon: <User className="h-5 w-5" /> },
    { id: 2, title: "Información de la Iglesia", component: <ChurchInfoForm />, icon: <Church className="h-5 w-5" /> },
    { id: 3, title: "Académico y Empleo", component: <AcademicEmploymentForm />, icon: <GraduationCap className="h-5 w-5" /> },
    { id: 4, title: "Información Familiar", component: <FamilyInfoForm />, icon: <UsersRound className="h-5 w-5" /> },
    { id: 5, title: "Referencias y Documentos", component: <ReferencesDocumentsForm />, icon: <FileText className="h-5 w-5" /> },
    { id: 6, title: "Resumen", component: <FormSummary />, icon: <CheckCircle className="h-5 w-5" /> }
  ];

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setIsDark(false);
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      setIsDark(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    // Mantener preferencia al recargar
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  return (
    <div className={`form-theme min-h-screen py-10 px-4 sm:px-6 lg:px-8${isDark ? ' dark' : ''}`}>
      <div className="max-w-3xl mx-auto">
        {/* Botón de alternancia de modo */}
        <div className="flex justify-end mb-4 fixed bottom-4 left-4 z-10">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-muted hover:bg-muted-foreground/20 text-foreground dark:bg-muted dark:hover:bg-muted-foreground/20 dark:text-foreground transition-colors"
            aria-label="Alternar modo claro/oscuro"
            type="button"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        <Card className="form-card overflow-hidden border-0 shadow-xl">
          <CardHeader className="form-header">
            <div className="flex justify-between items-center py-2">
              <CardTitle className="text-xl sm:text-2xl font-bold">
                {currentStep === totalSteps + 1 ? "Resumen de Datos" : steps[currentStep - 1].title}
              </CardTitle>
              <div className="flex items-center">
                <span className="text-md font-medium mr-2">
                  {currentStep <= totalSteps ? `Paso ${currentStep} de ${totalSteps}` : "Completado"}
                </span>
                {currentStep > totalSteps && <CheckCircle className="h-5 w-5" />}
              </div>
            </div>
          </CardHeader>

          {/* Progress bar */}
          <div className="px-6 pt-4 ">
            <Progress value={progress} className="h-2 form-border bg-muted" />
          </div>

          {/* Step indicators */}
          <div className="flex justify-center px-6 pt-4 ">
            {steps.map((step) => {
              let indicatorClass = "form-step-indicator inactive";
              if (step.id < currentStep) indicatorClass = "form-step-indicator completed";
              else if (step.id === currentStep) indicatorClass = "form-step-indicator active shadow-lg ring-4";
              return (
                <div
                  key={step.id}
                  onClick={() => currentStep > step.id && goToStep(step.id)}
                  className={`flex mx-4 flex-col items-center cursor-pointer transition-all duration-300`}
                >
                  <div
                    className={`step-indicator flex items-center justify-center w-10 h-10 rounded-full mb-2 transition-all ${indicatorClass}`}
                  >
                    {step.id < currentStep ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className="text-xs text-center hidden sm:block">{step.title}</span>
                </div>
              );
            })}
          </div>

          <CardContent className="p-6 relative min-h-[400px]">
            {steps[currentStep - 1]?.component}
          </CardContent>

          <CardFooter className="p-6 pt-0 flex justify-between">
            {currentStep > 1 && currentStep <= totalSteps + 1 && (
              <Button
                onClick={prevStep}
                variant="outline"
                className="form-button flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
            )}
            {currentStep === 1 && <div />}

            {currentStep < totalSteps && (
              <Button
                onClick={nextStep}
                className="form-button flex items-center ml-auto"
              >
                Siguiente <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}

            {currentStep === totalSteps  && (
              <Button
                onClick={() => {
                  // Imprime los datos del formulario en consola como JSON
                  console.log(JSON.stringify(formData, null, 2));
                  alert('Formulario enviado con éxito!');
                }}
                className="form-button ml-auto flex items-center"
              >
                Enviar formulario <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default FormContainer;
