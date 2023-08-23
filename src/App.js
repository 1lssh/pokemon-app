import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Chip } from '@mui/material';

function App() {
	const [pokemons, setPokemons] = useState()
	const [currentItem, setCurrentItem] = useState()

	const getPokemons = async () => {
		const pokemons = []
		for (let i = 1; i < 11; i++) {
			const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
			pokemons.push(response.data)
		}
		setPokemons(pokemons)
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
									onClick={() => setCurrentItem(pokemon)}
								>
									<Chip color="info" label={pokemon.name} />
								</div>
							)
						})
					}
				</div>
				{
					currentItem &&
					<div className='pokemon__info'>
						<div>
							<h1 className='pokemon__title'>{currentItem.name}</h1>
							<div className='pokemon__img'>
								<img src={currentItem.sprites.front_default} alt='' />
							</div>
							<div className='pokemon__description'>id: {currentItem.id}</div>
							<div className='pokemon__description'>heigth: {currentItem.height}</div>
							<div className='pokemon__description'>weight: {currentItem.weight}</div>
							<div className='pokemon__description'>attack: {currentItem.stats[1].base_stat}</div>
						</div>

					</div>
				}
			</div >
		</div>

	);
}

export default App;
