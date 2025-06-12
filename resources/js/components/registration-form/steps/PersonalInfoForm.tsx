import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormContext } from '@/context/FormContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries, genders, maritalStatus, documentTypes } from '@/components/registration-form/data/mockData';

// Define validation schema for personal info
const personalInfoSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  full_name: z.string().min(3, { message: 'El nombre completo debe tener al menos 3 caracteres' }),
  country_id: z.string().min(1, { message: 'Por favor seleccione un país' }),
  gender_id: z.string().min(1, { message: 'Por favor seleccione un género' }),
  marital_status_id: z.string().min(1, { message: 'Por favor seleccione un estado civil' }),
  document_type_id: z.string().min(1, { message: 'Por favor seleccione un tipo de documento' }),
  document_number: z.string().min(3, { message: 'Número de documento inválido' }),
  birth_date: z.string().min(1, { message: 'Por favor ingrese su fecha de nacimiento' }),
  phone: z.string().min(7, { message: 'Por favor ingrese un número de teléfono válido' }),
  how_did_you_hear: z.string().min(1, { message: 'Por favor indique cómo se enteró de FUNVAL' }),
});

export const PersonalInfoForm: React.FC = () => {
  const { formData, updateFormSection } = useFormContext();

  // Initialize form with current data
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      ...formData.personalInfo,
      how_did_you_hear: formData.churchInfo.how_did_you_hear,
    },
  });

  // On form changes, update context
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      const { how_did_you_hear, ...personalInfo } = value;
      updateFormSection('personalInfo', personalInfo);
      updateFormSection('churchInfo', { ...formData.churchInfo, how_did_you_hear });
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateFormSection]);

  return (
    <Form {...form}>
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-xl font-semibold text-gray-800">Información Personal</h2>
        <p className="text-muted-foreground">Por favor ingrese sus datos personales.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Juan Pérez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="ejemplo@correo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un país" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.id}>
                        {country.name}
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
            name="gender_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un género" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genders.map((gender) => (
                      <SelectItem key={gender.id} value={gender.id}>
                        {gender.name}
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
            name="marital_status_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado Civil</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona estado civil" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {maritalStatus.map((status) => (
                      <SelectItem key={status.id} value={status.id}>
                        {status.name}
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
            name="birth_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="document_type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Documento</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
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
            name="document_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Documento</FormLabel>
                <FormControl>
                  <Input placeholder="12345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="+51 987654321" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="how_did_you_hear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿Cómo se enteró de FUNVAL?</FormLabel>
              <FormControl>
                <Input placeholder="A través de un amigo, redes sociales, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};
