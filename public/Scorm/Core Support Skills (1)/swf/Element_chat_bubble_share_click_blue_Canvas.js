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


(lib.talk = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#30A6CE").s().p("AiQTAIj8nYIhsAAIo4AAQhRAAg6g6Qg7g7AAhSIAAsGIAJAAQgJgEAAgIIAAtQQAAhTA7g6QA6g6BRAAIIpAAIIXAAIQgAAQBSAAA6A6QA7A6AABTIAANQQAAAIgKAEIAKAAIAAMGQAABSg7A7Qg6A6hSAAIqdAAIk9HYQg5BJg5AAQg6AAg6hJgAxCxWQgIAJAAAMIAANcIAABOIAAK4QAAAMAIAIQAHAJALAAILFAAQAfABAXAUIBXCVIDGFpIDQlpIBXiNIADgDQAWgZAkgBILkAAQALAAAIgJQAIgIAAgMIAAsGIAAgMIAAtQQAAgMgIgJQgIgIgLAAIwgAAIoXAAIopAAQgLAAgHAIg");
	this.shape.setTransform(42.375,62.1625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AjeLwIhXiWQgXgUgfgBIrFAAQgLAAgHgIQgIgJAAgLIAAq5IAAhOIAAtcQAAgMAIgIQAHgJALAAIIpAAIIXAAIQgAAQALAAAIAJQAIAIAAAMIAANQIAAAMIAAMHQAAALgIAJQgIAIgLAAIrkAAQgkABgWAaIgDACIhXCOIjQFog");
	this.shape_1.setTransform(42.375,61.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.talk, new cjs.Rectangle(-84.7,-66.7,254.2,257.7), null);


(lib.sharebb = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#6F7512").s().p("ArgAuQghAAgYgXQgYgXAAghIAAgMQABAfAXAWQAYAXAhAAIXBAAQAhAAAYgXQAXgWABgfIAAAMQgBAhgXAXQgYAXghAAg");
	this.shape.setTransform(81.75,70.8625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B0BB00").s().p("ArgFyQghAAgYgYQgXgWgBggIAApFQAAggAYgZQAYgXAhAAIXBAAQAhAAAYAXQAXAZABAgIAAJFQgBAggXAWQgYAYghAAgAohAoQADAkAUAYQAUAXA1AAQAdAAAUgKQATgJAMgUQAKgTABgYQAAgSgJgRQgIgOgSgLQgSgLgqgKQgRgFgEgEQgEgFAAgFQAAgIAFgGQAHgEAKAAQAOgBAHAIQAIAHADAQIA7gEQgEglgVgRQgUgRgnAAQghAAgSAJQgTAKgJAQQgJARAAASQAAAcASASQATARApAKQAZAHAHAHQAHAIAAAIQAAAKgIAIQgHAHgNAAQgSAAgKgOQgHgKgBgQgAFhB4ICtAAIAAg2IhtAAIAAgvIBiAAIAAgwIhiAAIAAgmIBqAAIAAgzIiqAAgAFNB4IgfhGQgDgFgGgJQgGgKgEgDQgFgEgMgFQAPgEAIgFQAMgIAIgOQAHgQAAgSQAAgXgJgRQgKgQgQgFQgPgGgdAAIhqAAIAADuIA/AAIAAhhIAGAAQAJAAAHAGQAFAEAGAOIAiBJIBIAAgAjGAXIAABhIBAAAIAAjuIhAAAIAABUIhGAAIAAhUIg/AAIAADuIA/AAIAAhhgAAiBQIAKAnIBBAAIhMjtIhEAAIhODtIBBAAIAKgngAgYAdIAXhWIAVBWgADCgWIAAgvIAdAAQAQAAAHAFQAGAHABALQAAAIgFAGQgDAGgHACIgRACg");
	this.shape_1.setTransform(81.75,37);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AoABkQgUgYgDgkIA9gEQABAQAHAKQAKAOASAAQANAAAHgHQAIgIAAgKQAAgJgHgHQgHgHgZgHQgpgKgTgSQgSgRAAgdQAAgSAJgQQAJgQATgKQASgJAhAAQAnAAAUARQAVAQAEAmIg7AEQgDgQgIgIQgHgHgOAAQgKAAgHAFQgFAFAAAJQAAAFAEAFQAEAEARAFQAqAKASALQASALAIAOQAJAQAAATQgBAXgKAUQgMATgTAKQgUAKgdAAQg1AAgUgXgAFrB3IAAjtICqAAIAAAzIhqAAIAAAmIBiAAIAAAvIhiAAIAAAvIBtAAIAAA2gAEPB3IgihJQgGgOgFgEQgHgFgJAAIgGAAIAABgIg/AAIAAjtIBqAAQAdAAAPAGQAQAFAKAQQAJAQAAAXQAAATgHAPQgIAPgMAIQgIAFgPAEQAMAFAFAEQAEADAGAKQAGAIADAGIAfBFgADMgWIAbAAIARgDQAHgBADgGQAFgGAAgIQgBgMgGgGQgHgGgQAAIgdAAgAi8B3IAAhgIhGAAIAABgIg/AAIAAjtIA/AAIAABTIBGAAIAAhTIBAAAIAADtgAA2B3IgKgnIhIAAIgKAnIhBAAIBOjtIBEAAIBMDtgAgOAcIAsAAIgWhVg");
	this.shape_2.setTransform(80.75,37.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sharebb, new cjs.Rectangle(0,0,163.5,75.5), null);


(lib.rocinja2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 22
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#272627").s().p("AgDEnIAAgBIAVgWIAxAwICviyIgvguIAWgWIAAAAIAAgBIgwgtIAWgXIAAAAIAwAuIgWAXIBHBEIgWAXIgBgBIjEDJgAhgD4IAAAAIAAAAIgWAWIimigIAXgWIAAgBIClChIAWgWIBHBFIAAAAIgWAWgAjxAUIgWAWIgYgWIAWgWIAAgBIAWgVIgYgYIA2g2IAAAAIAMgMIgYgXIAsgsIhghdIAWgWIDXDQIgWAWIhghcIgrAsIAAAAIAAAAIBfBcIgWAWIhIhFIgrAtIBfBaIgWAWgAkFBXIgYgWIAWgXIAYAYIgWAVgACPgoIAWgWIAAgBIAAAAIgvguIAWgVIgYgYIAWgWIAXAXIgVAXIAvAtIgWAWIAwAvIgWAVIAAAAgAjTlUIAWgXIDVDQIAWgWIAYAWIgWAXIBIBFIgWAWgABajeIgsAtIgXgYIArgsIAAAAIAWgWIBHBFIgVAWIgBAAgAkWk/IArgtIAYAYIgsAsgAjTlUg");
	this.shape.setTransform(28.775,36.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAdEbIgWAWIABABIgBAAIhGhFIgWAWIAAAAIAAAAIAAAAIilihIAWgVIgYgYIAAAAIAWgWIBHBEIAWgWIhfhaIArgtIBIBEIAWgVIhfhcIAAAAIAsgsIBfBcIAWgWIjXjQIAsgsIE1ErIAWgWIhIhFIAWgXIgYgWIAsgtIAvAuIABAAIAAAAIgWAWIAYAYIgWAVIAvAuIAAABIgWAWIAwAtIAAAAIAAAAIAAAAIgWAXIAwAtIAAABIgWAWIAvAuIivCygAj6BiIAAAAIAAABgAj6Big");
	this.shape_1.setTransform(27.6625,35.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,57.6,72.9);


(lib.rocinja = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 22
	this.instance = new lib.rocinja2("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.rocinja, new cjs.Rectangle(0,0,57.6,72.9), null);


(lib.klikklikcopy = function(mode,startPosition,loop,reversed) {
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
	this.frame_84 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(84).call(this.frame_84).wait(1));

	// Layer 1
	this.instance = new lib.rocinja();
	this.instance.setTransform(315.65,192.15,1.1747,1.1747);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20).to({_off:false},0).to({x:266.45,y:150.25,alpha:1},7).to({x:130.4,y:67.5},21).to({x:129.55,y:66.15},1).wait(1).to({x:129.2,y:65.7},0).wait(12).to({x:128.7,y:69.9},0).wait(2).to({x:129.2,y:65.7},0).wait(4).to({x:-68.8,y:-69.3,alpha:0},14).to({_off:true},1).wait(2));

	// Layer 3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(186,194,56,0.8)").s().p("AhABBQgagbgBgmQABglAagaQAcgbAkAAQAmAAAaAbQAbAaAAAlQAAAmgbAbQgaAbgmAAQgkAAgcgbg");
	this.shape.setTransform(137.5,78.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(186,194,56,0.827)").s().p("AhKBKQgegeAAgsQAAgrAegeQAggfAqgBQArABAgAfQAfAeAAArQAAAsgfAeQggAfgrAAQgqAAgggfg");
	this.shape_1.setTransform(137.5,78.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(186,194,56,0.859)").s().p("AhTBUQgjgiAAgyQAAgwAjgjQAjgjAwAAQAxAAAjAjQAjAjAAAwQAAAygjAiQgjAjgxAAQgwAAgjgjg");
	this.shape_2.setTransform(137.5,78.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(186,194,56,0.886)").s().p("AhdBeQgngnAAg3QAAg2AngnQAognA1AAQA2AAAoAnQAnAnAAA2QAAA3gnAnQgoAng2AAQg1AAgogng");
	this.shape_3.setTransform(137.5,78.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(186,194,56,0.914)").s().p("AhnBnQgrgqAAg9QAAg8ArgrQAsgrA7AAQA8AAAsArQArArAAA8QAAA9grAqQgsAsg8AAQg7AAgsgsg");
	this.shape_4.setTransform(137.5,78.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(186,194,56,0.941)").s().p("AhxBxQgvguAAhDQAAhCAvguQAwgwBBAAQBCAAAwAwQAvAuAABCQAABDgvAuQgwAwhCAAQhBAAgwgwg");
	this.shape_5.setTransform(137.5,78.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(186,194,56,0.973)").s().p("Ah7B7QgzgyABhJQgBhIAzgyQA0g0BHAAQBIAAAzA0QA0AyAABIQAABJg0AyQgzA0hIgBQhHABg0g0g");
	this.shape_6.setTransform(137.5,78.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#BAC238").s().p("AiFCFQg3g2AAhPQAAhNA3g3QA5g3BMAAQBNAAA4A3QA4A3gBBNQABBPg4A2Qg4A4hNAAQhMAAg5g4g");
	this.shape_7.setTransform(137.5,78.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(186,194,56,0.937)").s().p("AiLCLQg5g5AAhSQAAhQA5g6QA8g6BPAAQBRAAA6A6QA6A6AABQQAABSg6A5Qg6A6hRAAQhPAAg8g6g");
	this.shape_8.setTransform(137.5,78.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(186,194,56,0.875)").s().p("AiRCRQg7g7AAhWQAAhUA7g7QA+g9BTAAQBUAAA9A9QA8A7AABUQAABWg8A7Qg9A8hUAAQhTAAg+g8g");
	this.shape_9.setTransform(137.5,78.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(186,194,56,0.812)").s().p("AiXCXQg+g+ABhZQgBhXA+g+QBAhABXAAQBXAABABAQA/A+gBBXQABBZg/A+QhAA/hXAAQhXAAhAg/g");
	this.shape_10.setTransform(137.5,78.475);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(186,194,56,0.749)").s().p("AicCcQhBhAAAhcQAAhbBBhBQBChBBaAAQBbAABCBBQBBBBAABbQAABchBBAQhCBChbAAQhaAAhChCg");
	this.shape_11.setTransform(137.5,78.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(186,194,56,0.686)").s().p("AiiCiQhDhCAAhgQAAhfBDhCQBFhEBdAAQBfAABEBEQBDBCAABfQAABghDBCQhEBEhfAAQhdAAhFhEg");
	this.shape_12.setTransform(137.475,78.475);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(186,194,56,0.624)").s().p("AipCoQhFhFABhjQgBhiBFhFQBIhHBhAAQBiAABGBHQBGBFABBiQgBBjhGBFQhGBHhiAAQhhAAhIhHg");
	this.shape_13.setTransform(137.5,78.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(186,194,56,0.561)").s().p("AiuCuQhIhIAAhmQAAhlBIhIQBKhJBkAAQBlAABJBJQBJBIAABlQAABmhJBIQhJBJhlAAQhkAAhKhJg");
	this.shape_14.setTransform(137.475,78.45);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(186,194,56,0.498)").s().p("Ai0C0QhKhKAAhqQAAhpBKhKQBMhMBoABQBpgBBLBMQBLBKAABpQAABqhLBKQhLBLhpABQhogBhMhLg");
	this.shape_15.setTransform(137.475,78.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},62).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[]},1).wait(7));

	// Layer 2
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(186,194,56,0.8)").s().p("AhYBYQgkglAAgzQAAgzAkgkQAlglAzAAQA0AAAkAlQAlAkAAAzQAAAzglAlQgkAlg0AAQgzAAglglgAhEhFQgdAdAAAoQAAApAdAcQAcAdAoAAQApAAAcgdQAdgcAAgpQAAgogdgdQgcgcgpAAQgoAAgcAcg");
	this.shape_16.setTransform(137.5,78.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(186,194,56,0.8)").s().p("AhyByQgwgvAAhDQAAhCAwgwQAwgwBCAAQBDAAAvAwQAxAwAABCQAABDgxAvQgvAxhDAAQhCAAgwgxgAhbhbQgmAmAAA1QAAA1AmAnQAnAmA0AAQA2AAAmgmQAmgnAAg1QAAg1gmgmQgmgmg2AAQg0AAgnAmg");
	this.shape_17.setTransform(137.5,78.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(186,194,56,0.8)").s().p("AiNCNQg6g6gBhTQABhSA6g7QA7g7BSAAQBTAAA6A7QA7A7ABBSQgBBTg7A6Qg6A8hTgBQhSABg7g8gAhxhyQgwAwAABCQAABDAwAvQAvAwBCAAQBDAAAvgwQAwgvAAhDQAAhCgwgwQgvgvhDAAQhCAAgvAvg");
	this.shape_18.setTransform(137.5,78.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(186,194,56,0.8)").s().p("AinCoQhHhFABhjQgBhiBHhGQBFhFBigBQBiABBGBFQBHBGAABiQAABjhHBFQhGBGhiAAQhiAAhFhGgAiIiIQg4A5AABPQAABQA4A5QA5A4BPAAQBQAAA5g4QA4g5ABhQQgBhPg4g5Qg5g4hQgBQhPABg5A4g");
	this.shape_19.setTransform(137.5,78.5);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(186,194,56,0.8)").s().p("AjCDDQhRhRAAhyQAAhxBRhRQBRhRBxAAQByAABRBRQBRBRAABxQAAByhRBRQhRBRhyAAQhxAAhRhRgAieifQhDBDAABcQAABdBDBCQBCBDBcAAQBeAABBhDQBChCAAhdQAAhchChDQhBhBheAAQhcAAhCBBg");
	this.shape_20.setTransform(137.5,78.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(186,194,56,0.8)").s().p("AjdDdQhchbAAiCQAAiBBchcQBchcCBAAQCCAABcBcQBcBcAACBQAACChcBbQhcBdiCAAQiBAAhchdgAi1i1QhLBMAABpQAABrBLBLQBLBLBqAAQBqAABMhLQBMhLAAhrQAAhphMhMQhMhMhqAAQhqAAhLBMg");
	this.shape_21.setTransform(137.5,78.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(186,194,56,0.8)").s().p("Aj4D4QhmhmgBiSQABiRBmhnQBohmCQAAQCSAABnBmQBnBngBCRQABCShnBmQhnBoiSAAQiQAAhohogAjLjMQhWBVAAB3QAAB4BWBUQBUBWB3AAQB4AABUhWQBVhUAAh4QAAh3hVhVQhUhUh4AAQh3AAhUBUg");
	this.shape_22.setTransform(137.5,78.5);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(186,194,56,0.8)").s().p("AkSETQhzhyAAihQAAigBzhzQByhxCggBQChABByBxQBzBzAACgQAAChhzByQhyByihAAQigAAhyhygAjijiQheBeAACEQAACFBeBeQBfBeCDAAQCFAABeheQBeheAAiFQAAiEheheQheheiFAAQiDAAhfBeg");
	this.shape_23.setTransform(137.5,78.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(186,194,56,0.8)").s().p("AktEuQh9h9AAixQAAiwB9h+QB9h8CwAAQCxAAB9B8QB9B+AACwQAACxh9B9Qh9B9ixAAQiwAAh9h9gAj4j5QhoBoAACRQAACTBoBmQBnBoCRAAQCSAABnhoQBohmAAiTQAAiRhohoQhnhniSAAQiRAAhnBng");
	this.shape_24.setTransform(137.5,78.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(186,194,56,0.8)").s().p("AlIFIQiIiIAAjAQAAi/CIiJQCJiIC/AAQDBAACICIQCICJAAC/QAADAiICIQiICJjBAAQi/AAiJiJgAkPkPQhxBxAACeQAACgBxBwQBxBxCeAAQCgAABwhxQBxhwAAigQAAiehxhxQhwhxigAAQieAAhxBxg");
	this.shape_25.setTransform(137.5,78.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(186,194,56,0.71)").s().p("AlhFhQiSiSAAjPQAAjOCSiTQCTiTDOAAQDPAACTCTQCSCTABDOQgBDPiSCSQiTCTjPAAQjOAAiTiTgAkkkkQh6B6AACqQAACsB6B5QB6B6CqAAQCrAAB6h6QB5h5AAisQAAiqh5h6Qh6h5irAAQiqAAh6B5g");
	this.shape_26.setTransform(137.5,78.5);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(186,194,56,0.624)").s().p("Al6F7QididAAjeQAAjdCdidQCdidDdAAQDeAACdCdQCdCdAADdQAADeidCdQidCdjeAAQjdAAididgAk5k4QiCCCAAC2QAAC4CCCCQCDCCC2AAQC4AACBiCQCDiCAAi4QAAi2iDiCQiBiDi4AAQi2AAiDCDg");
	this.shape_27.setTransform(137.5,78.5);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(186,194,56,0.533)").s().p("AmUGUQiminAAjtQAAjrCmioQCpioDrAAQDsAACoCoQCnCoABDrQgBDtinCnQioCojsgBQjrABipiogAlOlNQiKCLAADCQAADECKCLQCLCKDDAAQDEAACKiKQCMiLAAjEQAAjCiMiLQiKiLjEAAQjDAAiLCLg");
	this.shape_28.setTransform(137.5,78.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(186,194,56,0.443)").s().p("AmsGtQiyixAAj8QAAj6CyizQCyixD6AAQD7AACyCxQCyCzAAD6QAAD8iyCxQiyCyj7AAQj6AAiyiygAliliQiUCUAADOQAADRCUCSQCTCUDPAAQDQAACUiUQCTiSAAjRQAAjOiTiUQiUiTjQAAQjPAAiTCTg");
	this.shape_29.setTransform(137.5,78.5);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(186,194,56,0.357)").s().p("AnFHGQi9i8AAkKQAAkJC9i9QC8i8EJAAQEKAAC9C8QC8C9AAEJQAAEKi8C8Qi9C9kKAAQkJAAi8i9gAl3l3QicCdAADaQAADdCcCbQCdCcDaAAQDcAACcicQCcibAAjdQAAjaicidQicicjcAAQjaAAidCcg");
	this.shape_30.setTransform(137.5,78.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(186,194,56,0.267)").s().p("AnfHfQjHjGABkZQgBkYDHjHQDIjGEXgBQEZABDHDGQDGDHABEYQgBEZjGDGQjHDIkZgBQkXABjIjIgAmMmLQikCkAADnQAADpCkCkQClClDngBQDpABCkilQClikAAjpQAAjnilikQikimjpAAQjnAAilCmg");
	this.shape_31.setTransform(137.5,78.5);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(186,194,56,0.176)").s().p("An4H5QjRjSAAknQAAkmDRjSQDSjREmAAQEoAADQDRQDSDSAAEmQAAEnjSDSQjQDRkoAAQkmAAjSjRgAmgmhQitCuAADzQAAD1CtCtQCtCtDzAAQD1AACtitQCtitAAj1QAAjzitiuQitisj1gBQjzABitCsg");
	this.shape_32.setTransform(137.5,78.5);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("rgba(186,194,56,0.09)").s().p("AoRISQjbjbgBk3QABk1DbjcQDcjcE1AAQE2AADcDcQDcDcAAE1QAAE3jcDbQjcDbk2AAQk1AAjcjbgAm1m1Qi2C2AAD/QAAEBC2C1QC2C3D/AAQECAAC0i3QC2i1AAkBQAAj/i2i2Qi0i2kCAAQj/AAi2C2g");
	this.shape_33.setTransform(137.5,78.5);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("rgba(186,194,56,0)").s().p("AoqIrQjmjmAAlFQAAlEDmjmQDnjmFDAAQFFAADmDmQDmDmAAFEQAAFFjmDmQjmDmlFAAQlDAAjnjmgAnKnKQi+C/gBELQABEOC+C+QC/C+ELAAQEOAAC9i+QC/i+AAkOQAAkLi/i/Qi9i+kOAAQkLAAi/C+g");
	this.shape_34.setTransform(137.5,78.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_16}]},62).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[]},1).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.8,-69.3,452.1,347.1);


(lib.timeto = function(mode,startPosition,loop,reversed) {
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
	this.frame_16 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(16).call(this.frame_16).wait(1));

	// Layer 1
	this.instance = new lib.klikklikcopy();
	this.instance.setTransform(159.35,162.4,0.6926,0.6926,0,0,0,163.9,114.7);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).wait(5));

	// Layer 1
	this.instance_1 = new lib.sharebb();
	this.instance_1.setTransform(141.1,137.35,1.1285,1.1285,0,0,0,81.8,37.8);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(7).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},4).wait(6));

	// Layer_2
	this.instance_2 = new lib.talk();
	this.instance_2.setTransform(137.55,281.75,0.2993,0.2993,0,0,0,39.6,177);
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regY:176.9,scaleX:1,scaleY:1,y:281.7,alpha:1},5).wait(12));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(13.3,38.1,254.09999999999997,257.7);


// stage content:
(lib.Element_chat_bubble_share_click_blue_Canvas = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.timeto();
	this.instance.setTransform(175.6,200.65,0.7236,0.7236,0,0,0,109.2,167.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(369.2,430.6,-144.89999999999998,-144.20000000000005);
// library properties:
lib.properties = {
	id: 'F6B4972D9CD02A43AB4E52776E9C0C3D',
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
an.compositions['F6B4972D9CD02A43AB4E52776E9C0C3D'] = {
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