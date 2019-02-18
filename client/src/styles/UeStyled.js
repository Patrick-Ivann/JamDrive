import styled from 'styled-components'
import {
    connect
} from 'react-redux'



// eslint-disable-next-line 
const ueStyled=styled.div.attrs({
    className: 'card-body '
})
`

   
   &&& {
   
    background-color:${props=> props.themeR.theme ? "slategrey" : null};
   }
 `;

// eslint-disable-next-line 
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