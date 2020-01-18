import React from 'react';

import './styles.css'

function DevItem( { dev } ) {
    return (
        <li className="dev-item">
            <header>
            <img src={dev.avatar_url} alt={dev.name}/>
            <div className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.technology.join(', ')}</span>
                <p>{dev.bio}</p>
                <a href={`https://github.com/${dev.git_user}`}>Acessar perfil no Github</a>
            </div>
            </header>
        </li>
    )
}

export default DevItem;