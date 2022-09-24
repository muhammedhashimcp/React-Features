import React, { useState } from 'react';
import './App.css';
import Fuse from 'fuse.js';

import characters from './characters.json';

function App() {
	const [query,setQuery]=useState('')
	const fuse = new Fuse(characters, {
		keys: ['name', 'company', 'species'],
		includeScores: true,
	});

	console.log(fuse);
	const results = fuse.search(query);
	console.log('🚀 ~ file: App.js ~ line 19 ~ App ~ results', results);
	const characterResults =query? results.map(result => result.item):characters
	
	const handleOnSearch = ({ currentTarget = {} }) => {
		const {value}=currentTarget
		setQuery(value)
	}
	return (
		<>
			<header className="App-header">
				<div className="container">
					<h1>Futurama Characters</h1>
				</div>
			</header>

			<main className="container">
				<ul className="characters">
					{characterResults.map((character) => {
						const { name, company, species, thumb } = character;
						return (
							<li key={name} className="character">
								<span
									className="character-thumb"
									style={{
										backgroundImage: `url(${thumb})`,
									}}
								/>
								<ul className="character-meta">
									<li>
										<strong>Name:</strong> {name}
									</li>
									<li>
										<strong>Company:</strong> {company}
									</li>
									<li>
										<strong>Species:</strong> {species}
									</li>
								</ul>
							</li>
						);
					})}
				</ul>
				<aside>
					<form className="search">
						<label>Search</label>
						<input type="text" value={query} onChange={handleOnSearch} />
					</form>
				</aside>
			</main>

			<footer>
				<div className="container">
					<p>
						Images from{' '}
						<a href="http://www.cc.com/shows/futurama">Futurama</a>{' '}
						via{' '}
						<a href="https://futurama.fandom.com/">
							futurama.fandom.com
						</a>
					</p>
				</div>
			</footer>
		</>
	);
}

export default App;
