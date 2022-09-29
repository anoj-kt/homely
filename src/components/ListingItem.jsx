import { Link } from 'react-router-dom';

import { ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg';
import bedIcon from '../assets/svg/bedIcon.svg';
import bathtubIcon from '../assets/svg/bathtubIcon.svg';


function ListingItem({listing, id}) {
  return (
    <li className="category__listing">
        <Link to={`/category/${listing.type}/${id}`} className="category__listingLink">
            <img src={listing.imageUrls[0]} alt={listing.name} className="category__listingImg" />
            <div className="category__listingDetails">
                <p className="category__listingLocation">{listing.location}</p>
                <p className="category__listingName">{listing.name}</p>
                <p className="category__listingPrice">
                    {listing.offer 
                        ? listing.discountedPrice
                            .toLocaleString("de-DE")
                        : listing.regularPrice
                            .toLocaleString("de-DE")}
                    € {listing.type === "rent" && " per month"}
                </p>
                <div className="category__listingInfoDiv">
                    <img src={bedIcon} alt="bedrooms" />
                    <p className="category__listingInfoText">
                        {listing.bedrooms > 1 
                            ? `${listing.bedrooms} Bedrooms`
                            : "1 Bedroom"
                        }
                    </p>
                </div>
            </div>
        </Link>
    </li>
  )
}

export default ListingItem