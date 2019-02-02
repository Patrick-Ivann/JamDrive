import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'



export const styleSwitcherHOC = (WrappedComponent) => {

return class styleSwitcher extends Component {


    constructor(props) {
        super(props)

        this.state = {
            theme : this.props.style.theme
        }

        this.proc = this.proc.bind(this)
    }

    proc(wrappedComponentInstance) {
        wrappedComponentInstance.method()
    }


    render() {

        const newProps = {
            style: {
                theme: this.state.theme
            },

            rt: Object.assign({}, { ref: this.proc})

        }



        return <WrappedComponent  {...this.props} {...newProps} />;


    }
}

 


}


export const mapStateToProps = state => ({

    style : state.style
})

export default WrapperStyle => connect(mapStateToProps)(styleSwitcherHOC(WrapperStyle))


