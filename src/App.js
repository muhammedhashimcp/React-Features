import React, { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const finalSpaceCharacters = [
	{
		id: 'gary',
		name: 'Gary Goodspeed',
		thumb: '/images/gary.png',
	},
	{
		id: 'cato',
		name: 'Little Cato',
		thumb: '/images/cato.png',
	},
	{
		id: 'kvn',
		name: 'KVN',
		thumb: '/images/kvn.png',
	},
	{
		id: 'mooncake',
		name: 'Mooncake',
		thumb: '/images/mooncake.png',
	},
	{
		id: 'quinn',
		name: 'Quinn Ergon',
		thumb: '/images/quinn.png',
	},
];

function App() {
	const [characters, updateCharacters] = useState(finalSpaceCharacters);
	const handleOnDragEnd = (result) => {
		console.log(result);
		if(!result.destination) return 
		const items = Array.from(characters);
		// find out the moved item and save as reordered item
		const [reorderedItem] = items.splice(result.source.index, 1);
		// find the destination for the moved item and insert in the destination
		items.splice(result.destination.index, 0, reorderedItem);
		// update the array (set caracter item)
		updateCharacters(items);
	};
	return (
		<div className="App">
			<header className="App-header">
				<h1>Final Space Characters</h1>
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId="characters">
						{(provided) => {
							<ul
								className="characters"
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{characters.map(
									({ id, name, thumb }, index) => {
										return (
											<Draggable
												key={id}
												draggableId={id}
												index={index}
											>
												{(provided) => (
													<li
														key={id}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<div className="characters-thumb">
															<img
																src={thumb}
																alt={`${name} Thumb`}
															/>
														</div>
														<p>{name}</p>
													</li>
												)}
											</Draggable>
										);
									}
								)}
								{provided.placeholder}
							</ul>;
						}}
					</Droppable>
				</DragDropContext>
			</header>
			<p>
				Images from{' '}
				<a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">
					Final Space Wiki
				</a>
			</p>
		</div>
	);
}

export default App;
