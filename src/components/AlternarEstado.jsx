import React from 'react'

const AlternarEstado = ({concluido, alternar}) => {
  return (
    <input 
    type="checkbox" 
    checked={concluido}
    onChange={alternar}
    />
  )
}

export default AlternarEstado
