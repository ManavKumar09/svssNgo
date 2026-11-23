import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './TribeRootsPage.css';

// Import images
import kodomillets from '../../assets/photos/TribeRoots/Kodomillets.png';
import kutki from '../../assets/photos/TribeRoots/Kutki.png';
import moongdaal from '../../assets/photos/TribeRoots/Moongdaal.png';
import toordaal from '../../assets/photos/TribeRoots/Toordaal.png';
import honey from '../../assets/photos/TribeRoots/TribeRootshoney.png';
import jwaratta from '../../assets/photos/TribeRoots/jwaraata.png';
import multigrainatta from '../../assets/photos/TribeRoots/multigrainaata.png';

const products = [
    {
        id: 1,
        image: kutki,
        title: 'Kutki Millets',
        coop: "Vagad Farmers' Producer Co.",
        price: '₹201',
    },
    {
        id: 2,
        image: toordaal,
        title: 'Toor Daal',
        coop: 'Karigari Co-op, Jhabua',
        price: '₹105',
    },
    {
        id: 3,
        image: moongdaal,
        title: 'Moong Daal',
        coop: "Dahod Women's SHG",
        price: '₹80',
    },
    {
        id: 4,
        image: honey,
        title: 'Jungle Honey',
        coop: 'Banswara Honey Collectors',
        price: '₹185',
    },
    {
        id: 5,
        image: jwaratta,
        title: 'Jwar Atta',
        coop: 'Karigari Co-op, Jhabua',
        price: '₹50',
    },
    {
        id: 6,
        image: multigrainatta,
        title: 'Multigrain Atta',
        coop: "Vagad Farmers' Producer Co.",
        price: '₹175',
    },
    {
        id: 7,
        image: kodomillets,
        title: 'Kodo Millets',
        coop: "Dahod Women's SHG",
        price: '₹162',
    }
];

const TribeRootsPage = () => {
    const handleProductClick = () => {
        window.open('https://www.triberoots.in/products', '_blank');
    };

    return (
        <div className="marketplace-page">
            <Navbar textTheme="dark" />
            
            <div className="marketplace-container">
                <div className="marketplace-header">
                    <span className="marketplace-tag">TRIBE ROOTS · MARKETPLACE</span>
                    <h1 className="marketplace-title">Buy a story. Empower a maker.</h1>
                    <p className="marketplace-description">
                        Every Tribe Roots product is hand-crafted by women in our cooperatives. 78%
                        of the price goes directly to the artisan; the remainder funds raw material,
                        design and shipping.
                    </p>
                </div>

                <div className="marketplace-grid">
                    {products.map((product) => (
                        <div key={product.id} className="marketplace-card" onClick={handleProductClick}>
                            <div className="card-image-wrapper">
                                <img src={product.image} alt={product.title} />
                            </div>
                            <div className="card-info">
                                <h3 className="card-title">{product.title}</h3>
                                <p className="card-coop">{product.coop}</p>
                                <div className="card-footer">
                                    <span className="card-price">{product.price}</span>
                                    <span className="card-view">View ↗</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bulk-orders-banner">
                    <h2 className="banner-title">Bulk orders & corporate gifting</h2>
                    <p className="banner-desc">
                        Festive hampers, conference welcome kits and Diwali gifting — sourced
                        directly from tribal women's cooperatives.
                    </p>
                    <button className="banner-btn" onClick={() => window.open('https://www.triberoots.in/contact', '_blank')}>
                        Talk to the Tribe Roots team
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TribeRootsPage;
