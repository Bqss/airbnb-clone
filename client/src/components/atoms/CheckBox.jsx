import React, { memo, useCallback } from 'react'

const CheckBox = ({className, children, name, setSelected, value, selected}) => {
  const changeHandler = useCallback(() => setSelected(e => ({ ...e,[name]: !selected})),[selected])

  return (
    <label className="block flex-1 cursor-pointer">
      <input type="checkbox" checked={selected} onChange={changeHandler} name={name} value={value}  className='hidden peer'  />
      <div className={["border-2 transition-colors duration-150 p-5 border-gray-[150]  rounded-lg  hover:border-black peer-checked:border-black peer-checked:[&>svg]:animate-pop ",className].join(" ")}>
        {children}
      </div>
    </label>
  )
}

export default memo(CheckBox)