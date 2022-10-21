import { Link } from 'react-router-dom';

import rentIcon from '../assets/svg/rent-key.svg';
import saleIcon from '../assets/svg/sale-house.svg';
import postPropertyIcon from '../assets/svg/list-property.svg';
import Slider from '../components/Slider';

function Explore() {
    return (
      <div className="explore">
        <header>
          <p className="page__header">Explore</p>
        </header>
        <main>

          <Slider/>

          <div className="explore__categories">
            <Link to="/category/rent" className="explore__category">
              <img src={rentIcon} alt="Properties for rent" className="explore__category-img"/>
              <p className="explore__category-name">Rent</p>
            </Link>
            <Link to="/category/sale" className="explore__category">
              <img src={saleIcon} alt="Properties for sale" className="explore__category-img"/>
              <p className="explore__category-name">Buy</p>
            </Link>
          </div>
          <Link to="/create-listing" className="explore__category-post">
            <img src={postPropertyIcon} alt="Properties for sale" className="explore__category-img"/>
            <p className="explore__category-name">List your property</p>
          </Link>
        </main>
      </div>
    );
  }
  
  export default Explore;
  