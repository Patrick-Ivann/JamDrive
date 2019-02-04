import styled from 'styled-components'
import className from 'classname'
import {
    connect
} from 'react-redux'




const ueStyled = styled.div.attrs({
    className: 'card-body '
})
`

   
   &&& {
   
    background-color:${props=> props.themeR.theme ? "slategrey" : null};
   }
 `;


const cardStyled = styled.div.attrs({
    className: 'card '
})
`

   
   &&& {
   
    border-color:${props=> props.themeR.theme ? "grey" : null};
   }
 `;


const mapStateToProps = state => ({

    themeR: state.theme

})

export const UeStyled = connect(mapStateToProps, {})(ueStyled);
export const CardStyled = connect(mapStateToProps, {})(cardStyled);