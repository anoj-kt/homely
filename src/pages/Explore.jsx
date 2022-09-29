import { Link } from 'react-router-dom';

import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';

function Explore() {
    return (
      <div className="explore">
        <header>
          <p className="page__header">Explore</p>
        </header>
        <main>

          <p className="explore__categoryHeading">Categories</p>
          <div className="explore__categories">
            <Link to="/category/rent">
              <img src={rentCategoryImage} alt="rent" className="explore__categoryImg" />
              <p className="explore__categoryName">Properties for rent</p>
            </Link>
            <Link to="/category/sale">
              <img src={sellCategoryImage} alt="sell" className="explore__categoryImg" />
              <p className="explore__categoryName">Properties for sale</p>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  export default Explore;
  