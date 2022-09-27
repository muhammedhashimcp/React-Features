import React, { useState } from 'react';
import './App.css';

function App() {
	const [tags, setTags] = useState([]);
	const addTag = (e) => {
		console.log(e.target.value, e.key);
		if (e.key === 'Enter') {
			console.log('inside the enter');
			if (e.target.value.length > 0) {
				setTags([...tags, e.target.value]);
				console.log(tags);
			}
			e.target.value = '';
		}
	};
	const removeTag = (removedTag) => {
		console.log(removedTag,'hello');
		const newTags = tags.filter((tag) => tag !== removedTag);
		setTags(newTags);
	};
	// console.log(tags);

	return (
		<div className="App">
			<h1>Tag input with React</h1>
			<div className="tag-container">
				{tags.map((tag, index) => (
					<div key={index} className="tag">
						{tag}
						<span onClick={() => removeTag(tag)}>x</span>
					</div>
				))}

				<input type="text" onKeyDown={addTag} />
			</div>
		</div>
	);
}

export default App;
