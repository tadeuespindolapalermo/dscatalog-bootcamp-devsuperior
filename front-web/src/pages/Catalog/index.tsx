import ProductCard from './components/ProductCard';
import './styles.scss';

const Catalog = () => (
    <div className="catalog-container">
        <h1 className="catalog-title">
            Catálogo de Produtos
        </h1>
        <h1 className="catalog-products">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </h1>
    </div>    
);

export default Catalog;