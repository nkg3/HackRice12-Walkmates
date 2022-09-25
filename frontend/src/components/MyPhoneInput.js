import React from 'react'
import { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function MyPhoneInput({setVal, placeholder}) {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [value, setValue] = useState("")
  return (
    <PhoneInput
      defaultCountry = "US"
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        setValue(e);
        setVal(e);
      }}
      />
  )
}