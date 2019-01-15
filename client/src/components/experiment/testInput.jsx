import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { InputAutoSuggest } from '../common/InputAutoSuggest';
import { AutoPredictInput } from './AutoPredictInput';


const selectOption = [
    "oui","hh","kjhf"
]

export default class testInput extends Component {
    constructor(props) {
        super(props)




        this.state = {
            unite: "",
            nomProsit: "",
            nomScribe: "",
            validation: "",
            retourAjoutProsit: "",
            motsClef: ""
            // errors : null

        }
        this.input = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        event.preventDefault();

        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        //alert(name)



    }

    handleSubmit(event){

        event.preventDefault()

        alert(this.state.unite)
    }

  render() {
    return (
      <div>
           {/*  <InputAutoSuggest 
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange} 
            ref={this.input} 
            value={this.state.unite} 
            name="unite" 
            array={selectOption} 
            placeholder={"selectionner ue"} />
 */}
{this.state.unite}
 <AutoPredictInput 
  value={this.state.unite} 
  handleChange={this.handleChange} 
  name="unite" 
  options={selectOption}  >
 <input type="text"/>
 </AutoPredictInput>
      </div>
    )
  }
}
