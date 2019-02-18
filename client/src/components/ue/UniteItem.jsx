import React, { Component } from 'react';
// import Prosit_container from '../Prosit_container';
import PrositFlux from '../prosits/PrositsFeed';

import {CardStyled, UeStyled} from '../../styles/UeStyled';

class UniteItem extends Component {
    constructor(props) {
        super(props);
        this.state = { isButtonToggleOn: false };

        this.arrowClick = this.arrowClick.bind(this);
    }

    arrowClick() {
        this.setState(prevState => ({
            isButtonToggleOn: !prevState.isButtonToggleOn
        }))
    }

    render() {


       var ue
        Object.getOwnPropertyNames(this.props).forEach(element => {

            if (element !== "key" && element !== "prosit" ) {
            console.log(element)   
            ue = element 
        }
        
        
    });

    const ueTitle = this.props[ue]
    console.log(this.props[ue])

    
    

        return (
            <div className="container">
                <div className={"row"}>
                    <div className={"col-md-2"}></div>
                    <div className={"col-md-8"}>
                        <CardStyled className=" mb-4">
                            <div className="card-header bg-dark text-white">
                                <h3>UE-{ueTitle}</h3>
                            </div>

                            <UeStyled className="card-body">
                                <PrositFlux prosits={this.props.prosit}></PrositFlux>
                            </UeStyled>
                        </CardStyled>
                    </div>
                </div>
            </div>
        );
    }
}
/*

             <article className={[this.state.isButtonToggleOn ? 'rolled_out' : 'rolled_up', 'ue'].join(" ")}>
                <h1 className="UE_title" onClick={this.arrowClick}>UE - {ueTitle}</h1>
                <img className='arrow' onClick={this.arrowClick} src={arrow} alt="Down arrow" />
                <PrositFlux prosits={this.props.prosit}></PrositFlux>
            </article>
 */

export default UniteItem;
