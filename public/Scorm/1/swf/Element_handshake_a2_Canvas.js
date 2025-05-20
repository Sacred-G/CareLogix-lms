(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
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


(lib.hands = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0B6B8B").s().p("AAiF/IgCgBIgIgEIlci+QgGgEgIgHIgOgNIAAgSIEUn6QALgUAMgEQAMgDAUALIFfC/IAAABQAOAHAGAJIADAGQADAMgKATIkOHuQgIAPgKAFIgEACIgGABQgGAAgIgDg");
	this.shape.setTransform(35.3438,38.5686);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("ACHI0IgigbIgCgEIAAgEIACgEIAziTIAqAhQAZAUAOAPQAOANAFATQADAKgBALIgBAPQgEASgLAOQgMAPgSAIQgFACgKAAIgQABIgLABQgQAAgPgJgAFWHeIgOgKIg/gzIhOg9IgDgDQgLgGgGgKQgFgKgCgOQgFgugmgbQgmgaguAJQgEABgFgBQgFgCgEgCQgXgRgRgbQgNgVgVgNQgUgMgYgDQgYgCgXAIQgYAJgRASIgJAIQgKgfgXgVQgWgUgdgFQgegGgcALQgdALgVAaQgehPhPABQghABgYASQgXASgTAmIgPgHIgFgDIgBAAIjriGQgIgFgEgGIgCgEQgCgHAGgMIEAnNQAFgIAFgEIAEgCQAIgCANAEIByAsQAXAJAYgHIEahbQAPgGASABIAQACIASADIAFADIAAAAIACADQgCAIgEADIhVA/IiUBqQgtAfgFAvQgFAvAmAoQAiAjAwAKQAxAJAwgUIDdhdIAvgUIAugUQAOgGAMABQALACAMAJIIyG6IAxAnQAJAHAGAJQAOARADAUQAEAggWAbQgVAagfADQggADgbgWIgEgCIn2mLIgRgNQgHgEgGACQgHABgFAGQgEAGAAAHQABAGAFAGIAFAEIAFAFIGwFTQAfAZACAiIAAALQgCAXgNARQgMAQgVAKQgpASgmgeIgJgHImqlPIgHgFQgEgDgDAAQgGAAgGABQgGACgDADQgCADAAAHQAAAGABAGQACADAEAEIAJAGIFcEVQAaAUAGAdIAAAFQAEAagPAYQgUAfghAGIgOABQgZAAgXgSg");
	this.shape_1.setTransform(137.5314,79.6673);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("Ak5JhQgdgKgOgcQgPgcAKgeIAMgkQAUg9AahIQAIgWAUgOQAUgNAZAAQAmAAAYAfQAYAfgLAkQgWBIghBaIgEALQgLAdgdAMQgQAHgQAAQgNAAgOgFgAnMIHQgagBgTgQQgVgQgFgYQgDgLAAgLQAAgNADgKIAMgjQATg6AahJQAKgcAZgOQAZgNAeAGQAbAFARAWQASAWABAdIgDAMIgCAMIg2CcIgCAGQgJAagVAOQgUANgZAAIgDAAgAqCGfQgcgHgRgXQgSgXACgdQABgJACgGIAKggIAIgXQAKgfAJgXQAKgaAagNQAZgMAcAGQAbAFARAWQASAWAAAcIgBALIgDALIgRA0IgSAxIgBADQgKAbgaAOQgRAJgSAAQgJAAgKgCgAs9E5QgagMgMgaQgMgZAHgbQAFgQAGgRIAGgPQAKgZAZgNQAZgNAbAGQAdAGARAWQARAXAAAgQgEAWgFAQIgHARQgFAMgHAJQgQAXgcAGQgJADgKAAQgRAAgQgIgAJhDQQgJgBgLgJIp5n4QgNgKgMgCQgMgCgOAHIioBHIioBHQgpARgmgHQgngHgbgdQgLgMgGgOQgFgOgBgOQABgRAKgOQAIgNAQgLICoh4IAvgkIAwgiIAMgIQASgLARgGICGgsICGgsQAPgFANABQANABAOAHIFeCqQAMAGANABQAMAAANgFIBhgmIADgBIAIgDQAPgGAIADQAIADAIANID9HIQAIANgCAIQgCAIgMAJIjlCmQgMAKgJAAIgCAAg");
	this.shape_2.setTransform(166.1671,75.1313);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#30A6CE").s().p("Ag1GBQgFgBgDgDQgHgFgFgJIkSn2QgLgUAKgPQAFgHAKgGIFpjEQAOgIAMADQAMAEAIAOIESH3IAGAPQgBAMgGAIQgFAHgKAFIkwClIgpAYIgOAHQgLAGgIAAIgHgBg");
	this.shape_3.setTransform(268.724,38.5646);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,255,0.898)").s().p("AhDIbQAihbAVhHQAMglgYgfQgYgfgnABQgZgBgTANQgVAOgIAWQgZBIgVA+IgfgSIA2ibIADgNIACgMQAAgdgSgWQgSgWgbgFQgdgGgZANQgaAOgKAcQgaBJgTA6IgfgSIARgxIASg0IACgLIACgLQgBgcgRgWQgRgWgbgFQgdgGgZANQgZAMgKAaQgJAXgLAfIgHAYIgggSIAHgSQAFgPAFgXQAAgggSgXQgRgWgdgGQgagGgZANQgZANgLAZIgFAPIgpgXIAPAHQATglAXgSQAYgTAhAAQBPgCAeBQQAVgbAdgKQAcgLAeAGQAdAFAWAUQAXAUAKAgIAJgIQARgTAYgIQAXgIAYACQAYADAUAMQAVAMANAWQARAbAYAQQAEADAFACQAFABAEgBQAugJAmAaQAlAaAFAvQACAOAFAJQAGAKALAHIADADIBOA9IBAAyIhKAgQAAgLgDgLQgFgSgOgNQgOgPgZgUIgqgiIgyCTgAFFGwQgGgdgagVIlbkUIgJgGQgEgEgCgEQgBgFAAgGQAAgHACgDQADgEAGgBQAGgBAGAAQADAAAEACIAHAGIGpFPIhCAcIgBgEgAHvEiImwlTIgFgEIgFgFQgFgGgBgFQAAgHAEgGQAFgGAHgBQAGgCAHAEIARANIH3GKIhEAeQgBgjgggZgAK4DIIgxgmIoym6QgMgKgLgBQgMgCgOAHIgtAUIgvATIjeBeQgwAUgxgJQgwgKgigjQgmgpAFguQAFgvAtgfICUhqIBVg/QAEgDACgIIgCgDIA5AOIgMAIIgvAjIgwAjIioB4QgQALgIANQgKAPAAARQAAANAGAOQAGAOALAMQAaAdAnAIQAnAGAogRICohHICnhHQAOgHANADQAMABAMALIJ7H3QALAJAIABIgoAZQgHgIgJgIgAP6AAQACgJgHgOIj+nHQgHgOgIgDQgIgDgPAGIgJADIBsg/QgKAOALAVIESH2QAFAKAHAFIhnAQQAMgKACgGgAxSABQAKgFAIgOIEOnvQAKgUgDgMIgDgGIBIA6QgGAEgFAIIkAHNQgGAMACAHIACADg");
	this.shape_4.setTransform(151.8125,76.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hands, new cjs.Rectangle(0,0,304.1,137), null);


(lib.bgcircle = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AzVTVQoAoAAArVQAArUIAoBQIBoALUAAQLVAAIAIAQIBIBAALUQAALVoBIAQoAIBrVAAQrUAAoBoBg");
	this.shape.setTransform(175,175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bgcircle, new cjs.Rectangle(0,0,350,350), null);


(lib.ahfaheg9eg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_5 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(5).call(this.frame_5).wait(1));

	// Layer_1
	this.instance = new lib.hands();
	this.instance.setTransform(157.4,41.2,1.0336,1.0336,0,0,0,152.3,68.6);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:70.9,alpha:1},5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-29.7,314.3,171.29999999999998);


// stage content:
(lib.Element_handshake_a2_Canvas = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.ahfaheg9eg();
	this.instance.setTransform(198.7,219.4,1,1,0,0,0,157.2,70.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_4
	this.instance_1 = new lib.bgcircle();
	this.instance_1.setTransform(200,200,1,1,0,0,0,175,175);
	this.instance_1.alpha = 0.8984;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(225,225,150,150);
// library properties:
lib.properties = {
	id: 'B7D50CBAEA1B66469440E8C5312AEEF6',
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
an.compositions['B7D50CBAEA1B66469440E8C5312AEEF6'] = {
	getStage: function() { return exportRoot.stage; },
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


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;