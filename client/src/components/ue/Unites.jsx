import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { recupererProsits, recupererPrositsParPromo, setErreur } from "../../actions/prositActions";
import { ping } from "../../actions/authAction";
import Chargement from "../common/loading";

import UniteListe from "./UniteListe";
import db from '../../indexDB2';
import ErrorUe from './ErrorUe';








class Unite extends Component {

    constructor(props) {
        super(props)

        this.state = {
            prevPath: '',
            prosits: [],
            offline: []
        }


    }





    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.location !== this.props.location) {
            this.setState({ prevPath: this.props.location })
            alert(prevProps.location);
        }


        if (prevProps.prosits.prosits !== this.props.prosits.prosits) {

            this.setState({
                prosits: this.props.prosits.prosits
            })
        }

    }


    componentDidMount() {


        if (this.props.navigation.lastPath !== this.props) {
            if (this.props.navigation.lastPath === "/") {

                if (this.props.utilisateur.utilisateur) {

                    console.log("object");

                    this.props.ping(() => this.props.recupererPrositsParPromo())

                } else {

                    console.log(localStorage.getItem('godMode') + typeof localStorage.getItem('godMode'));

                    if (localStorage.getItem('godMode') === "true") {
                        console.log("o  t");

                        this.props.recupererProsits()
                    }
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
                    if (prosit.length === 0) {
                        this.props.setErreur("Aucun prosit en cache")
                    }else{

                        console.log(prosit);
                        console.log(prosit[prosit.length - 1]);
                        //prositsOffline = prosit[prosit.length - 1]
                        //prositsOffline.push(prosit[prosit.length])
                        this.setState({
                            offline: prosit[prosit.length - 1]
                        })
                    }

                });

        }



        console.log(this.props)


    }






    render() {

        const { chargement } = this.props.prosits;

        const prosits = this.state.prosits

        let ueContenu;

        if (((!prosits || prosits.length === 0) && chargement)) {
            ueContenu = <Chargement></Chargement>

            setTimeout(() => {
                ueContenu = <ErrorUe></ErrorUe>
            }, 6000);



            if (((this.props.errors["pasDeProsit"]) || (this.props.errors["pasDePrositPromo"])) && prosits.length === 0) {

            return    ueContenu = <ErrorUe></ErrorUe>


            }
        } else {


            if ((prosits.length !== 0 || this.props.prosits.prosits !== {}) && this.props.navigation.lastPath === "/") {

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


                console.log(uniteSansDoublon)



                return (
                    ueContenu = <UniteListe user={this.props.utilisateur} ue={uniteObj}></UniteListe>

                )

            } else {


                if (this.state.offline.length === 0 || !this.state.offline) {
                    this.props.setErreur("Mode Hors ligne et sans Prosit")

                    return (
                        ueContenu = <ErrorUe></ErrorUe>

                    )

                } else {



                    console.log("dans le offline");

                    this.props.setErreur("Mode Hors ligne")

                    let prositUnite = []

                    console.log(this.state.offline);

                    this.state.offline.forEach(element => {
                        prositUnite.push(element.unite)

                    });

                    console.log(prositUnite);


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


                    console.log(uniteSansDoublon)



                    return (
                        ueContenu = <UniteListe user={this.props.utilisateur} ue={uniteObj}></UniteListe>

                    )

                }

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

export default connect(mapStateToProps, { recupererProsits, recupererPrositsParPromo, ping, setErreur })(Unite)