import React, { useEffect, useRef, useState } from 'react';
const App = () => {
	const [image, setImage] = useState();
	const [preview, setPreview] = useState();
	const fileInputRef = useRef(null);
	useEffect(() => {
		if (image) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(image);
		} else {
			setPreview(null);
		}
	}, [image]);
	return (
		<div>
			<form>
				{preview ? (
					<img src={preview} alt='' onClick={() => {
						setImage(null)
				}} />
				) : (
					<button
						onClick={(event) => {
							event.preventDefault();
							fileInputRef.current.click();
						}}
					>
						Add image
					</button>
				)}

				<input
					type="file"
					style={{ display: 'none' }}
					accept="image/*"
					ref={fileInputRef}
					onChange={(event) => {
						const file = event.target.files[0];
						if (file && file.type.substr(0, 5) === 'image') {
							setImage(file);
						} else {
							setImage(null);
						}
					}}
				/>
			</form>
		</div>
	);
};

export default App;
