import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { recupererProsits } from "../../actions/prositActions";
import Chargement from "../common/loading";

import UniteListe from "./UniteListe";







class Unite extends Component {



    componentDidMount() {

        



        this.props.recupererProsits()

        console.log(this.props)


    }






    render() {

        const { prosits, chargement } = this.props.prosits;


        let ueContenu;

        if (prosits === null || chargement) {

            ueContenu = <Chargement></Chargement>

        } else {

         let   prositUnite = []

            prosits.forEach(element => {
                prositUnite.push(element.unite)

            });
            let uniteSansDoublon = [...new Set(prositUnite)]; //contient toutes les valeurs d'ue possible 

            const uniteObj = {}

            uniteSansDoublon.forEach(sansDoublon => {
                    uniteObj[sansDoublon] = []
            });

            prosits.forEach(element => {
                uniteSansDoublon.forEach(sansDoublon => {
                    if (element.unite === sansDoublon ) {
                        uniteObj[sansDoublon].push(element)
                        console.log(uniteObj[sansDoublon])
                    }
            });

            });

            Object.getOwnPropertyNames(uniteObj).forEach(key => {
                let value = uniteObj[key];

                //use key and value here
            });
            
            console.log(uniteSansDoublon)

          /*  let objetA = {}
           let objetB = {}
           let objetC = {}
           let objetD = {}

            prosits.map(prosit=>{
                console.log(prosit)
                if (prosit.utie === "") {
                    objetA.push(prosit)
                }

                if (prosit.utie === "") {
                    objetB.push(prosit)
                }

                if (prosit.utie === "") {

                    objetC.push(prosit)
                }

                if (prosit.utie === "") {
                    objetD.push(prosit)

                }
            }) */

            /* 
                fiches.map(row => {
                    console.log(row)
                    return (
            ueContenu = <FicheListe fiches={row}></FicheListe>
                    )}); */

            return (
                ueContenu = <UniteListe ue={uniteObj}></UniteListe>

            )

        }

        return (
            <div>


                {ueContenu}

            </div>
        )
    }
}


Unite.propTypes = {
    recupererProsits: PropTypes.func.isRequired,
    prosits: PropTypes.object.isRequired

}

const mapStateToProps = state => ({

    prosits: state.prosit,
    errors: state.errors

})

export default connect(mapStateToProps, { recupererProsits })(Unite)