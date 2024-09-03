import React from 'react'
import { useThemeMovilPay } from '../../../hooks/useTheme'
import { classNames } from '../../../helpers/ClassN'

export const PLayouts = ({message,icon}:{message:string,icon?:any}) => {
  const {darkMode} = useThemeMovilPay()
  return (
    <p className={classNames(darkMode&&'text-white',"font-semibold text-xl ")}>
        {message}
        {icon}
    </p>
  )
}
