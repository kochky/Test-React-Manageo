import React, { useState, useEffect} from 'react'
import PeopleCard from "./Card"
import Loading from './Loading'
import Error from './Error';
import Card from '@mui/material/Card';

import '../style/peopleList.scss'

//sert à lister par ordre alphabétique les personnes selon leur nom de famille
function compare( a, b ) {
    if ( a.lastName.toLowerCase() < b.lastName.toLowerCase() ){
      return -1;
    }
    if ( a.lastName.toLowerCase()> b.lastName.toLowerCase() ){
      return 1;
    }
    return 0;
  }
  

function PeopleList () {
    const [done,setDone]=useState(false)
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState()
    const [peopleList,setPeopleList]= useState([])
    const [sorted,setSorted]=useState(false)

    //Fetch les data du fichier data.json du dossier public pour faker le backend, puis le met dans le state, Gère aussi le loading, et error.
    useEffect(() => {
        fetch('data.json')
        .then(response=> response.json())
        .then(result=>{
            const resultSorted= result.data.sort(compare)
            setPeopleList(resultSorted)
            setLoading(false)
            setDone(true)
            })
        .catch(err=>{
            console.log(err)
            setLoading(false)
            setDone(false)
            setError(err)
        })
    }, [])

    useEffect(() => {
        setSorted(!sorted)
        setPeopleList(peopleList.sort(compare))
    }, [peopleList])
    
   
    

    return (
        <>
        {loading && <Loading />}

       <div className="container">
            <h1 className="container__title">Liste de personnes</h1>
         
            {done &&  
                <div className="container__card-list">
                    <div className="container__card-list__elements">
                        {peopleList.length ===0 && <div>Aucune personne trouvée !</div>}
                        {peopleList.map(people=> <PeopleCard key={people.id} setPeopleList={setPeopleList} id={people.id} firstName={people.firstName} lastName={people.lastName} mail={people.mail} />)}
                        <div className="card-wrapper card__invisible" key={"invisible-1"}><Card className="card" /></div>
                        <div className="card-wrapper card__invisible" key={'invisble-2'}><Card className="card" /></div>
                        <div className="card-wrapper card__invisible" key={'invisble-3'}><Card className="card" /></div>
                        <div className="card-wrapper card__invisible" key={'invisble-4'}><Card className="card" /></div>
                    </div> 
                </div>}
        </div>

        {error &&  <Error />
}
    </>
    )
}

export default PeopleList