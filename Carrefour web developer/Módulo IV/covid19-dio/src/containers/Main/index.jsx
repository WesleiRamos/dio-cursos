import Api from 'api'
import MainWrapper from './style'
import Board from './components/Board'
import Panel from './components/Panel'
import { memo, useState, useEffect } from 'react'

function Main() {
  const [ data, setData ] = useState([ ])
  const [ country, setCountry ] = useState('brazil')

  useEffect(() => {
    Api.getCountry(country).then(setData)
  }, [ country ])

  const handleChange = event =>
    setCountry(event.target.value)

  return (
    <MainWrapper>
      <div className="mb-2">
        <Panel
          data={data}
          country={country}
          onChange={handleChange}
          updateAt={new Date().toLocaleString()}
        />
      </div>
      <Board data={data} />
    </MainWrapper>
  )
}

export default memo(Main)
