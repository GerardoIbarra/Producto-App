import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {ProductContext} from '../context/ProductContext';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductsStackParams} from '../navigation/ProductsNavigator';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({navigation}: Props) => {
  const {products,loadProducts} = useContext(ProductContext);
  const [isRefreshin, setisRefreshin] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{backgroundColor:'grey' ,marginRight: 12}}
          activeOpacity={0.87}
          onPress={() =>
            navigation.navigate('ProductScreen', {name: 'Nuevo Producto'})
          }>
          <Text>Agregar</Text>
        </TouchableOpacity>
      ),
    });
  });

  const loadProductsFromBackend = async () => {
    setisRefreshin(true);
    await loadProducts();
    setisRefreshin(false);
  };

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlatList
        data={products}
        keyExtractor={p => p._id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('ProductScreen', {
                id: item._id,
                name: item.nombre,
              })
            }>
            <Text style={{color: 'black', fontSize: 20}}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemseparator} />}
        refreshControl={
          <RefreshControl
            onRefresh={loadProductsFromBackend}
            refreshing={isRefreshin}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemseparator: {
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: ' rgb(0,0,0,0.1) ',
  },
});
