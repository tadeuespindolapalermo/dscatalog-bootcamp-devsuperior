import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';
import ProductCard from './components/ProductCard';
import './styles.scss';
import { makeRequest } from 'core/utils/request';
import { ProductsResponse } from 'core/types/Product';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';

const Catalog = () => {

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    
    useEffect(() => {

        /*fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(response => console.log(response));*/

        /*axios('http://localhost:3000/products')            
            .then(response => console.log(response));*/

        const params = {
            page: activePage,
            linesPerPage: 12
        }

        setIsLoading(true);

        makeRequest({ url: '/products/paged', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage]);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">
                Catálogo de Produtos
            </h1>
            <div className="catalog-products">
                {isLoading ? <ProductCardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <ProductCard product={product}/>
                        </Link> 
                    ))
                )}                
            </div>
            {productsResponse && (
                <Pagination 
                    totalPages={productsResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivePage(page)}
                />
            )}
        </div>   
    )
};     

export default Catalog;