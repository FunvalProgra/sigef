import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormContext } from '@/context/FormContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { academicDegrees, deviceTypes, englishLevels } from '@/components/registration-form/data/mockData';

// Define validation schema for academic and employment info
const academicEmploymentSchema = z.object({
  academic_degree: z.string().min(1, { message: 'Por favor seleccione un grado académico' }),
  has_internet: z.boolean().default(false),
  device_type: z.string().min(1, { message: 'Por favor seleccione un tipo de dispositivo' }),
  has_driver_license: z.boolean().default(false),
  english_connect_level: z.string().min(1, { message: 'Por favor seleccione un nivel' }),
  attended_funval_before: z.boolean().default(false),
  last_grade: z.string().optional(),
  company_name: z.string().optional(),
  job_position: z.string().optional(),
  current_salary: z.string()
    .refine(val => !val || /^\d+(\.\d{1,2})?$/.test(val), {
      message: "Ingrese un valor válido para el salario",
    })
    .optional(),
  employment_history: z.string().optional(),
  start_date: z.string().optional(),
  current_situation: z.string().optional(),
});

export const AcademicEmploymentForm: React.FC = () => {
  const { formData, updateFormSection } = useFormContext();

  // Initialize form with current data
  const form = useForm({
    resolver: zodResolver(academicEmploymentSchema),
    defaultValues: formData.academicEmployment,
  });

  // On form changes, update context
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      updateFormSection('academicEmployment', value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateFormSection]);

  return (
    <Form {...form}>
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-xl font-semibold text-gray-800">Información Académica y Laboral</h2>
        <p className="text-muted-foreground">Por favor proporcione su información académica y laboral.</p>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Información Académica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="academic_degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grado Académico</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione grado académico" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {academicDegrees.map((degree) => (
                          <SelectItem key={degree.id} value={degree.id}>
                            {degree.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Último Grado Cursado</FormLabel>
                    <FormControl>
                      <Input placeholder="Ejemplo: 3er Semestre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="english_connect_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nivel de Inglés</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione nivel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {englishLevels.map((level) => (
                          <SelectItem key={level.id} value={level.id}>
                            {level.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="device_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Dispositivo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione dispositivo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {deviceTypes.map((device) => (
                          <SelectItem key={device.id} value={device.id}>
                            {device.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col space-y-4 mt-4">
              <FormField
                control={form.control}
                name="has_internet"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Tiene acceso a Internet</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="has_driver_license"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Posee licencia de conducir</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attended_funval_before"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Ha asistido a FUNVAL anteriormente</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Información Laboral</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Empresa S.A." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="job_position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Puesto de Trabajo</FormLabel>
                    <FormControl>
                      <Input placeholder="Desarrollador, Analista, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Inicio</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="current_salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salario Actual</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <FormField
                control={form.control}
                name="employment_history"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historial Laboral</FormLabel>
                    <FormControl>
                      <Input placeholder="Breve descripción de su experiencia laboral" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <FormField
                control={form.control}
                name="current_situation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Situación Actual</FormLabel>
                    <FormControl>
                      <Input placeholder="Describa su situación laboral actual" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};
