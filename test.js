var loadAndRunScripts = require('loadandrunscripts');
var ManagedView = require('threejs-managed-view');

function onReady() {
	var Color3D = require('./');
	var MaterialPreview = require('threejs-material-preview');
	var view = new ManagedView.View({
		stats:true
	});

	var totalColors = 30;
	var materials = [];

	//start with any color.
	var color = new Color3D(Math.random(), Math.random(), Math.random());
	//set saturation and value
	color.setVal(.5);
	color.setSat(.5);

	for (var i = 0; i < totalColors; i++) {
		materials[i] = new THREE.MeshBasicMaterial({
			color: color.clone()
		})
		color.setHue(color.getHue() + Math.PI*2/totalColors);
		//Saturation
		color.setSat(i/totalColors);
	};
	console.log(MaterialPreview);
	var matRing = new MaterialPreview.Ring(materials);
	view.scene.add(matRing);

	color.setSat(.5);
	for (var i = 0; i < totalColors; i++) {
		materials[i] = new THREE.MeshBasicMaterial({
			color: color.clone()
		})
		//Hue
		color.setHue(color.getHue() + Math.PI*2/totalColors);
	};
	console.log(MaterialPreview);
	matRing = new MaterialPreview.Ring(materials);
	matRing.position.y = .25;
	view.scene.add(matRing);

	for (var i = 0; i < totalColors; i++) {
		materials[i] = new THREE.MeshBasicMaterial({
			color: color.clone()
		})
		color.setHue(color.getHue() + Math.PI*2/totalColors);
		//Value
		color.setVal(i/totalColors*2-.5);
	};
	console.log(MaterialPreview);
	matRing = new MaterialPreview.Ring(materials);
	matRing.position.y = -.25;
	view.scene.add(matRing);
}

loadAndRunScripts(
	[
		'bower_components/three.js/three.js',
		'lib/stats.min.js',
		'lib/threex.rendererstats.js'
	],
	onReady
);

