import React, { useState, useEffect }   from 'react'

import './styles.css'

function Devform( { onSubmit } ) {
    const [ latitude, setLatitude ] = useState('')
    const [ longitude, setLongitude ] = useState('')
    const [ git_user, setUser ] = useState('')
    const [ technologies, setTecno ] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
    
            setLatitude(latitude)
            setLongitude(longitude)
          },
          (err) => alert(err),
          [])
    },[])

    async function handleSubmit(e){
        e.preventDefault()

        await onSubmit({
            git_user,
            technologies,
            latitude,
            longitude
        })

        setUser('')
        setTecno('')
    }

    return(
        <form onSubmit={handleSubmit}>

            <div className="input-block">
              <label htmlFor="git_user">Usuário do Github</label>
              <input name="git_user" id="git_user" required value={git_user} onChange={ e => setUser(e.target.value)}></input>
            </div>

            <div className="input-block">
              <label htmlFor="technologies">Tecnologias</label>
              <input name="technologies" id="technologies" required value={technologies} onChange={ e => setTecno(e.target.value)}></input>
            </div>

            <div className="input-group">
              <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input type="number" name="latitude" id="latitude" required value={latitude} onChange={ e => setLatitude(e.target.value)}></input>
              </div>

              <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input type="number" name="longitude" id="longitude" required value={longitude} onChange={ e => setLongitude(e.target.value)}></input>
              </div>
            </div>

            <button type="submit">Salvar</button>

        </form>
    )
    
}

export default Devform;
