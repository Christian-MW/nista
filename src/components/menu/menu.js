import React from 'react';
import './menu.css'

class menu extends React.Component {
     render(){

        return(

            <nav id="navMain" className="navbar navbar-expand-md fixed-top">
				<div>
					<img id ="logoMW-H" src="https://mwgroup.agency/wp-content/uploads/2022/07/Logotipo-2-1024x1024.png"/> 
		    		{/*<a className="navbar-brand tittle-h" href="/Search">Campañas</a>*/}
				</div>
		    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
		     	<span className="navbar-toggler-icon"></span>
		    </button>
		    <div className="collapse navbar-collapse" id="navbarCollapse">
			    <ul className="navbar-nav mr-auto">
			        <li className="nav-item active">
					<i class="fa fa-users" aria-hidden="true"></i>
			          	<a className="nav-link" href="/Search">Busquedas <span className="sr-only"></span></a>
			        </li>
			        <li className="nav-item">
			          	<a className="nav-link" href="/Hashtag">Hashtags</a>
			        </li>
					<li className="nav-item">
			          	<a className="nav-link" href="/Users">Campañas</a>
					</li>
					<li className="nav-item">
			          	<a className="nav-link" href="/Accounts">Cuentas</a>
					</li>
			    </ul>
		    </div>
		</nav>

        )
     }
}

export default menu;