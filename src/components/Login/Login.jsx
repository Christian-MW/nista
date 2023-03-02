import React from 'react';
import Menu from '../menu/menu';
import Footer from '../footer/footer';
import App from '../../App';

class Login extends React.Component{
    render(){
        return(
            <>
			<main role="main" className="flex-shrink-0 mt-5">
            <h2>LOGIN</h2>
            <App />
		            <div className="container">
                        <hr className="featurette-divider" />
		            </div>
	  		</main>
	  		</>
        )
    }
}

export default Login;