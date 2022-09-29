import { Link } from 'react-router-dom';

import { ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg';
import bedIcon from '../assets/svg/bedIcon.svg';
import bathtubIcon from '../assets/svg/bathtubIcon.svg';


function ListingItem({listing, id}) {
  return (
    <li className="category__listing">
        <Link to={`/category/${listing.type}/${id}`} className="category__listingLink">
            <img src={listing.imgUrls[0]} alt={listing.name} className="category__listingImg" />
        </Link>
    </li>
  )
}

export default ListingItem