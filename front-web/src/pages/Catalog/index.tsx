import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';
import ProductCard from './components/ProductCard';
import './styles.scss';
import { makeRequest } from '../../core/utils/request';
import { ProductsResponse } from '../../core/types/Product';

const Catalog = () => {

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    
    useEffect(() => {
        /*fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(response => console.log(response));*/

        /*axios('http://localhost:3000/products')            
            .then(response => console.log(response));*/

        const params = {
            page: 0,
            linesPerPage: 12
        }
        makeRequest({ url: '/products/paged', params })
            .then(response => setProductsResponse(response.data));
    }, []);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">
                Catálogo de Produtos
            </h1>
            <div className="catalog-products">
               {productsResponse?.content.map(product => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                        <ProductCard product={product}/>
                    </Link> 
               ))}              
            </div>
        </div>   
    )
};     

export default Catalog;