import React, {createContext} from 'react';
import {Producto, ProductosInterface} from '../Interface/AppInterface';
import {useState, useEffect} from 'react';
import cafeapi from '../api/cafeapi';
import { ImagePickerResponse } from 'react-native-image-picker';

type ProductoContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProducts: (categoryId: string, productName: string) => Promise<Producto>;
  updateProducts: (
    categoryId: string,
    productName: string,
    ProductId: string,
  ) => Promise<void>;
  deleteProducts: (id: string) => Promise<void>;
  loadProductsByid: (id: string) => Promise<Producto>;
  UploadImage: (data: any, id: string) => Promise<void>;
};

export const ProductContext = createContext({} as ProductoContextProps);

export const ProductsProvider = ({children}: any) => {
  const [products, setproducts] = useState<Producto[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const resp = await cafeapi.get<ProductosInterface>('/productos?limite=50');
    setproducts([...resp.data.productos]);
    // setProducts([ ...Products, ...resp.data.productos ]);
  };

  const addProducts = async (
    categoryId: string,
    productName: string,
  ): Promise<Producto> => {
    const resp = await cafeapi.post<Producto>('/productos', {
      nombre: productName,
      categoria: categoryId,
    });
    setproducts([...products, resp.data]);
    return resp.data;
  };

  const updateProducts = async (
    categoryId: string,
    productName: string,
    ProductId: string,
  ) => {
    const resp = await cafeapi.put<Producto>(`/productos/${ProductId}`, {
      nombre: productName,
      categoria: categoryId,
    });
    setproducts(
      products.map(prod => {
        return prod._id === ProductId ? resp.data : prod;
      }),
    );
  };

  const deleteProducts = async (id: string) => {};

  const loadProductsByid = async (id: string): Promise<Producto> => {
    const resp = await cafeapi.get<Producto>(`/productos/${id}`);
    return resp.data;
  };

  const UploadImage = async (data: ImagePickerResponse, id: string) => {

    const fileToUpload = {
      uri: data.uri,
      type: data.type,
      name: data.fileName
    }

    const formData = new FormData();
    formData.append('archivo',fileToUpload);

    try{
     const resp = await cafeapi.put(`/uploads/productos/${id}`, formData)
    }catch(error){
      console.log(error)
    }

  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loadProducts,
        addProducts,
        updateProducts,
        deleteProducts,
        loadProductsByid,
        UploadImage,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
