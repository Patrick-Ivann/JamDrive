import React, {Component}  from 'react'



export const InputValuesHc = (WrappedComponent) => {

    return class InputValues extends Component {
        
        
        constructor(props) {
        super(props)
            
            this.state = {
                search: ''
            }
        this.handleChange = this.handleChange.bind(this)
    }

        proc(wrappedComponentInstance) {
            wrappedComponentInstance.method()
        }

        handleChange(event) {
            const target = event.target;
            const value = target.type === "checkbox" ? target.checked : target.value;
            const name = target.name;

            this.setState({
                [name]: value
            });




        }

      render() {

          const newProps = {
              name: {
                  value: this.state.search,
                  onChange: this.handleChange
              },

              rt: Object.assign({}, { ref: this.proc.bind(this) })

          }


      
            return <WrappedComponent valeur={this.state.search}  {...this.props} {...newProps}/>;

    
      }
    }
    

}
