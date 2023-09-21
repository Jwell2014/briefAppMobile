// Créez un fichier contexte ImageContext.js
import React, { createContext, useContext, useState } from 'react';

// Créez un contexte
const ImageContext = createContext();

// Créez un composant ImageProvider pour fournir le contexte
export function ImageProvider({ children }) {
  const [capturedImage, setCapturedImage] = useState(null);

  return (
    <ImageContext.Provider value={{ capturedImage, setCapturedImage }}>
      {children}
    </ImageContext.Provider>
  );
}

// Créez un hook personnalisé pour accéder au contexte
export function useImage() {
  return useContext(ImageContext);
}
