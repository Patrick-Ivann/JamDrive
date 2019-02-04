import styled from 'styled-components'
import className from 'classname'
import {
    connect
} from 'react-redux'


const modalHeader = styled.div.attrs({
    className: 'modal-header close'
})
`
&&&{
        color: ${props=> props.themeR.theme ?  "white" : null};

}
`

const modalContent = styled.div.attrs({
    className: 'modal-content '
})
`

   
   &&& {
    background-color: ${props=> props.themeR.theme ?  '#343a40' : null};
    border-color: ${props=> props.themeR.theme ? "grey" : null};
   }
 `;




const mapStateToProps = state => ({

    themeR: state.theme

})

export const ModalContent = connect(mapStateToProps, {})(modalContent);
export const ModalHeader = connect(mapStateToProps, {})(modalHeader);