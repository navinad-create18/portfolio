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
			scene.background = new THREE.Color(0x7067d5);
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

			const { scene, camera, controls } = makeScene( elem );
			scene.background = new THREE.Color(0x060326);
			
			
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

			return ( time, rect ) => {

				//mesh.rotation.y = time * 0.1;
				camera.aspect = rect.width / rect.height;
				camera.updateProjectionMatrix();
				controls.update();
				renderer.render( scene, camera );

			};

		},
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