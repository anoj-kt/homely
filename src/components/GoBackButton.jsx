import { useNavigate } from 'react-router-dom'

import arrowLeftIcon from '../assets/svg/arrow-left.svg'

function GoBackButton({style}) {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(-1)
    }

    return (
        <img 
            src={arrowLeftIcon} 
            alt="Go back" 
            className={`icon__goback ${style}`}
            onClick={onClick}
        />
        
    )
}

export default GoBackButton