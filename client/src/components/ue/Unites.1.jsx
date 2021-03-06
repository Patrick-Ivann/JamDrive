import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { recupererProsits } from "../../actions/prositActions";
import Chargement from "../common/loading";

import UniteListe from "./UniteListe";
import db from '../../indexDB2';








class Unite extends Component {

    constructor(props) {
        super(props)

        this.state = {
            prevPath: ''
        }
    }





    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.location !== this.props.location) {
            this.setState({ prevPath: this.props.location })
            alert(prevProps.location);
        }

    }


    componentDidMount() {


        if (this.props.navigation.lastPath !== this.props) {

            if (this.props.navigation.lastPath === "/") {
                this.props.recupererProsits()

            }


        }

        if (this.props.navigation.lastPath === "") {

            const prositsOffline = []

            /*db.table('prositsOffline')
                .toArray()
                .then((prosit) => {
                   console.log(prosit);alert("tooou")
                });   */
            db.table('prositsOffline')
                .toArray()
                .then((prosit) => {
                    prositsOffline = prosit[prosit.length - 1]
                });

        }





    }






    render() {

        const { prosits, chargement } = this.props.prosits;


        let ueContenu;

        if (prosits === null || chargement) {

            ueContenu = <Chargement></Chargement>

        } else {

            if (this.props.prosits.prosits !== {} && this.props.navigation.lastPath === "/") {
                

                let prositUnite = []

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
                        if (element.unite === sansDoublon) {
                            uniteObj[sansDoublon].push(element)
                        }
                    });

                });

                Object.getOwnPropertyNames(uniteObj).forEach(key => {
                    let value = uniteObj[key];

                });




                return (
                    ueContenu = <UniteListe ue={uniteObj}></UniteListe>

                )

            } else{


                let prositUnite = []

                this.prositsOffline.forEach(element => {
                    prositUnite.push(element.unite)

                });



                let uniteSansDoublon = [...new Set(prositUnite)]; //contient toutes les valeurs d'ue possible 

                const uniteObj = {}

                uniteSansDoublon.forEach(sansDoublon => {
                    uniteObj[sansDoublon] = []
                });

                this.prositsOffline.forEach(element => {
                    uniteSansDoublon.forEach(sansDoublon => {
                        if (element.unite === sansDoublon) {
                            uniteObj[sansDoublon].push(element)
                        }
                    });

                });

                Object.getOwnPropertyNames(uniteObj).forEach(key => {
                    let value = uniteObj[key];

                });




                return (
                    ueContenu = <UniteListe ue={uniteObj}></UniteListe>

                )


            }


            
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
    navigation: state.navigation,
    errors: state.errors

})

export default connect(mapStateToProps, { recupererProsits })(Unite)