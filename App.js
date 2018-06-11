import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import RutasNoAutenticadas from './src/components/noAutenticados/rutas'
import RutasAutenticadas from './src/components/autenticados/rutas'
import Store from './src/store/store';
import Seleccion from  './seleccion'


export default class App extends React.Component {
  constructor(){
    super()
    this.state = { nombre: 'intagram-clone'}
  }
  render() {
    return (
      <View style={styles.container}>
        <Provider store={Store}>      
          <Seleccion />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
