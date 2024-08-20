/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function Holamundo(props) {
    console.log(props.UserInfo.UserName)
    console.log(props.UserInfo.edad)
  return (
    <div>
        <h1>Hola {props.UserInfo.UserName}, Tienes {props.UserInfo.edad} años de edad.</h1>
        <h2>Este es mi primer componente en React</h2>
    </div>
  )
}
