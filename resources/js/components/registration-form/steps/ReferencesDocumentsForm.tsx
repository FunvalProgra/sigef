import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormContext } from '@/context/FormContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Paperclip } from 'lucide-react';

// Define validation schema for references and documents info
const referencesDocumentsSchema = z.object({
  family_phone_numbers: z.string().optional(),
  facebook_link: z.string()
    .refine(val => !val || val.includes('facebook.com'), {
      message: "Por favor ingrese un enlace válido de Facebook",
    })
    .optional(),
  utility_bill_url: z.string().optional(),
  formal_photo_url: z.string().optional(),
  health_declaration_url: z.string().optional(),
  mutual_agreement_url: z.string().optional(),
  work_commitment_url: z.string().optional(),
  data_consent_url: z.string().optional(),
  scholarship_agreement_url: z.string().optional(),
  mutual_agreement_accepted: z.boolean().default(false),
  work_commitment_accepted: z.boolean().default(false),
  data_consent_accepted: z.boolean().default(false),
  scholarship_agreement_accepted: z.boolean().default(false),
});

const documentDescriptions = {
  mutual_agreement: {
    title: "Acuerdo Mutuo",
    description: "Este documento establece los términos y condiciones del acuerdo entre el estudiante y FUNVAL, incluyendo responsabilidades, expectativas y compromisos mutuos durante el programa de formación."
  },
  work_commitment: {
    title: "Compromiso de Trabajo",
    description: "Al aceptar este compromiso, usted se compromete a mantener los estándares profesionales, cumplir con las asignaciones y participar activamente en el programa de formación laboral."
  },
  data_consent: {
    title: "Consentimiento de Datos",
    description: "Este documento detalla cómo se recopilarán, almacenarán y utilizarán sus datos personales, en cumplimiento con las leyes de protección de datos aplicables."
  },
  scholarship_agreement: {
    title: "Acuerdo de Beca",
    description: "Este acuerdo especifica los términos y condiciones de la beca, incluyendo requisitos académicos, compromisos de asistencia y condiciones para mantener el beneficio."
  }
};

export const ReferencesDocumentsForm: React.FC = () => {
  const { formData, updateFormSection } = useFormContext();
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  // Initialize form with current data
  const form = useForm({
    resolver: zodResolver(referencesDocumentsSchema),
    defaultValues: formData.referencesDocuments,
  });

  // On form changes, update context
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      updateFormSection('referencesDocuments', value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateFormSection]);

  // Mock file upload handler
  const handleFileChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you would upload this file to your server/cloud storage
      // and then update the form with the returned URL
      const mockUrl = URL.createObjectURL(file);
      form.setValue(fieldName as any, mockUrl);
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-xl font-semibold text-gray-800">Referencias y Documentos</h2>
        <p className="text-muted-foreground">Por favor proporcione referencias y suba los documentos requeridos.</p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Referencias</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="family_phone_numbers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfonos Familiares</FormLabel>
                    <FormControl>
                      <Input placeholder="+51 987654321, +51 123456789" {...field} />
                    </FormControl>
                    <FormDescription>
                      Separe múltiples números con comas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facebook_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enlace de Facebook</FormLabel>
                    <FormControl>
                      <Input placeholder="https://facebook.com/usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Documentos</h3>
            <div className="grid grid-cols-1 gap-6">
              {/* Basic Documents */}
              {[
                { name: 'utility_bill_url', label: 'Recibo de Servicios', description: 'Suba un recibo de luz, agua o gas reciente' },
                { name: 'formal_photo_url', label: 'Foto Formal', description: 'Suba una fotografía formal reciente' },
                { name: 'health_declaration_url', label: 'Declaración de Salud', description: 'Documento de declaración de salud firmado' },
              ].map((doc) => (
                <FormItem key={doc.name} className="flex flex-col space-y-3">
                  <FormLabel>{doc.label}</FormLabel>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor={doc.name}
                      className="flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                    >
                      <Paperclip className="h-4 w-4" />
                      <span>Seleccionar archivo</span>
                      <input
                        type="file"
                        id={doc.name}
                        className="sr-only"
                        onChange={(e) => handleFileChange(doc.name, e)}
                      />
                    </label>
                    {form.watch(doc.name as any) && (
                      <span className="text-sm text-green-600">
                        Archivo seleccionado
                      </span>
                    )}
                  </div>
                  <FormDescription>
                    {doc.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              ))}

              {/* Agreement Documents with Modals */}
              {Object.entries(documentDescriptions).map(([key, doc]) => (
                <FormItem key={key} className="flex flex-col space-y-3">
                  <FormLabel>{doc.title}</FormLabel>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveDialog(key)}
                    >
                      Ver detalles y aceptar
                    </Button>
                    {form.watch(`${key}_accepted` as any) && (
                      <span className="text-sm text-green-600">
                        Aceptado
                      </span>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              ))}

              {/* Dialogs for each agreement */}
              {Object.entries(documentDescriptions).map(([key, doc]) => (
                <Dialog key={key} open={activeDialog === key} onOpenChange={() => setActiveDialog(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{doc.title}</DialogTitle>
                      <DialogDescription className="pt-4">
                        {doc.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2 pt-4">
                      <Checkbox
                        id={`${key}_accepted`}
                        checked={form.watch(`${key}_accepted` as any)}
                        onCheckedChange={(checked) => {
                          form.setValue(`${key}_accepted` as any, checked);
                          if (checked) {
                            form.setValue(`${key}_url` as any, 'accepted');
                          } else {
                            form.setValue(`${key}_url` as any, '');
                          }
                        }}
                      />
                      <label
                        htmlFor={`${key}_accepted`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        He leído y acepto los términos del documento
                      </label>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setActiveDialog(null)}>Cerrar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};
