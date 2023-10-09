import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';



export default function Previews({ onFilesUploaded }) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      const updatedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(updatedFiles);

      // Llama a la función onFilesUploaded y pasa la lista de ficheros
      if (onFilesUploaded) {
        onFilesUploaded(updatedFiles);
      }
    },
  });

  const thumbs = files.map((file) => (
    
    <div key={file.name}>
      <div className='flex item-center'>
        <img
          src={file.preview}
          className=' mx-2 my-auto'
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Asegúrate de revocar las URL de los datos para evitar fugas de memoria
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className='mx-4 p-5 bg-slate-100 border-2 rounded-xl'
      >
        <input {...getInputProps()} />
        <p className='text-center font-bold'>
          Arrastra y suelta algunos archivos aquí o haz clic para seleccionar
          archivos
        </p>
      </div>
      <aside className='w-11/12 mt-5 grid grid-cols-8 gap-4 mx-auto'>{thumbs}</aside>
    </section>
  );
}
