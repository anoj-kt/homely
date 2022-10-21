import { Link } from 'react-router-dom';

import rentIcon from '../assets/svg/rent-key.svg';
import saleIcon from '../assets/svg/sale-house.svg';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';
import Slider from '../components/Slider';

function Explore() {
    return (
      <div className="explore">
        <header>
          <p className="page__header">Explore</p>
        </header>
        <main>

          <Slider/>
          
          <div>
            <Link to="/category/rent">
              <img src={rentIcon} alt="Properties for rent" className="explore__category-img"/>
              <p className="explore__category-name">Properties for rent</p>
            </Link>
            <Link to="/category/sale">
              <img src={saleIcon} alt="Properties for sale" className="explore__category-img"/>
              <p className="explore__category-name">Properties for sale</p>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  export default Explore;
  