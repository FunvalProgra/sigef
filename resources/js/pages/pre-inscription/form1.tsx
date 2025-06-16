const Form1 = () => {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-10 text-black">
            <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-bold text-blue-800">Pre-Inscripción</h2>

                <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Fila 1 */}
                    <div>
                        <label className="mb-1 block font-medium">Nombre completo</label>
                        <input type="text" className="w-full rounded border px-3 py-2" />
                    </div>
                    <div>
                        <label className="mb-1 block font-medium">Número telefónico</label>
                        <input type="text" className="w-full rounded border px-3 py-2" />
                    </div>

                    {/* Fila 2 */}
                    <div>
                        <label className="mb-1 block font-medium">Número telefónico alternativo</label>
                        <input type="text" className="w-full rounded border px-3 py-2" />
                    </div>
                    <div>
                        <label className="mb-1 block font-medium">Edad</label>
                        <input type="number" className="w-full rounded border px-3 py-2" />
                    </div>

                    {/* Fila 3 */}
                    <div>
                        <label className="mb-1 block font-medium">Estado civil </label>
                        <select className="w-full rounded border px-3 py-2">
                            <option>Selecciona una opción</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block font-medium">Género </label>
                        <select className="w-full rounded border px-3 py-2">
                            <option>Selecciona una opción</option>
                        </select>
                    </div>

                    {/* Fila 4 */}
                    <div>
                        <label className="mb-1 block font-medium">Estado, Departamento o Provincia</label>
                        <input type="text" className="w-full rounded border px-3 py-2" />
                    </div>
                    <div>
                        <label className="mb-1 block font-medium">Ciudad </label>
                        <input type="text" className="w-full rounded border px-3 py-2" />
                    </div>

                    {/* Fila 5 */}
                    <div>
                        <label className="mb-1 block font-medium">País </label>
                        <select className="w-full rounded border px-3 py-2">
                            <option>Selecciona un país</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block font-medium">Estaca/Distrito </label>
                        <select className="w-full rounded border px-3 py-2">
                            <option>Primero selecciona un país</option>
                        </select>
                    </div>

                    {/* Fila 6 */}
                    <div>
                        <label className="mb-1 block font-medium">Barrio/Rama</label>
                        <select className="w-full rounded border px-3 py-2">
                            <option>Primero selecciona una estaca/distrito</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block font-medium">¿Sirvió una misión de tiempo completo? </label>
                        <select className="w-full rounded border px-3 py-2">
                            <option>Selecciona una opción</option>
                        </select>
                    </div>
                </form>

                {/* Botones */}
                <div className="mt-6 flex justify-between">
                    <button className="rounded border border-gray-400 bg-white px-6 py-2 text-gray-700 hover:bg-gray-100">Volver</button>
                    <button className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">Continuar</button>
                </div>
            </div>
        </div>
    );
};

export default Form1;
