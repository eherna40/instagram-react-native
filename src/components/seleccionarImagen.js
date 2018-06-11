import React from 'react';
import { Button, Image, View, TouchableOpacity } from 'react-native';
import { ImagePicker, Permissions } from 'expo';


askPermissionsAsync = async () =>{
  await Permissions.askAsync(Permissions.CAMERA)
  await Permissions.askAsync(Permissions.CAMERA_ROLL)
}


const SelecionarImagen = (props) =>{
console.log(props)

  const seleccionarImagen = async () => {
    console.log(props)
    await askPermissionsAsync()
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      console.log(result)
        props.cargar(result)
    }
  };

  const radius = {borderRadius: props.radius ? 0 :80}
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={seleccionarImagen}>
      {
        props.imagen ? 
          <Image source={{uri: props.imagen.uri}} style={{width: 160, height:160, ...radius}} />
        
          :
        <Image source={require ('../../assets/ajo.jpg')} style={{width: 160, height:160, ...radius}} />

      }
      </TouchableOpacity>
    </View>
  );
}

export default SelecionarImagen


  
    