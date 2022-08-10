import {useState, useEffect} from 'react';
import cafeapi from '../api/cafeapi';
import {ResponsCategories, Categoria} from '../Interface/AppInterface';

export const useCategories = () => {
  const [isLoading, setisLoading] = useState(true);
  const [categories, setcategories] = useState<Categoria[]>([]);

  useEffect(() => {
    getcategories();
  }, []);

  const getcategories = async () => {
    const resp = await cafeapi.get<ResponsCategories>('/categorias');
    setcategories(resp.data.categorias);
    setisLoading(false);
  };

  return {
    isLoading,
    categories,
  };
};
