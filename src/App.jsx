import React, { useState, useEffect } from 'react'
import Pais from './Pais'
import './App.css'
import PokemoniInfo from './PokemoniInfo'
import PokemonideList from './PokemonideList'

function App() {
  const [valitudPokemon, setValitudPokemon] = useState()
  const [pokemonid, setPokemonid] = useState([])
  const [eelmineUrl, setEelmineUrl] = useState(null)
  const [jargmineUrl, setJargmineUrl] = useState(null)

  useEffect(() => {
    pariPokemonid('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20')
  }, [])

  const pariPokemonid = async (url) => {
    if (!url) return
    const laetudPokemonid = await (await fetch(url)).json()
    console.log(laetudPokemonid)
    setPokemonid(laetudPokemonid.results)
    setEelmineUrl(laetudPokemonid.previous)
    setJargmineUrl(laetudPokemonid.next)
  }

  const pariPokemoniInfo = async (url) => {
    const pokemoniInfo = await fetch(url)
    setValitudPokemon(await pokemoniInfo.json())
  }
  console.log(valitudPokemon && valitudPokemon.id)
  if (valitudPokemon != null) return (
    <div className="App">
      <Pais />
      <a onClick={() => { setValitudPokemon(undefined) }}>Kustuta valitud pokemon</a>
      <br />
      <br />
      <PokemoniInfo pokemon={valitudPokemon} />
      <div onClick={() => { pariPokemoniInfo(`https://pokeapi.co/api/v2/pokemon/${valitudPokemon.id - 1}`) }}>Eelmine</div>
      <div onClick={() => { pariPokemoniInfo(`https://pokeapi.co/api/v2/pokemon/${valitudPokemon.id + 1}`) }}>Järgmine</div>
    </div>
  )

  return (
    <div className="App">
      <Pais />
      <PokemonideList pokemonid={pokemonid} pariPokemoniInfo={pariPokemoniInfo} />
      <br />
      <br />
      <div>
        {eelmineUrl ? <span onClick={() => { pariPokemonid(eelmineUrl) }}>{'<'} Eelmine leht</span> : null}
        <span> | </span>
        {jargmineUrl ? <span className="jargmineNupp" onClick={() => { pariPokemonid(jargmineUrl) }}>Järgmine leht {'>'}</span> : null}
      </div>
    </div>
  )
}

export default App
