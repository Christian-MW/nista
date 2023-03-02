import React from 'react';
import Menu from '../menu/menu';
import Footer from '../footer/footer';

class home extends React.Component {
    render(){

        return(
            <>
			<Menu /> 
			<main role="main" className="flex-shrink-0 mt-5">
		            <div className="container">
                        <hr className="featurette-divider" />
		            </div>
	  		</main>
	  		<Footer />
	  		</>
        )
    }
}

export default home;