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


(lib.khandss = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AAwN/IgkAAIgDAAIgTAAIgDAAIglAAIAAgCQiDgIhngkQitg8h9hqQh9hshUiWQhSiVgSjXIgBAAQAAgJgEgEIAAgCIAAgLIAAgCIAAgXIAAguIAAgDIAAgNQAEgBAAgHIABAAIAAgDIAAgUQAajPBUiTQBWiUB/hqQB/hpCvg6QBbgeBzgHIAAgDIAYAAIACAAIBDAAIADAAIAUAAIADAAIAAADQDWASCVBUQCWBSBsB9QBrB9A7CsQAbBNAPBYQAOB7gHA+QgGA/gRBdQgRBdhRCJQhXCSiBBoQhBA0hMAqQiUBTjaAPIAAACIgDAAg");
	mask.setTransform(92.7,92.5);

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.996)").s().p("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");
	this.shape.setTransform(86.5,97.4);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer 1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(6,114,185,0.996)").s().p("AAyOdIgmAAIgCAAIgVAAIgCAAIgmAAIAAgDQiIgHhqglQizg+iBhvQiChvhWibQhViagTjeIgBAAQAAgKgEgDIAAgDIAAgLIAAgCIAAgYIAAgwIAAgDIAAgNQAEgBAAgHIABAAIAAgDIAAgVQAbjWBXiYQBZiYCDhuQCDhtC1g8QBegfB3gHIAAgDIAYAAIADAAIBFAAIADAAIAVAAIADAAIAAADQDdATCaBWQCbBWBvCBQBwCBA9CxQAbBQAPBbQAPB/gHBAQgGBBgSBgQgSBhhTCNQhaCXiFBrQhDA2hPAsQiZBVjhAPIAAADIgDAAg");
	this.shape_1.setTransform(92.7,92.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.khandss, new cjs.Rectangle(0,0,185.5,185), null);


(lib.uuefuegpe = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_9 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(9).call(this.frame_9).wait(1));

	// Layer 1
	this.instance = new lib.khandss();
	this.instance.parent = this;
	this.instance.setTransform(100,100,0.194,0.195,0,0,0,92.8,92.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:92.7,scaleX:1.08,scaleY:1.08},9).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(82,79.7,36,42.6);


// stage content:
(lib.Element_icon_help_Canvas = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.uuefuegpe();
	this.instance.parent = this;
	this.instance.setTransform(200,205.4,1,1,0,0,0,100,105.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(382,379.7,36,42.6);
// library properties:
lib.properties = {
	id: '4EB6DAF83F141749BEF84D152871758E',
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
an.compositions['4EB6DAF83F141749BEF84D152871758E'] = {
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