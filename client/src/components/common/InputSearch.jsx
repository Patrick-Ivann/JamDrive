import React from 'react'
import { InputValuesHc } from '../HOC/InputValues';

const InputSearch = (props) =>{
  return <input type="text" name="search" {...props.name}/>
}

export const Exportation = InputValuesHc(InputSearch)




