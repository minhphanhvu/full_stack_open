import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const result = axios(
      `https://restcountries.eu/rest/v2/name/${name}?fullText=true`,
    )
    let data = {}
    if (result.status === 404) {
      data.found = false
    } else {
      data.found = true
      data.data = result[0]
    }
    setCountry(data)
  }, [name])

  return country
}