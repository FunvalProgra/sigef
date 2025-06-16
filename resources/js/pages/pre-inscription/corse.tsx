import { useState } from 'react';

const courses = [
    'Inglés para Call Center',
    'Interpretación de servicios especializados',
    'Ciberseguridad',
    'Soldadura industrial',
    'Reparación de celulares',
    'Técnico logístico & SAP',
    'Asistentes contables bilingües',
    'Asesor comercial',
    'Asesor financiero',
    'Mecánica de motocicletas',
    'Aire acondicionado y Línea Blanca',
    'Auxiliar de farmacia',
    'Carpintería en aluminio y Melamina',
    'Conectividad y redes',
    'Marketing digital',
    'Desarrollador Web FrontEnd',
];

const Corse = () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-10 text-black">
            {/* Encabezado */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-blue-900">FUNVAL</h1>
                <div className="mt-2 text-5xl text-blue-700">🧭</div>
            </div>

            {/* Tarjeta principal */}
            <div className="w-full max-w-4xl rounded-xl bg-white shadow-lg">
                {/* Header azul */}
                <div className="rounded-t-xl bg-blue-800 py-4 text-center text-xl font-semibold text-white">Selecciona tu Curso de Interés</div>

                {/* Cursos */}
                <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
                    {courses.map((course, index) => (
                        <button
                            key={index}
                            onClick={() => setSelected(course)}
                            className={`w-full rounded border px-4 py-3 text-left transition duration-200 ${
                                selected === course ? 'border-blue-500 bg-blue-100 font-semibold text-blue-700' : 'border-gray-300 hover:bg-blue-50'
                            }`}
                        >
                            {course}
                        </button>
                    ))}
                </div>

                {/* Botón siguiente */}
                <div className="flex justify-end px-6 pb-6">
                    <button className="flex items-center gap-2 rounded bg-blue-700 px-6 py-2 text-white hover:bg-blue-800">
                        Siguiente <span className="text-xl">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Corse;
