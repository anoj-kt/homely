import { useNavigate } from 'react-router-dom'

import arrowLeftIcon from '../assets/svg/arrow-left.svg'

function GoBackButton() {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(-1)
    }

    return (
        <img src={arrowLeftIcon} alt="" className="icon__goback" />
    )
}

export default GoBackButton