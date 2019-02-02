import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { recupererProsits,recupererPrositsParPromo } from "../../actions/prositActions";
import Chargement from "../common/loading";

import UniteListe from "./UniteListe";
import db from '../../indexDB2';








class Unite extends Component {

    constructor(props) {
        super(props)

        this.state = {
            prevPath: '',
            offline:[]
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
                
                if (this.props.utilisateur.utilisateur) {
                    this.props.recupererPrositsParPromo()
                }else{
                    
                    this.props.recupererProsits()
                }

            }
            


        }

        if (this.props.navigation.lastPath === "") {


            /*db.table('prositsOffline')
                .toArray()
                .then((prosit) => {
                   console.log(prosit);alert("tooou")
                });   */

            db.table('prositsOffline')
                .toArray()
                .then((prosit) => {
                    console.log(prosit);
                    console.log(prosit[prosit.length - 1]);
                    //prositsOffline = prosit[prosit.length - 1]
                    //prositsOffline.push(prosit[prosit.length])
                    this.setState({
                        offline: prosit[prosit.length - 1]
                    })
                    
                });

        }



        console.log(this.props)


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
                            console.log(uniteObj[sansDoublon])
                        }
                    });

                });

                Object.getOwnPropertyNames(uniteObj).forEach(key => {
                    let value = uniteObj[key];

                });

                console.log(uniteSansDoublon)



                return (
                    ueContenu = <UniteListe ue={uniteObj}></UniteListe>

                )

            } else {

                console.log("dans le offline");

                let prositUnite = []

                this.state.offline.forEach(element => {
                    prositUnite.push(element.unite)

                });



                let uniteSansDoublon = [...new Set(prositUnite)]; //contient toutes les valeurs d'ue possible 

                const uniteObj = {}

                uniteSansDoublon.forEach(sansDoublon => {
                    uniteObj[sansDoublon] = []
                });

                this.state.offline.forEach(element => {
                    uniteSansDoublon.forEach(sansDoublon => {
                        if (element.unite === sansDoublon) {
                            uniteObj[sansDoublon].push(element)
                            console.log(uniteObj[sansDoublon])
                        }
                    });

                });

                Object.getOwnPropertyNames(uniteObj).forEach(key => {
                    let value = uniteObj[key];

                });

                console.log(uniteSansDoublon)



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
    utilisateur: state.auth,
    errors: state.errors

})

export default connect(mapStateToProps, { recupererProsits,recupererPrositsParPromo })(Unite)