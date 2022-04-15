import { memo } from 'react'
import COUNTRIES from 'commons/constants/countries'
import { CardPanelContentStyled, ItemStyled } from './style'
import { Card, Typography, Button, Select, MenuItem } from 'components/index'

const navigatorHasShare = navigator.share

/**
 * Retorna o nome do país em pt
 * @param {String} country 
 * @returns {String}
 */
const getCountryLabel = country =>
  COUNTRIES.find(c => c.value === country).label

function Panel({ updateAt, onChange, data, country } = {}) {

  const countryLabel = getCountryLabel(country)
  const appTitle = `País: ${countryLabel}, Recuperados: ${data.recovered || 0}`

  const copyInfo = () =>
    navigator.clipboard.writeText(appTitle)

  const shareInfo = () => {
    navigator.share({
      text: appTitle,
      url: window.location.origin,
      title: `Dados do Covid19 - ${countryLabel}`
    })
  }

  document.title = appTitle

  const renderCountries = country => (
    <MenuItem key={`country-${country.value}`} value={country.value}>
      <ItemStyled>
        <div>{country.label}</div>
        <img src={country.flag} alt={`País-${country.label}`} />
      </ItemStyled>
    </MenuItem>
  )

  const renderHasShare = () => {
    if (navigatorHasShare)
      return <Button variant="contained" color="primary" onClick={shareInfo}>Compartilhar</Button>

    return <Button variant="contained" color="primary" onClick={copyInfo}>Copiar</Button>
  }

  return (
    <Card>
      <CardPanelContentStyled>
        <div>
          <Typography variant="h5" component="p" color="primary">COVID19</Typography>
          <Typography variant="h6" component="p" color="primary">Painel Coronavírus</Typography>
          <Typography variant="body2" component="p" color="primary">Atualizado em: {updateAt}</Typography>
          <div className="pt-2">
            <Select onChange={onChange} value={country}>
              {COUNTRIES.map(renderCountries)}
            </Select>
          </div>
        </div>
        <div>
          {renderHasShare()}
        </div>
      </CardPanelContentStyled>
    </Card>
  )
}

export default memo(Panel)
