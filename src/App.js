import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Chip } from '@mui/material';

function App() {
	const [pokemons, setPokemons] = useState()
	const [toggleTab, setToggleTab] = useState()

	const getPokemons = async () => {
		const pokemons = []
		for (let i = 1; i < 11; i++) {
			const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
			pokemons.push(response.data)
		}
		setPokemons(pokemons)
		setToggleTab(pokemons[0])
	}

	useEffect(() => {
		getPokemons()
	}, [])


	return (
		<div className='container'>
			<div className='pokemon'>
				<div className='pokemon__options'>
					{
						pokemons &&
						pokemons.map(pokemon => {
							return (
								<div
									className='pokemon__option'
									key={pokemon.id}
									onClick={() => setToggleTab(pokemon)}
								>
									<Chip color="info" label={pokemon.name} />
								</div>
							)
						})
					}
				</div>
				<div className='pokemon__info'>
					{
						toggleTab &&
						<div>
							<h1 className='pokemon__title'>{toggleTab.name}</h1>
							<div className='pokemon__img'>
								<img src={toggleTab.sprites.front_default} alt='' />
							</div>
							<div className='pokemon__description'>id: {toggleTab.id}</div>
							<div className='pokemon__description'>heigth: {toggleTab.height}</div>
							<div className='pokemon__description'>weight: {toggleTab.weight}</div>
							<div className='pokemon__description'>attack: {toggleTab.stats[1].base_stat}</div>
						</div>
					}
				</div>
			</div >
		</div>

	);
}

export default App;
