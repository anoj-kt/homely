import { Link } from 'react-router-dom';

import { ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg';
import { ReactComponent as EditIcon} from '../assets/svg/editIcon.svg';
import bedroomIcon from '../assets/svg/bedroom-icon.svg';
import bathroomIcon from '../assets/svg/bathroom-icon.svg';
import sqmeterIcon from '../assets/svg/sqmeter-icon.svg';


function ListingItem({listing, id, onEdit, onDelete}) {
  return (
    <li className="category__listing">
        <Link to={`/category/${listing.type}/${id}`} className="category__listing-container">
            <img src={listing.imageUrls[0]} alt={listing.name} className="category__listing-img" />
            <p className="category__listing-price">
                    {listing.offer 
                        ? Number(listing.discountedPrice)
                            .toLocaleString("de-DE")
                        : Number(listing.regularPrice)
                            .toLocaleString("de-DE")}
                    € {listing.type === "rent" && " /mo"}
                </p>
            <div className="category__listing-content">
                <p className="category__listing-name">{listing.name}</p>
                
                <p className="category__listing-location">{listing.location}</p>
                <div className="category__listing-infos">
                    <div className="category__listing-info">
                        <img src={bedroomIcon} alt="bedrooms" className="category__listing-icon"/>
                        <p className="category__listing-info-text">
                            {listing.bedrooms > 1 
                                ? `${listing.bedrooms} Bedrooms`
                                : "1 Bedroom"
                            }
                        </p>
                    </div>
                    <div className="category__listing-info">
                        <img src={bathroomIcon} alt="bathrooms" className="category__listing-icon"/>
                        <p className="category__listing-info-text">
                            {listing.bathrooms > 1 
                                ? `${listing.bathrooms} Bathrooms`
                                : "1 Bathroom"
                            }
                        </p>
                    </div>
                    <div className="category__listing-info">
                        <img src={sqmeterIcon} alt="bathrooms" className="category__listing-icon"/>
                        <p className="category__listing-info-text">
                            1200 sqm
                            {/* {listing.bathrooms > 1 
                                ? `${listing.bathrooms} Bathrooms`
                                : "1 Bathroom"
                            } */}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
        {onDelete && (
            <DeleteIcon 
                className="icon__remove" 
                fill="red" 
                onClick={() => onDelete(listing.id, listing.name)} 
            />
        )}

        {onEdit && (
            <EditIcon 
            className="icon__edit" 
            fill="black" 
            onClick={() => onEdit(id)} 
        />
        )}
    </li>
  )
}

export default ListingItem