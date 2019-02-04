import styled from 'styled-components'

import { connect } from 'react-redux'


const PrositStyled = styled.div `

    background-color: ${props=> props.themeR.theme ? "#232323" : null};
    color:${props=> props.themeR.theme ? "white" : null};
 `;


const mapStateToProps = state => ({

    themeR: state.theme

})
export default connect(mapStateToProps, {})(PrositStyled)
