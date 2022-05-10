import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


function Error(){

    return (
        <div className="container__error-container"><ErrorOutlineIcon fontSize="large"/><p>Erreur</p><p>Veuillez réactualiser la page</p></div>
    )
}

export default Error