import React, {useContext, useEffect,useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductsStackParams} from '../navigation/ProductsNavigator';
import {Picker} from '@react-native-picker/picker';
import {useCategories} from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductContext} from '../context/ProductContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({route, navigation}: Props) => {

  const [tempUri,setTempUri] = useState<string>()

  const {id = '', name = ''} = route.params;

  const {categories, isLoading} = useCategories();

  const {loadProductsByid, updateProducts, addProducts, UploadImage} =
    useContext(ProductContext);

  const {_id, categoriaId, nombre, img, form, onChange, setFormValue} = useForm(
    {
      _id: id,
      categoriaId: '',
      nombre: name,
      img: '',
    },
  );

  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Sin nombre del Producto',
    });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length === 0) return;
    const product = await loadProductsByid(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      nombre,
      img: product.img || '',
    });
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProducts(categoriaId, nombre, id);
    } else {
      const tempCategoriaId = categoriaId || categories[0]._id;
      const newProduct = await addProducts(tempCategoriaId, nombre);
      onChange(newProduct._id, '_id');
    }
  };

const takephoto = () =>{
  launchCamera({
    mediaType:'photo',
    quality:0.5
  }, (resp) => {
     if(resp.didCancel) return;
     if(!resp.uri) return;
    setTempUri(resp.uri);
    UploadImage(resp,_id);
  });
}
const takephotoGalery = () =>{
  launchImageLibrary({
    mediaType:'photo',
    quality:0.5
  }, (resp) => {
     if(resp.didCancel) return;
     if(!resp.uri) return;
    setTempUri(resp.uri);
    UploadImage(resp,_id);
  });
}

  return (
    <View style={styles.constainer}>
      <ScrollView>
        <Text style={{color: 'black', fontSize: 18}}>Nombre del Producto</Text>

        <TextInput
          placeholder="Producto"
          style={styles.textInput}
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
        />

        <Text style={{color: 'black', fontSize: 18}}>Categoria</Text>

        <Picker
        style ={{backgroundColor:'grey', margin:10}}
          selectedValue={categoriaId}
          onValueChange={itemValue => onChange(itemValue, 'categoriaId')}>
          {categories.map(c => (
            <Picker.Item label={c.nombre} value={c._id} key={c._id} />
          ))}
        </Picker>

        <Button title="Guardar" onPress={saveOrUpdate} color="#5856D6" />

        {_id.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Button title="Camara" onPress={takephoto} color="#5856D6" />
            <View style={{width: 10}} />
            <Button title="Galeria" onPress={takephotoGalery} color="#5856D6" />
          </View>
        )}

        {
         (img.length > 0 && !tempUri) && (
          <Image
            source={{uri: img}}
            style={{
              marginTop: 20,
              width: '100%',
              height: 300,
            }}
          />
        )}

        {
         (tempUri ) && (
          <Image
            source={{uri: tempUri}}
            style={{
              marginTop: 20,
              width: '100%',
              height: 300,
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 40,
    marginTop: 5,
    marginBottom: 10,
    color:'black',
  },
});
