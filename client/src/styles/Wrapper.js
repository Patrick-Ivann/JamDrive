import styled from 'styled-components';
import { connect } from 'react-redux';




const Wrapper = styled.div `

 background-color: ${props=> props.themeR.theme ? "rgb(35,35,35)": null};
 color: ${props => props.themeR.theme ? "white": null};
 
 height: 100% ;
 
 
 `;





const mapStateToProps = state => ({
    
    themeR: state.theme
    
})
export default connect(mapStateToProps, {})(Wrapper)
