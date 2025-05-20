(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.sun = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFFFF","rgba(255,255,255,0)"],[0,1],0,0,0,0,0,73.6).s().p("AoAIBQjUjVAAksQAAkrDUjVQDVjUErAAQEsAADVDUQDUDVAAErQAAEsjUDVQjVDUksAAQkrAAjVjUg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.sun, new cjs.Rectangle(-72.5,-72.5,145,145), null);


(lib.beam2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FFFFFF","rgba(255,255,255,0)"],[0,1],0.6,-52.2,1.1,52.9).s().p("AhWIlQAtolA3okIBIRJg");
	this.shape.setTransform(8.7,55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0.1,17.3,109.9);


(lib.sunlight = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// sun
	this.instance = new lib.sun();
	this.instance.parent = this;
	this.instance.setTransform(0,0,0.412,0.412);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.09,scaleY:1.09},133).to({scaleX:0.41,scaleY:0.41},157).wait(1));

	// sun
	this.instance_1 = new lib.sun();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,0,1.087,1.087);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleX:0.41,scaleY:0.41},133).to({scaleX:1.09,scaleY:1.09},157).wait(1));

	// sun
	this.instance_2 = new lib.sun();
	this.instance_2.parent = this;
	this.instance_2.setTransform(0,0,2.287,2.287);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(291));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-165.8,-165.8,331.6,331.6);


(lib.beam = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.beam2("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(0.1,54.8,1,1,0,0,0,8.7,55);
	this.instance.alpha = 0.711;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.6,-0.2,17.3,109.9);


(lib.beam3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.beam("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(9.4,0.7,1,0.664,-8.5,0,0,0.7,0.9);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:0.8,rotation:0,alpha:1},24,cjs.Ease.get(1)).to({rotation:5.1,alpha:0},35,cjs.Ease.get(-1)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(10,-0.1,18,73.6);


(lib.sunlight_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.sunlight();
	this.instance.parent = this;
	this.instance.setTransform(-25.1,99.8);

	this.k10 = new lib.beam3();
	this.k10.name = "k10";
	this.k10.parent = this;
	this.k10.setTransform(-26.5,102,1.073,1.79,0,0.3,0.5,8.3,0.7);

	this.k9 = new lib.beam3();
	this.k9.name = "k9";
	this.k9.parent = this;
	this.k9.setTransform(-26.5,98.7,1.068,2.004,0,96.8,93.8,8.4,0.6);

	this.k8 = new lib.beam3();
	this.k8.name = "k8";
	this.k8.parent = this;
	this.k8.setTransform(-23.3,96.9,1.627,3.29,0,162.3,150.4,8.2,0.6);

	this.kl7 = new lib.beam3();
	this.kl7.name = "kl7";
	this.kl7.parent = this;
	this.kl7.setTransform(-23.1,100.3,0.943,2.369,0,-144,-127.7,8.3,0.6);

	this.k6 = new lib.beam3();
	this.k6.name = "k6";
	this.k6.parent = this;
	this.k6.setTransform(-23.6,101.8,1.387,2.735,0,-56.6,-69.6,9.7,0.4);

	this.k5 = new lib.beam3();
	this.k5.name = "k5";
	this.k5.parent = this;
	this.k5.setTransform(-24.8,98,1.339,1.496,0,131.1,116.1,8.3,0.7);

	this.k4 = new lib.beam3();
	this.k4.name = "k4";
	this.k4.parent = this;
	this.k4.setTransform(-23.3,99.2,0.838,2.607,0,-165.2,-154.9,8.5,0.6);

	this.k3 = new lib.beam3();
	this.k3.name = "k3";
	this.k3.parent = this;
	this.k3.setTransform(-23.4,103.8,2.056,2.565,0,-94.6,-92.6,8.3,0.5);

	this.k2 = new lib.beam3();
	this.k2.name = "k2";
	this.k2.parent = this;
	this.k2.setTransform(-25.4,103.2,0.865,2.56,0,-20.3,-33.4,8.3,0.6);

	this.k1 = new lib.beam3();
	this.k1.name = "k1";
	this.k1.parent = this;
	this.k1.setTransform(-24.7,98.3,1.275,1.298,0,35.1,51.3,9.1,-1.6);

	this.l10 = new lib.beam3();
	this.l10.name = "l10";
	this.l10.parent = this;
	this.l10.setTransform(-27.3,107.2,3.133,4.473,0,-24.2,-38.7,8.3,0.7);

	this.l9 = new lib.beam3();
	this.l9.name = "l9";
	this.l9.parent = this;
	this.l9.setTransform(-30.3,99,2.72,5.702,0,56.6,69.7,8.3,0.6);

	this.l8 = new lib.beam3();
	this.l8.name = "l8";
	this.l8.parent = this;
	this.l8.setTransform(-25.2,89.4,5.031,7.632,0,133.7,118.2,8.3,0.6);

	this.l7 = new lib.beam3();
	this.l7.name = "l7";
	this.l7.parent = this;
	this.l7.setTransform(-21.1,96.3,2.177,7.019,0,-170.3,-163.2,8.4,0.6);

	this.l6 = new lib.beam3();
	this.l6.name = "l6";
	this.l6.parent = this;
	this.l6.setTransform(-21.2,101.4,3.851,6.79,0,-96.7,-93.8,9.6,0.4);

	this.l5 = new lib.beam3();
	this.l5.name = "l5";
	this.l5.parent = this;
	this.l5.setTransform(-28.1,94.3,3.819,3.582,0,92.4,91.4,8.3,0.7);

	this.l4 = new lib.beam3();
	this.l4.name = "l4";
	this.l4.parent = this;
	this.l4.setTransform(-22.5,94.1,2.174,7.036,0,171,164.2,8.3,0.6);

	this.l3 = new lib.beam3();
	this.l3.name = "l3";
	this.l3.parent = this;
	this.l3.setTransform(-17,104,5.063,7.625,0,-132.9,-117.5,8.3,0.6);

	this.l2 = new lib.beam3();
	this.l2.name = "l2";
	this.l2.parent = this;
	this.l2.setTransform(-23.6,107.3,2.673,5.901,0,-49.8,-64.6,8.3,0.6);

	this.l1 = new lib.beam3();
	this.l1.name = "l1";
	this.l1.parent = this;
	this.l1.setTransform(-26.5,95.3,2.947,3.834,0,8.9,15.5,9.1,-1.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.l1},{t:this.l2},{t:this.l3},{t:this.l4},{t:this.l5},{t:this.l6},{t:this.l7},{t:this.l8},{t:this.l9},{t:this.l10},{t:this.k1},{t:this.k2},{t:this.k3},{t:this.k4},{t:this.k5},{t:this.k6},{t:this.kl7},{t:this.k8},{t:this.k9},{t:this.k10},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.sunlight_1, new cjs.Rectangle(-459.8,-410.8,931.2,810), null);


// stage content:
(lib.Element_nature_sun_small_Canvas = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.sunlight_1();
	this.instance.parent = this;
	this.instance.setTransform(205.2,166.4,0.359,0.359);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(239.9,218.8,334.5,290.9);
// library properties:
lib.properties = {
	id: '67F533971884A644BD591B88E10BC42D',
	width: 400,
	height: 400,
	fps: 24,
	color: "#CCCCCC",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['67F533971884A644BD591B88E10BC42D'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;