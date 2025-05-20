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


(lib.stick_sad = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AivAtIFEiUIAbA6IlECVg");
	this.shape.setTransform(74.8,53.1,0.586,0.586,-8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AjBGlQiuhQhDi0QhDizBRiuQBQivC0hDQCyhCCvBQQCvBQBCC0QBDCyhPCvQhRCvizBDQhSAehQAAQhhAAhggsg");
	this.shape_1.setTransform(-6.8,-48.6,0.483,0.483,0,0,180);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgiDrQADgbABgmQAChKgNg1IgZhtIABgBIgFgUIgGghIgIgJQADgeAMgQIAMBWIAIgUIALAJIAXELIAPBDIAohIIg8kNIAVghIAYANIg1grQgQgOgJgUQgJgUAng0IBBCkIgHgGIAjB8QAIAbAHBiQADAwg5Big");
	this.shape_2.setTransform(18.3,5.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AthH8QgNgeAAguQAAgUAyhDQA2hLBJhGQDMjGCoAAIAYABQCjAOBsBbQAaAWAkAlQAbAZASgCQA6gHAIglQAEgOgBggIgChBQAAg/gZhTQgZhTAAgMQAAgNAXhDIAPgqQAehVAehJQAMgqAQgbQAQgbAQAKQDYAsCBCOQCBCOAACpQAABQgIBLIgCAAQAsBRAwBiIAsBVIAKAPIgHAEIgEAFIgBADQAeBCADAmQACAwglAVQg2AggogWQgYgOgyg+IgDgBIgHAEIgDgGQgRgUgTgdQhZBqhCASQg9AQifgJQikgKilhsQgmgYhVg/QhFgzgkgTQgIgGgVAAQgcAAg4AvQgYAUhXBTQieCWhDAAQhTAAgchEgAKJG1IAUAgICxhxIgVgggABijTIAIAJIAGAgIAFAVIgBAAIAZBvQANAzgCBLQgBAmgDAbIBCAqQA5higDgxQgHhhgIgaIgjh9IAHAFIhCijQgnAzAJAVQAJAUAQAOIA2ArIgYgOIgWAiIA9ENIgoBIIgQhEIgXkKIgLgJIgIAUIgMhXQgMARgDAeg");
	this.shape_3.setTransform(0,13.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.stick_sad, new cjs.Rectangle(-87.9,-71,175.8,142.1), null);


(lib.eennaa = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["rgba(0,0,0,0.392)","rgba(0,0,0,0)"],[0,1],0,0,0,0,0,140.8).s().p("AvbPcQmamZAApDQAApCGamZQGZmaJCAAQJDAAGZGaQGaGZAAJCQAAJDmaGZQmZGapDAAQpCAAmZmag");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.eennaa, new cjs.Rectangle(-139.8,-139.8,279.6,279.6), null);


(lib.stickman = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.stick_sad();
	this.instance.parent = this;
	this.instance.setTransform(-35.7,62.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.stickman, new cjs.Rectangle(-123.6,-9,175.8,142.2), null);


(lib.happy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_11 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(11).call(this.frame_11).wait(1));

	// Layer 1
	this.instance = new lib.stickman();
	this.instance.parent = this;
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1},9).wait(3));

	// Layer 2
	this.instance_1 = new lib.eennaa();
	this.instance_1.parent = this;
	this.instance_1.setTransform(2.8,131.6,0.804,0.085);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({alpha:0.551},9).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-123.6,-9,238.9,152.4);


// stage content:
(lib.People_sad_failure_Canvas = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.happy();
	this.instance.parent = this;
	this.instance.setTransform(224.3,130.9,1.312,1.312);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(262,319.1,313.6,200);
// library properties:
lib.properties = {
	id: '9127636F1F97354896C4A24716784943',
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
an.compositions['9127636F1F97354896C4A24716784943'] = {
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