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


(lib.staff = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhjHhIgEgCQgGgDgdADIgMgCIgNgCQg1AAhNgSQhOgRgkgUQAAgDgGgPQgCgIAJAAQAQhuAzg8QA+hICFgdQAOA9AfBTQAZBEARAlQAIgbAEgRIADgRIACgOIgIgWIgIgYIgDgWIgBgPIAAgRIBnAAIABAAIABAMQAAAUgDASQgFAZgLAPIAMBUIABABQAeg8ASgyQATg5AThVIACgBQCNAvBBBOQA4BEAABbQAAAEgIAKQgJALgJAEIgbAKIgcAIIgtALQgUAFg0AFQgvAEgBACIgaABIgdACIhuACIhFAAIgIgBgAm6CnQgJgCgUAAQgRAAgEgBIhVgLQhJgJgOgNQgOgMgCgNQgDgbAWg7QAbg/A1giQAmgYBMgVQAWBeAaA1QAYAxAVAHIAhAAQAigVADgEIAEgKIAKgVQALgUACgHQAHgeAfhYIABgBQATAFAAANQAAADgDAIQgDAJAAARQAAAYANAjQAHARAHAPIAjBAQgFAAhEAfQhJAhgTAPIhDAAIgiABIgNgCgAE6CoQgGgGgvgXQgrgUgNgFQgcgJgKgGQgIgEgNgLQANgSACgGIAEgJIAOgUIAOgWQAEgIAEgNIACgEIADgEQACgGAAgPIADgDIABgFIgIg5QAPgFANgGIAHgEIAEgBQAHAAAJAnIACAUQACASAGAMQAFAIgBAGQAAAEAGAGQAFAVAEAJIAOAYQADAHAPAMQASANACAEIAkAAQAhgUAdhDQAchCAAgyQBlATA9BFQAaAeAOAiQANAgAAAfQAAASgCAFQgDAJgMACIghANQgSAFgjAGQggAGgPABIAAACIgUABIgMACQgkACgGABIgaACgAgYCaQgigGgPgLIgVgOQgLgIgLgNQgFgHgHgMIgDgJIgGgNIgEgMQgCgIgKgKQgOgRgGgNQgHgOgJgmQgBAAgBgJQgBgJAAgLIADAAQAAgKAGgMIAMgXQABgFACgYIABgjQAEg3ArgkQAmggAzgEIAAgDIAVABIAUAAIAAACQAjABAYAKIAaAQQALAHAMAaIAMAaQAIAIAHAMQAIAMAAAIQABARADAHQADAGAAAHQAAAfAIAdIAIAbIgCARQgCAMgCAFQgFAQgGAMQgKAUgaAaQgQAygQARQgQAQgPAMQgcAVgRAAQgPAAgYgEgAFEhlQgYgHgSgTQgighgnhlQAAgDgGgSQgDgIALAAQgDgKAEgDIAHgGQAEgHgFgPQgDgGABgCQABgDAHAAQgFghAOggQALgXAPgOIAOgKQAPgLAKgEIARgEQANgCACgGIAuAAIAAAEQATgBAZAKQAaAKAMAQQAFAGAGAPIAIATQAEAFAFADIACARIAGAgQACAMgBAUQAAADAFAIIAFAMIACAGIACAKQAAAHgCADQgCAFgBAIQAAAGgSAjQgOAfgGAJQgNAXggAbQgfAbgLAAQghAAgWgIgAnKifQgNgVgOgiIgTgvQAAgDgGgSQgDgIAKAAQAAgGAHgSQAJgUACgPIADggQACgQAIgXQALgdAmgRQAggNAfAAQBWAAAiA8QAWAoAABFIADAFQAEAEACAHIADAKIABAKIgBAJIgHAXQgPApggAsQgcAlgRANQgSANgbAAQhDAAgphBg");
	this.shape.setTransform(68.1,48.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.staff, new cjs.Rectangle(0,0,136.2,96.5), null);


(lib.base = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(6,114,185,0.996)").s().p("AmEGFQihihAAjkQAAjjChihQChihDjAAQDkAAChChQChChAADjQAADkihChQihChjkAAQjjAAihihg");
	this.shape.setTransform(55,55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.base, new cjs.Rectangle(0,0,110,110), null);


(lib.pp6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.staff();
	this.instance.parent = this;
	this.instance.setTransform(55.2,55.4,0.615,0.615,0,0,0,68.1,48.2);

	this.instance_1 = new lib.base();
	this.instance_1.parent = this;
	this.instance_1.setTransform(55,55,1,1,0,0,0,55,55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.pp6, new cjs.Rectangle(0,0,110,110), null);


(lib.iiethu9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_9 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(9).call(this.frame_9).wait(1));

	// Layer 1
	this.instance = new lib.pp6();
	this.instance.parent = this;
	this.instance.setTransform(100,100,0.382,0.382,0,0,0,55,55);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.82,scaleY:1.82},9).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(79,79,42,42);


// stage content:
(lib.Element_icon_people_Canvas = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.iiethu9();
	this.instance.parent = this;
	this.instance.setTransform(200,200,1,1,0,0,0,100,100);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(379,379,42,42);
// library properties:
lib.properties = {
	id: 'C2108453952D764C8D490C69C956C349',
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
an.compositions['C2108453952D764C8D490C69C956C349'] = {
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