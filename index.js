var oneDegree = Math.PI / 180;
var rotX = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(Math.PI * -.25, 0, 0));
var rotZ = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, 0, Math.PI * -.30411));
var rgbToHslMatrix = new THREE.Matrix4().multiply(rotZ).multiply(rotX);
var hslToRgbMatrix = new THREE.Matrix4().getInverse(rgbToHslMatrix);
var littleHueLeftMatrix = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(oneDegree*2, 0, 0));
var littleHueRightMatrix = new THREE.Matrix4().getInverse(littleHueLeftMatrix);
var littleSatMatrix = new THREE.Matrix4().makeScale(1, 1.01, 1.01);
var littleDesatMatrix = new THREE.Matrix4().getInverse(littleSatMatrix);
var littleBrighterMatrix = new THREE.Matrix4().makeTranslation(.01, 0, 0);
var littleDarkerMatrix = new THREE.Matrix4().getInverse(littleBrighterMatrix);


function Color3D() {
	if(arguments.length == 0) THREE.Color.call(this, 0xffffff);
	if(arguments.length == 1) THREE.Color.call(this, arguments[0]);
	if(arguments.length == 3) THREE.Color.call(this, arguments[0], arguments[1], arguments[2]);
	this.rgb = new THREE.Vector3(this.r, this.g, this.b);
	this.hsl = this.rgb.clone().applyMatrix4(rgbToHslMatrix);
}

Color3D.prototype = Object.create( THREE.Color.prototype );

Color3D.prototype.getHue = function() {
	return (-Math.atan2(
		this.hsl.y,
		this.hsl.z
	) + Math.PI * 1.5) % (Math.PI * 2);
}
Color3D.prototype.getSat = function() {
	return Math.sqrt(Math.pow(this.hsl.y, 2) + Math.pow(this.hsl.z, 2));
}
Color3D.prototype.getVal = function() {
	return this.hsl.x / 1.72;
}

Color3D.prototype.setHue = function(val) {
	val = -val + Math.PI * 1.5;
	var len = Math.sqrt(Math.pow(this.hsl.y, 2) + Math.pow(this.hsl.z, 2));
	this.hsl.y = Math.sin(val) * len;
	this.hsl.z = Math.cos(val) * len;
	this.updateRGB();
}
Color3D.prototype.setSat = function(val) {
	var angle = Math.atan2(this.hsl.y, this.hsl.z);
	this.hsl.y = Math.sin(angle) * val;
	this.hsl.z = Math.cos(angle) * val;
	this.updateRGB();
}
Color3D.prototype.setVal = function(val) {
	this.hsl.x = val * 1.72;
	this.updateRGB();
}

Color3D.prototype.updateRGB = function() {
	// // console.log(~~(this.getHue()/oneDegree), this.getSat(), this.getVal());
	this.rgb.copy(this.hsl).applyMatrix4(hslToRgbMatrix);
	this.r = this.rgb.x;
	this.g = this.rgb.y;
	this.b = this.rgb.z;
}

Color3D.prototype.updateHSL = function() {
	this.hsl.copy(this.rgb).applyMatrix4(rgbToHslMatrix);
}

Color3D.prototype.bumpRGB = function(r, g, b) {
	// // console.log(~~(this.getHue()/oneDegree), this.getSat(), this.getVal());
	this.rgb.x += r;
	this.rgb.y += g;
	this.rgb.z += b;
	this.updateHSL();
	this.updateRGB();
}

module.exports = Color3D;