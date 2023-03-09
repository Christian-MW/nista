import React from 'react';
import './footer.css'

class footer extends React.Component {
    render(){
        return (
 
            <footer className="footer-item">
                <p className="float-right"><a href="#">Subir</a></p>
                <p class="txt-footer">&copy; Copyright {(new Date().getFullYear())} All rights reserved. 
                {/*<a class="txt-footer" href="#">Política de Privacidad</a> &middot; 
                <a class="txt-footer" href="#">Términos</a>*/}</p>
            </footer>
     
        )
    }
}

export default footer;