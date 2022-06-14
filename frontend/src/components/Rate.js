import React from 'react'

const Rating = ({  text, color }) => {
  return (
    <div className='rating'>
      
      <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

export default Rating
