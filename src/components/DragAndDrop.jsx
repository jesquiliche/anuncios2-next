'use client'
import React, { useState } from 'react';

function DragAndDropImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      // Verificar que el archivo es una imagen (opcional)
      if (file.type.startsWith('image/')) {
        setSelectedImage(URL.createObjectURL(file));
      } else {
        alert('Por favor, selecciona una imagen válida.');
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        width: '300px',
        height: '300px',
        border: '2px dashed #ccc',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      {selectedImage ? (
        <img
          src={selectedImage}
          alt="Imagen seleccionada"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      ) : (
        <p>Arrastra y suelta una imagen aquí</p>
      )}
    </div>
  );
}

export default DragAndDropImageUpload;
