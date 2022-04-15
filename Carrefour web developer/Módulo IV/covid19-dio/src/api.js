const PATH = 'https://coronavirus-19-api.herokuapp.com/countries'

const HEADERS = {
  method: 'get',
  mode: 'cors',
  cache: 'default'
}

const getData = {
  /**
   * Retorna os dados de covid19 de um país específico
   * @param {String} country 
   * @returns {Object}
   */
  getCountry: async function (country) {
    const response = await fetch(`${PATH}/${country}`, HEADERS)
    return response.json()
  }
}

export default getData
