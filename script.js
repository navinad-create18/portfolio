import * as THREE from 'three';

import { OrbitControls } from './src/OrbitControls.js';
import { Font } from "./src/FontLoader.js";
import { TTFLoader } from "./src/TTFLoader.js";
import { TextGeometry } from "./src/TextGeometry.js";

//for periodic table
import TWEEN from './src/tween.module.js';
import { CSS3DRenderer, CSS3DObject } from './src/CSS3DRenderer.js';

// text variables
let font;
let text = "Navina";
let textGeo;
let materials;
let textMesh1;
let group;


//from tutourial here: https://threejs.org/manual/?q=sce#en/multiple-scenes
function main() {

	const canvas = document.createElement( 'canvas' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas, alpha: true } );

	document.body.appendChild(renderer.domElement);
	renderer.domElement.style.display = 'none';
	renderer.setScissorTest( true );

	const sceneElements = [];
	function addScene( elem, fn ) {

		const ctx = document.createElement( 'canvas' ).getContext( '2d' );
		elem.appendChild( ctx.canvas );
		sceneElements.push( { elem, ctx, fn } );

	}

	function makeScene( elem ) {

		const scene = new THREE.Scene();

		const fov = 45;
		const aspect = 2; // the canvas default
		const near = 0.1;
		const far = 5;
		const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
		camera.position.set( 0, 1, 2 );
		camera.lookAt( 0, 0, 0 );
		scene.add( camera );

		const controls = new OrbitControls( camera, elem );
		controls.enableZoom = true;
		controls.enablePan = false;

		{

			const color = 0xFFFFFF;
			const intensity = 3;
			const light = new THREE.DirectionalLight( color, intensity );
			light.position.set( - 1, 2, 4 );
			camera.add( light );

		}

		return { scene, camera, controls };

	}

	const sceneInitFunctionsByName = {
		'box': ( elem ) => {

			const { scene, camera, controls } = makeScene( elem );
			scene.background = new THREE.Color(0x1c2c8a);
			 // text

			// materials for the text
			materials = [
				new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
				new THREE.MeshPhongMaterial({ color: 0x5d176a }) // side
			];

			// establish font loader
			const loader = new TTFLoader();

			// use loader with desired ttf font
			loader.load("./assets/Righteous-Regular.ttf", function (json) {
				font = new Font(json);
				// see create text function below
				createText();
			});

			// add resulting shapes to scene
			group = new THREE.Group();
			//group.position.y = 100;
			//group.scale.set (10,10,10);

			scene.add(group);
			//const geometry = new THREE.BoxGeometry( 1, 1, 1 );
			//const material = new THREE.MeshPhongMaterial( { color: 'red' } );
			//const mesh = new THREE.Mesh( geometry, material );
			//scene.add( mesh );
			return ( time, rect ) => {

				//mesh.rotation.y = time * 0.1;
				camera.aspect = rect.width / rect.height;
				camera.updateProjectionMatrix();
				controls.update();
				renderer.render( scene, camera );

			};

		},
		//periodic table
		'pyramid': ( elem ) => {
			
			
			const scene = new THREE.Scene();
			scene.background = new THREE.Color(0x1c2c8a);
			const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 1000;
			
			
			const cssRenderer = new CSS3DRenderer();
				cssRenderer.setSize( elem.clientWidth, elem.clientHeight );
				elem.appendChild( cssRenderer.domElement );
			
			
			
			// Setup controls
                const controls = new OrbitControls( camera, cssRenderer.domElement );
                //controls.listenToKeyEvents( window ); 
                controls.enableDamping = true; 
                controls.dampingFactor = 0.05;
                controls.screenSpacePanning = false;
                controls.minDistance = 100;
                controls.maxDistance = 3000;
                controls.cursorStyle = 'grab';
                controls.maxPolarAngle = Math.PI / 2;
                controls.minPolarAngle = Math.PI /2;
			
			const objects = [];
			
			const targets = { table: [], helix: []};
			const table = [
				
				{Image: './assets/butterfly_ar_interactiveImage.png', Title: 'Butterfly AR', Year: '2026', 
				 popoverTitle: 'Butterfly AR', popoverText:'More details coming soon!', x: 8, y:4,},
			
				{Image: './assets/candle_render.png', Title: 'Ornate Candle', Year: '2025', 
				 popoverTitle: 'Ornate Candle', popoverText:'More details coming soon!', x: 9, y:4,},
				
				{Image: './assets/goldfish_sea.png', Title: 'Swimming Goldfish', Year: '2025', 
				 popoverTitle: 'Swimming Goldfish', popoverText:'More details coming soon!', x: 10, y:4,},
				
				{Image: './assets/memory_tree.png', Title: 'Memory Tree', Year: '2026', 
				 popoverTitle: 'Memory Tree', popoverText:'More details coming soon!', x: 11, y:4,},
				
				{Image: './assets/shiny_flamingo.png', Title: 'Flamingo Float', Year: '2026', 
				 popoverTitle: 'Flamingo Float', popoverText:'More details coming soon!', x: 12, y:4,},
				
				{Image: './assets/grasshopper_Unreal.png', Title: 'Grasshopper', Year: '2025', 
				 popoverTitle: 'Grasshopper', popoverText:'More details coming soon!', x: 8, y:5,},
				
				{Image: './assets/carts_render.png', Title: 'Shopping Carts', Year: '2025', 
				 popoverTitle: 'Shopping Carts', popoverText:'More details coming soon!', x: 9, y:5,},
				
				{Image: './assets/last_polarbear.png', Title: 'The Last Polar Bear', Year: '2026', 
				 popoverTitle: 'The Last Polar Bear', popoverText:'More details coming soon!', x: 10, y:5,},
				
				{Image: './assets/laundry_day.png', Title: 'Laundry Day', Year: '2026', 
				 popoverTitle: 'Laundry Day', popoverText:'More details coming soon!', x: 11, y:5,},
				
				{Image: './assets/herb_keeper.png', Title: 'Herb Keeper', Year: '2025', 
				 popoverTitle: 'Herb Keeper', popoverText:'More details coming soon!', x: 12, y:5,},
				
				{Image: './assets/orange_owl.png', Title: 'Low-Poly Owl', Year: '2024', 
				 popoverTitle: 'Low-Poly Owl', popoverText:'More details coming soon!', x: 8, y:6,},
				
				{Image: './assets/oven_cooking.png', Title: 'Digital Oven', Year: '2026', 
				 popoverTitle: 'Digital Oven', popoverText:'More details coming soon!', x: 9, y:6,},
				
				{Image: './assets/pear_party.png', Title: 'Pear Party', Year: '2026', 
				 popoverTitle: 'Pear Party', popoverText:'More details coming soon!', x: 10, y:6,},
				
				{Image: './assets/OvergrownRuins_CoverArt.png', Title: 'Overgrown Ruins', Year: '2026', 
				 popoverTitle: 'Overgrown Ruins', popoverText:'More details coming soon!', x: 11, y:6,},
				
				{Image: './assets/wood_totoro.png', Title: 'Nature Lantern', Year: '2024', 
				 popoverTitle: 'Nature Lantern', popoverText:'More details coming soon!', x: 12, y:6,},
				
				
			];
			
			init();
			
			
			function init() {

				// table

				for ( const item of table ) {

					const element = document.createElement( 'div' );
					element.className = 'element';
					element.pointerEvents = 'auto';
					element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

					//const number = document.createElement( 'div' );
					//number.className = 'number';
					//number.textContent = ( i / 5 ) + 1;
					//element.appendChild( number );

					const symbol = document.createElement( 'img' );
					symbol.className = 'symbol';
					symbol.src = item.Image;
					element.appendChild( symbol );

					const details = document.createElement( 'div' );
					details.className = 'details';
					details.innerHTML = item.Title + '<br>' + item.Year;
					element.appendChild( details );
					
					const objectCSS = new CSS3DObject( element );
					objectCSS.position.x = Math.random() * 4000 - 2000;
					objectCSS.position.y = Math.random() * 4000 - 2000;
					objectCSS.position.z = Math.random() * 4000 - 2000;
					scene.add( objectCSS );

					objects.push( objectCSS );
					
					const object = new THREE.Object3D();
					object.position.x = ( item.x * 140 ) - 1330;
					object.position.y = - ( item.y * 180 ) + 990;

					targets.table.push( object );
					
			//popover click

				let isDragging = false;

		element.addEventListener('pointerdown', () => {

			isDragging = false;

			controls.enabled = false;

		});

		element.addEventListener('pointermove', () => {

			isDragging = true;

		});

		element.addEventListener('pointerup', () => {


			if (isDragging) return;

			document.getElementById('projectTitle').textContent = item.popoverTitle;

			document.getElementById('projectText').textContent =
				item.popoverText;
			
			//document.getElementById('projectText').textContent =
			//	table[i].popoverImage;

			document.getElementById('elementPopover').showPopover();

		});


				}

				// sphere

				const vector = new THREE.Vector3();
//
				//for ( let i = 0, l = objects.length; i < l; i ++ ) {
//
				//	const phi = Math.acos( - 1 + ( 2 * i ) / l );
				//	const theta = Math.sqrt( l * Math.PI ) * phi;
//
				//	const object = new THREE.Object3D();
//
				//	object.position.setFromSphericalCoords( 800, phi, theta );
//
				//	vector.copy( object.position ).multiplyScalar( 2 );
//
				//	object.lookAt( vector );
//
				//	targets.sphere.push( object );
//
				//}

				// helix

				for ( let i = 0, l = objects.length; i < l; i ++ ) {

					const theta = i * 1.5 + Math.PI;
					const y = 100;

					const object = new THREE.Object3D();

					object.position.setFromCylindricalCoords( 500, theta, y );

					vector.x = object.position.x*2;
					vector.y = object.position.y;
					vector.z = object.position.z*2;

					object.lookAt( vector );

					targets.helix.push( object );

				}

				// grid

				//for ( let i = 0; i < objects.length; i ++ ) {
//
				//	const object = new THREE.Object3D();
//
				//	object.position.x = ( ( i % 5 ) * 400 ) - 800;
				//	object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
				//	object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
//
				//	targets.grid.push( object );
//
				//}

				//

				

				//
			
	

				//const buttonTable = document.getElementById( 'table' );
				//buttonTable.addEventListener( 'click', function () {
//
				//	transform( targets.table, 2000 );
//
				//} );

				//const buttonSphere = document.getElementById( 'sphere' );
				//buttonSphere.addEventListener( 'click', function () {
//
				//	transform( targets.sphere, 2000 );
//
				//} );

				const buttonHelix = document.getElementById( 'helix' );
				if (buttonHelix) {

					buttonHelix.addEventListener('click', () => {

						transform(targets.helix, 2000);

					});
				}
				//const buttonGrid = document.getElementById( 'grid' );
				//buttonGrid.addEventListener( 'click', function () {
//
				//	transform( targets.grid, 2000 );
//
				//} );

				transform( targets.table, 2000 );

				//

				window.addEventListener( 'resize', onWindowResize );

			
			
			document.getElementById ('closeButton').addEventListener('click', ()=>{
				document.getElementById('elementPopover').hidePopover();
			 });

			function transform( targets, duration ) {

				TWEEN.removeAll();

				for ( let i = 0; i < objects.length; i ++ ) {

					const object = objects[ i ];
					const target = targets[ i ];

					new TWEEN.Tween( object.position )
						.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();

					new TWEEN.Tween( object.rotation )
						.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();

				}

				new TWEEN.Tween( this )
					.to( {}, duration * 2 )
					.start();
                
			}
			
			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				cssRenderer.setSize( window.innerWidth, window.innerHeight );

				//cssRenderer();

			}
			
			//const radius = 0.8;
			//const widthSegments = 4;
			//const heightSegments = 2;
			//const geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments );
			//const material = new THREE.MeshPhongMaterial( {
			//	color: 'blue',
			//	flatShading: true,
			//} );
			//const mesh = new THREE.Mesh( geometry, material );
			//scene.add( mesh );

			//return ( time, rect ) => {
//
			//	//mesh.rotation.y = time * 0.1;
			//	camera.aspect = rect.width / rect.height;
			//	camera.updateProjectionMatrix();
			//	controls.update();
			//	renderer.render( scene, camera );
//
			//};
				
		}
			return ( time, rect ) => {

				//mesh.rotation.y = time * 0.1;
				camera.aspect = rect.width / rect.height;
				camera.updateProjectionMatrix();
				controls.update();
				
				TWEEN.update();
				cssRenderer.setSize( rect.width, rect.height );
				cssRenderer.render( scene, camera );

			};
	}
};

	document.querySelectorAll( '[data-diagram]' ).forEach( ( elem ) => {

		const sceneName = elem.dataset.diagram;
		const sceneInitFunction = sceneInitFunctionsByName[ sceneName ];
		const sceneRenderFunction = sceneInitFunction( elem );
		addScene( elem, sceneRenderFunction );

	} );

	// Function to generate text shapes
function createText() {
    // create geomtery with parameters, change parameters to test modifications
    // "text" on next line is the message to be written
    textGeo = new TextGeometry(text, {
        font: font,
        size: 0.5,
        depth: 0.1
        //curveSegments: 4,
        //bevelThickness: 2,
        //bevelSize: 1.5,
        //bevelEnabled: true
    });

    // finish making geometry
    textGeo.computeBoundingBox();
    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    // apply material to geometry
    textMesh1 = new THREE.Mesh(textGeo, materials);

    // set position and rotation
    textMesh1.position.x = centerOffset;
    textMesh1.position.z = 0;
    textMesh1.position.y = -0.2;
    textMesh1.rotation.x = Math.PI * -0.13;

    // add to group to be added to scene
    group.add(textMesh1);
}

	function render( time ) {

		time *= 0.001;

		for ( const { elem, fn, ctx } of sceneElements ) {
			
			// get the viewport relative position of this element
			const rect = elem.getBoundingClientRect();
			const { left, right, top, bottom, width, height } = rect;
			const rendererCanvas = renderer.domElement;
			
			if (elem.dataset.diagram === 'pyramid') {

				fn(time, rect);
				continue;

			}

			const isOffscreen =
          bottom < 0 ||
          top > window.innerHeight ||
          right < 0 ||
          left > window.innerWidth;

			if ( ! isOffscreen ) {

				// make sure the renderer's canvas is big enough
				if ( rendererCanvas.width < width || rendererCanvas.height < height ) {

					renderer.setSize( width, height, false );

				}

				// make sure the canvas for this area is the same size as the area
				if ( ctx.canvas.width !== width || ctx.canvas.height !== height ) {

					ctx.canvas.width = width;
					ctx.canvas.height = height;

				}

				renderer.setScissor( 0, 0, width, height );
				renderer.setViewport( 0, 0, width, height );

				fn( time, rect );

				// copy the rendered scene to this element's canvas
				ctx.globalCompositeOperation = 'copy';
				ctx.drawImage(
					rendererCanvas,
					0, rendererCanvas.height - height, width, height, // src rect
					0, 0, width, height ); // dst rect

			}

		}

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

main();