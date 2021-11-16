import React, { useState } from "react";

const Toggle = React.memo(({id, checked = true, onChange, className = '', label, labelPosition = 'left'}: {id: string, checked: boolean, label?: React.ReactElement, labelPosition?: 'left' | 'right', onChange: (checkboxState: boolean) => void, className?: string} ) => {
    return (
        <label htmlFor={id} className={className + " flex items-center cursor-pointer"}>
            {labelPosition === 'left' && label}
            <div className="relative">
                <input type="checkbox" id={id} className="sr-only" checked={checked} onChange={() => onChange(!checked)}/>
                <div className={checked ? 'block bg-green-500 w-12 h-7 rounded-full' : 'block bg-gray-300 w-12 h-7 rounded-full'}></div>
                <div className="dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition"></div>
            </div>
            {labelPosition === 'right' && label}
        </label>
    )
})

export default Toggle;