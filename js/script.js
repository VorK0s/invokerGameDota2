document.addEventListener('DOMContentLoaded', () => {
	const spheres = document.querySelectorAll('.sphere')
	const read_spheres = document.querySelector('.read_sphere')
	const clicked_spheres = document.querySelectorAll('.clicked_sphere')
	const skillBG = document.getElementById('spellBG')
	const spellElements = [
		document.getElementById('cold_snap'),
		document.getElementById('ghost_walk'),
		document.getElementById('ice_wall'),
		document.getElementById('emp'),
		document.getElementById('alacrity'),
		document.getElementById('tornado'),
		document.getElementById('sun_strike'),
		document.getElementById('forge_spirits'),
		document.getElementById('chaos_meteor'),
		document.getElementById('deafening_blast'),
	]
	const spellCombinations = {
	    '3,0,0': 0, // quas >= 3
	    '0,3,0': 3, // wex >= 3
	    '0,0,3': 6, // exort >= 3
	    '2,1,0': 1, // quas === 2 && wex === 1
	    '2,0,1': 2, // quas === 2 && exort === 1
	    '1,2,0': 5, // quas === 1 && wex === 2
	    '0,2,1': 4, // wex === 2 && exort === 1
	    '0,1,2': 8, // wex === 1 && exort === 2
	    '1,0,2': 7, // exort === 2 && quas === 1
	    '1,1,1': 9  // quas === 1 && wex === 1 && exort === 1
	};
	const sphereTypes = ['quas', 'wex', 'exort']
	let active_spheres = []
	
	function hideAllSpells() {
		spellElements.forEach(element => {
			if (element) {
				element.classList.add('hide')
			}
		})
	}
	
	function updateClickedSpheres(newSphere, imgPath, type) {
		active_spheres.unshift({ sphere: newSphere, imgPath: imgPath, type: type })
	
		if (active_spheres.length > 3) {
			active_spheres.pop()
		}
	
		console.log('Active spheres:', active_spheres)
	
		clicked_spheres.forEach(clicked_sphere => {
			const img = clicked_sphere.querySelector('img')
			img.classList.add('hide')
		})
	
		active_spheres.forEach((activeElement, index) => {
			const clicked_sphere = clicked_spheres[index]
			const img = clicked_sphere.querySelector('img')
		
			console.log(`Updating sphere ${index} with`, activeElement.imgPath)
			img.src = activeElement.imgPath
			img.classList.remove('hide')
		
			sphereTypes.forEach((type, index) => {
				const hasType = active_spheres.some(
					activeElement => activeElement.type === type
				)
				spheres[index].classList.toggle('clicked', hasType)
			})
		})
	}
	
	
	
	document.addEventListener('keydown', e => {
		if (e.key === 'q' || e.key === 'й') {
			updateClickedSpheres(spheres[0], '../img/spheres/quas.png', 'quas')
		}
	})
	
	document.addEventListener('keydown', e => {
		if (e.key === 'w' || e.key === 'ц') {
			updateClickedSpheres(spheres[1], '../img/spheres/wex.png', 'wex')
		}
	})
	
	document.addEventListener('keydown', e => {
		if (e.key === 'e' || e.key === 'у') {
			updateClickedSpheres(spheres[2], '../img/spheres/exort.png', 'exort')
		}
	})
	
	document.addEventListener('keydown', e => {
		if (e.key === 'r' || e.key === 'к') {
			read_spheres.classList.add('clicked')
			const quas = active_spheres.filter(activeElement => activeElement.type === 'quas').length;
			const wex = active_spheres.filter(activeElement => activeElement.type === 'wex').length;
			const exort = active_spheres.filter(activeElement => activeElement.type === 'exort').length;
			hideAllSpells();
			const combinationKey = `${quas},${wex},${exort}`
			const spellIndex = spellCombinations[combinationKey]
			if (spellIndex !== undefined) {
				spellElements[spellIndex].classList.remove('hide')
				skillBG.classList.add('hide')
			}
			setTimeout(() => {
				read_spheres.classList.remove('clicked')
			}, 200)
		}
	})
})