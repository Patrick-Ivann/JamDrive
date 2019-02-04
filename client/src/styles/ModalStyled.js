import styled from 'styled-components'
import className from 'classname'
import {
    connect
} from 'react-redux'




const ModalStyled = styled.div.attrs({
    className: 'alert-fixed '
})
`

   
   &&& {
    position:fixed;
    bottom: 0;
    right: 1%;
    z-index:9999;
    background-color:${props=> props.themeR.theme ? "darkred" : null};
    color:${props=> props.themeR.theme ? "white" : null};
   }
 `;




const mapStateToProps = state => ({

    themeR: state.theme

})

export const AlertFixed = connect(mapStateToProps, {})(ModalStyled);