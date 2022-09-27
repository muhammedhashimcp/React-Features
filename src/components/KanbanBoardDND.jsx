import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
const itemsFromBackend = [
	{ id: uuid(), content: 'First task' },
	{ id: uuid(), content: 'Second task' },
	{ id: uuid(), content: 'Third task' },
	{ id: uuid(), content: 'Fourth task' },
	{ id: uuid(), content: 'Fifth task' },
];

const columnsFromBackend = {
	[uuid()]: {
		name: 'Requested',
		items: itemsFromBackend,
	},
	[uuid()]: {
		name: 'To do',
		items: [],
	},
	[uuid()]: {
		name: 'In Progress',
		items: [],
	},
	[uuid()]: {
		name: 'Done',
		items: [],
	},
};

const onDragEnd = (result, columns, setColumns) => {
	if (!result.destination) return;
	const { source, destination } = result;

	if (source.droppableId !== destination.droppableId) {
		const sourceColumn = columns[source.droppableId];
		const destColumn = columns[destination.droppableId];
		const sourceItems = [...sourceColumn.items];
		const destItems = [...destColumn.items];
		const [removed] = sourceItems.splice(source.index, 1);
		destItems.splice(destination.index, 0, removed);
		setColumns({
			...columns,
			[source.droppableId]: {
				...sourceColumn,
				items: sourceItems,
			},
			[destination.droppableId]: {
				...destColumn,
				items: destItems,
			},
		});
	} else {
		const column = columns[source.droppableId];
		const copiedItems = [...column.items];
		const [removed] = copiedItems.splice(source.index, 1);
		copiedItems.splice(destination.index, 0, removed);
		setColumns({
			...columns,
			[source.droppableId]: {
				...column,
				items: copiedItems,
			},
		});
	}
};

function KanbanBoardDND() {
	const [columns, setColumns] = useState(columnsFromBackend);
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				height: '100%',
			}}
		>
			<DragDropContext
				onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
			>
				{Object.entries(
					columns.map(([id, column]) => {
						return (
							<Droppable droppableId={id}>
								{(provided, snapshot) => {
									return (
										<div
											{...provided.droppableProps}
											ref={provided.innerRef}
											style={{
												background:
													snapshot.isDraggingOver
														? 'lightblue'
														: 'lightgrey',
												padding: 0,
												width: 250,
												minHeight: 500,
											}}
										>
											{column.items.map((item, index) => {
												return (
													<Draggable
														key={item.id}
														draggableId={item.id}
														index={index}
													>
														{(
															provided,
															snapshot
														) => {
															return (
																<div
																	ref={
																		provided.innerRef
																	}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	style={{
																		userSelect:
																			'none',
																		padding: 16,
																		margin: '0 0 8px 0',
																		minHeight:
																			'50px',
																		backgroundColor:
																			snapshot.isDragging
																				? '#263B4A'
																				: '#456CB6',
																		color: 'white',
																		...provided
																			.draggableProps
																			.style,
																	}}
																	// className={`userSelect-none p-16 m-0 mt-2 min-h-50 snapshot.isDragging?bg-[#263b4A]:'bg-[]'`}
																>
																	{
																		item.content
																	}
																</div>
															);
														}}
													</Draggable>
												);
											})}
										</div>
									);
								}}
							</Droppable>
						);
					})
				)}
			</DragDropContext>
		</div>
	);
}

export default KanbanBoardDND;

// code from origin https://youtu.be/Vqa9NMzF3wc
// https:codesandbox.io/s/jovial-leakey-i0ex5?file=/src/App.js:0-4811
