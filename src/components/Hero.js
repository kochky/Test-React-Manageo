
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../style/hero.scss'

function Hero(){

    return (
        <div className="hero">
            <Card variant="outlined" className="hero__techno" sx={{ maxWidth: 345 }}>
                <CardContent> 
                <p>Créé avec :</p>
                <ul>
                    <li>React</li>
                    <li>Sass</li>
                </ul>
                </CardContent>
            </Card>
          
        </div>
    )

}

export default Hero