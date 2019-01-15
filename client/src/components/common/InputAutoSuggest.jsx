
import React, { Component, Children, cloneElement  } from 'react'
import {findDOMNode, render } from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classname';



const keys = {
  down: 'ArrowDown',
  enter: 'Enter',
  up: 'ArrowUp'
}


class AutoComplete extends Component {
  
  
  constructor(props) {
    super(props)

    this.state = {
      inputWidth: null, // fallback only
      selectedSuggestion: 0, // fallback only
      showSuggestions: false, // fallback only
      shownOptions: [], // fallback only
      nativeSupport: this._supportsNative(),
      options: props.options, // options can be updated
      value: ''
      
    }
  }

  componentDidMount() {
    if (this.state.nativeSupport) { return }

    let inputWidth = findDOMNode(this.refs.input).offsetWidth + 'px'

    this.setState({ inputWidth })
  }

  _supportsNative() {
    let feature = document.createElement('datalist')

    return Boolean(feature && feature.options)
  }

  _isOptionShown(input, option) {
    let optionRegex = new RegExp(input, 'gi')
    let optionMatchesInput = input && option.match(optionRegex)

    return this.state.showSuggestions && optionMatchesInput
  }

  _renderFallbackOptions() {
    let options = this.state.shownOptions.map((option, index) => {
      let isSelected = index === this.state.selectedSuggestion
      let classNames = classnames({
        'lookahead__option': true,
        'lookahead__option--selected': isSelected
      })
      let onClick = this.onFallbackOptionClick.bind(this, option)

      return (
        <li className={classNames} aria-selected={isSelected} key={index} onMouseDown={onClick} role='option'>
          {option}
        </li>
      )
    })

    let classNames = classnames ({
      'lookahead__fallback-options': true,
      'lookahead__fallback-options--shown': this.state.showSuggestions && this.state.value
    })

    return (
      <ul aria-multiselectable='false' className={classNames} role='listbox' style={{ width: this.state.inputWidth }}>
        {options}
      </ul>
    )
  }

  _renderOptions() {
    if (!this.state.nativeSupport) {
      return this._renderFallbackOptions()
    }

    let options = this.state.options.map((option, index) => {
      return <option key={index} value={option} />
    })

    return (
      <datalist id={this.props.name}>
        {options}
      </datalist>
    )
  }

  _renderChildren() {
    
    let child = Children.only(this.props.children)
    let props = {
      list: this.props.name,
      onBlur: this.onBlur.bind(this),
      onChange: this.onChange.bind(this),
      ref: 'input',
      value: this.state.value,
      onSubmit: this.props.handleSubmit
    }
    console.log(child);
    if (!this.state.nativeSupport) {
      props.onKeyDown = this.onKeyDown.bind(this)
    }

    return cloneElement(child, props)
  }

  onKeyDown(event) {
    const { key } = event
    const { selectedSuggestion, shownOptions } = this.state;
    let nextIndex = selectedSuggestion;

    switch (key) {
      case keys.down:
        let maxIndex = shownOptions.length - 1
        nextIndex = (selectedSuggestion === maxIndex) ? maxIndex : selectedSuggestion + 1
        break;
      case keys.up:
        nextIndex = (selectedSuggestion <= 0) ? 0 : selectedSuggestion - 1
        break;
      case keys.enter:
        this.onFallbackOptionClick(shownOptions[selectedSuggestion])
        break;
      default:
        return;
    }

    this.setState({ selectedSuggestion: nextIndex })

  }

  onFallbackOptionClick(option) {
    this.setState({ showSuggestions: false, value: option })
  }

  onBlur() {
    this.setState({ showSuggestions: false })
  }

  onChange(event) {
    let { value } = event.target
    let newState = { selectedSuggestion: 0, value }

    if (!this.state.nativeSupport) {
      newState.showSuggestions = true
      newState.shownOptions = this.state.options.filter((option) => this._isOptionShown(value, option))
    }

    this.setState(newState)
  }

  
  
  
  
  /*
  constructor (props) {
    super(props)
    
    this.state = {
      inputWidth: null, // fallback only
      selectedSuggestion: 0, // fallback only
      showSuggestions: false, // fallback only
      shownOptions: [], // fallback only
      nativeSupport: this._supportsNative(),
      options: props.options, // options can be updated
    }
    this.inputSugg = React.createRef();

  }

  componentDidMount () {
    if (this.state.nativeSupport) { return }
    
    let inputWidth = findDOMNode(this.refs.input).offsetWidth + 'px'
    
    this.setState({inputWidth})
  }
  
  _supportsNative () {
    let feature = document.createElement('datalist')

    return Boolean(feature && feature.options)
  }
  
  _isOptionShown (input, option) {
    let optionRegex = new RegExp(input, 'gi')
    let optionMatchesInput = input && option.match(optionRegex)
    
    return this.state.showSuggestions && optionMatchesInput
  }
  
  _renderFallbackOptions () {
    let options = this.state.shownOptions.map((option, index) => {
      let isSelected = index === this.state.selectedSuggestion
        let classNamesVar = classNames({
        'lookahead__option': true,
        'lookahead__option--selected': isSelected
      })
      let onClick = this.onFallbackOptionClick.bind(this, option)
      
      return (
        <li className={classNamesVar} aria-selected={isSelected} key={index} onMouseDown={onClick} role='option'>
          {option}
        </li>
      )
    })
    
    let classNamesVar = classNames({
      'lookahead__fallback-options': true,
      'lookahead__fallback-options--shown': this.state.showSuggestions && this.state.value
    })

    return (
      <ul aria-multiselectable='false' className={classNamesVar} role='listbox' style={{width: this.state.inputWidth}}>
        {options}
      </ul>
    )
  }
  
  _renderOptions () {
    if (!this.state.nativeSupport) {
      return this._renderFallbackOptions()
    }

    let options = this.state.options.map((option, index) => {
      return <option key={index} value={option} />
    })
    
    return (
      <datalist id={this.props.name}>
        {options}    
      </datalist>
    )
  }
  
  _renderChildren () {
    let child = Children.only(this.props.children)
    let props = {
      list: this.props.name,
      onBlur: this.onBlur.bind(this),
      onkeyup: this.onChange.bind(this),
     onChange: this.props.handleChange,
      ref: 'input',
      name: this.props.name,
      value: this.state.value,
      dummy : "qqq"
    }
    
   
    return cloneElement(child, props)
  }

  
  
  onFallbackOptionClick (option) {
    this.setState({showSuggestions: false, value: option})
  }
  
  onBlur () {
    this.setState({showSuggestions: false})
  }
  
  onChange (event) {


    

    let { value } = event.target
    let newState = {selectedSuggestion: 0, value}


    this.setState({value : value})
    
    if (!this.state.nativeSupport) {
      newState.showSuggestions = true
      newState.shownOptions = this.state.options.filter((option) => this._isOptionShown(value, option))
    }

    this.setState(newState)
    
  }*/
  
  render () {
    return (
        
      <section className='lookahead'>
        {this._renderChildren()}
        {this._renderOptions()}
      </section>
    )
  }
  
}

AutoComplete.propTypes = {
  name: PropTypes.string.isRequired
}




export  class InputAutoSuggest extends Component {

    constructor(props){
        super(props)

      this.inputSugg = React.createRef();
    }

 

  render() {

    

   
     const { name, value, handleChange, array, placeholder } = this.props
    return (
          <label>
              {placeholder}

        <AutoComplete value={this.props.value} onSubmit={this.props.handleSubmit}
         handleChange={handleChange} ref={this.inputSugg}  name="oui" options={array}>
          <input value={this.props.value}  name={name}  id={name} placeholder={placeholder} />
              </AutoComplete>
          </label>
      )
  }
}



InputAutoSuggest.propTypes = {


    name : PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    array: PropTypes.array.isRequired,
    placeholder : PropTypes.string.isRequired,
}

export default InputAutoSuggest



/* export class InputSuggestion extends Component {
  
    
    const {name, value, handleChange, array, id, placeholder} = this.props
  render () {
    return (
      <label>
        {this.props.placeholder}
        <AutoComplete name='recherche' options={this.props.values}>
                <input name={name} value={value} onChange={handleChange} id={name} placeholder={this.props.placeholder}/>
        </AutoComplete>
      </label>
    )
  }
  
} */

//render(<App />, document.body)