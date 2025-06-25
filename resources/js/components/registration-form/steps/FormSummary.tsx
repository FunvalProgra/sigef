import React from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from '@/context/FormContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { countries, genders, maritalStatus, documentTypes, categories, wards, academicDegrees, deviceTypes, englishLevels, donationTypes } from '@/components/registration-form/data/mockData';

// Helper function to find name by id in an array of objects
const findNameById = (arr: any[], id: string) => {
  const item = arr.find((item) => item.id === id);
  return item ? item.name : 'No seleccionado';
};

const FormSummary: React.FC = () => {
  const { formData } = useFormContext();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-center text-gray-800">Resumen de Información</h2>
      <p className="text-center text-muted-foreground mb-6">Por favor revise su información antes de enviar el formulario.</p>

      <motion.div variants={itemVariants} className="space-y-4">
        <Card>
          <CardHeader className="bg-primary/10 pb-2">
            <CardTitle className="text-primary text-md">Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div><span className="font-medium">Nombre:</span> {formData.personalInfo.full_name}</div>
            <div><span className="font-medium">Email:</span> {formData.personalInfo.email}</div>
            <div><span className="font-medium">País:</span> {findNameById(countries, formData.personalInfo.country_id)}</div>
            <div><span className="font-medium">Género:</span> {findNameById(genders, formData.personalInfo.gender_id)}</div>
            <div><span className="font-medium">Estado Civil:</span> {findNameById(maritalStatus, formData.personalInfo.marital_status_id)}</div>
            <div><span className="font-medium">Tipo de Documento:</span> {findNameById(documentTypes, formData.personalInfo.document_type_id)}</div>
            <div><span className="font-medium">Número de Documento:</span> {formData.personalInfo.document_number}</div>
            <div><span className="font-medium">Fecha de Nacimiento:</span> {formData.personalInfo.birth_date}</div>
            <div><span className="font-medium">Teléfono:</span> {formData.personalInfo.phone}</div>
            <div><span className="font-medium">Categoría:</span> {findNameById(categories, formData.personalInfo.category_id)}</div>
            <div><span className="font-medium">Miembro Activo:</span> {formData.personalInfo.is_active_member ? 'Sí' : 'No'}</div>
            {formData.personalInfo.is_active_member && (
              <div><span className="font-medium">Barrio:</span> {findNameById(wards, formData.personalInfo.ward_id)}</div>
            )}
            <div><span className="font-medium">Nombre del Reclutador:</span> {formData.personalInfo.recruiter_name}</div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <Card>
          <CardHeader className="bg-primary/10 pb-2">
            <CardTitle className="text-primary text-md">Información de la Iglesia</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div><span className="font-medium">ID de Membresía:</span> {formData.churchInfo.membership_id}</div>
            <div><span className="font-medium">Maestro de Instituto:</span> {formData.churchInfo.is_institute_teacher ? 'Sí' : 'No'}</div>
            <div><span className="font-medium">Nombre de la Misión:</span> {formData.churchInfo.mission_name}</div>
            <div><span className="font-medium">Año de fin de misión:</span> {formData.churchInfo.mission_end_year}</div>
            <div><span className="font-medium">Sellado en el Templo:</span> {formData.churchInfo.temple_sealed ? 'Sí' : 'No'}</div>
            <div><span className="font-medium">Llamamiento:</span> {formData.churchInfo.calling}</div>
            <div><span className="font-medium">Estaca/Distrito/Misión:</span> {formData.churchInfo.stake_district_mission}</div>
            <div className="col-span-2"><span className="font-medium">¿Cómo se enteró de FUNVAL?:</span> {formData.churchInfo.how_did_you_hear}</div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <Card>
          <CardHeader className="bg-primary/10 pb-2">
            <CardTitle className="text-primary text-md">Información Académica y Laboral</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div><span className="font-medium">Grado Académico:</span> {findNameById(academicDegrees, formData.academicEmployment.academic_degree)}</div>
            <div><span className="font-medium">Acceso a Internet:</span> {formData.academicEmployment.has_internet ? 'Sí' : 'No'}</div>
            <div><span className="font-medium">Tipo de Dispositivo:</span> {findNameById(deviceTypes, formData.academicEmployment.device_type)}</div>
            <div><span className="font-medium">Licencia de Conducir:</span> {formData.academicEmployment.has_driver_license ? 'Sí' : 'No'}</div>
            <div><span className="font-medium">Nivel de Inglés:</span> {findNameById(englishLevels, formData.academicEmployment.english_connect_level)}</div>
            <div><span className="font-medium">Ha asistido a FUNVAL antes:</span> {formData.academicEmployment.attended_funval_before ? 'Sí' : 'No'}</div>
            <div><span className="font-medium">Último Grado Cursado:</span> {formData.academicEmployment.last_grade}</div>
            <div><span className="font-medium">Horas de Servicio:</span> {formData.academicEmployment.service_hours}</div>
            <div><span className="font-medium">Nombre de la Empresa:</span> {formData.academicEmployment.company_name}</div>
            <div><span className="font-medium">Puesto de Trabajo:</span> {formData.academicEmployment.job_position}</div>
            <div><span className="font-medium">Salario Antes de FUNVAL:</span> {formData.academicEmployment.pre_funval_salary}</div>
            <div><span className="font-medium">Salario Actual:</span> {formData.academicEmployment.current_salary}</div>
            <div><span className="font-medium">Fecha de Inicio:</span> {formData.academicEmployment.start_date}</div>
            <div className="col-span-2"><span className="font-medium">Historial Laboral:</span> {formData.academicEmployment.employment_history}</div>
            <div className="col-span-2"><span className="font-medium">Situación Actual:</span> {formData.academicEmployment.current_situation}</div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <Card>
          <CardHeader className="bg-primary/10 pb-2">
            <CardTitle className="text-primary text-md">Información Familiar</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div><span className="font-medium">Número de Hijos:</span> {formData.familyInfo.children_count}</div>
            <div><span className="font-medium">Miembros del Hogar:</span> {formData.familyInfo.household_members}</div>
            {/* <div><span className="font-medium">Recibe Donación:</span> {findNameById(donationTypes, formData.familyInfo.receives_donation)}</div>
            {formData.familyInfo.receives_donation !== 'none' && (
              <div><span className="font-medium">Monto de Bonificación Familiar:</span> {formData.familyInfo.family_bonus_amount}</div>
            )} */}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <Card>
          <CardHeader className="bg-primary/10 pb-2">
            <CardTitle className="text-primary text-md">Referencias y Documentos</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div><span className="font-medium">Teléfonos Familiares:</span> {formData.referencesDocuments.family_phone_numbers}</div>
            <div><span className="font-medium">Enlace de Facebook:</span> {formData.referencesDocuments.facebook_link}</div>
            <div className="col-span-2 mt-2">
              <span className="font-medium block mb-2">Documentos:</span>
              <ul className="list-disc list-inside space-y-1 pl-2">
                {formData.referencesDocuments.utility_bill_url && (
                  <li>Recibo de Servicios <span className="text-green-600">✓</span></li>
                )}
                {formData.referencesDocuments.formal_photo_url && (
                  <li>Foto Formal <span className="text-green-600">✓</span></li>
                )}
                {formData.referencesDocuments.health_declaration_url && (
                  <li>Declaración de Salud <span className="text-green-600">✓</span></li>
                )}
                {formData.referencesDocuments.mutual_agreement_url && (
                  <li>Acuerdo Mutuo <span className="text-green-600">✓</span></li>
                )}
                {formData.referencesDocuments.work_commitment_url && (
                  <li>Compromiso de Trabajo <span className="text-green-600">✓</span></li>
                )}
                {formData.referencesDocuments.data_consent_url && (
                  <li>Consentimiento de Datos <span className="text-green-600">✓</span></li>
                )}
                {formData.referencesDocuments.scholarship_agreement_url && (
                  <li>Acuerdo de Beca <span className="text-green-600">✓</span></li>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default FormSummary;
