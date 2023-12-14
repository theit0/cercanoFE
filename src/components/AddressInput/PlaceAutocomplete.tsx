import React from 'react';
import GoogleComponent from 'react-google-autocomplete';

interface PlaceAutocompleteProps {
  apiKey: string;
}

const PlaceAutocomplete: React.FC<PlaceAutocompleteProps> = ({ apiKey }) => {
  const handlePlaceSelect = (place: any) => {
    // Aquí puedes trabajar con los datos del lugar seleccionado
  };

  return (
    <GoogleComponent style={{marginLeft:".5rem",paddingLeft:".2rem"}}
      apiKey={apiKey} // Aquí se debe colocar tu clave API
      options={{
        types: ['address'], // Puedes ajustar los tipos según tus necesidades
      }}
      onChange={handlePlaceSelect}
    />
  );
};

export default PlaceAutocomplete;
