// Garden Gnome Software - VR - Skin
// Pano2VR 7.0.4a/19987
// Filename: feather_vr.ggsk
// Generated 2023-07-14T12:24:49

function pano2vrVrSkin(player,base) {
	player.addVariable('node_cloner_hasUp', 2, false, { ignoreInState: 0  });
	player.addVariable('node_cloner_hasDown', 2, false, { ignoreInState: 0  });
	player.addVariable('open_image_hs', 0, "", { ignoreInState: 0  });
	player.addVariable('open_info_hs', 0, "", { ignoreInState: 0  });
	player.addVariable('open_video_hs', 0, "", { ignoreInState: 0  });
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.vrSkinObj=this;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown={};
	this.elementMouseOver={};
	var i;
	var hs,el,els,elo,ela,geometry,material;
	player.setMargins(0,0,0,0);
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.skinGroup);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.userData.ggId)) r.push(e);
			} else {
				if (e.userData.ggId==id) r.push(e);
			}
			if (e.children.length > 0) {
				for(var i=0;i<e.children.length;i++) {
					stack.push(e.children[i]);
				}
			}
		}
		return r;
	}
	
	this.posInSkin=function(el, clonerParent) {
		var curParent = el.parent;
		var pos = {x: el.position.x, y: el.position.y};
		while (curParent && curParent != me.skinGroup) {
			pos.x += curParent.position.x;
			pos.y += curParent.position.y;
			if (curParent.parent) {
				curParent = curParent.parent;
			} else {
				curParent = clonerParent
			}
		}
		return pos;
	}
	
	this._=function(text, params) {
		return player._(text, params);
	}
	this.languageChanged=function() {
		if (!me.skinGroup) return;
		var stack=[];
		stack.push(me.skinGroup);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.userData && e.userData.ggUpdateText) {
				e.userData.ggUpdateText();
			}
			for(var i=0;i<e.children.length;i++) {
				stack.push(e.children[i]);
			}
		}
	}
	player.addListener('languagechanged', this.languageChanged);
	this.getElementVrPosition = function(el, x, y) {
		var vrPos = {};
		var renderableEl = (el.parent.type == 'Mesh' || el.parent.type == 'Group');
		switch (el.userData.hanchor) {
			case 0:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) - ((renderableEl ? el.parent.userData.width : 800) / 200.0) + (x / 100.0) + (el.userData.width / 200.0);
			break;
			case 1:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) + (x / 100.0);
			break;
			case 2:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) + ((renderableEl ? el.parent.userData.width : 800) / 200.0) - (x / 100.0) - (el.userData.width / 200.0);
			break;
		}
		switch (el.userData.vanchor) {
			case 0:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) + ((renderableEl ? el.parent.userData.height : 600) / 200.0) - (y / 100.0) - (el.userData.height / 200.0);
			break;
			case 1:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) - (y / 100.0);
			break;
			case 2:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) - ((renderableEl ? el.parent.userData.height : 600) / 200.0) + (y / 100.0) + (el.userData.height / 200.0);
			break;
		}
		vrPos.x += el.userData.curScaleOffX;
		vrPos.y += el.userData.curScaleOffY;
		return vrPos;
	}
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		this.skinGroup=player.getSkinGroup();
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(0);
		el.translateY(0.565);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 640;
		el.userData.height = 115;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'thumbnails';
		el.userData.x = 0;
		el.userData.y = 0.565;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._thumbnails.material) me._thumbnails.material.opacity = v;
			me._thumbnails.visible = (v>0 && me._thumbnails.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._thumbnails.visible
			let parentEl = me._thumbnails.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._thumbnails.userData.opacity = v;
			v = v * me._thumbnails.userData.parentOpacity;
			me._thumbnails.userData.setOpacityInternal(v);
			for (let i = 0; i < me._thumbnails.children.length; i++) {
				let child = me._thumbnails.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._thumbnails.userData.parentOpacity = v;
			v = v * me._thumbnails.userData.opacity
			me._thumbnails.userData.setOpacityInternal(v);
			for (let i = 0; i < me._thumbnails.children.length; i++) {
				let child = me._thumbnails.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._thumbnails = el;
		el.userData.ggId="thumbnails";
		me._thumbnails.userData.ggUpdatePosition=function (useTransition) {
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(-2.45);
		el.translateY(0.075);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 150;
		el.userData.height = 100;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'node_cloner';
		el.userData.x = -2.45;
		el.userData.y = 0.075;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._node_cloner.material) me._node_cloner.material.opacity = v;
			me._node_cloner.visible = (v>0 && me._node_cloner.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._node_cloner.visible
			let parentEl = me._node_cloner.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._node_cloner.userData.opacity = v;
			v = v * me._node_cloner.userData.parentOpacity;
			me._node_cloner.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_cloner.children.length; i++) {
				let child = me._node_cloner.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._node_cloner.userData.parentOpacity = v;
			v = v * me._node_cloner.userData.opacity
			me._node_cloner.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_cloner.children.length; i++) {
				let child = me._node_cloner.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._node_cloner = el;
		el.userData.ggNumRepeat = 100;
		el.userData.ggCloneOffset = 0;
		el.userData.ggNumRows = 0;
		el.userData.ggNumCols = 0;
		el.userData.ggUpdating = false;
		el.userData.ggFilter = [];
		el.userData.ggInstances = [];
		el.userData.ggGoUp = function() {
			if (me._node_cloner.userData.ggCloneOffset + me._node_cloner.userData.ggNumCols <= me._node_cloner.userData.ggNumFilterPassed) {
				me._node_cloner.userData.ggCloneOffset += me._node_cloner.userData.ggNumCols;
				me._node_cloner.userData.ggCloneOffsetChanged = true;
				me._node_cloner.userData.ggUpdate();
			}
		}
		el.userData.ggGoDown = function() {
			if (me._node_cloner.userData.ggCloneOffset > 0) {
				me._node_cloner.userData.ggCloneOffset -= me._node_cloner.userData.ggNumCols;
				me._node_cloner.userData.ggCloneOffset = Math.max(me._node_cloner.userData.ggCloneOffset, 0);
				me._node_cloner.userData.ggCloneOffsetChanged = true;
				me._node_cloner.userData.ggUpdate();
			}
		}
		el.getFilteredNodes = function(tourNodes, filter) {
			var filteredNodes = [];
			for (var i = 0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j].trim()) == -1) passed = false;
					}
				}
				if (passed) {
					filteredNodes.push(nodeId);
				}
			}
			return filteredNodes;
		}
		el.userData.ggUpdate = function(filter) {
			if(me._node_cloner.userData.ggUpdating == true) return;
			me._node_cloner.userData.ggUpdating = true;
			var el=me._node_cloner;
			var curNumCols = 0;
			var parentWidth = me._node_cloner.parent.userData.width;
			me._node_cloner.userData.offsetLeft = (me._node_cloner.parent.userData.width / 200.0) + me._node_cloner.userData.x - (me._node_cloner.userData.width / 200.0);
			curNumCols = Math.floor(((parentWidth - me._node_cloner.userData.offsetLeft) * me._node_cloner.userData.ggNumRepeat / 100.0) / me._node_cloner.userData.width);
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.userData.ggFilter = filter;
			} else {
				filter = el.userData.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.userData.ggNumCols == curNumCols) && (el.userData.ggInstances.length > 0) && (filter.length === el.userData.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.userData.ggCurrentFilter[index] }) ) && false) {
				me._node_cloner.userData.ggUpdating = false;
				return;
			} else {
				el.userData.ggNumRows = 1;
				el.userData.ggNumCols = curNumCols;
			var centerOffsetHor = 0;
			var centerOffsetVert = 0;
			centerOffsetHor = ((parentWidth - (me._node_cloner.userData.offsetLeft * 100.0)) % me._node_cloner.userData.width) / 2;
				me._node_cloner.userData.ggCloneOffsetChanged = false;
			}
			el.userData.ggCurrentFilter = filter;
			el.userData.ggInstances = [];
			el.remove(...el.children);
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			var keepCloning = true;
			me._node_cloner.userData.ggNumFilterPassed = 0;
			numNodes = me._node_cloner.getFilteredNodes(tourNodes, filter).length;
			if ((parentWidth - (me._node_cloner.userData.offsetLeft * 100.0)) > (me._node_cloner.userData.width * numNodes)) {
				centerOffsetHor = ((parentWidth - (me._node_cloner.userData.offsetLeft * 100.0)) - (me._node_cloner.userData.width * numNodes)) / 2;
			}
			tourNodes = me._node_cloner.getFilteredNodes(tourNodes, filter);
			me._node_cloner.userData.ggNumFilterPassed = tourNodes.length;
			for (var i = 0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var nodeData = player.getNodeUserdata(nodeId);
				if (!keepCloning || i < me._node_cloner.userData.ggCloneOffset) continue;
				var parameter={};
				parameter.top = -(centerOffsetVert / 100.0) - (row * me._node_cloner.userData.height) / 100.0;
				parameter.left = (centerOffsetHor / 100.0) + (column * me._node_cloner.userData.width) / 100.0;
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_node_cloner_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.userData.ggInstances.push(inst);
				var bbox = new THREE.Box3().setFromObject(inst.__obj);
				var clonerPosInSkin = skin.posInSkin(me._node_cloner, me.ggParent);
				if (bbox.min.x + clonerPosInSkin.x >= -4 && bbox.max.x + clonerPosInSkin.x <= 4 && bbox.min.y + clonerPosInSkin.y >= -3 && bbox.max.y + clonerPosInSkin.y <= 3) el.add(inst.__obj);
				column++;
				if (column >= el.userData.ggNumCols) {
					keepCloning = false;
				}
			}
			player.setVariableValue('node_cloner_hasDown', me._node_cloner.userData.ggCloneOffset > 0);
			player.setVariableValue('node_cloner_hasUp', me._node_cloner.userData.ggCloneOffset + me._node_cloner.userData.ggNumCols < me._node_cloner.userData.ggNumFilterPassed);
			me._node_cloner.userData.ggNodeCount = me._node_cloner.userData.ggNumFilterPassed;
			me._node_cloner.userData.ggUpdating = false;
			player.triggerEvent('clonerchanged');
		}
		el.userData.ggFilter = [];
		el.userData.ggId="node_cloner";
		me._node_cloner.userData.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnails.add(me._node_cloner);
		width = 0.42;
		height = 0.42;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.12, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.12, (height / 2.0));
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'page_up_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgba(74,74,74,0.588235)').convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'page_up_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._page_up_bg.material.opacity = v * me._page_up_bg.userData.backgroundColorAlpha;
			if (me._page_up_bg.userData.ggSubElement) {
				me._page_up_bg.userData.ggSubElement.material.opacity = v
				me._page_up_bg.userData.ggSubElement.visible = (v>0 && me._page_up_bg.userData.visible);
			}
			me._page_up_bg.visible = (v>0 && me._page_up_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._page_up_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._page_up_bg.userData.backgroundColorAlpha = v;
			me._page_up_bg.userData.setOpacity(me._page_up_bg.userData.opacity);
		}
		el.translateX(3.34);
		el.translateY(0.065);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 42;
		el.userData.height = 42;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'page_up_bg';
		el.userData.x = 3.34;
		el.userData.y = 0.065;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._page_up_bg.visible
			let parentEl = me._page_up_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._page_up_bg.userData.opacity = v;
			v = v * me._page_up_bg.userData.parentOpacity;
			me._page_up_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_up_bg.children.length; i++) {
				let child = me._page_up_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._page_up_bg.userData.parentOpacity = v;
			v = v * me._page_up_bg.userData.opacity
			me._page_up_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_up_bg.children.length; i++) {
				let child = me._page_up_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._page_up_bg = el;
		el.userData.ggId="page_up_bg";
		me._page_up_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['page_up_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._page_up_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._page_up_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._page_up_bg.ggCurrentLogicStateScaling == 0) {
					me._page_up_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._page_up_bg.userData.transitions.length; i++) {
						if (me._page_up_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_up_bg.userData.transitions[i].interval);
							me._page_up_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._page_up_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_up_bg.scale.set(transition_scale.startScale.x + (me._page_up_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_up_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_up_bg.position.x = (me._page_up_bg.position.x - me._page_up_bg.userData.curScaleOffX) + scaleOffX;
						me._page_up_bg.userData.curScaleOffX = scaleOffX;
						me._page_up_bg.position.y = (me._page_up_bg.position.y - me._page_up_bg.userData.curScaleOffY) + scaleOffY;
						me._page_up_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_up_bg.userData.transitions.splice(me._page_up_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_up_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._page_up_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._page_up_bg.userData.transitions.length; i++) {
						if (me._page_up_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_up_bg.userData.transitions[i].interval);
							me._page_up_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._page_up_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_up_bg.scale.set(transition_scale.startScale.x + (me._page_up_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_up_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_up_bg.position.x = (me._page_up_bg.position.x - me._page_up_bg.userData.curScaleOffX) + scaleOffX;
						me._page_up_bg.userData.curScaleOffX = scaleOffX;
						me._page_up_bg.position.y = (me._page_up_bg.position.y - me._page_up_bg.userData.curScaleOffY) + scaleOffY;
						me._page_up_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_up_bg.userData.transitions.splice(me._page_up_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_up_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._page_up_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('node_cloner_hasUp') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._page_up_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._page_up_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._page_up_bg.ggCurrentLogicStateVisible == 0) {
			me._page_up_bg.visible=((!me._page_up_bg.material && Number(me._page_up_bg.userData.opacity>0)) || Number(me._page_up_bg.material.opacity)>0)?true:false;
			me._page_up_bg.userData.visible=true;
				}
				else {
			me._page_up_bg.visible=false;
			me._page_up_bg.userData.visible=false;
				}
			}
		}
		me._page_up_bg.userData.onclick=function (e) {
			skin.findElements('node_cloner')[0].userData.ggGoUp();
		}
		me._page_up_bg.userData.onmouseover=function (e) {
			me.elementMouseOver['page_up_bg']=true;
			me._page_up_bg.logicBlock_scaling();
		}
		me._page_up_bg.userData.ontouchend=function (e) {
			me._page_up_bg.logicBlock_scaling();
		}
		me._page_up_bg.userData.onmouseout=function (e) {
			me.elementMouseOver['page_up_bg']=false;
			me._page_up_bg.logicBlock_scaling();
		}
		me._page_up_bg.ggCurrentLogicStateScaling = -1;
		me._page_up_bg.ggCurrentLogicStateVisible = -1;
		me._page_up_bg.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['page_up_bg']) {
				me.elementMouseOver['page_up_bg']=true;
			}
		}
		me._page_up_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(0.42, 0.42, 5, 5 );
		geometry.name = 'page_up_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAABiUlEQVR4nO3bMW4CMRRF0euQPVCmZhm0YaQ02Vj2QRNpSEudFVCnZBGMU4RI9CD996x3q5EbW0caN1+GlFJKKaWUUkoppZRSSiml4WpVGx8Oh5fL5fK2Wq0+d7vdT9U5Ht1T1ca996/W2seyLN/zPG+qzvHoykBvWvfej6OgVoK+A+fr9zCoZXcowDzPm977EVhfl86tte00TafKc91TKSiMh1oOCmOhSoDCOKgyoDAGqhQo+KPKgYI3qiQo+KLKgoInqjQo+KHKg4IXqgUo+KDagIIHqhUo6KPagYI2qiUo6KLagoImqjUo6KEqzJTuapqmU2tte7O0BvZV57EHVcse9OaX/+/M3wCwJOs7VO3+BGNQRUwwBVXFBENQZUwwA1XHBCNQB0wwAXXBBA'+
	'NQJ0wQB3XDBGFQR0wQBXXFBEFQZ0wQA3XHBCHQETBBBHQUTBAAHQkT8mjh4ZWBjogJtSOQPYNhgsZMaRhMgOeqjVtrr8uyDPd4NqWUUkoppZRSSimllFJKacB+Af4FeqpD8jYhAAAAAElFTkSuQmCC');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'page_up_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 42;
		el.userData.height = 42;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'page_up';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._page_up.material) me._page_up.material.opacity = v;
			me._page_up.visible = (v>0 && me._page_up.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._page_up.visible
			let parentEl = me._page_up.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._page_up.userData.opacity = v;
			v = v * me._page_up.userData.parentOpacity;
			me._page_up.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_up.children.length; i++) {
				let child = me._page_up.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._page_up.userData.parentOpacity = v;
			v = v * me._page_up.userData.opacity
			me._page_up.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_up.children.length; i++) {
				let child = me._page_up.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._page_up = el;
		el.userData.ggId="page_up";
		me._page_up.userData.ggUpdatePosition=function (useTransition) {
		}
		me._page_up_bg.add(me._page_up);
		me._thumbnails.add(me._page_up_bg);
		width = 0.42;
		height = 0.42;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.12, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.12, (height / 2.0));
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'page_down_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgba(74,74,74,0.588235)').convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'page_down_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._page_down_bg.material.opacity = v * me._page_down_bg.userData.backgroundColorAlpha;
			if (me._page_down_bg.userData.ggSubElement) {
				me._page_down_bg.userData.ggSubElement.material.opacity = v
				me._page_down_bg.userData.ggSubElement.visible = (v>0 && me._page_down_bg.userData.visible);
			}
			me._page_down_bg.visible = (v>0 && me._page_down_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._page_down_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._page_down_bg.userData.backgroundColorAlpha = v;
			me._page_down_bg.userData.setOpacity(me._page_down_bg.userData.opacity);
		}
		el.translateX(-3.34);
		el.translateY(0.065);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 42;
		el.userData.height = 42;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'page_down_bg';
		el.userData.x = -3.34;
		el.userData.y = 0.065;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._page_down_bg.visible
			let parentEl = me._page_down_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._page_down_bg.userData.opacity = v;
			v = v * me._page_down_bg.userData.parentOpacity;
			me._page_down_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_down_bg.children.length; i++) {
				let child = me._page_down_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._page_down_bg.userData.parentOpacity = v;
			v = v * me._page_down_bg.userData.opacity
			me._page_down_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_down_bg.children.length; i++) {
				let child = me._page_down_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._page_down_bg = el;
		el.userData.ggId="page_down_bg";
		me._page_down_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['page_down_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._page_down_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._page_down_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._page_down_bg.ggCurrentLogicStateScaling == 0) {
					me._page_down_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._page_down_bg.userData.transitions.length; i++) {
						if (me._page_down_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_down_bg.userData.transitions[i].interval);
							me._page_down_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._page_down_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_down_bg.scale.set(transition_scale.startScale.x + (me._page_down_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_down_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_down_bg.position.x = (me._page_down_bg.position.x - me._page_down_bg.userData.curScaleOffX) + scaleOffX;
						me._page_down_bg.userData.curScaleOffX = scaleOffX;
						me._page_down_bg.position.y = (me._page_down_bg.position.y - me._page_down_bg.userData.curScaleOffY) + scaleOffY;
						me._page_down_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_down_bg.userData.transitions.splice(me._page_down_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_down_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._page_down_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._page_down_bg.userData.transitions.length; i++) {
						if (me._page_down_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_down_bg.userData.transitions[i].interval);
							me._page_down_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._page_down_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_down_bg.scale.set(transition_scale.startScale.x + (me._page_down_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_down_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_down_bg.position.x = (me._page_down_bg.position.x - me._page_down_bg.userData.curScaleOffX) + scaleOffX;
						me._page_down_bg.userData.curScaleOffX = scaleOffX;
						me._page_down_bg.position.y = (me._page_down_bg.position.y - me._page_down_bg.userData.curScaleOffY) + scaleOffY;
						me._page_down_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_down_bg.userData.transitions.splice(me._page_down_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_down_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._page_down_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('node_cloner_hasDown') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._page_down_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._page_down_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._page_down_bg.ggCurrentLogicStateVisible == 0) {
			me._page_down_bg.visible=((!me._page_down_bg.material && Number(me._page_down_bg.userData.opacity>0)) || Number(me._page_down_bg.material.opacity)>0)?true:false;
			me._page_down_bg.userData.visible=true;
				}
				else {
			me._page_down_bg.visible=false;
			me._page_down_bg.userData.visible=false;
				}
			}
		}
		me._page_down_bg.userData.onclick=function (e) {
			skin.findElements('node_cloner')[0].userData.ggGoDown();
		}
		me._page_down_bg.userData.onmouseover=function (e) {
			me.elementMouseOver['page_down_bg']=true;
			me._page_down_bg.logicBlock_scaling();
		}
		me._page_down_bg.userData.ontouchend=function (e) {
			me._page_down_bg.logicBlock_scaling();
		}
		me._page_down_bg.userData.onmouseout=function (e) {
			me.elementMouseOver['page_down_bg']=false;
			me._page_down_bg.logicBlock_scaling();
		}
		me._page_down_bg.ggCurrentLogicStateScaling = -1;
		me._page_down_bg.ggCurrentLogicStateVisible = -1;
		me._page_down_bg.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['page_down_bg']) {
				me.elementMouseOver['page_down_bg']=true;
			}
		}
		me._page_down_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(0.42, 0.42, 5, 5 );
		geometry.name = 'page_down_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAABkElEQVR4nO3ZMU7DUBBF0TsOe0hJbbEA6rTEEk32QMnGaJB+6iwjNSWLSD5FCihSGs28r3c34KdT2JYGnHPOOeecc84555xzzjnnhiuyB6zZ8Xh8vFwur5vN5nO/339lbHjIeOh/1Fqbr9frKSK2vfc34Cljx5Tx0LVrrc299xOwzd4iD3oH8xs4ZO2Rfofew4yI3bIs56xNsqAVMUEUtComCIJWxgQx0OqYIASqgAkioCqYIACqhAnFQdUwoTCoIiYUBVXFhIKgyphQDFQdEwqBjoAJRUBHwYQCoCNhQjLoaJiQCDoiJuSeQD74cwMaARMGuClVKxP0wO2gBkDv/dRamxP3rJI/Sivn36aVSweFsVBLgMI4qGVAYQzUUqCgj1oOFLRRS4KCLmpZUN'+
	'BELQ0KeqjlQUELVQIUdFBlQEEDVQoU6qPKgUJtVElQqIsqCwo1UaVBoR6q/E1pWZZzROz4PadsuR0AU5IHhbuoaQ0BCjfUaZqee+/vEfGSvcc555xzzjnnnHPOOeecc26gfgC3QXmhX10w3wAAAABJRU5ErkJggg==');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'page_down_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 42;
		el.userData.height = 42;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'page_down';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.050);
		el.renderOrder = 5;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._page_down.material) me._page_down.material.opacity = v;
			me._page_down.visible = (v>0 && me._page_down.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._page_down.visible
			let parentEl = me._page_down.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._page_down.userData.opacity = v;
			v = v * me._page_down.userData.parentOpacity;
			me._page_down.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_down.children.length; i++) {
				let child = me._page_down.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._page_down.userData.parentOpacity = v;
			v = v * me._page_down.userData.opacity
			me._page_down.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_down.children.length; i++) {
				let child = me._page_down.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._page_down = el;
		el.userData.ggId="page_down";
		me._page_down.userData.ggUpdatePosition=function (useTransition) {
		}
		me._page_down_bg.add(me._page_down);
		me._thumbnails.add(me._page_down_bg);
		me.skinGroup.add(me._thumbnails);
		me._thumbnails.userData.setOpacity(1.00);
		me._node_cloner.userData.setOpacity(1.00);
		me._node_cloner.userData.ggUpdate();
		me._page_up_bg.userData.setOpacity(1.00);
		me._page_up.userData.setOpacity(1.00);
		me._page_down_bg.userData.setOpacity(1.00);
		me._page_down.userData.setOpacity(1.00);
		player.addListener('activehotspotchanged', function() {
			for(var i = 0; i < me._node_cloner.userData.ggInstances.length; i++) {
				me._node_cloner.userData.ggInstances[i].ggEvent_activehotspotchanged();
			}
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_activehotspotchanged();
				}
			}
		});
		player.addListener('changenode', function() {
			for(var i = 0; i < me._node_cloner.userData.ggInstances.length; i++) {
				me._node_cloner.userData.ggInstances[i].ggEvent_changenode();
			}
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_changenode();
				}
			}
			me._page_up_bg.logicBlock_visible();
			me._page_down_bg.logicBlock_visible();
		});
		player.addListener('configloaded', function() {
			for(var i = 0; i < me._node_cloner.userData.ggInstances.length; i++) {
				me._node_cloner.userData.ggInstances[i].ggEvent_configloaded();
			}
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_configloaded();
				}
			}
			me._page_up_bg.logicBlock_visible();
			me._page_down_bg.logicBlock_visible();
		});
		player.addListener('varchanged_node_cloner_hasDown', function() {
			me._page_down_bg.logicBlock_visible();
		});
		player.addListener('varchanged_node_cloner_hasUp', function() {
			me._page_up_bg.logicBlock_visible();
		});
		player.addListener('varchanged_open_image_hs', function() {
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_varchanged_open_image_hs();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_varchanged_open_image_hs();
				}
			}
		});
		player.addListener('varchanged_open_info_hs', function() {
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_varchanged_open_info_hs();
				}
			}
		});
		player.addListener('varchanged_open_video_hs', function() {
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_varchanged_open_video_hs();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_varchanged_open_video_hs();
				}
			}
		});
	};
	this.removeSkin=function() {
	};
	function SkinCloner_node_cloner_Class(nodeId, parentScope, ggParent, parameter) {
		var me=this;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.ggUserdata.nodeId=me.ggNodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
			me.__obj = new THREE.Group;
			me.__obj.name = 'node_cloner_subElement';
			me.__obj.position.x = parameter.left;
			me.__obj.position.y = parameter.top;
			me.__obj.userData.ggIsActive = function() {
				return player.getCurrentNode()==me.userData.ggNodeId;
			}
			me.__obj.userData.ggElementNodeId=function() {
				return me.userData.ggNodeId;
			}
		width = 1.5;
		height = 0.92;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.2, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.2, (height / 2.0));
		roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.2);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.2, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.2);
		roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.2, (height / 2.0));
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'node_image_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		loader = new THREE.TextureLoader();
		el.userData.ggNodeId=nodeId;
		texture = loader.load(basePath + 'images_vr/node_image_' + nodeId + '.png');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'node_image_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.87, 0.87, 1.0);
		el.userData.width = 150;
		el.userData.height = 92;
		el.userData.scale = {x: 0.87, y: 0.87, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'node_image';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._node_image.material) me._node_image.material.opacity = v;
			me._node_image.visible = (v>0 && me._node_image.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._node_image.visible
			let parentEl = me._node_image.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._node_image.userData.opacity = v;
			v = v * me._node_image.userData.parentOpacity;
			me._node_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_image.children.length; i++) {
				let child = me._node_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._node_image.userData.parentOpacity = v;
			v = v * me._node_image.userData.opacity
			me._node_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_image.children.length; i++) {
				let child = me._node_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._node_image = el;
		el.userData.ggId="node_image";
		me._node_image.userData.ggIsActive=function() {
			return player.getCurrentNode()==this.userData.ggElementNodeId();
		}
		el.userData.ggElementNodeId=function() {
			return this.userData.ggNodeId;
		}
		me._node_image.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['node_image'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._node_image.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._node_image.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._node_image.ggCurrentLogicStateScaling == 0) {
					me._node_image.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._node_image.userData.transitions.length; i++) {
						if (me._node_image.userData.transitions[i].property == 'scale') {
							clearInterval(me._node_image.userData.transitions[i].interval);
							me._node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._node_image.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._node_image.scale.set(transition_scale.startScale.x + (me._node_image.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._node_image.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._node_image.position.x = (me._node_image.position.x - me._node_image.userData.curScaleOffX) + scaleOffX;
						me._node_image.userData.curScaleOffX = scaleOffX;
						me._node_image.position.y = (me._node_image.position.y - me._node_image.userData.curScaleOffY) + scaleOffY;
						me._node_image.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._node_image.userData.transitions.splice(me._node_image.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._node_image.userData.transitions.push(transition_scale);
				}
				else {
					me._node_image.userData.transitionValue_scale = {x: 0.87, y: 0.87, z: 1.0};
					for (var i = 0; i < me._node_image.userData.transitions.length; i++) {
						if (me._node_image.userData.transitions[i].property == 'scale') {
							clearInterval(me._node_image.userData.transitions[i].interval);
							me._node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._node_image.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._node_image.scale.set(transition_scale.startScale.x + (me._node_image.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._node_image.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._node_image.position.x = (me._node_image.position.x - me._node_image.userData.curScaleOffX) + scaleOffX;
						me._node_image.userData.curScaleOffX = scaleOffX;
						me._node_image.position.y = (me._node_image.position.y - me._node_image.userData.curScaleOffY) + scaleOffY;
						me._node_image.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._node_image.userData.transitions.splice(me._node_image.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._node_image.userData.transitions.push(transition_scale);
				}
			}
		}
		me._node_image.userData.onclick=function (e) {
			player.openNext("{"+me.ggNodeId+"}","");
		}
		me._node_image.userData.onmouseover=function (e) {
			me.elementMouseOver['node_image']=true;
			me._node_title.logicBlock_alpha();
			me._node_image.logicBlock_scaling();
		}
		me._node_image.userData.ontouchend=function (e) {
			me._node_image.logicBlock_scaling();
		}
		me._node_image.userData.onmouseout=function (e) {
			me.elementMouseOver['node_image']=false;
			me._node_title.logicBlock_alpha();
			me._node_image.logicBlock_scaling();
		}
		me._node_image.ggCurrentLogicStateScaling = -1;
		me._node_image.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['node_image']) {
				me.elementMouseOver['node_image']=true;
				me._node_title.logicBlock_alpha();
			}
		}
		me._node_image.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 1.5;
		height = 0.4;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.2, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'node_title_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'node_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._node_title.material.opacity = v;
			if (me._node_title.userData.hasScrollbar) {
				me._node_title.userData.scrollbar.material.opacity = v;
				me._node_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._node_title.userData.ggSubElement) {
				me._node_title.userData.ggSubElement.material.opacity = v
				me._node_title.userData.ggSubElement.visible = (v>0 && me._node_title.userData.visible);
			}
			me._node_title.visible = (v>0 && me._node_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._node_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._node_title.userData.backgroundColorAlpha = v;
			me._node_title.userData.setOpacity(me._node_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.26);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 150;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'node_title';
		el.userData.x = 0;
		el.userData.y = -0.26;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._node_title.visible
			let parentEl = me._node_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._node_title.userData.opacity = v;
			v = v * me._node_title.userData.parentOpacity;
			me._node_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_title.children.length; i++) {
				let child = me._node_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._node_title.userData.parentOpacity = v;
			v = v * me._node_title.userData.opacity
			me._node_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_title.children.length; i++) {
				let child = me._node_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._node_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0, 0, 0);
		el.userData.textColor = new THREE.Color(0.701961, 0.701961, 0.701961);
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 150;
		canvas.height = 40;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._node_title.userData.totalHeight = 18;
			me._node_title.userData.textLines = [];
			var ctx = me._node_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._node_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._node_title.userData.textLines.push(line);
					line = '';
					me._node_title.userData.totalHeight += me._node_title.userData.lineHeight;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (me._node_title.userData.width - 10 - (scrollbar ? 25 : 0)) && i > 0) {
					me._node_title.userData.textLines.push(line);
					line = words[i];
					me._node_title.userData.totalHeight += me._node_title.userData.lineHeight;
				} else {
					line = testLine;
				}
			}
			me._node_title.userData.textLines.push(line);
			me._node_title.userData.totalHeight += me._node_title.userData.lineHeight;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._node_title.userData.textCanvas;
			var ctx = me._node_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._node_title.userData.backgroundColor.r * 255 + ', ' + me._node_title.userData.backgroundColor.g * 255 + ', ' + me._node_title.userData.backgroundColor.b * 255 + ', ' + me._node_title.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._node_title.userData.textColor.r * 255 + ', ' + me._node_title.userData.textColor.g * 255 + ', ' + me._node_title.userData.textColor.b * 255 + ', ' + me._node_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._node_title.userData.boxWidth - (me._node_title.userData.hasScrollbar ? 25 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 13;
			y += (canv.height - me._node_title.userData.totalHeight - 5) / 2;
			for (var i = 0; i < me._node_title.userData.textLines.length; i++) {
				ctx.fillText(me._node_title.userData.textLines[i], x, y);
				y += me._node_title.userData.lineHeight;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'node_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.encoding = THREE.sRGBEncoding;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._node_title.material.map) {
				me._node_title.material.map.dispose();
			}
			me._node_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._node_title.remove(...me._node_title.children);
			var canv = me._node_title.userData.textCanvas;
			var ctx = me._node_title.userData.textCanvasContext;
			ctx.font = '16px Verdana';
			me._node_title.userData.lineHeight = 16 * 1.2;
			me._node_title.userData.ggWrapText(false);
			me._node_title.userData.boxWidth = me._node_title.userData.width;
			me._node_title.userData.boxHeight = me._node_title.userData.height;
			me._node_title.userData.hasScrollbar = false;
			canv.width = me._node_title.userData.boxWidth;
			canv.height = me._node_title.userData.boxHeight;
			ctx.font = '16px Verdana';
			me._node_title.userData.ggPaintCanvasText();
		}
		me._node_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(me.ggUserdata.title)));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._node_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._node_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._node_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._node_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._node_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._node_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="node_title";
		me._node_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['node_image'] == true)) && 
				((me.ggUserdata.title != ""))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._node_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._node_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._node_title.ggCurrentLogicStateAlpha == 0) {
					me._node_title.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._node_title.userData.transitions.length; i++) {
						if (me._node_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._node_title.userData.transitions[i].interval);
							me._node_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._node_title.material ? me._node_title.material.opacity : me._node_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._node_title.userData.setOpacity(transition_alpha.startAlpha + (me._node_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._node_title.userData.transitions.splice(me._node_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._node_title.userData.transitions.push(transition_alpha);
				}
				else {
					me._node_title.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._node_title.userData.transitions.length; i++) {
						if (me._node_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._node_title.userData.transitions[i].interval);
							me._node_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._node_title.material ? me._node_title.material.opacity : me._node_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._node_title.userData.setOpacity(transition_alpha.startAlpha + (me._node_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._node_title.userData.transitions.splice(me._node_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._node_title.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._node_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._node_image.add(me._node_title);
		me.__obj.add(me._node_image);
		me._node_image.userData.setOpacity(1.00);
		me._node_title.userData.setOpacity(0.00);
			me.ggEvent_activehotspotchanged=function() {
				me._node_title.logicBlock_alpha();
			};
			me.ggEvent_changenode=function() {
				me._node_title.logicBlock_alpha();
			};
			me.ggEvent_configloaded=function() {
				me._node_title.logicBlock_alpha();
			};
	};
	function SkinHotspotClass_ht_video_url(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_video_url';
		el.userData.x = 3.28;
		el.userData.y = 2.08;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url.visible
			let parentEl = me._ht_video_url.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url.userData.opacity = v;
			v = v * me._ht_video_url.userData.parentOpacity;
			me._ht_video_url.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url.children.length; i++) {
				let child = me._ht_video_url.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url.userData.parentOpacity = v;
			v = v * me._ht_video_url.userData.opacity
			me._ht_video_url.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url.children.length; i++) {
				let child = me._ht_video_url.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url = el;
		el.userData.ggId="ht_video_url";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_url.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_url']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_url']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_video_url']) {
				player.setActiveHotspot(me.hotspot);
				me.elementMouseOver['ht_video_url']=true;
			}
		}
		me._ht_video_url.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.45;
		height = 0.45;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.12, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.12, (height / 2.0));
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_video_url_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgba(74,74,74,0.588235)').convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_url_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_url_bg.material.opacity = v * me._ht_video_url_bg.userData.backgroundColorAlpha;
			if (me._ht_video_url_bg.userData.ggSubElement) {
				me._ht_video_url_bg.userData.ggSubElement.material.opacity = v
				me._ht_video_url_bg.userData.ggSubElement.visible = (v>0 && me._ht_video_url_bg.userData.visible);
			}
			me._ht_video_url_bg.visible = (v>0 && me._ht_video_url_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_bg.userData.backgroundColorAlpha = v;
			me._ht_video_url_bg.userData.setOpacity(me._ht_video_url_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_bg.visible
			let parentEl = me._ht_video_url_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_bg.userData.opacity = v;
			v = v * me._ht_video_url_bg.userData.parentOpacity;
			me._ht_video_url_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_bg.children.length; i++) {
				let child = me._ht_video_url_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_bg.userData.parentOpacity = v;
			v = v * me._ht_video_url_bg.userData.opacity
			me._ht_video_url_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_bg.children.length; i++) {
				let child = me._ht_video_url_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_bg = el;
		el.userData.ggId="ht_video_url_bg";
		me._ht_video_url_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_video_url_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_url_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_url_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_url_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_video_url_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_url_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.scale.set(transition_scale.startScale.x + (me._ht_video_url_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_bg.position.x = (me._ht_video_url_bg.position.x - me._ht_video_url_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_bg.position.y = (me._ht_video_url_bg.position.y - me._ht_video_url_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_url_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_url_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.scale.set(transition_scale.startScale.x + (me._ht_video_url_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_bg.position.x = (me._ht_video_url_bg.position.x - me._ht_video_url_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_bg.position.y = (me._ht_video_url_bg.position.y - me._ht_video_url_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_url_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_url_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_url_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_url_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_url_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_bg.material ? me._ht_video_url_bg.material.opacity : me._ht_video_url_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_url_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_bg.material ? me._ht_video_url_bg.material.opacity : me._ht_video_url_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_url_bg.userData.onclick=function (e) {
			player.setVariableValue('open_video_hs', player.getVariableValue('open_video_hs') + "<"+me.hotspot.id+">");
			me._ht_video_url_popup.userData.ggInitMedia(player._(me.hotspot.url));
		}
		me._ht_video_url_bg.userData.onmouseover=function (e) {
			me.elementMouseOver['ht_video_url_bg']=true;
			me._ht_video_url_title.logicBlock_alpha();
			me._ht_video_url_bg.logicBlock_scaling();
		}
		me._ht_video_url_bg.userData.ontouchend=function (e) {
			me._ht_video_url_bg.logicBlock_scaling();
		}
		me._ht_video_url_bg.userData.onmouseout=function (e) {
			me.elementMouseOver['ht_video_url_bg']=false;
			me._ht_video_url_title.logicBlock_alpha();
			me._ht_video_url_bg.logicBlock_scaling();
		}
		me._ht_video_url_bg.ggCurrentLogicStateScaling = -1;
		me._ht_video_url_bg.ggCurrentLogicStateAlpha = -1;
		me._ht_video_url_bg.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_video_url_bg']) {
				me.elementMouseOver['ht_video_url_bg']=true;
				me._ht_video_url_title.logicBlock_alpha();
			}
		}
		me._ht_video_url_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(0.36, 0.36, 5, 5 );
		geometry.name = 'ht_video_url_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAEOElEQVR4nO2bP2gbVxzHP787Ox4CgXaIEe6SIS4U4qERNOlUCkWg6lRqunToH7duvZdgiDsIQUgoJdC1blPHS5eCSnWHQBSSMS6oGVwoJBlCByHaoQVDFtmnXwfdOWdVUu2Tpcin91n03tO99/vpy+mrp8fvwGAwGAwGg8FgMBgMhjFD+r1ZKpXO2rZ93rKs6VEl1ItWq7Xr+/6jxcXFv0YZt6tAnuflW63Wmoi8MspkDoOq/mJZ1vVcLlceRbwDAtVqtelGo/E1sDSK4AOykUqlVtLp9O4wg0xFOx3i1EXktqr+Bvw5zCQOyayIXFDVD4E5YKnRaAB8NMyg+3eQ53l5Vf0JQFV/mJqaWs5mszvDDB6HSqVyxvf9W8A7ACLy1jC/blbYaLVaa0GzPq'+
	'7iAGSz2R3btj8G6gCqenWY8Sxo/1qFhiwit8dVnJBsNrujqptB91KpVDp7XGuXy+Vz5XL5XNi3AGzbPh8OBJ4z9ojIdtiO5h+XQqFgua67KiIPRORBKNIUQMc+ZxwM+TDs5znoPq1Sqbzg+/4m8Ho4JiKvAo+t3tMmA8/zFn3f3yYiTkAdOn7mJ4lqtXq62Wx+parLkeGHwHz0uokUyPO8i81m83ueivE3sAz8A9yNXjtRX7HQiFX1Hk/FuQMsOI7zY7c5E3MHdTHiXeDzWq12s1gstnrNmwiBAiP+FnguGHqoqu/m8/n7/zc30QJ1M2JVXZ+Zmfksk8k8OcwaiRWolxHn8/muXtOLxAlUKBSsdDp9RVWvAeEG8g7wvuM49aOulyiB4hpxPxIj0CBG3I9ECCQiV1T1zbB/VCPuRyIEiogTy4j7cWIFUtWUiET7d0Xk'+
	'vThG3I/E/NWQqFrHyIkVSEQaHUOvAduu6759nHFOrEAdeMHr80DJdd31arV6+jgWTopAN4FF2iYN8Emz2bzved7FQRdOikAExxULtHfNAPOqes913dVCoRD7cyZGIADHceq1Wu0NYJX2Lnoa+CKdTv/suu5cnDUTJRBAsVhsOY7zpYhcpn2ECu2/HrEMPHECheRyuV9PnTr1MvBNMBTLwBMrEEAmk3niOM6nDGDgiRYoZBADnwiBIL6BT4xAEM/AJ0qgkF4GDqx3XjuRAkFPA/9PEcTEChTSxcAPYEG7gjQyNjuCvI6D/Tw78j8yXQx8V1X/gEAg3/cfhReLyIVBgo0KVV0I29H84xIa+N7e3ryqvpjP5x9DpEaxXC5vBVVmddu2XxrnKrOgTvF32sWcW47jXB5WrH0PsizretCc833/VqVSOTOsoIMQKeKcAxCRG8'+
	'OMd+CY0nXd74iUAavqZlDqNg5VZ7OquiAiHxCIA2w4jjPUMuADh/apVGolqD1eAuZEZK3rrGdEx7HzRiqVWhl6zG6DQc30VeDSsBOIwZaI3HgmjyJ0Yh5mMRgMBoPBYDAYDAaDYQz5F3Bi5OvNYecNAAAAAElFTkSuQmCC');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_url_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 36;
		el.userData.height = 36;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_icon.material) me._ht_video_url_icon.material.opacity = v;
			me._ht_video_url_icon.visible = (v>0 && me._ht_video_url_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_icon.visible
			let parentEl = me._ht_video_url_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_icon.userData.opacity = v;
			v = v * me._ht_video_url_icon.userData.parentOpacity;
			me._ht_video_url_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_icon.children.length; i++) {
				let child = me._ht_video_url_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_icon.userData.parentOpacity = v;
			v = v * me._ht_video_url_icon.userData.opacity
			me._ht_video_url_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_icon.children.length; i++) {
				let child = me._ht_video_url_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_icon = el;
		el.userData.ggId="ht_video_url_icon";
		me._ht_video_url_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url_bg.add(me._ht_video_url_icon);
		geometry = new THREE.PlaneBufferGeometry(1, 0.2, 5, 5 );
		geometry.name = 'ht_video_url_title_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_url_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_url_title.material.opacity = v;
			if (me._ht_video_url_title.userData.hasScrollbar) {
				me._ht_video_url_title.userData.scrollbar.material.opacity = v;
				me._ht_video_url_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_video_url_title.userData.ggSubElement) {
				me._ht_video_url_title.userData.ggSubElement.material.opacity = v
				me._ht_video_url_title.userData.ggSubElement.visible = (v>0 && me._ht_video_url_title.userData.visible);
			}
			me._ht_video_url_title.visible = (v>0 && me._ht_video_url_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_title.userData.backgroundColorAlpha = v;
			me._ht_video_url_title.userData.setOpacity(me._ht_video_url_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.325);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_title';
		el.userData.x = 0;
		el.userData.y = -0.325;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_title.visible
			let parentEl = me._ht_video_url_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_title.userData.opacity = v;
			v = v * me._ht_video_url_title.userData.parentOpacity;
			me._ht_video_url_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_title.children.length; i++) {
				let child = me._ht_video_url_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_title.userData.parentOpacity = v;
			v = v * me._ht_video_url_title.userData.opacity
			me._ht_video_url_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_title.children.length; i++) {
				let child = me._ht_video_url_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1);
		el.userData.textColor = new THREE.Color(0.701961, 0.701961, 0.701961);
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 100;
		canvas.height = 20;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_video_url_title.userData.totalHeight = 3;
			me._ht_video_url_title.userData.textLines = [];
			var ctx = me._ht_video_url_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_video_url_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_video_url_title.userData.textLines.push(line);
					line = '';
					me._ht_video_url_title.userData.totalHeight += me._ht_video_url_title.userData.lineHeight;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (me._ht_video_url_title.userData.width - 0 - (scrollbar ? 25 : 0)) && i > 0) {
					me._ht_video_url_title.userData.textLines.push(line);
					line = words[i];
					me._ht_video_url_title.userData.totalHeight += me._ht_video_url_title.userData.lineHeight;
				} else {
					line = testLine;
				}
			}
			me._ht_video_url_title.userData.textLines.push(line);
			me._ht_video_url_title.userData.totalHeight += me._ht_video_url_title.userData.lineHeight;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_video_url_title.userData.textCanvas;
			var ctx = me._ht_video_url_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_video_url_title.userData.textColor.r * 255 + ', ' + me._ht_video_url_title.userData.textColor.g * 255 + ', ' + me._ht_video_url_title.userData.textColor.b * 255 + ', ' + me._ht_video_url_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_video_url_title.userData.boxWidth - (me._ht_video_url_title.userData.hasScrollbar ? 25 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 3;
			for (var i = 0; i < me._ht_video_url_title.userData.textLines.length; i++) {
				ctx.fillText(me._ht_video_url_title.userData.textLines[i], x, y);
				y += me._ht_video_url_title.userData.lineHeight;
			}
			geometry = new THREE.PlaneBufferGeometry(me._ht_video_url_title.userData.boxWidth / 100.0, me._ht_video_url_title.userData.boxHeight / 100.0, 5, 5 );
			geometry.name = 'ht_video_url_title_geometry';
			me._ht_video_url_title.geometry.dispose();
			me._ht_video_url_title.geometry = geometry;
			var diffY = me._ht_video_url_title.userData.boxHeight - me._ht_video_url_title.userData.height;
			me._ht_video_url_title.position.y = me._ht_video_url_title.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_video_url_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.encoding = THREE.sRGBEncoding;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_video_url_title.material.map) {
				me._ht_video_url_title.material.map.dispose();
			}
			me._ht_video_url_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._ht_video_url_title.remove(...me._ht_video_url_title.children);
			var canv = me._ht_video_url_title.userData.textCanvas;
			var ctx = me._ht_video_url_title.userData.textCanvasContext;
			ctx.font = '18px Verdana';
			me._ht_video_url_title.userData.lineHeight = 18 * 1.2;
			me._ht_video_url_title.userData.textLines = [];
			me._ht_video_url_title.userData.textLines.push(me._ht_video_url_title.userData.ggText);
			me._ht_video_url_title.userData.totalHeight = 3;
			me._ht_video_url_title.userData.totalHeight += me._ht_video_url_title.userData.lineHeight;
			me._ht_video_url_title.userData.boxWidth = ctx.measureText(me._ht_video_url_title.userData.ggText).width + 0;
			me._ht_video_url_title.userData.boxHeight = me._ht_video_url_title.userData.totalHeight;
			canv.width = me._ht_video_url_title.userData.boxWidth;
			canv.height = me._ht_video_url_title.userData.boxHeight;
			ctx.font = '18px Verdana';
			me._ht_video_url_title.userData.ggPaintCanvasText();
		}
		me._ht_video_url_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_video_url_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_video_url_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_video_url_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_video_url_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_video_url_title";
		me._ht_video_url_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_video_url_bg'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_url_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_url_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_url_title.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_url_title.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_url_title.userData.transitions.length; i++) {
						if (me._ht_video_url_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_title.userData.transitions[i].interval);
							me._ht_video_url_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_title.material ? me._ht_video_url_title.material.opacity : me._ht_video_url_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_title.userData.transitions.splice(me._ht_video_url_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_title.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_url_title.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_url_title.userData.transitions.length; i++) {
						if (me._ht_video_url_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_title.userData.transitions[i].interval);
							me._ht_video_url_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_title.material ? me._ht_video_url_title.material.opacity : me._ht_video_url_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_title.userData.transitions.splice(me._ht_video_url_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_title.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_url_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url_bg.add(me._ht_video_url_title);
		me._ht_video_url.add(me._ht_video_url_bg);
		width = 6.6;
		height = 4.8;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.3, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.3, (height / 2.0));
		roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.3);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.3);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.3, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.3, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.3);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.3);
		roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.3, (height / 2.0));
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_video_url_popup_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgba(74,74,74,0.666667)').convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_url_popup_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_url_popup_bg.material.opacity = v * me._ht_video_url_popup_bg.userData.backgroundColorAlpha;
			if (me._ht_video_url_popup_bg.userData.ggSubElement) {
				me._ht_video_url_popup_bg.userData.ggSubElement.material.opacity = v
				me._ht_video_url_popup_bg.userData.ggSubElement.visible = (v>0 && me._ht_video_url_popup_bg.userData.visible);
			}
			me._ht_video_url_popup_bg.visible = (v>0 && me._ht_video_url_popup_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_popup_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_popup_bg.userData.backgroundColorAlpha = v;
			me._ht_video_url_popup_bg.userData.setOpacity(me._ht_video_url_popup_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.10, 0.10, 1.0);
		el.userData.width = 660;
		el.userData.height = 480;
		el.userData.scale = {x: 0.10, y: 0.10, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_popup_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_popup_bg.visible
			let parentEl = me._ht_video_url_popup_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_popup_bg.userData.opacity = v;
			v = v * me._ht_video_url_popup_bg.userData.parentOpacity;
			me._ht_video_url_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup_bg.children.length; i++) {
				let child = me._ht_video_url_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_popup_bg.userData.parentOpacity = v;
			v = v * me._ht_video_url_popup_bg.userData.opacity
			me._ht_video_url_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup_bg.children.length; i++) {
				let child = me._ht_video_url_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_popup_bg = el;
		el.userData.ggId="ht_video_url_popup_bg";
		me._ht_video_url_popup_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_url_popup_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_url_popup_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_url_popup_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_video_url_popup_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_url_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_popup_bg.userData.transitions[i].interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_url_popup_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_video_url_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_popup_bg.position.x = (me._ht_video_url_popup_bg.position.x - me._ht_video_url_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_popup_bg.position.y = (me._ht_video_url_popup_bg.position.y - me._ht_video_url_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(me._ht_video_url_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_popup_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_url_popup_bg.userData.transitionValue_scale = {x: 0.1, y: 0.1, z: 1.0};
					for (var i = 0; i < me._ht_video_url_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_popup_bg.userData.transitions[i].interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_url_popup_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_video_url_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_popup_bg.position.x = (me._ht_video_url_popup_bg.position.x - me._ht_video_url_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_popup_bg.position.y = (me._ht_video_url_popup_bg.position.y - me._ht_video_url_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(me._ht_video_url_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_popup_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_url_popup_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_url_popup_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_url_popup_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_url_popup_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_url_popup_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_url_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_popup_bg.userData.transitions[i].interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_popup_bg.material ? me._ht_video_url_popup_bg.material.opacity : me._ht_video_url_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(me._ht_video_url_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_popup_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_url_popup_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_url_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_popup_bg.userData.transitions[i].interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_popup_bg.material ? me._ht_video_url_popup_bg.material.opacity : me._ht_video_url_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(me._ht_video_url_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_popup_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_url_popup_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(6, 3.8, 5, 5 );
		geometry.name = 'ht_video_url_popup_geometry';
		material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_url_popup_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(-0.1);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 600;
		el.userData.height = 380;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_popup';
		el.userData.x = 0;
		el.userData.y = -0.1;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_popup.material) me._ht_video_url_popup.material.opacity = v;
			me._ht_video_url_popup.visible = (v>0 && me._ht_video_url_popup.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_popup.visible
			let parentEl = me._ht_video_url_popup.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_popup.userData.opacity = v;
			v = v * me._ht_video_url_popup.userData.parentOpacity;
			me._ht_video_url_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup.children.length; i++) {
				let child = me._ht_video_url_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_popup.userData.parentOpacity = v;
			v = v * me._ht_video_url_popup.userData.opacity
			me._ht_video_url_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup.children.length; i++) {
				let child = me._ht_video_url_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_popup = el;
		me._ht_video_url_popup.userData.seekbars = [];
		me._ht_video_url_popup.userData.ggInitMedia = function(media) {
			if (me._ht_video_url_popup__vid) me._ht_video_url_popup__vid.pause();
			me._ht_video_url_popup__vid = document.createElement('video');
			player.registerVideoElement('ht_video_url_popup', me._ht_video_url_popup__vid);
			me._ht_video_url_popup__vid.setAttribute('autoplay', '');
			me._ht_video_url_popup__source = document.createElement('source');
			me._ht_video_url_popup__source.setAttribute('src', media);
			me._ht_video_url_popup__vid.addEventListener('loadedmetadata', function() {
				let videoAR = me._ht_video_url_popup__vid.videoWidth / me._ht_video_url_popup__vid.videoHeight;
				let elAR = me._ht_video_url_popup.userData.width / me._ht_video_url_popup.userData.height;
				if (videoAR > elAR) {
					me._ht_video_url_popup.scale.set(1, (me._ht_video_url_popup.userData.width / videoAR) / me._ht_video_url_popup.userData.height, 1);
				} else {
					me._ht_video_url_popup.scale.set((me._ht_video_url_popup.userData.height * videoAR) / me._ht_video_url_popup.userData.width, 1, 1);
				}
			}, false);
			me._ht_video_url_popup__vid.appendChild(me._ht_video_url_popup__source);
			videoTexture = new THREE.VideoTexture( me._ht_video_url_popup__vid );
			videoTexture.name = 'ht_video_url_popup_videoTexture';
			videoTexture.minFilter = THREE.LinearFilter;
			videoTexture.magFilter = THREE.LinearFilter;
			videoTexture.format = THREE.RGBAFormat;
			videoMaterial = new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.DoubleSide, transparent: true} );
			videoMaterial.name = 'ht_video_url_popup_videoMaterial';
			videoMaterial.alphaTest = 0.5;
			me._ht_video_url_popup.material = videoMaterial;
		}
		el.userData.ggId="ht_video_url_popup";
		me._ht_video_url_popup.userData.ggIsActive=function() {
			if (me._ht_video_url_popup__vid != null) {
				return (me._ht_video_url_popup__vid.paused == false && me._ht_video_url_popup__vid.ended == false);
			} else {
				return false;
			}
		}
		me._ht_video_url_popup.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_popup.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_popup.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_url_popup.ggCurrentLogicStateVisible == 0) {
			me._ht_video_url_popup.visible=((!me._ht_video_url_popup.material && Number(me._ht_video_url_popup.userData.opacity>0)) || Number(me._ht_video_url_popup.material.opacity)>0)?true:false;
			me._ht_video_url_popup.userData.visible=true;
					if (me._ht_video_url_popup.userData.ggVideoNotLoaded) {
						me._ht_video_url_popup.userData.ggInitMedia(me._ht_video_url_popup.ggVideoSource);
					}
				}
				else {
			me._ht_video_url_popup.visible=false;
			me._ht_video_url_popup.userData.visible=false;
					me._ht_video_url_popup.userData.ggInitMedia('');
				}
			}
		}
		me._ht_video_url_popup.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url_popup_bg.add(me._ht_video_url_popup);
		geometry = new THREE.PlaneBufferGeometry(0.4, 0.4, 5, 5 );
		geometry.name = 'ht_video_url_popup_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABJElEQVR4nO3bSw6DMBAEUSs341icfrLJSJGFAeNfY9c7QU9JiJVDAAAAAAAAAADgdcxsM7Nt9I4U6X2/cW4fvSdmZvvfPr2IUUCpiFE8zYAhHA4dHlFx0ymlwUpbsigMV9hQZOQBr4/nRhwyTTzX86Dp4rkeh00bz7U8cPp4rsWhy8RzNQ9eLp6rcfiy8VxJgOXjuSchiBfJCUK8hDthiHfhLBDxbjoKRbxMB8GIlysRUTLeZ/QAVMYnXICfSIGzUES8cCcQERNywhAx8iQIEX9KQiwfsUaAZSPWPHy5iC0OXiZiy0Onj9jjwGkj9jxsuogjDpom4shDXh9R4QCFDY8oDVfacoviYMVNh4xnDmWMhzblTPkpVdDfBwAAAAAAAABA2hcaGfeSY++bsA'+
	'AAAABJRU5ErkJggg==');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_url_popup_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.85);
		el.translateY(2.05);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 40;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_popup_close';
		el.userData.x = 2.85;
		el.userData.y = 2.05;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_popup_close.material) me._ht_video_url_popup_close.material.opacity = v;
			me._ht_video_url_popup_close.visible = (v>0 && me._ht_video_url_popup_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_popup_close.visible
			let parentEl = me._ht_video_url_popup_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_popup_close.userData.opacity = v;
			v = v * me._ht_video_url_popup_close.userData.parentOpacity;
			me._ht_video_url_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup_close.children.length; i++) {
				let child = me._ht_video_url_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_popup_close.userData.parentOpacity = v;
			v = v * me._ht_video_url_popup_close.userData.opacity
			me._ht_video_url_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup_close.children.length; i++) {
				let child = me._ht_video_url_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_popup_close = el;
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABkklEQVR4nO3bTU7CUBRA4VN3hmNYECwAF9Q3xqXVSZsQAqLe93MN55uYENPed0CKbQFJkiRJkiRJkv6dUsqulLIbPccjLeZ7q7WhUspuWZbLsiyXeZ6PtbZbyzzPx22+mhGrBbxxzhRxneXcYtvVAu73+0/gdPVQioh34p3WWauYam1oc2/gw+HwUXs/WWapHhByROw1Q5OAMDZiz303CwhjIvbeZ9OA0HdBI56w5gGhz8JGvWV0CQhtFzjy/bZbQGiz0NFH/K4Boe6CR8eDAQGhzsIzxINBASEWIEs8GBgQ/hYiUzwYHBB+FyRbPEgQEH4WJmM8SBIQvg+UNR4kCgj3Q60/U8aDZAHh6dnjVPEgYUB4GDFdPGh3TeRlpHsF+icc4EEkwI8xAX6QDv'+
	'BfuQBPJgR4OivAE6oBntIP8KJSgJc1A7ywHuCtHQHeXBTg7W0Bo4+MPWfwFt+gqgEzxdu0nqlawO17IlcPDY+3uY04TdN7rTv1W10TSRMPYJ3l9PQXR3vFr3pJkiRJkiRJktTHF2/mnlujgoiVAAAAAElFTkSuQmCC');
		el.userData.materialOver = new THREE.MeshBasicMaterial( {map: textureOver, side: THREE.DoubleSide, transparent: true} );
		el.userData.materialOver.name = 'ht_video_url_popup_close_materialOver';
		el.userData.ggId="ht_video_url_popup_close";
		me._ht_video_url_popup_close.userData.onclick=function (e) {
			player.setVariableValue('open_video_hs', player.getVariableValue('open_video_hs').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_video_url_popup_close.userData.onmouseover=function (e) {
			me._ht_video_url_popup_close.material = me._ht_video_url_popup_close.userData.materialOver;
			me.elementMouseOver['ht_video_url_popup_close']=true;
		}
		me._ht_video_url_popup_close.userData.onmouseout=function (e) {
			me._ht_video_url_popup_close.material = me._ht_video_url_popup_close.userData.materialNormal;
			me.elementMouseOver['ht_video_url_popup_close']=false;
		}
		me._ht_video_url_popup_close.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_video_url_popup_close']) {
				me._ht_video_url_popup_close.material = me._ht_video_url_popup_close.userData.materialOver;
				me.elementMouseOver['ht_video_url_popup_close']=true;
			}
		}
		me._ht_video_url_popup_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url_popup_bg.add(me._ht_video_url_popup_close);
		me._ht_video_url.add(me._ht_video_url_popup_bg);
		me._ht_video_url.userData.setOpacity(1.00);
		me._ht_video_url_bg.userData.setOpacity(1.00);
		me._ht_video_url_icon.userData.setOpacity(1.00);
		me._ht_video_url_title.userData.setOpacity(0.00);
		me._ht_video_url_popup_bg.userData.setOpacity(0.00);
		me._ht_video_url_popup.userData.setOpacity(1.00);
		me._ht_video_url_popup.userData.ggVideoSource = '';
		me._ht_video_url_popup.userData.ggVideoNotLoaded = true;
		me._ht_video_url_popup_close.userData.setOpacity(1.00);
			me.ggEvent_changenode=function() {
				me._ht_video_url_bg.logicBlock_alpha();
				me._ht_video_url_popup_bg.logicBlock_scaling();
				me._ht_video_url_popup_bg.logicBlock_alpha();
				me._ht_video_url_popup.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_video_url_bg.logicBlock_alpha();
				me._ht_video_url_popup_bg.logicBlock_scaling();
				me._ht_video_url_popup_bg.logicBlock_alpha();
				me._ht_video_url_popup.logicBlock_visible();
			};
			me.ggEvent_varchanged_open_video_hs=function() {
				me._ht_video_url_bg.logicBlock_alpha();
				me._ht_video_url_popup_bg.logicBlock_scaling();
				me._ht_video_url_popup_bg.logicBlock_alpha();
				me._ht_video_url_popup.logicBlock_visible();
			};
			me.__obj = me._ht_video_url;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_video_file(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_video_file';
		el.userData.x = 2.72;
		el.userData.y = 2.08;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file.visible
			let parentEl = me._ht_video_file.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file.userData.opacity = v;
			v = v * me._ht_video_file.userData.parentOpacity;
			me._ht_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file.children.length; i++) {
				let child = me._ht_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file.userData.parentOpacity = v;
			v = v * me._ht_video_file.userData.opacity
			me._ht_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file.children.length; i++) {
				let child = me._ht_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file = el;
		el.userData.ggId="ht_video_file";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_file.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_file']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_file']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_video_file']) {
				player.setActiveHotspot(me.hotspot);
				me.elementMouseOver['ht_video_file']=true;
			}
		}
		me._ht_video_file.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.45;
		height = 0.45;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.12, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.12, (height / 2.0));
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_video_file_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgba(74,74,74,0.588235)').convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_file_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_file_bg.material.opacity = v * me._ht_video_file_bg.userData.backgroundColorAlpha;
			if (me._ht_video_file_bg.userData.ggSubElement) {
				me._ht_video_file_bg.userData.ggSubElement.material.opacity = v
				me._ht_video_file_bg.userData.ggSubElement.visible = (v>0 && me._ht_video_file_bg.userData.visible);
			}
			me._ht_video_file_bg.visible = (v>0 && me._ht_video_file_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_bg.userData.backgroundColorAlpha = v;
			me._ht_video_file_bg.userData.setOpacity(me._ht_video_file_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_bg.visible
			let parentEl = me._ht_video_file_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_bg.userData.opacity = v;
			v = v * me._ht_video_file_bg.userData.parentOpacity;
			me._ht_video_file_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_bg.children.length; i++) {
				let child = me._ht_video_file_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_bg.userData.parentOpacity = v;
			v = v * me._ht_video_file_bg.userData.opacity
			me._ht_video_file_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_bg.children.length; i++) {
				let child = me._ht_video_file_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_bg = el;
		el.userData.ggId="ht_video_file_bg";
		me._ht_video_file_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_video_file_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_file_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_file_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_file_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_video_file_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_file_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.scale.set(transition_scale.startScale.x + (me._ht_video_file_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_bg.position.x = (me._ht_video_file_bg.position.x - me._ht_video_file_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_bg.position.y = (me._ht_video_file_bg.position.y - me._ht_video_file_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_file_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_file_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.scale.set(transition_scale.startScale.x + (me._ht_video_file_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_bg.position.x = (me._ht_video_file_bg.position.x - me._ht_video_file_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_bg.position.y = (me._ht_video_file_bg.position.y - me._ht_video_file_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_file_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_file_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_file_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_file_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_file_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_bg.material ? me._ht_video_file_bg.material.opacity : me._ht_video_file_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_file_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_bg.material ? me._ht_video_file_bg.material.opacity : me._ht_video_file_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_file_bg.userData.onclick=function (e) {
			player.setVariableValue('open_video_hs', player.getVariableValue('open_video_hs') + "<"+me.hotspot.id+">");
			me._ht_video_file_popup.userData.ggInitMedia(player._(me.hotspot.url));
		}
		me._ht_video_file_bg.userData.onmouseover=function (e) {
			me.elementMouseOver['ht_video_file_bg']=true;
			me._ht_video_file_title.logicBlock_alpha();
			me._ht_video_file_bg.logicBlock_scaling();
		}
		me._ht_video_file_bg.userData.ontouchend=function (e) {
			me._ht_video_file_bg.logicBlock_scaling();
		}
		me._ht_video_file_bg.userData.onmouseout=function (e) {
			me.elementMouseOver['ht_video_file_bg']=false;
			me._ht_video_file_title.logicBlock_alpha();
			me._ht_video_file_bg.logicBlock_scaling();
		}
		me._ht_video_file_bg.ggCurrentLogicStateScaling = -1;
		me._ht_video_file_bg.ggCurrentLogicStateAlpha = -1;
		me._ht_video_file_bg.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_video_file_bg']) {
				me.elementMouseOver['ht_video_file_bg']=true;
				me._ht_video_file_title.logicBlock_alpha();
			}
		}
		me._ht_video_file_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(0.36, 0.36, 5, 5 );
		geometry.name = 'ht_video_file_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAEOElEQVR4nO2bP2gbVxzHP787Ox4CgXaIEe6SIS4U4qERNOlUCkWg6lRqunToH7duvZdgiDsIQUgoJdC1blPHS5eCSnWHQBSSMS6oGVwoJBlCByHaoQVDFtmnXwfdOWdVUu2Tpcin91n03tO99/vpy+mrp8fvwGAwGAwGg8FgMBgMhjFD+r1ZKpXO2rZ93rKs6VEl1ItWq7Xr+/6jxcXFv0YZt6tAnuflW63Wmoi8MspkDoOq/mJZ1vVcLlceRbwDAtVqtelGo/E1sDSK4AOykUqlVtLp9O4wg0xFOx3i1EXktqr+Bvw5zCQOyayIXFDVD4E5YKnRaAB8NMyg+3eQ53l5Vf0JQFV/mJqaWs5mszvDDB6HSqVyxvf9W8A7ACLy1jC/blbYaLVaa0GzPq'+
	'7iAGSz2R3btj8G6gCqenWY8Sxo/1qFhiwit8dVnJBsNrujqptB91KpVDp7XGuXy+Vz5XL5XNi3AGzbPh8OBJ4z9ojIdtiO5h+XQqFgua67KiIPRORBKNIUQMc+ZxwM+TDs5znoPq1Sqbzg+/4m8Ho4JiKvAo+t3tMmA8/zFn3f3yYiTkAdOn7mJ4lqtXq62Wx+parLkeGHwHz0uokUyPO8i81m83ueivE3sAz8A9yNXjtRX7HQiFX1Hk/FuQMsOI7zY7c5E3MHdTHiXeDzWq12s1gstnrNmwiBAiP+FnguGHqoqu/m8/n7/zc30QJ1M2JVXZ+Zmfksk8k8OcwaiRWolxHn8/muXtOLxAlUKBSsdDp9RVWvAeEG8g7wvuM49aOulyiB4hpxPxIj0CBG3I9ECCQiV1T1zbB/VCPuRyIEiogTy4j7cWIFUtWUiET7d0Xk'+
	'vThG3I/E/NWQqFrHyIkVSEQaHUOvAduu6759nHFOrEAdeMHr80DJdd31arV6+jgWTopAN4FF2iYN8Emz2bzved7FQRdOikAExxULtHfNAPOqes913dVCoRD7cyZGIADHceq1Wu0NYJX2Lnoa+CKdTv/suu5cnDUTJRBAsVhsOY7zpYhcpn2ECu2/HrEMPHECheRyuV9PnTr1MvBNMBTLwBMrEEAmk3niOM6nDGDgiRYoZBADnwiBIL6BT4xAEM/AJ0qgkF4GDqx3XjuRAkFPA/9PEcTEChTSxcAPYEG7gjQyNjuCvI6D/Tw78j8yXQx8V1X/gEAg3/cfhReLyIVBgo0KVV0I29H84xIa+N7e3ryqvpjP5x9DpEaxXC5vBVVmddu2XxrnKrOgTvF32sWcW47jXB5WrH0PsizretCc833/VqVSOTOsoIMQKeKcAxCRG8'+
	'OMd+CY0nXd74iUAavqZlDqNg5VZ7OquiAiHxCIA2w4jjPUMuADh/apVGolqD1eAuZEZK3rrGdEx7HzRiqVWhl6zG6DQc30VeDSsBOIwZaI3HgmjyJ0Yh5mMRgMBoPBYDAYDAaDYQz5F3Bi5OvNYecNAAAAAElFTkSuQmCC');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_file_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 36;
		el.userData.height = 36;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_icon.material) me._ht_video_file_icon.material.opacity = v;
			me._ht_video_file_icon.visible = (v>0 && me._ht_video_file_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_icon.visible
			let parentEl = me._ht_video_file_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_icon.userData.opacity = v;
			v = v * me._ht_video_file_icon.userData.parentOpacity;
			me._ht_video_file_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_icon.children.length; i++) {
				let child = me._ht_video_file_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_icon.userData.parentOpacity = v;
			v = v * me._ht_video_file_icon.userData.opacity
			me._ht_video_file_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_icon.children.length; i++) {
				let child = me._ht_video_file_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_icon = el;
		el.userData.ggId="ht_video_file_icon";
		me._ht_video_file_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file_bg.add(me._ht_video_file_icon);
		geometry = new THREE.PlaneBufferGeometry(1, 0.2, 5, 5 );
		geometry.name = 'ht_video_file_title_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_file_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_file_title.material.opacity = v;
			if (me._ht_video_file_title.userData.hasScrollbar) {
				me._ht_video_file_title.userData.scrollbar.material.opacity = v;
				me._ht_video_file_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_video_file_title.userData.ggSubElement) {
				me._ht_video_file_title.userData.ggSubElement.material.opacity = v
				me._ht_video_file_title.userData.ggSubElement.visible = (v>0 && me._ht_video_file_title.userData.visible);
			}
			me._ht_video_file_title.visible = (v>0 && me._ht_video_file_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_title.userData.backgroundColorAlpha = v;
			me._ht_video_file_title.userData.setOpacity(me._ht_video_file_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.325);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_title';
		el.userData.x = 0;
		el.userData.y = -0.325;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_title.visible
			let parentEl = me._ht_video_file_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_title.userData.opacity = v;
			v = v * me._ht_video_file_title.userData.parentOpacity;
			me._ht_video_file_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_title.children.length; i++) {
				let child = me._ht_video_file_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_title.userData.parentOpacity = v;
			v = v * me._ht_video_file_title.userData.opacity
			me._ht_video_file_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_title.children.length; i++) {
				let child = me._ht_video_file_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1);
		el.userData.textColor = new THREE.Color(0.701961, 0.701961, 0.701961);
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 100;
		canvas.height = 20;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_video_file_title.userData.totalHeight = 3;
			me._ht_video_file_title.userData.textLines = [];
			var ctx = me._ht_video_file_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_video_file_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_video_file_title.userData.textLines.push(line);
					line = '';
					me._ht_video_file_title.userData.totalHeight += me._ht_video_file_title.userData.lineHeight;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (me._ht_video_file_title.userData.width - 0 - (scrollbar ? 25 : 0)) && i > 0) {
					me._ht_video_file_title.userData.textLines.push(line);
					line = words[i];
					me._ht_video_file_title.userData.totalHeight += me._ht_video_file_title.userData.lineHeight;
				} else {
					line = testLine;
				}
			}
			me._ht_video_file_title.userData.textLines.push(line);
			me._ht_video_file_title.userData.totalHeight += me._ht_video_file_title.userData.lineHeight;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_video_file_title.userData.textCanvas;
			var ctx = me._ht_video_file_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_video_file_title.userData.textColor.r * 255 + ', ' + me._ht_video_file_title.userData.textColor.g * 255 + ', ' + me._ht_video_file_title.userData.textColor.b * 255 + ', ' + me._ht_video_file_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_video_file_title.userData.boxWidth - (me._ht_video_file_title.userData.hasScrollbar ? 25 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 3;
			for (var i = 0; i < me._ht_video_file_title.userData.textLines.length; i++) {
				ctx.fillText(me._ht_video_file_title.userData.textLines[i], x, y);
				y += me._ht_video_file_title.userData.lineHeight;
			}
			geometry = new THREE.PlaneBufferGeometry(me._ht_video_file_title.userData.boxWidth / 100.0, me._ht_video_file_title.userData.boxHeight / 100.0, 5, 5 );
			geometry.name = 'ht_video_file_title_geometry';
			me._ht_video_file_title.geometry.dispose();
			me._ht_video_file_title.geometry = geometry;
			var diffY = me._ht_video_file_title.userData.boxHeight - me._ht_video_file_title.userData.height;
			me._ht_video_file_title.position.y = me._ht_video_file_title.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_video_file_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.encoding = THREE.sRGBEncoding;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_video_file_title.material.map) {
				me._ht_video_file_title.material.map.dispose();
			}
			me._ht_video_file_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._ht_video_file_title.remove(...me._ht_video_file_title.children);
			var canv = me._ht_video_file_title.userData.textCanvas;
			var ctx = me._ht_video_file_title.userData.textCanvasContext;
			ctx.font = '18px Verdana';
			me._ht_video_file_title.userData.lineHeight = 18 * 1.2;
			me._ht_video_file_title.userData.textLines = [];
			me._ht_video_file_title.userData.textLines.push(me._ht_video_file_title.userData.ggText);
			me._ht_video_file_title.userData.totalHeight = 3;
			me._ht_video_file_title.userData.totalHeight += me._ht_video_file_title.userData.lineHeight;
			me._ht_video_file_title.userData.boxWidth = ctx.measureText(me._ht_video_file_title.userData.ggText).width + 0;
			me._ht_video_file_title.userData.boxHeight = me._ht_video_file_title.userData.totalHeight;
			canv.width = me._ht_video_file_title.userData.boxWidth;
			canv.height = me._ht_video_file_title.userData.boxHeight;
			ctx.font = '18px Verdana';
			me._ht_video_file_title.userData.ggPaintCanvasText();
		}
		me._ht_video_file_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_video_file_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_video_file_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_video_file_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_video_file_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_video_file_title";
		me._ht_video_file_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_video_file_bg'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_file_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_file_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_file_title.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_file_title.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_file_title.userData.transitions.length; i++) {
						if (me._ht_video_file_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_title.userData.transitions[i].interval);
							me._ht_video_file_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_title.material ? me._ht_video_file_title.material.opacity : me._ht_video_file_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_title.userData.transitions.splice(me._ht_video_file_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_title.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_file_title.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_file_title.userData.transitions.length; i++) {
						if (me._ht_video_file_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_title.userData.transitions[i].interval);
							me._ht_video_file_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_title.material ? me._ht_video_file_title.material.opacity : me._ht_video_file_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_title.userData.transitions.splice(me._ht_video_file_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_title.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_file_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file_bg.add(me._ht_video_file_title);
		me._ht_video_file.add(me._ht_video_file_bg);
		width = 6.6;
		height = 4.8;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.3, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.3, (height / 2.0));
		roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.3);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.3);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.3, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.3, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.3);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.3);
		roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.3, (height / 2.0));
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_video_file_popup_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgba(74,74,74,0.666667)').convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_file_popup_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_file_popup_bg.material.opacity = v * me._ht_video_file_popup_bg.userData.backgroundColorAlpha;
			if (me._ht_video_file_popup_bg.userData.ggSubElement) {
				me._ht_video_file_popup_bg.userData.ggSubElement.material.opacity = v
				me._ht_video_file_popup_bg.userData.ggSubElement.visible = (v>0 && me._ht_video_file_popup_bg.userData.visible);
			}
			me._ht_video_file_popup_bg.visible = (v>0 && me._ht_video_file_popup_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_popup_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_popup_bg.userData.backgroundColorAlpha = v;
			me._ht_video_file_popup_bg.userData.setOpacity(me._ht_video_file_popup_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.10, 0.10, 1.0);
		el.userData.width = 660;
		el.userData.height = 480;
		el.userData.scale = {x: 0.10, y: 0.10, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_popup_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_popup_bg.visible
			let parentEl = me._ht_video_file_popup_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_popup_bg.userData.opacity = v;
			v = v * me._ht_video_file_popup_bg.userData.parentOpacity;
			me._ht_video_file_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup_bg.children.length; i++) {
				let child = me._ht_video_file_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_popup_bg.userData.parentOpacity = v;
			v = v * me._ht_video_file_popup_bg.userData.opacity
			me._ht_video_file_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup_bg.children.length; i++) {
				let child = me._ht_video_file_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_popup_bg = el;
		el.userData.ggId="ht_video_file_popup_bg";
		me._ht_video_file_popup_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_file_popup_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_file_popup_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_file_popup_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_video_file_popup_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_file_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_popup_bg.userData.transitions[i].interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_file_popup_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_video_file_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_popup_bg.position.x = (me._ht_video_file_popup_bg.position.x - me._ht_video_file_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_popup_bg.position.y = (me._ht_video_file_popup_bg.position.y - me._ht_video_file_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(me._ht_video_file_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_popup_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_file_popup_bg.userData.transitionValue_scale = {x: 0.1, y: 0.1, z: 1.0};
					for (var i = 0; i < me._ht_video_file_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_popup_bg.userData.transitions[i].interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_file_popup_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_video_file_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_popup_bg.position.x = (me._ht_video_file_popup_bg.position.x - me._ht_video_file_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_popup_bg.position.y = (me._ht_video_file_popup_bg.position.y - me._ht_video_file_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(me._ht_video_file_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_popup_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_file_popup_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_file_popup_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_file_popup_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_file_popup_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_file_popup_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_file_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_popup_bg.userData.transitions[i].interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_popup_bg.material ? me._ht_video_file_popup_bg.material.opacity : me._ht_video_file_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(me._ht_video_file_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_popup_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_file_popup_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_file_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_popup_bg.userData.transitions[i].interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_popup_bg.material ? me._ht_video_file_popup_bg.material.opacity : me._ht_video_file_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(me._ht_video_file_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_popup_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_file_popup_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(6, 3.8, 5, 5 );
		geometry.name = 'ht_video_file_popup_geometry';
		material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_file_popup_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(-0.1);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 600;
		el.userData.height = 380;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_popup';
		el.userData.x = 0;
		el.userData.y = -0.1;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_popup.material) me._ht_video_file_popup.material.opacity = v;
			me._ht_video_file_popup.visible = (v>0 && me._ht_video_file_popup.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_popup.visible
			let parentEl = me._ht_video_file_popup.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_popup.userData.opacity = v;
			v = v * me._ht_video_file_popup.userData.parentOpacity;
			me._ht_video_file_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup.children.length; i++) {
				let child = me._ht_video_file_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_popup.userData.parentOpacity = v;
			v = v * me._ht_video_file_popup.userData.opacity
			me._ht_video_file_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup.children.length; i++) {
				let child = me._ht_video_file_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_popup = el;
		me._ht_video_file_popup.userData.seekbars = [];
		me._ht_video_file_popup.userData.ggInitMedia = function(media) {
			if (me._ht_video_file_popup__vid) me._ht_video_file_popup__vid.pause();
			me._ht_video_file_popup__vid = document.createElement('video');
			player.registerVideoElement('ht_video_file_popup', me._ht_video_file_popup__vid);
			me._ht_video_file_popup__vid.setAttribute('autoplay', '');
			me._ht_video_file_popup__source = document.createElement('source');
			me._ht_video_file_popup__source.setAttribute('src', media);
			me._ht_video_file_popup__vid.addEventListener('loadedmetadata', function() {
				let videoAR = me._ht_video_file_popup__vid.videoWidth / me._ht_video_file_popup__vid.videoHeight;
				let elAR = me._ht_video_file_popup.userData.width / me._ht_video_file_popup.userData.height;
				if (videoAR > elAR) {
					me._ht_video_file_popup.scale.set(1, (me._ht_video_file_popup.userData.width / videoAR) / me._ht_video_file_popup.userData.height, 1);
				} else {
					me._ht_video_file_popup.scale.set((me._ht_video_file_popup.userData.height * videoAR) / me._ht_video_file_popup.userData.width, 1, 1);
				}
			}, false);
			me._ht_video_file_popup__vid.appendChild(me._ht_video_file_popup__source);
			videoTexture = new THREE.VideoTexture( me._ht_video_file_popup__vid );
			videoTexture.name = 'ht_video_file_popup_videoTexture';
			videoTexture.minFilter = THREE.LinearFilter;
			videoTexture.magFilter = THREE.LinearFilter;
			videoTexture.format = THREE.RGBAFormat;
			videoMaterial = new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.DoubleSide, transparent: true} );
			videoMaterial.name = 'ht_video_file_popup_videoMaterial';
			videoMaterial.alphaTest = 0.5;
			me._ht_video_file_popup.material = videoMaterial;
		}
		el.userData.ggId="ht_video_file_popup";
		me._ht_video_file_popup.userData.ggIsActive=function() {
			if (me._ht_video_file_popup__vid != null) {
				return (me._ht_video_file_popup__vid.paused == false && me._ht_video_file_popup__vid.ended == false);
			} else {
				return false;
			}
		}
		me._ht_video_file_popup.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_popup.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_popup.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file_popup.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file_popup.visible=((!me._ht_video_file_popup.material && Number(me._ht_video_file_popup.userData.opacity>0)) || Number(me._ht_video_file_popup.material.opacity)>0)?true:false;
			me._ht_video_file_popup.userData.visible=true;
					if (me._ht_video_file_popup.userData.ggVideoNotLoaded) {
						me._ht_video_file_popup.userData.ggInitMedia(me._ht_video_file_popup.ggVideoSource);
					}
				}
				else {
			me._ht_video_file_popup.visible=false;
			me._ht_video_file_popup.userData.visible=false;
					me._ht_video_file_popup.userData.ggInitMedia('');
				}
			}
		}
		me._ht_video_file_popup.userData.onclick=function (e) {
			player.playPauseSound("ht_video_file_popup","1");
		}
		me._ht_video_file_popup.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file_popup_bg.add(me._ht_video_file_popup);
		geometry = new THREE.PlaneBufferGeometry(0.4, 0.4, 5, 5 );
		geometry.name = 'ht_video_file_popup_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABJElEQVR4nO3bSw6DMBAEUSs341icfrLJSJGFAeNfY9c7QU9JiJVDAAAAAAAAAADgdcxsM7Nt9I4U6X2/cW4fvSdmZvvfPr2IUUCpiFE8zYAhHA4dHlFx0ymlwUpbsigMV9hQZOQBr4/nRhwyTTzX86Dp4rkeh00bz7U8cPp4rsWhy8RzNQ9eLp6rcfiy8VxJgOXjuSchiBfJCUK8hDthiHfhLBDxbjoKRbxMB8GIlysRUTLeZ/QAVMYnXICfSIGzUES8cCcQERNywhAx8iQIEX9KQiwfsUaAZSPWPHy5iC0OXiZiy0Onj9jjwGkj9jxsuogjDpom4shDXh9R4QCFDY8oDVfacoviYMVNh4xnDmWMhzblTPkpVdDfBwAAAAAAAABA2hcaGfeSY++bsA'+
	'AAAABJRU5ErkJggg==');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_file_popup_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.85);
		el.translateY(2.05);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 40;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_popup_close';
		el.userData.x = 2.85;
		el.userData.y = 2.05;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_popup_close.material) me._ht_video_file_popup_close.material.opacity = v;
			me._ht_video_file_popup_close.visible = (v>0 && me._ht_video_file_popup_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_popup_close.visible
			let parentEl = me._ht_video_file_popup_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_popup_close.userData.opacity = v;
			v = v * me._ht_video_file_popup_close.userData.parentOpacity;
			me._ht_video_file_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup_close.children.length; i++) {
				let child = me._ht_video_file_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_popup_close.userData.parentOpacity = v;
			v = v * me._ht_video_file_popup_close.userData.opacity
			me._ht_video_file_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup_close.children.length; i++) {
				let child = me._ht_video_file_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_popup_close = el;
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABkklEQVR4nO3bTU7CUBRA4VN3hmNYECwAF9Q3xqXVSZsQAqLe93MN55uYENPed0CKbQFJkiRJkiRJkv6dUsqulLIbPccjLeZ7q7WhUspuWZbLsiyXeZ6PtbZbyzzPx22+mhGrBbxxzhRxneXcYtvVAu73+0/gdPVQioh34p3WWauYam1oc2/gw+HwUXs/WWapHhByROw1Q5OAMDZiz303CwhjIvbeZ9OA0HdBI56w5gGhz8JGvWV0CQhtFzjy/bZbQGiz0NFH/K4Boe6CR8eDAQGhzsIzxINBASEWIEs8GBgQ/hYiUzwYHBB+FyRbPEgQEH4WJmM8SBIQvg+UNR4kCgj3Q60/U8aDZAHh6dnjVPEgYUB4GDFdPGh3TeRlpHsF+icc4EEkwI8xAX6QDv'+
	'BfuQBPJgR4OivAE6oBntIP8KJSgJc1A7ywHuCtHQHeXBTg7W0Bo4+MPWfwFt+gqgEzxdu0nqlawO17IlcPDY+3uY04TdN7rTv1W10TSRMPYJ3l9PQXR3vFr3pJkiRJkiRJktTHF2/mnlujgoiVAAAAAElFTkSuQmCC');
		el.userData.materialOver = new THREE.MeshBasicMaterial( {map: textureOver, side: THREE.DoubleSide, transparent: true} );
		el.userData.materialOver.name = 'ht_video_file_popup_close_materialOver';
		el.userData.ggId="ht_video_file_popup_close";
		me._ht_video_file_popup_close.userData.onclick=function (e) {
			player.setVariableValue('open_video_hs', player.getVariableValue('open_video_hs').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_video_file_popup_close.userData.onmouseover=function (e) {
			me._ht_video_file_popup_close.material = me._ht_video_file_popup_close.userData.materialOver;
			me.elementMouseOver['ht_video_file_popup_close']=true;
		}
		me._ht_video_file_popup_close.userData.onmouseout=function (e) {
			me._ht_video_file_popup_close.material = me._ht_video_file_popup_close.userData.materialNormal;
			me.elementMouseOver['ht_video_file_popup_close']=false;
		}
		me._ht_video_file_popup_close.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_video_file_popup_close']) {
				me._ht_video_file_popup_close.material = me._ht_video_file_popup_close.userData.materialOver;
				me.elementMouseOver['ht_video_file_popup_close']=true;
			}
		}
		me._ht_video_file_popup_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file_popup_bg.add(me._ht_video_file_popup_close);
		me._ht_video_file.add(me._ht_video_file_popup_bg);
		me._ht_video_file.userData.setOpacity(1.00);
		me._ht_video_file_bg.userData.setOpacity(1.00);
		me._ht_video_file_icon.userData.setOpacity(1.00);
		me._ht_video_file_title.userData.setOpacity(0.00);
		me._ht_video_file_popup_bg.userData.setOpacity(0.00);
		me._ht_video_file_popup.userData.setOpacity(1.00);
		me._ht_video_file_popup.userData.ggVideoSource = 'media_vr/';
		me._ht_video_file_popup.userData.ggVideoNotLoaded = true;
		me._ht_video_file_popup_close.userData.setOpacity(1.00);
			me.ggEvent_changenode=function() {
				me._ht_video_file_bg.logicBlock_alpha();
				me._ht_video_file_popup_bg.logicBlock_scaling();
				me._ht_video_file_popup_bg.logicBlock_alpha();
				me._ht_video_file_popup.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_video_file_bg.logicBlock_alpha();
				me._ht_video_file_popup_bg.logicBlock_scaling();
				me._ht_video_file_popup_bg.logicBlock_alpha();
				me._ht_video_file_popup.logicBlock_visible();
			};
			me.ggEvent_varchanged_open_video_hs=function() {
				me._ht_video_file_bg.logicBlock_alpha();
				me._ht_video_file_popup_bg.logicBlock_scaling();
				me._ht_video_file_popup_bg.logicBlock_alpha();
				me._ht_video_file_popup.logicBlock_visible();
			};
			me.__obj = me._ht_video_file;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_info(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_info';
		el.userData.x = 0.65;
		el.userData.y = 2.08;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info.visible
			let parentEl = me._ht_info.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info.userData.opacity = v;
			v = v * me._ht_info.userData.parentOpacity;
			me._ht_info.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info.children.length; i++) {
				let child = me._ht_info.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info.userData.parentOpacity = v;
			v = v * me._ht_info.userData.opacity
			me._ht_info.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info.children.length; i++) {
				let child = me._ht_info.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info = el;
		el.userData.ggId="ht_info";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_info']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_info']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_info']) {
				player.setActiveHotspot(me.hotspot);
				me.elementMouseOver['ht_info']=true;
			}
		}
		me._ht_info.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.45;
		height = 0.45;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.12, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.12, (height / 2.0));
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_info_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgba(74,74,74,0.588235)').convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_bg.material.opacity = v * me._ht_info_bg.userData.backgroundColorAlpha;
			if (me._ht_info_bg.userData.ggSubElement) {
				me._ht_info_bg.userData.ggSubElement.material.opacity = v
				me._ht_info_bg.userData.ggSubElement.visible = (v>0 && me._ht_info_bg.userData.visible);
			}
			me._ht_info_bg.visible = (v>0 && me._ht_info_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_bg.userData.backgroundColorAlpha = v;
			me._ht_info_bg.userData.setOpacity(me._ht_info_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_bg.visible
			let parentEl = me._ht_info_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_bg.userData.opacity = v;
			v = v * me._ht_info_bg.userData.parentOpacity;
			me._ht_info_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_bg.children.length; i++) {
				let child = me._ht_info_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_bg.userData.parentOpacity = v;
			v = v * me._ht_info_bg.userData.opacity
			me._ht_info_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_bg.children.length; i++) {
				let child = me._ht_info_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_bg = el;
		el.userData.ggId="ht_info_bg";
		me._ht_info_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_info_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_info_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_info_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_info_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_info_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_info_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.scale.set(transition_scale.startScale.x + (me._ht_info_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_bg.position.x = (me._ht_info_bg.position.x - me._ht_info_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_info_bg.userData.curScaleOffX = scaleOffX;
						me._ht_info_bg.position.y = (me._ht_info_bg.position.y - me._ht_info_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_info_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_info_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_info_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.scale.set(transition_scale.startScale.x + (me._ht_info_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_bg.position.x = (me._ht_info_bg.position.x - me._ht_info_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_info_bg.userData.curScaleOffX = scaleOffX;
						me._ht_info_bg.position.y = (me._ht_info_bg.position.y - me._ht_info_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_info_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_info_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_image_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_info_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_info_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_info_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_info_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_bg.material ? me._ht_info_bg.material.opacity : me._ht_info_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_info_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_bg.material ? me._ht_info_bg.material.opacity : me._ht_info_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_info_bg.userData.onclick=function (e) {
			player.setVariableValue('open_info_hs', player.getVariableValue('open_info_hs') + "<"+me.hotspot.id+">");
		}
		me._ht_info_bg.userData.onmouseover=function (e) {
			me.elementMouseOver['ht_info_bg']=true;
			me._ht_info_title.logicBlock_alpha();
			me._ht_info_bg.logicBlock_scaling();
		}
		me._ht_info_bg.userData.ontouchend=function (e) {
			me._ht_info_bg.logicBlock_scaling();
		}
		me._ht_info_bg.userData.onmouseout=function (e) {
			me.elementMouseOver['ht_info_bg']=false;
			me._ht_info_title.logicBlock_alpha();
			me._ht_info_bg.logicBlock_scaling();
		}
		me._ht_info_bg.ggCurrentLogicStateScaling = -1;
		me._ht_info_bg.ggCurrentLogicStateAlpha = -1;
		me._ht_info_bg.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_info_bg']) {
				me.elementMouseOver['ht_info_bg']=true;
				me._ht_info_title.logicBlock_alpha();
			}
		}
		me._ht_info_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(0.36, 0.36, 5, 5 );
		geometry.name = 'ht_info_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAIwElEQVR4nO2bbWwcxRnH///Zw7HBISSN1aCKfkiqtiklaY2T0DZBctXW5V7WJg3niBfRCoFKUSVKpdIPLU5EVEUUIYRU+q6KqlXjaxS49foUY+gVpVLaBBscCgpV4ENLmyoJCeHO9sb2ztMPt+ccVrjb3Tv7ruh+knUze/PMPP7fvOzuPAM0adKkSZMmTT6gsN4OFBkdHV0xPT29CsBKAMtJriWZJ3noyJEjp3bv3q3r4VddBMpms5HJycltWusekp8BsBHAmjImFwAcE5EXAYxEIpGD0Wj0wlL4uqQCWZZ1A4BvkkwAWFVFVecA7BeR34+NjR1azN616AKJCG3bTorId0huWfC1C+DvIvKyUuoVrfUppdR5rXWe5DqSqwC0iMgnAHwcwHoA7QvqeJ'+
	'Pk92Ox2H6SUmv/F1Ug27avF5EnAHy+5PIsAAvA0yQz8Xj8nN/6UqlUS1tb25cA7ATQB2B5ydeHROR+0zTHa+F7kUURaGRk5IoLFy48RvLukjbOiMhPDcN4MhaL/bfaNrLZbGs+n48D2AXgWu+yAPh1S0vL/T09PZPVtgEsgkC2ba/VWj9D8jrv0gyAx7TWP+rt7c3Vur1sNhvJ5XJ3kXwYQId3eRyAmUgk/l1t/TUVKJ1Of1kpNYjCUg0AI4Zh3BeNRt+oZTuXIpPJXDk3N7eH5LcBQEROGoZhxmKxF6upt2YC2bbdIyJDAC4DICKya2xsbM9S379YlvV1kr/w/HBI9sfjcStsfTURyLbtbSIyAqANQB5AfyKRyNSi7jBYlrWV5NMAVgNwRORG0zSPhqmraoEsy7qW5GEUVpRpEbnJNM0Xqq23WtLp9MeUUocBrBaR'+
	'kyQ3hZmTVDVOZLPZVpL7UBBnRkT6GkEcAOjt7T0hIjcDmCV5NQBrZGTkiqD1VCVQPp/fC+DTACAi95mm+Ww19dUa0zT/IiL3eNnOmZmZx4PWEXqI2bbdLSJ/AgAROZBIJHYsxp1sLbAs6wlvdRMR6QpyMxmqB4kItdaPeOmTc3Nz9zSqOAAQiUR+AOA0AJJ8XER8d4xQAtm23UeyCwCUUru2b9/+dph6lopoNPougIe87Lbh4eEdfm0DCzQwMKBI7vGyb65Zs+Y3QeuoB+3t7b8i+RoAiMjegYEBX/97YIE2bdr0BRH5lNfQw11dXbNB66gH3d3dcyg8twHA2s2bN2/1YxdYIK317V4y7zjOYFD7ejI1NWUDyAGA67q3+bEJJFAmk1lGMullDySTyelgLtaXZDI5LSJpACB5SyqVaqlkE0ig2dnZGwFcBQBKqT+E8r'+
	'LOKKX2ecmVra2tN1UsH6RywzBu8JI6EokcCupcIzA1NTWKwvMiAPRUKh9IIK31FgAQkVdr9UJqqUkmkzMichwASF5fqXwggUhu9j5DPRk3CiT/4SU3VFrufQuUSqXacPGN3eshfWsIRKTof2tnZ2dHubK+BWpra5vfphGRsyF9awhIzv/AkUjkmnJlfQuklCrdx/K9E9GIaK3PlqQXbiO9B98Cua67opgWkXfDudYYkHSLaREp+5DtWyARmV+1DMNoC+daw1C6n1Z2p8W3QFrr+WElIleFcKphIDk/GpRS75QrG2QOKn2lUS7QoOEhOb9yRSKR2gjkbfq9BQAicl2F4g2NiBR3Ys/09PSUXXAC3SiKyAQAkPxsSN8agpIf+FilN6FB76Rf8pLrLctaHca5emNZ1uXFbXGSE5XKB+1BI0U7ktEQ/jUCXwSwzEs/X6lw'+
	'IIEcxzmMwstvoBB+8n8HyZiXdLTW2UrlAwmUTCZdksV97vjBgwevDupgPclms60AkgAgIs+bpjlVySbMK9efe8nLZmZm7g1qX09yudx2eKF/Sqmn/NgEFsgLAjgHACTvzWazkaB11AMRIckHveyZqamptB+7sFvPM96ncfr06YbdMCxleHj4NgAbvOwvk8nkTLnyRQILlE6nl8N7Lw3gmWQy6ZYr3wiMjo6uEJFHgfnAqr1+bQMLZBhGDBeXyf1B7euB4zg/BvBhAFBKPeDttPoi8PwhIju8z/OO4zwX1H6psSzrLgB3e9nnYrFYoL28QD3Ii6+JAgDJtN9xXC+Gh4e3kHzSy76llLojaJBF0H2xKAphdkCDDy/Lsjq11jaAFgCOUurmMOHHQeegYlRErr29fTRoY0uFF6OYRSFGUUh+I2y0q2+BLMu6XESKt+lD3d'+
	'3dTpgGFxvbtm8n+SyAK1EIv+uPx+P7Ktm9H74naaXUV0WkGOPXcMNrdHR0heM4PxGRYlDCFMnt8Xh8pKxhBYIMseLwmpyenj4YpBERoZ9AgTCkUinDtu07Hcc5BqAozuta663VigP4jFH0zkWcRuGkzWAikdhZyUZEODQ01EVyJ4AHvMsTruve2tfX91p4lwtkMpllc3Nz20k+BOCTJV/9TES+6+dB1A++htjk5ORXcPEY0vsOL+/o0wYA/bZt95Ncu6DIRsMwXrUsK0vygOu66b6+vn/5dTabzbZOTk5+TkRudV13B8nSzYMJkg/WoteU4qsHDQ0N/RbAHQCmW1paOhYGLti2vV5E+gH0472/ph9OiMhLKPyD/yF53nXdnFKqneRKrfUqkusAbELhZOLCH/UEyR8ePXo0tRjHHioKlMlklrmuewqFVWF/IpG4xbu+'+
	'Tmvd7wmz4RKmR0kOaq3/aJrmP4FC9LthGN8Ska8B+GgVfudQOHH4O8dxXljM58GKAtm2HRMR28t+TwrvDXYCuFToyASAQcMwUuVO+IgIM5nMRtd1YwA6vXOrC4djKe8AOELyryLyNxH5c63mmEpUnIO01neS8zo+UpIuchzAPhEZNE3zuJ9Gvdv9l70/AIX7LK31h0iuJHklyZzrumeVUm8nEonpesVhl+1BqVTKaGtry+Hi4wUAQETeADDoifJKIweRV0vZHtTR0cF8Pn8WwEcAgOSjAPbF4/HxD7IopVScgyzLWi0i14yPj0/U63B/kyZNmjRp0qTJIvA/m+B4e5gtzXoAAAAASUVORK5CYII=');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_info_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 36;
		el.userData.height = 36;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_info_icon.material) me._ht_info_icon.material.opacity = v;
			me._ht_info_icon.visible = (v>0 && me._ht_info_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_info_icon.visible
			let parentEl = me._ht_info_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_icon.userData.opacity = v;
			v = v * me._ht_info_icon.userData.parentOpacity;
			me._ht_info_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_icon.children.length; i++) {
				let child = me._ht_info_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_icon.userData.parentOpacity = v;
			v = v * me._ht_info_icon.userData.opacity
			me._ht_info_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_icon.children.length; i++) {
				let child = me._ht_info_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_icon = el;
		el.userData.ggId="ht_info_icon";
		me._ht_info_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_bg.add(me._ht_info_icon);
		geometry = new THREE.PlaneBufferGeometry(1, 0.2, 5, 5 );
		geometry.name = 'ht_info_title_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_title.material.opacity = v;
			if (me._ht_info_title.userData.hasScrollbar) {
				me._ht_info_title.userData.scrollbar.material.opacity = v;
				me._ht_info_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_info_title.userData.ggSubElement) {
				me._ht_info_title.userData.ggSubElement.material.opacity = v
				me._ht_info_title.userData.ggSubElement.visible = (v>0 && me._ht_info_title.userData.visible);
			}
			me._ht_info_title.visible = (v>0 && me._ht_info_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_title.userData.backgroundColorAlpha = v;
			me._ht_info_title.userData.setOpacity(me._ht_info_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.325);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_title';
		el.userData.x = 0;
		el.userData.y = -0.325;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_title.visible
			let parentEl = me._ht_info_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_title.userData.opacity = v;
			v = v * me._ht_info_title.userData.parentOpacity;
			me._ht_info_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_title.children.length; i++) {
				let child = me._ht_info_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_title.userData.parentOpacity = v;
			v = v * me._ht_info_title.userData.opacity
			me._ht_info_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_title.children.length; i++) {
				let child = me._ht_info_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1);
		el.userData.textColor = new THREE.Color(0.701961, 0.701961, 0.701961);
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 100;
		canvas.height = 20;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_info_title.userData.totalHeight = 3;
			me._ht_info_title.userData.textLines = [];
			var ctx = me._ht_info_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_info_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_info_title.userData.textLines.push(line);
					line = '';
					me._ht_info_title.userData.totalHeight += me._ht_info_title.userData.lineHeight;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (me._ht_info_title.userData.width - 0 - (scrollbar ? 25 : 0)) && i > 0) {
					me._ht_info_title.userData.textLines.push(line);
					line = words[i];
					me._ht_info_title.userData.totalHeight += me._ht_info_title.userData.lineHeight;
				} else {
					line = testLine;
				}
			}
			me._ht_info_title.userData.textLines.push(line);
			me._ht_info_title.userData.totalHeight += me._ht_info_title.userData.lineHeight;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_info_title.userData.textCanvas;
			var ctx = me._ht_info_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_title.userData.textColor.r * 255 + ', ' + me._ht_info_title.userData.textColor.g * 255 + ', ' + me._ht_info_title.userData.textColor.b * 255 + ', ' + me._ht_info_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_info_title.userData.boxWidth - (me._ht_info_title.userData.hasScrollbar ? 25 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 3;
			for (var i = 0; i < me._ht_info_title.userData.textLines.length; i++) {
				ctx.fillText(me._ht_info_title.userData.textLines[i], x, y);
				y += me._ht_info_title.userData.lineHeight;
			}
			geometry = new THREE.PlaneBufferGeometry(me._ht_info_title.userData.boxWidth / 100.0, me._ht_info_title.userData.boxHeight / 100.0, 5, 5 );
			geometry.name = 'ht_info_title_geometry';
			me._ht_info_title.geometry.dispose();
			me._ht_info_title.geometry = geometry;
			var diffY = me._ht_info_title.userData.boxHeight - me._ht_info_title.userData.height;
			me._ht_info_title.position.y = me._ht_info_title.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_info_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.encoding = THREE.sRGBEncoding;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_info_title.material.map) {
				me._ht_info_title.material.map.dispose();
			}
			me._ht_info_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._ht_info_title.remove(...me._ht_info_title.children);
			var canv = me._ht_info_title.userData.textCanvas;
			var ctx = me._ht_info_title.userData.textCanvasContext;
			ctx.font = '18px Verdana';
			me._ht_info_title.userData.lineHeight = 18 * 1.2;
			me._ht_info_title.userData.textLines = [];
			me._ht_info_title.userData.textLines.push(me._ht_info_title.userData.ggText);
			me._ht_info_title.userData.totalHeight = 3;
			me._ht_info_title.userData.totalHeight += me._ht_info_title.userData.lineHeight;
			me._ht_info_title.userData.boxWidth = ctx.measureText(me._ht_info_title.userData.ggText).width + 0;
			me._ht_info_title.userData.boxHeight = me._ht_info_title.userData.totalHeight;
			canv.width = me._ht_info_title.userData.boxWidth;
			canv.height = me._ht_info_title.userData.boxHeight;
			ctx.font = '18px Verdana';
			me._ht_info_title.userData.ggPaintCanvasText();
		}
		me._ht_info_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_info_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_info_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_info_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_info_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_info_title";
		me._ht_info_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_info_bg'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_info_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_info_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_info_title.ggCurrentLogicStateAlpha == 0) {
					me._ht_info_title.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_info_title.userData.transitions.length; i++) {
						if (me._ht_info_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_title.userData.transitions[i].interval);
							me._ht_info_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_title.material ? me._ht_info_title.material.opacity : me._ht_info_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_title.userData.transitions.splice(me._ht_info_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_title.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_info_title.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_info_title.userData.transitions.length; i++) {
						if (me._ht_info_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_title.userData.transitions[i].interval);
							me._ht_info_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_title.material ? me._ht_info_title.material.opacity : me._ht_info_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_title.userData.transitions.splice(me._ht_info_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_title.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_info_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_bg.add(me._ht_info_title);
		me._ht_info.add(me._ht_info_bg);
		width = 6.6;
		height = 4.8;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.3, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.3, (height / 2.0));
		roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.3);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.3);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.3, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.3, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.3);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.3);
		roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.3, (height / 2.0));
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_info_popup_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgba(74,74,74,0.666667)').convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_popup_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_popup_bg.material.opacity = v * me._ht_info_popup_bg.userData.backgroundColorAlpha;
			if (me._ht_info_popup_bg.userData.ggSubElement) {
				me._ht_info_popup_bg.userData.ggSubElement.material.opacity = v
				me._ht_info_popup_bg.userData.ggSubElement.visible = (v>0 && me._ht_info_popup_bg.userData.visible);
			}
			me._ht_info_popup_bg.visible = (v>0 && me._ht_info_popup_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_popup_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_popup_bg.userData.backgroundColorAlpha = v;
			me._ht_info_popup_bg.userData.setOpacity(me._ht_info_popup_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.10, 0.10, 1.0);
		el.userData.width = 660;
		el.userData.height = 480;
		el.userData.scale = {x: 0.10, y: 0.10, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_popup_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_popup_bg.visible
			let parentEl = me._ht_info_popup_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_popup_bg.userData.opacity = v;
			v = v * me._ht_info_popup_bg.userData.parentOpacity;
			me._ht_info_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup_bg.children.length; i++) {
				let child = me._ht_info_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_popup_bg.userData.parentOpacity = v;
			v = v * me._ht_info_popup_bg.userData.opacity
			me._ht_info_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup_bg.children.length; i++) {
				let child = me._ht_info_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_popup_bg = el;
		el.userData.ggId="ht_info_popup_bg";
		me._ht_info_popup_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('open_info_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_info_popup_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_info_popup_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_info_popup_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_info_popup_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_info_popup_bg.userData.transitions.length; i++) {
						if (me._ht_info_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_popup_bg.userData.transitions[i].interval);
							me._ht_info_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_info_popup_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_info_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_popup_bg.position.x = (me._ht_info_popup_bg.position.x - me._ht_info_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_info_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_info_popup_bg.position.y = (me._ht_info_popup_bg.position.y - me._ht_info_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_info_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_popup_bg.userData.transitions.splice(me._ht_info_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_popup_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_info_popup_bg.userData.transitionValue_scale = {x: 0.1, y: 0.1, z: 1.0};
					for (var i = 0; i < me._ht_info_popup_bg.userData.transitions.length; i++) {
						if (me._ht_info_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_popup_bg.userData.transitions[i].interval);
							me._ht_info_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_info_popup_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_info_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_popup_bg.position.x = (me._ht_info_popup_bg.position.x - me._ht_info_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_info_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_info_popup_bg.position.y = (me._ht_info_popup_bg.position.y - me._ht_info_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_info_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_popup_bg.userData.transitions.splice(me._ht_info_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_popup_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_info_popup_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_info_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_info_popup_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_info_popup_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_info_popup_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_info_popup_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_info_popup_bg.userData.transitions.length; i++) {
						if (me._ht_info_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_popup_bg.userData.transitions[i].interval);
							me._ht_info_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_popup_bg.material ? me._ht_info_popup_bg.material.opacity : me._ht_info_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_popup_bg.userData.transitions.splice(me._ht_info_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_popup_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_info_popup_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_info_popup_bg.userData.transitions.length; i++) {
						if (me._ht_info_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_popup_bg.userData.transitions[i].interval);
							me._ht_info_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_popup_bg.material ? me._ht_info_popup_bg.material.opacity : me._ht_info_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_popup_bg.userData.transitions.splice(me._ht_info_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_popup_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_info_popup_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(6, 4, 5, 5 );
		geometry.name = 'ht_info_popup_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_popup_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_popup.material.opacity = v;
			if (me._ht_info_popup.userData.hasScrollbar) {
				me._ht_info_popup.userData.scrollbar.material.opacity = v;
				me._ht_info_popup.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_info_popup.userData.ggSubElement) {
				me._ht_info_popup.userData.ggSubElement.material.opacity = v
				me._ht_info_popup.userData.ggSubElement.visible = (v>0 && me._ht_info_popup.userData.visible);
			}
			me._ht_info_popup.visible = (v>0 && me._ht_info_popup.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_popup.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_popup.userData.backgroundColorAlpha = v;
			me._ht_info_popup.userData.setOpacity(me._ht_info_popup.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.2);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 600;
		el.userData.height = 400;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_popup';
		el.userData.x = 0;
		el.userData.y = -0.2;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_popup.visible
			let parentEl = me._ht_info_popup.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_popup.userData.opacity = v;
			v = v * me._ht_info_popup.userData.parentOpacity;
			me._ht_info_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup.children.length; i++) {
				let child = me._ht_info_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_popup.userData.parentOpacity = v;
			v = v * me._ht_info_popup.userData.opacity
			me._ht_info_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup.children.length; i++) {
				let child = me._ht_info_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_popup = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1);
		el.userData.textColor = new THREE.Color(0, 0, 0);
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 600;
		canvas.height = 400;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_info_popup.userData.totalHeight = 33;
			me._ht_info_popup.userData.textLines = [];
			var ctx = me._ht_info_popup.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_info_popup.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_info_popup.userData.textLines.push(line);
					line = '';
					me._ht_info_popup.userData.totalHeight += me._ht_info_popup.userData.lineHeight;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (me._ht_info_popup.userData.width - 30 - (scrollbar ? 25 : 0)) && i > 0) {
					me._ht_info_popup.userData.textLines.push(line);
					line = words[i];
					me._ht_info_popup.userData.totalHeight += me._ht_info_popup.userData.lineHeight;
				} else {
					line = testLine;
				}
			}
			me._ht_info_popup.userData.textLines.push(line);
			me._ht_info_popup.userData.totalHeight += me._ht_info_popup.userData.lineHeight;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_info_popup.userData.textCanvas;
			var ctx = me._ht_info_popup.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_popup.userData.backgroundColor.r * 255 + ', ' + me._ht_info_popup.userData.backgroundColor.g * 255 + ', ' + me._ht_info_popup.userData.backgroundColor.b * 255 + ', ' + me._ht_info_popup.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_popup.userData.textColor.r * 255 + ', ' + me._ht_info_popup.userData.textColor.g * 255 + ', ' + me._ht_info_popup.userData.textColor.b * 255 + ', ' + me._ht_info_popup.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = 15;
			ctx.textAlign = 'left';
			var y = 18;
			y -= me._ht_info_popup.userData.scrollPosPercent * me._ht_info_popup.userData.totalHeight;
			for (var i = 0; i < me._ht_info_popup.userData.textLines.length; i++) {
				ctx.fillText(me._ht_info_popup.userData.textLines[i], x, y);
				y += me._ht_info_popup.userData.lineHeight;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_info_popup_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.encoding = THREE.sRGBEncoding;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_info_popup.material.map) {
				me._ht_info_popup.material.map.dispose();
			}
			me._ht_info_popup.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._ht_info_popup.remove(...me._ht_info_popup.children);
			var canv = me._ht_info_popup.userData.textCanvas;
			var ctx = me._ht_info_popup.userData.textCanvasContext;
			ctx.font = '22px Verdana';
			me._ht_info_popup.userData.lineHeight = 22 * 1.2;
			me._ht_info_popup.userData.ggWrapText(false);
			me._ht_info_popup.userData.boxWidth = me._ht_info_popup.userData.width;
			me._ht_info_popup.userData.boxHeight = me._ht_info_popup.userData.height;
			me._ht_info_popup.userData.scrollPosPercent = 0.0
			if (me._ht_info_popup.userData.totalHeight > me._ht_info_popup.userData.height) {
				me._ht_info_popup.userData.ggWrapText(true);
				me._ht_info_popup.userData.pagePercent = me._ht_info_popup.userData.height / me._ht_info_popup.userData.totalHeight;
				me._ht_info_popup.userData.maxScrollPercent = (me._ht_info_popup.userData.totalHeight - me._ht_info_popup.userData.height) / me._ht_info_popup.userData.totalHeight;
				geometry = new THREE.PlaneBufferGeometry(25 / 100.0, me._ht_info_popup.userData.height / 100.0, 5, 5 );
				geometry.name = 'ht_info_popup_scrollbarBgGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0x7f7f7f, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_popup_scrollbarBgMaterial';
				me._ht_info_popup.userData.scrollbarBg = new THREE.Mesh( geometry, material );
				me._ht_info_popup.userData.scrollbarBg.name = 'ht_info_popup_scrollbarBg';
				me._ht_info_popup.add(me._ht_info_popup.userData.scrollbarBg);
				me._ht_info_popup.userData.scrollbarXPos = (me._ht_info_popup.userData.width - 25) / 200.0;
				me._ht_info_popup.userData.scrollbarBg.position.x = me._ht_info_popup.userData.scrollbarXPos;
				me._ht_info_popup.userData.scrollbarBg.position.z = me._ht_info_popup.position.z + 0.01;
				me._ht_info_popup.userData.scrollbarBg.userData.stopPropagation = true;
				me._ht_info_popup.userData.scrollbarHeight = (me._ht_info_popup.userData.height / me._ht_info_popup.userData.totalHeight) * me._ht_info_popup.userData.height;
				geometry = new THREE.PlaneBufferGeometry(25 / 100.0, me._ht_info_popup.userData.scrollbarHeight / 100.0, 5, 5 );
				geometry.name = 'ht_info_popup_scrollbarGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0xbfbfbf, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_popup_scrollbarMaterial';
				me._ht_info_popup.userData.scrollbar = new THREE.Mesh( geometry, material );
				me._ht_info_popup.userData.scrollbar.name = 'ht_info_popup_scrollbar';
				me._ht_info_popup.add(me._ht_info_popup.userData.scrollbar);
				me._ht_info_popup.userData.scrollbar.position.x = me._ht_info_popup.userData.scrollbarXPos;
				me._ht_info_popup.userData.scrollbar.position.z = me._ht_info_popup.position.z + 0.02;
				me._ht_info_popup.userData.scrollbarYPosMin = (me._ht_info_popup.userData.height - me._ht_info_popup.userData.scrollbarHeight) / 200.0;
				me._ht_info_popup.userData.scrollbarYPosMax = me._ht_info_popup.userData.scrollbarYPosMin - (me._ht_info_popup.userData.height - me._ht_info_popup.userData.scrollbarHeight) / 100.0;
				me._ht_info_popup.userData.scrollbar.position.y = me._ht_info_popup.userData.scrollbarYPosMin;
				geometry = new THREE.PlaneBufferGeometry(25 / 100.0, me._ht_info_popup.userData.height / 200.0, 5, 5 );
				geometry.name = 'ht_info_popup_scrollbarPageDownGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_popup_scrollbarPageDownMaterial';
				me._ht_info_popup.userData.scrollbarPageDown = new THREE.Mesh( geometry, material );
				me._ht_info_popup.userData.scrollbarPageDown.name = 'ht_info_popup_scrollbarPageDown';
				me._ht_info_popup.userData.scrollbarPageDown.userData.onclick = function() {
					me._ht_info_popup.userData.scrollPosPercent -= me._ht_info_popup.userData.pagePercent;
					me._ht_info_popup.userData.scrollPosPercent = Math.max(me._ht_info_popup.userData.scrollPosPercent, 0);
					me._ht_info_popup.userData.ggPaintCanvasText();
					me._ht_info_popup.userData.scrollbar.position.y += (me._ht_info_popup.userData.height * me._ht_info_popup.userData.pagePercent) / 100.0;
					me._ht_info_popup.userData.scrollbar.position.y = Math.min(me._ht_info_popup.userData.scrollbar.position.y, me._ht_info_popup.userData.scrollbarYPosMin);
				}
				me._ht_info_popup.userData.scrollbarPageDown.position.x = me._ht_info_popup.userData.scrollbarXPos;
				me._ht_info_popup.userData.scrollbarPageDown.position.y = me._ht_info_popup.userData.height / 400.0;
				me._ht_info_popup.userData.scrollbarPageDown.position.z = me._ht_info_popup.position.z + 0.05;
				me._ht_info_popup.userData.scrollbarPageDown.userData.stopPropagation = true;
				me._ht_info_popup.userData.scrollbarPageDown.userData.clickInvisible = true;
				me._ht_info_popup.userData.scrollbarPageDown.visible = false;
				me._ht_info_popup.add(me._ht_info_popup.userData.scrollbarPageDown);
				geometry = new THREE.PlaneBufferGeometry(25 / 100.0, me._ht_info_popup.userData.height / 200.0, 5, 5 );
				geometry.name = 'ht_info_popup_scrollbarPageUpGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_popup_scrollbarPageUpMaterial';
				me._ht_info_popup.userData.scrollbarPageUp = new THREE.Mesh( geometry, material );
				me._ht_info_popup.userData.scrollbarPageUp.name = 'ht_info_popup_scrollbarPageUp';
				me._ht_info_popup.userData.scrollbarPageUp.userData.onclick = function() {
					me._ht_info_popup.userData.scrollPosPercent += me._ht_info_popup.userData.pagePercent;
					me._ht_info_popup.userData.scrollPosPercent = Math.min(me._ht_info_popup.userData.scrollPosPercent, me._ht_info_popup.userData.maxScrollPercent);
					me._ht_info_popup.userData.ggPaintCanvasText();
					me._ht_info_popup.userData.scrollbar.position.y -= (me._ht_info_popup.userData.height * me._ht_info_popup.userData.pagePercent) / 100.0;
					me._ht_info_popup.userData.scrollbar.position.y = Math.max(me._ht_info_popup.userData.scrollbar.position.y, me._ht_info_popup.userData.scrollbarYPosMax);
				}
				me._ht_info_popup.userData.scrollbarPageUp.position.x = me._ht_info_popup.userData.scrollbarXPos;
				me._ht_info_popup.userData.scrollbarPageUp.position.y = -me._ht_info_popup.userData.height / 400.0;
				me._ht_info_popup.userData.scrollbarPageUp.position.z = me._ht_info_popup.position.z + 0.05;
				me._ht_info_popup.userData.scrollbarPageUp.userData.stopPropagation = true;
				me._ht_info_popup.userData.scrollbarPageUp.userData.clickInvisible = true;
				me._ht_info_popup.userData.scrollbarPageUp.visible = false;
				me._ht_info_popup.add(me._ht_info_popup.userData.scrollbarPageUp);
				me._ht_info_popup.userData.hasScrollbar = true;
			} else {
				me._ht_info_popup.userData.hasScrollbar = false;
			}
			canv.width = me._ht_info_popup.userData.boxWidth;
			canv.height = me._ht_info_popup.userData.boxHeight;
			ctx.font = '22px Verdana';
			me._ht_info_popup.userData.ggPaintCanvasText();
		}
		me._ht_info_popup.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.description))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_info_popup.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_info_popup.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_popup.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_popup.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_info_popup.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_info_popup.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_info_popup";
		me._ht_info_popup.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_popup_bg.add(me._ht_info_popup);
		geometry = new THREE.PlaneBufferGeometry(0.4, 0.4, 5, 5 );
		geometry.name = 'ht_info_popup_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABJElEQVR4nO3bSw6DMBAEUSs341icfrLJSJGFAeNfY9c7QU9JiJVDAAAAAAAAAADgdcxsM7Nt9I4U6X2/cW4fvSdmZvvfPr2IUUCpiFE8zYAhHA4dHlFx0ymlwUpbsigMV9hQZOQBr4/nRhwyTTzX86Dp4rkeh00bz7U8cPp4rsWhy8RzNQ9eLp6rcfiy8VxJgOXjuSchiBfJCUK8hDthiHfhLBDxbjoKRbxMB8GIlysRUTLeZ/QAVMYnXICfSIGzUES8cCcQERNywhAx8iQIEX9KQiwfsUaAZSPWPHy5iC0OXiZiy0Onj9jjwGkj9jxsuogjDpom4shDXh9R4QCFDY8oDVfacoviYMVNh4xnDmWMhzblTPkpVdDfBwAAAAAAAABA2hcaGfeSY++bsA'+
	'AAAABJRU5ErkJggg==');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_info_popup_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.85);
		el.translateY(2.05);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 40;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_popup_close';
		el.userData.x = 2.85;
		el.userData.y = 2.05;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_info_popup_close.material) me._ht_info_popup_close.material.opacity = v;
			me._ht_info_popup_close.visible = (v>0 && me._ht_info_popup_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_info_popup_close.visible
			let parentEl = me._ht_info_popup_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_popup_close.userData.opacity = v;
			v = v * me._ht_info_popup_close.userData.parentOpacity;
			me._ht_info_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup_close.children.length; i++) {
				let child = me._ht_info_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_popup_close.userData.parentOpacity = v;
			v = v * me._ht_info_popup_close.userData.opacity
			me._ht_info_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup_close.children.length; i++) {
				let child = me._ht_info_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_popup_close = el;
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABkklEQVR4nO3bTU7CUBRA4VN3hmNYECwAF9Q3xqXVSZsQAqLe93MN55uYENPed0CKbQFJkiRJkiRJkv6dUsqulLIbPccjLeZ7q7WhUspuWZbLsiyXeZ6PtbZbyzzPx22+mhGrBbxxzhRxneXcYtvVAu73+0/gdPVQioh34p3WWauYam1oc2/gw+HwUXs/WWapHhByROw1Q5OAMDZiz303CwhjIvbeZ9OA0HdBI56w5gGhz8JGvWV0CQhtFzjy/bZbQGiz0NFH/K4Boe6CR8eDAQGhzsIzxINBASEWIEs8GBgQ/hYiUzwYHBB+FyRbPEgQEH4WJmM8SBIQvg+UNR4kCgj3Q60/U8aDZAHh6dnjVPEgYUB4GDFdPGh3TeRlpHsF+icc4EEkwI8xAX6QDv'+
	'BfuQBPJgR4OivAE6oBntIP8KJSgJc1A7ywHuCtHQHeXBTg7W0Bo4+MPWfwFt+gqgEzxdu0nqlawO17IlcPDY+3uY04TdN7rTv1W10TSRMPYJ3l9PQXR3vFr3pJkiRJkiRJktTHF2/mnlujgoiVAAAAAElFTkSuQmCC');
		el.userData.materialOver = new THREE.MeshBasicMaterial( {map: textureOver, side: THREE.DoubleSide, transparent: true} );
		el.userData.materialOver.name = 'ht_info_popup_close_materialOver';
		el.userData.ggId="ht_info_popup_close";
		me._ht_info_popup_close.userData.onclick=function (e) {
			player.setVariableValue('open_info_hs', player.getVariableValue('open_info_hs').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_info_popup_close.userData.onmouseover=function (e) {
			me._ht_info_popup_close.material = me._ht_info_popup_close.userData.materialOver;
			me.elementMouseOver['ht_info_popup_close']=true;
		}
		me._ht_info_popup_close.userData.onmouseout=function (e) {
			me._ht_info_popup_close.material = me._ht_info_popup_close.userData.materialNormal;
			me.elementMouseOver['ht_info_popup_close']=false;
		}
		me._ht_info_popup_close.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_info_popup_close']) {
				me._ht_info_popup_close.material = me._ht_info_popup_close.userData.materialOver;
				me.elementMouseOver['ht_info_popup_close']=true;
			}
		}
		me._ht_info_popup_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_popup_bg.add(me._ht_info_popup_close);
		me._ht_info.add(me._ht_info_popup_bg);
		me._ht_info.userData.setOpacity(1.00);
		me._ht_info_bg.userData.setOpacity(1.00);
		me._ht_info_icon.userData.setOpacity(1.00);
		me._ht_info_title.userData.setOpacity(0.00);
		me._ht_info_popup_bg.userData.setOpacity(0.00);
		me._ht_info_popup.userData.setOpacity(1.00);
		me._ht_info_popup_close.userData.setOpacity(1.00);
			me.ggEvent_changenode=function() {
				me._ht_info_bg.logicBlock_alpha();
				me._ht_info_popup_bg.logicBlock_scaling();
				me._ht_info_popup_bg.logicBlock_alpha();
			};
			me.ggEvent_configloaded=function() {
				me._ht_info_bg.logicBlock_alpha();
				me._ht_info_popup_bg.logicBlock_scaling();
				me._ht_info_popup_bg.logicBlock_alpha();
			};
			me.ggEvent_varchanged_open_image_hs=function() {
				me._ht_info_bg.logicBlock_alpha();
			};
			me.ggEvent_varchanged_open_info_hs=function() {
				me._ht_info_popup_bg.logicBlock_scaling();
				me._ht_info_popup_bg.logicBlock_alpha();
			};
			me.__obj = me._ht_info;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_image(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_image';
		el.userData.x = -1.17;
		el.userData.y = 2.1;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image.visible
			let parentEl = me._ht_image.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image.userData.opacity = v;
			v = v * me._ht_image.userData.parentOpacity;
			me._ht_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image.children.length; i++) {
				let child = me._ht_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image.userData.parentOpacity = v;
			v = v * me._ht_image.userData.opacity
			me._ht_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image.children.length; i++) {
				let child = me._ht_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image = el;
		el.userData.ggId="ht_image";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_image.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_image']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_image']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_image']) {
				player.setActiveHotspot(me.hotspot);
				me.elementMouseOver['ht_image']=true;
			}
		}
		me._ht_image.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.45;
		height = 0.45;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.12, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.12, (height / 2.0));
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_image_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgba(74,74,74,0.588235)').convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_image_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_image_bg.material.opacity = v * me._ht_image_bg.userData.backgroundColorAlpha;
			if (me._ht_image_bg.userData.ggSubElement) {
				me._ht_image_bg.userData.ggSubElement.material.opacity = v
				me._ht_image_bg.userData.ggSubElement.visible = (v>0 && me._ht_image_bg.userData.visible);
			}
			me._ht_image_bg.visible = (v>0 && me._ht_image_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_bg.userData.backgroundColorAlpha = v;
			me._ht_image_bg.userData.setOpacity(me._ht_image_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_bg.visible
			let parentEl = me._ht_image_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_bg.userData.opacity = v;
			v = v * me._ht_image_bg.userData.parentOpacity;
			me._ht_image_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_bg.children.length; i++) {
				let child = me._ht_image_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_bg.userData.parentOpacity = v;
			v = v * me._ht_image_bg.userData.opacity
			me._ht_image_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_bg.children.length; i++) {
				let child = me._ht_image_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_bg = el;
		el.userData.ggId="ht_image_bg";
		me._ht_image_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_image_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_image_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_image_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_image_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_image_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_image_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.scale.set(transition_scale.startScale.x + (me._ht_image_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_bg.position.x = (me._ht_image_bg.position.x - me._ht_image_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_image_bg.userData.curScaleOffX = scaleOffX;
						me._ht_image_bg.position.y = (me._ht_image_bg.position.y - me._ht_image_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_image_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_image_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_image_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.scale.set(transition_scale.startScale.x + (me._ht_image_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_bg.position.x = (me._ht_image_bg.position.x - me._ht_image_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_image_bg.userData.curScaleOffX = scaleOffX;
						me._ht_image_bg.position.y = (me._ht_image_bg.position.y - me._ht_image_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_image_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_image_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_image_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_image_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_image_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_image_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_image_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_bg.material ? me._ht_image_bg.material.opacity : me._ht_image_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_image_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_bg.material ? me._ht_image_bg.material.opacity : me._ht_image_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_image_bg.userData.onclick=function (e) {
			player.setVariableValue('open_image_hs', player.getVariableValue('open_image_hs') + "<"+me.hotspot.id+">");
		}
		me._ht_image_bg.userData.onmouseover=function (e) {
			me.elementMouseOver['ht_image_bg']=true;
			me._ht_image_title.logicBlock_alpha();
			me._ht_image_bg.logicBlock_scaling();
		}
		me._ht_image_bg.userData.ontouchend=function (e) {
			me._ht_image_bg.logicBlock_scaling();
		}
		me._ht_image_bg.userData.onmouseout=function (e) {
			me.elementMouseOver['ht_image_bg']=false;
			me._ht_image_title.logicBlock_alpha();
			me._ht_image_bg.logicBlock_scaling();
		}
		me._ht_image_bg.ggCurrentLogicStateScaling = -1;
		me._ht_image_bg.ggCurrentLogicStateAlpha = -1;
		me._ht_image_bg.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_image_bg']) {
				me.elementMouseOver['ht_image_bg']=true;
				me._ht_image_title.logicBlock_alpha();
			}
		}
		me._ht_image_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(0.36, 0.36, 5, 5 );
		geometry.name = 'ht_image_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAHDUlEQVR4nO2bTWwbxxmG32+WIgjT9qmRwAgNcojRpkAMVFBkIUGDqq4ThOSSElPoWlsJoPbWHuPGIaw2To+5NSlgy+6lgAqTWu6SQZ2kRAykjVRDBVwgDeAA+QFUwcrNon5AaefrgbMKpSqkJO6sbGufC3d2h+8MX87/zAIhISEhISEhDykUVELFYvHxSCTyuB9azPxlJpP53A+tdgRiUKlU6iOifwCI+iibM02z6KPejmg3aGpqKhqLxW4R0VM+Sy+trq5+Z3R0tO6z7hYiOsUBIBaLveaZw8w3iSjfoeSfAHwXwLEjR478BkCnei3RWoJU1ZoFYAC4vbq6+nSn//i2ErkhpRzIZrP/8iXDOyB0CU9NTUUBXEXDnA0p5Vk/qoPSOAvABRARQlxVaW'+
	'lBm0HNVYuILvn5L2cymTlmvqSCJ1VV04IWg1TVOq+Ct1dWVt7wO421tbXfMfO/AYCZz1uW9UO/0wA0GKSram0nqKrWspEuFArdhmGcEEJ07UFzAsCPAICIJtLptNZeplQqTRDRBWDvvaSUct113Tu5XG7x2+LsaJDjOBkp5XkiOrX3LG/iS6/VDj/GWcw8I4S4lE6nS9ufbTHo1q1bXQsLC+8AOLffxBR1KeWgzu63GR9H6pOJRGK8v79/3buxZaC4zZx5IrqqGsK7e0llY2Pji5GRkS86zOyuyWQyc8Vi8Xv7mOv1ENFTzHwWQC+AcwsLCwAw5kXYLEGO42SY2QIAZv5LJBJ5JZlM3us49w8AlUrluOu6lwH8DACIKOtVt81eTErpdcvzh8kcAEgmk/cMw3gZwDwAMPOr3jMBNHorr0EmoquHyRyPZDJ5j5mvqeBg'+
	'oVDoBpRBhmGc8CJ6g6/DCBHd9q49TwQAbBvn7KlBfsjY/O2eJ9qXO3ZDPp8XAwMD3czcCwBEND87O7t48eJFedB5OzCDLMs6RkQvEdEIgOellDHvGTOjv79/zbbtG8xcZObr2Wx26SDyGbhB1Wo1srS09DIRTQDobhE1BiBDRBki+r3jOK/H4/ErQ0NDGwFlFYDG5Y6dKBQK3bVa7UMiehvfmHOHmd8ionEAGTRMGWfmtwB8puL0MPM7tVrtQ693CYrAStD09PQPDMN4F8Bj6tb7QojXUqnUTIuv/bpcLp+SUr4B4DSAZ7q6uv45PT394vDw8CfaM42ASpBlWT1N5tQBjJmmeaaNOQCAVCo1Y5rmT9EY/tcBPGYYxrtBlSTtBlWr1YgQogBljhDijGmak3vVMU1zUghxBsqkaDRaqFar2muAdoOWl5fHADyjgr9IpV'+
	'I396uVSqVuEtEvAYCZn63Vap2uOrRFq0GWZR1j5gkV/GA/JWc76XT6CoC/qeBvLcs61qlmK7QaREQvAegBACGEbwvrzOxp9RiGkfNLdyd0GzSiLu/spkHeLaZpzuCbIcBIq7idos2gfD4vADwPAMxc9lObiJiZHaX9gkpLC9qEBwYGutEYDUMI8R8NSXyqPmN9fX2PaNAHoNEgb+Kprhf81iei/zZd97aK2wmBTjUeRLQZRETzTdcJv/WZ+dGm6/lWcTtBm0Gzs7OLANYAQEr5pIYkvq8+V+fm5r7WoA9Ao0FqsesGABBRyk9tZiYiSivtGzoX1rS2QczsHZE7US6XO9ml3YJt26cAPKGCWo/h6TboOtQ6r1qy8AUi8rTurqysXPdLdye0GpTNZpeI6HUVPG3bdseTS8dxxgD8RAUvjI6O1jrVbIX2bj4ej18B8HcV'+
	'fLtcLj+3X61yufwcM/8BAIjoo6NHj3Y8+W2HdoOGhoY21tfXRwB8BSAqpXxPlYI94TjOmJTyPTQOKHxZr9dzQaxPBzJQzOVyi67rvghlEjNftm37/VKpNMjM33pGiZmpVCoN2rb9ATNfRsOcr1zXTbY60+Mnga1JDw8Pf1IoFJ6ORqMFZn4WwGkiOu04zmelUskB8Kk3fWDmR4noScdxUkTk9VYgoo/q9XouKHOAgLd9crncYrVa/fHy8vKYWkjrAfAEEf2qOR7R/xWquwAuxOPxyXQ6Hei2T+D7Yqrd+KNlWX9Wi10jzPwC1My/iTUi+iuAouu6hUOzceihfvA1ANfy+bzo6+t7xJuVM/P83Nzc14d667kZZcRd3IcHJ8LljjaEBrUhNKgNAmgcqG6613NAebkf2PztnicCAFzXveM90PDi2wMDM5/0rj1PBNAYwD'+
	'HzjIp0tlKpHD+YLB4clUrlOBH9XAU/9kbrm22QEMJ7vajXdd3Lh8mkpnPS3hHAN71nW8b0tm1fQdNJe2a+pk5+3nfjE5/oYeaTquR4W0eTpmlurjZsGSgmEolxdRT/HIDepne+Hlq2zfsmE4nE+JbnO31JvZbwKoBBjXm7n/iYiN5s+7bPdvb5vtgDw27eFwsJCQkJCQl5aPkf8YTb9kSXnw4AAAAASUVORK5CYII=');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_image_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 36;
		el.userData.height = 36;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_icon.material) me._ht_image_icon.material.opacity = v;
			me._ht_image_icon.visible = (v>0 && me._ht_image_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_image_icon.visible
			let parentEl = me._ht_image_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_icon.userData.opacity = v;
			v = v * me._ht_image_icon.userData.parentOpacity;
			me._ht_image_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_icon.children.length; i++) {
				let child = me._ht_image_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_icon.userData.parentOpacity = v;
			v = v * me._ht_image_icon.userData.opacity
			me._ht_image_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_icon.children.length; i++) {
				let child = me._ht_image_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_icon = el;
		el.userData.ggId="ht_image_icon";
		me._ht_image_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image_bg.add(me._ht_image_icon);
		geometry = new THREE.PlaneBufferGeometry(1, 0.2, 5, 5 );
		geometry.name = 'ht_image_title_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_image_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_image_title.material.opacity = v;
			if (me._ht_image_title.userData.hasScrollbar) {
				me._ht_image_title.userData.scrollbar.material.opacity = v;
				me._ht_image_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_image_title.userData.ggSubElement) {
				me._ht_image_title.userData.ggSubElement.material.opacity = v
				me._ht_image_title.userData.ggSubElement.visible = (v>0 && me._ht_image_title.userData.visible);
			}
			me._ht_image_title.visible = (v>0 && me._ht_image_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_title.userData.backgroundColorAlpha = v;
			me._ht_image_title.userData.setOpacity(me._ht_image_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.325);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_title';
		el.userData.x = 0;
		el.userData.y = -0.325;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_title.visible
			let parentEl = me._ht_image_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_title.userData.opacity = v;
			v = v * me._ht_image_title.userData.parentOpacity;
			me._ht_image_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_title.children.length; i++) {
				let child = me._ht_image_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_title.userData.parentOpacity = v;
			v = v * me._ht_image_title.userData.opacity
			me._ht_image_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_title.children.length; i++) {
				let child = me._ht_image_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1);
		el.userData.textColor = new THREE.Color(0.701961, 0.701961, 0.701961);
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 100;
		canvas.height = 20;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_image_title.userData.totalHeight = 3;
			me._ht_image_title.userData.textLines = [];
			var ctx = me._ht_image_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_image_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_image_title.userData.textLines.push(line);
					line = '';
					me._ht_image_title.userData.totalHeight += me._ht_image_title.userData.lineHeight;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (me._ht_image_title.userData.width - 0 - (scrollbar ? 25 : 0)) && i > 0) {
					me._ht_image_title.userData.textLines.push(line);
					line = words[i];
					me._ht_image_title.userData.totalHeight += me._ht_image_title.userData.lineHeight;
				} else {
					line = testLine;
				}
			}
			me._ht_image_title.userData.textLines.push(line);
			me._ht_image_title.userData.totalHeight += me._ht_image_title.userData.lineHeight;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_image_title.userData.textCanvas;
			var ctx = me._ht_image_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_image_title.userData.textColor.r * 255 + ', ' + me._ht_image_title.userData.textColor.g * 255 + ', ' + me._ht_image_title.userData.textColor.b * 255 + ', ' + me._ht_image_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_image_title.userData.boxWidth - (me._ht_image_title.userData.hasScrollbar ? 25 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 3;
			for (var i = 0; i < me._ht_image_title.userData.textLines.length; i++) {
				ctx.fillText(me._ht_image_title.userData.textLines[i], x, y);
				y += me._ht_image_title.userData.lineHeight;
			}
			geometry = new THREE.PlaneBufferGeometry(me._ht_image_title.userData.boxWidth / 100.0, me._ht_image_title.userData.boxHeight / 100.0, 5, 5 );
			geometry.name = 'ht_image_title_geometry';
			me._ht_image_title.geometry.dispose();
			me._ht_image_title.geometry = geometry;
			var diffY = me._ht_image_title.userData.boxHeight - me._ht_image_title.userData.height;
			me._ht_image_title.position.y = me._ht_image_title.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_image_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.encoding = THREE.sRGBEncoding;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_image_title.material.map) {
				me._ht_image_title.material.map.dispose();
			}
			me._ht_image_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._ht_image_title.remove(...me._ht_image_title.children);
			var canv = me._ht_image_title.userData.textCanvas;
			var ctx = me._ht_image_title.userData.textCanvasContext;
			ctx.font = '18px Verdana';
			me._ht_image_title.userData.lineHeight = 18 * 1.2;
			me._ht_image_title.userData.textLines = [];
			me._ht_image_title.userData.textLines.push(me._ht_image_title.userData.ggText);
			me._ht_image_title.userData.totalHeight = 3;
			me._ht_image_title.userData.totalHeight += me._ht_image_title.userData.lineHeight;
			me._ht_image_title.userData.boxWidth = ctx.measureText(me._ht_image_title.userData.ggText).width + 0;
			me._ht_image_title.userData.boxHeight = me._ht_image_title.userData.totalHeight;
			canv.width = me._ht_image_title.userData.boxWidth;
			canv.height = me._ht_image_title.userData.boxHeight;
			ctx.font = '18px Verdana';
			me._ht_image_title.userData.ggPaintCanvasText();
		}
		me._ht_image_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_image_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_image_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_image_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_image_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_image_title";
		me._ht_image_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_image_bg'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_image_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_image_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_image_title.ggCurrentLogicStateAlpha == 0) {
					me._ht_image_title.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_image_title.userData.transitions.length; i++) {
						if (me._ht_image_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_title.userData.transitions[i].interval);
							me._ht_image_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_title.material ? me._ht_image_title.material.opacity : me._ht_image_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_title.userData.transitions.splice(me._ht_image_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_title.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_image_title.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_image_title.userData.transitions.length; i++) {
						if (me._ht_image_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_title.userData.transitions[i].interval);
							me._ht_image_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_title.material ? me._ht_image_title.material.opacity : me._ht_image_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_title.userData.transitions.splice(me._ht_image_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_title.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_image_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image_bg.add(me._ht_image_title);
		me._ht_image.add(me._ht_image_bg);
		width = 6.6;
		height = 4.8;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.3, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.3, (height / 2.0));
		roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.3);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.3);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.3, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.3, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.3);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.3);
		roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.3, (height / 2.0));
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_image_popup_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgba(74,74,74,0.666667)').convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_image_popup_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_image_popup_bg.material.opacity = v * me._ht_image_popup_bg.userData.backgroundColorAlpha;
			if (me._ht_image_popup_bg.userData.ggSubElement) {
				me._ht_image_popup_bg.userData.ggSubElement.material.opacity = v
				me._ht_image_popup_bg.userData.ggSubElement.visible = (v>0 && me._ht_image_popup_bg.userData.visible);
			}
			me._ht_image_popup_bg.visible = (v>0 && me._ht_image_popup_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_popup_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_popup_bg.userData.backgroundColorAlpha = v;
			me._ht_image_popup_bg.userData.setOpacity(me._ht_image_popup_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.10, 0.10, 1.0);
		el.userData.width = 660;
		el.userData.height = 480;
		el.userData.scale = {x: 0.10, y: 0.10, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_popup_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_popup_bg.visible
			let parentEl = me._ht_image_popup_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_popup_bg.userData.opacity = v;
			v = v * me._ht_image_popup_bg.userData.parentOpacity;
			me._ht_image_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup_bg.children.length; i++) {
				let child = me._ht_image_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_popup_bg.userData.parentOpacity = v;
			v = v * me._ht_image_popup_bg.userData.opacity
			me._ht_image_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup_bg.children.length; i++) {
				let child = me._ht_image_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_popup_bg = el;
		el.userData.ggId="ht_image_popup_bg";
		me._ht_image_popup_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('open_image_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_image_popup_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_image_popup_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_image_popup_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_image_popup_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_image_popup_bg.userData.transitions.length; i++) {
						if (me._ht_image_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_popup_bg.userData.transitions[i].interval);
							me._ht_image_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_image_popup_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_image_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_popup_bg.position.x = (me._ht_image_popup_bg.position.x - me._ht_image_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_image_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_image_popup_bg.position.y = (me._ht_image_popup_bg.position.y - me._ht_image_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_image_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_popup_bg.userData.transitions.splice(me._ht_image_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_popup_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_image_popup_bg.userData.transitionValue_scale = {x: 0.1, y: 0.1, z: 1.0};
					for (var i = 0; i < me._ht_image_popup_bg.userData.transitions.length; i++) {
						if (me._ht_image_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_popup_bg.userData.transitions[i].interval);
							me._ht_image_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_image_popup_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_image_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_popup_bg.position.x = (me._ht_image_popup_bg.position.x - me._ht_image_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_image_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_image_popup_bg.position.y = (me._ht_image_popup_bg.position.y - me._ht_image_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_image_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_popup_bg.userData.transitions.splice(me._ht_image_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_popup_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_image_popup_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_image_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_image_popup_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_image_popup_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_image_popup_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_image_popup_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_image_popup_bg.userData.transitions.length; i++) {
						if (me._ht_image_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_popup_bg.userData.transitions[i].interval);
							me._ht_image_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_popup_bg.material ? me._ht_image_popup_bg.material.opacity : me._ht_image_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_popup_bg.userData.transitions.splice(me._ht_image_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_popup_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_image_popup_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_image_popup_bg.userData.transitions.length; i++) {
						if (me._ht_image_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_popup_bg.userData.transitions[i].interval);
							me._ht_image_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_popup_bg.material ? me._ht_image_popup_bg.material.opacity : me._ht_image_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_popup_bg.userData.transitions.splice(me._ht_image_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_popup_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_image_popup_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_popup.userData.ggSubElement) {
				me._ht_image_popup.userData.ggSubElement.material.opacity = v
				me._ht_image_popup.userData.ggSubElement.visible = (v>0 && me._ht_image_popup.userData.visible);
			}
			me._ht_image_popup.visible = (v>0 && me._ht_image_popup.userData.visible);
		}
		el.translateX(0);
		el.translateY(-0.2);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 600;
		el.userData.height = 400;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_popup';
		el.userData.x = 0;
		el.userData.y = -0.2;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_popup.visible
			let parentEl = me._ht_image_popup.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_popup.userData.opacity = v;
			v = v * me._ht_image_popup.userData.parentOpacity;
			me._ht_image_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup.children.length; i++) {
				let child = me._ht_image_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_popup.userData.parentOpacity = v;
			v = v * me._ht_image_popup.userData.opacity
			me._ht_image_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup.children.length; i++) {
				let child = me._ht_image_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_popup = el;
		currentWidth = 600;
		currentHeight = 400;
		var img = {};
		width = currentWidth / 100.0;
		height = currentHeight / 100.0;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.2, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.2, (height / 2.0));
		roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.2);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.2, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.2);
		roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.2, (height / 2.0));
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_image_popup_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		img.geometry = geometry;
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_image_popup_subElementMaterial';
				me._ht_image_popup.userData.ggSubElement.material = loadedMaterial;
				me._ht_image_popup.userData.ggUpdatePosition();
				me._ht_image_popup.userData.ggText = extUrl;
				me._ht_image_popup.userData.setOpacity(me._ht_image_popup.userData.opacity);
			});
		};
		var extUrl=basePath + ""+player._(me.hotspot.url)+"";
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_image_popup_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_image_popup_subElement';
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 600;
		el.userData.clientHeight = 400;
		el.userData.ggId="ht_image_popup";
		me._ht_image_popup.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_image_popup.userData.clientWidth;
			var parentHeight = me._ht_image_popup.userData.clientHeight;
			var img = me._ht_image_popup.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if (aspectRatioDiv > aspectRatioImg) {
				currentHeight = parentHeight;
				currentWidth = parentHeight * aspectRatioImg;
			width = currentWidth / 100.0;
			height = currentHeight / 100.0;
			roundedRectShape = new THREE.Shape();
			roundedRectShape.moveTo((-width / 2.0) + 0.2, (height / 2.0));
			roundedRectShape.lineTo((width / 2.0) - 0.2, (height / 2.0));
			roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.2);
			roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
			roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.2, (-height / 2.0));
			roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
			roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.2);
			roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.2);
			roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.2, (height / 2.0));
			geometry = new THREE.ShapeGeometry(roundedRectShape);
			geometry.name = 'ht_image_popup_geometry';
			geometry.computeBoundingBox();
			var min = geometry.boundingBox.min;
			var max = geometry.boundingBox.max;
			var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
			var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
			var vertexPositions = geometry.getAttribute('position');
			var vertexUVs = geometry.getAttribute('uv');
			for (var i = 0; i < vertexPositions.count; i++) {
				var v1 = vertexPositions.getX(i);
				var	v2 = vertexPositions.getY(i);
				vertexUVs.setX(i, (v1 + offset.x) / range.x);
				vertexUVs.setY(i, (v2 + offset.y) / range.y);
			}
			geometry.uvsNeedUpdate = true;
			img.geometry = geometry;
			} else {
				currentWidth = parentWidth;
				currentHeight = parentWidth / aspectRatioImg;
			width = currentWidth / 100.0;
			height = currentHeight / 100.0;
			roundedRectShape = new THREE.Shape();
			roundedRectShape.moveTo((-width / 2.0) + 0.2, (height / 2.0));
			roundedRectShape.lineTo((width / 2.0) - 0.2, (height / 2.0));
			roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.2);
			roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
			roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.2, (-height / 2.0));
			roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
			roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.2);
			roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.2);
			roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.2, (height / 2.0));
			geometry = new THREE.ShapeGeometry(roundedRectShape);
			geometry.name = 'ht_image_popup_geometry';
			geometry.computeBoundingBox();
			var min = geometry.boundingBox.min;
			var max = geometry.boundingBox.max;
			var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
			var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
			var vertexPositions = geometry.getAttribute('position');
			var vertexUVs = geometry.getAttribute('uv');
			for (var i = 0; i < vertexPositions.count; i++) {
				var v1 = vertexPositions.getX(i);
				var	v2 = vertexPositions.getY(i);
				vertexUVs.setX(i, (v1 + offset.x) / range.x);
				vertexUVs.setY(i, (v2 + offset.y) / range.y);
			}
			geometry.uvsNeedUpdate = true;
			img.geometry = geometry;
			};
		}
		me._ht_image_popup_bg.add(me._ht_image_popup);
		geometry = new THREE.PlaneBufferGeometry(0.4, 0.4, 5, 5 );
		geometry.name = 'ht_image_popup_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABJElEQVR4nO3bSw6DMBAEUSs341icfrLJSJGFAeNfY9c7QU9JiJVDAAAAAAAAAADgdcxsM7Nt9I4U6X2/cW4fvSdmZvvfPr2IUUCpiFE8zYAhHA4dHlFx0ymlwUpbsigMV9hQZOQBr4/nRhwyTTzX86Dp4rkeh00bz7U8cPp4rsWhy8RzNQ9eLp6rcfiy8VxJgOXjuSchiBfJCUK8hDthiHfhLBDxbjoKRbxMB8GIlysRUTLeZ/QAVMYnXICfSIGzUES8cCcQERNywhAx8iQIEX9KQiwfsUaAZSPWPHy5iC0OXiZiy0Onj9jjwGkj9jxsuogjDpom4shDXh9R4QCFDY8oDVfacoviYMVNh4xnDmWMhzblTPkpVdDfBwAAAAAAAABA2hcaGfeSY++bsA'+
	'AAAABJRU5ErkJggg==');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_image_popup_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.85);
		el.translateY(2.05);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 40;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_popup_close';
		el.userData.x = 2.85;
		el.userData.y = 2.05;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_popup_close.material) me._ht_image_popup_close.material.opacity = v;
			me._ht_image_popup_close.visible = (v>0 && me._ht_image_popup_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_image_popup_close.visible
			let parentEl = me._ht_image_popup_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_popup_close.userData.opacity = v;
			v = v * me._ht_image_popup_close.userData.parentOpacity;
			me._ht_image_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup_close.children.length; i++) {
				let child = me._ht_image_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_popup_close.userData.parentOpacity = v;
			v = v * me._ht_image_popup_close.userData.opacity
			me._ht_image_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup_close.children.length; i++) {
				let child = me._ht_image_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_popup_close = el;
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABkklEQVR4nO3bTU7CUBRA4VN3hmNYECwAF9Q3xqXVSZsQAqLe93MN55uYENPed0CKbQFJkiRJkiRJkv6dUsqulLIbPccjLeZ7q7WhUspuWZbLsiyXeZ6PtbZbyzzPx22+mhGrBbxxzhRxneXcYtvVAu73+0/gdPVQioh34p3WWauYam1oc2/gw+HwUXs/WWapHhByROw1Q5OAMDZiz303CwhjIvbeZ9OA0HdBI56w5gGhz8JGvWV0CQhtFzjy/bZbQGiz0NFH/K4Boe6CR8eDAQGhzsIzxINBASEWIEs8GBgQ/hYiUzwYHBB+FyRbPEgQEH4WJmM8SBIQvg+UNR4kCgj3Q60/U8aDZAHh6dnjVPEgYUB4GDFdPGh3TeRlpHsF+icc4EEkwI8xAX6QDv'+
	'BfuQBPJgR4OivAE6oBntIP8KJSgJc1A7ywHuCtHQHeXBTg7W0Bo4+MPWfwFt+gqgEzxdu0nqlawO17IlcPDY+3uY04TdN7rTv1W10TSRMPYJ3l9PQXR3vFr3pJkiRJkiRJktTHF2/mnlujgoiVAAAAAElFTkSuQmCC');
		el.userData.materialOver = new THREE.MeshBasicMaterial( {map: textureOver, side: THREE.DoubleSide, transparent: true} );
		el.userData.materialOver.name = 'ht_image_popup_close_materialOver';
		el.userData.ggId="ht_image_popup_close";
		me._ht_image_popup_close.userData.onclick=function (e) {
			player.setVariableValue('open_image_hs', player.getVariableValue('open_image_hs').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_image_popup_close.userData.onmouseover=function (e) {
			me._ht_image_popup_close.material = me._ht_image_popup_close.userData.materialOver;
			me.elementMouseOver['ht_image_popup_close']=true;
		}
		me._ht_image_popup_close.userData.onmouseout=function (e) {
			me._ht_image_popup_close.material = me._ht_image_popup_close.userData.materialNormal;
			me.elementMouseOver['ht_image_popup_close']=false;
		}
		me._ht_image_popup_close.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_image_popup_close']) {
				me._ht_image_popup_close.material = me._ht_image_popup_close.userData.materialOver;
				me.elementMouseOver['ht_image_popup_close']=true;
			}
		}
		me._ht_image_popup_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image_popup_bg.add(me._ht_image_popup_close);
		me._ht_image.add(me._ht_image_popup_bg);
		me._ht_image.userData.setOpacity(1.00);
		me._ht_image_bg.userData.setOpacity(1.00);
		me._ht_image_icon.userData.setOpacity(1.00);
		me._ht_image_title.userData.setOpacity(0.00);
		me._ht_image_popup_bg.userData.setOpacity(0.00);
		me._ht_image_popup.userData.setOpacity(1.00);
		me._ht_image_popup_close.userData.setOpacity(1.00);
			me.ggEvent_changenode=function() {
				me._ht_image_bg.logicBlock_alpha();
				me._ht_image_popup_bg.logicBlock_scaling();
				me._ht_image_popup_bg.logicBlock_alpha();
			};
			me.ggEvent_configloaded=function() {
				me._ht_image_bg.logicBlock_alpha();
				me._ht_image_popup_bg.logicBlock_scaling();
				me._ht_image_popup_bg.logicBlock_alpha();
			};
			me.ggEvent_varchanged_open_image_hs=function() {
				me._ht_image_bg.logicBlock_alpha();
				me._ht_image_popup_bg.logicBlock_scaling();
				me._ht_image_popup_bg.logicBlock_alpha();
			};
			me.__obj = me._ht_image;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_node(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_node';
		el.userData.x = -3.06;
		el.userData.y = 2.11;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_node.visible
			let parentEl = me._ht_node.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node.userData.opacity = v;
			v = v * me._ht_node.userData.parentOpacity;
			me._ht_node.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node.children.length; i++) {
				let child = me._ht_node.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node.userData.parentOpacity = v;
			v = v * me._ht_node.userData.opacity
			me._ht_node.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node.children.length; i++) {
				let child = me._ht_node.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node = el;
		el.userData.ggId="ht_node";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_node.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_node']) {
				player.setActiveHotspot(me.hotspot);
				me.elementMouseOver['ht_node']=true;
			}
		}
		me._ht_node.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.45;
		height = 0.45;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.12, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.12, (height / 2.0));
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_node_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgba(74,74,74,0.588235)').convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_node_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_node_bg.material.opacity = v * me._ht_node_bg.userData.backgroundColorAlpha;
			if (me._ht_node_bg.userData.ggSubElement) {
				me._ht_node_bg.userData.ggSubElement.material.opacity = v
				me._ht_node_bg.userData.ggSubElement.visible = (v>0 && me._ht_node_bg.userData.visible);
			}
			me._ht_node_bg.visible = (v>0 && me._ht_node_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_node_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_node_bg.userData.backgroundColorAlpha = v;
			me._ht_node_bg.userData.setOpacity(me._ht_node_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_node_bg.visible
			let parentEl = me._ht_node_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_bg.userData.opacity = v;
			v = v * me._ht_node_bg.userData.parentOpacity;
			me._ht_node_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_bg.children.length; i++) {
				let child = me._ht_node_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_bg.userData.parentOpacity = v;
			v = v * me._ht_node_bg.userData.opacity
			me._ht_node_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_bg.children.length; i++) {
				let child = me._ht_node_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_bg = el;
		el.userData.ggId="ht_node_bg";
		me._ht_node_bg.userData.onclick=function (e) {
			player.openNext(player._(me.hotspot.url),player._(me.hotspot.target));
		}
		me._ht_node_bg.userData.onmouseover=function (e) {
			me.elementMouseOver['ht_node_bg']=true;
			me._ht_node_image.logicBlock_alpha();
			me._ht_node_image.logicBlock_scaling();
		}
		me._ht_node_bg.userData.onmouseout=function (e) {
			me.elementMouseOver['ht_node_bg']=false;
			me._ht_node_image.logicBlock_alpha();
			me._ht_node_image.logicBlock_scaling();
		}
		me._ht_node_bg.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_node_bg']) {
				me.elementMouseOver['ht_node_bg']=true;
				me._ht_node_image.logicBlock_alpha();
				me._ht_node_image.logicBlock_scaling();
			}
		}
		me._ht_node_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(0.36, 0.36, 5, 5 );
		geometry.name = 'ht_node_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAANlUlEQVR4nO1ca5AU1RX+Tvf0MMssGBB5W6lQFbEIFbV4GLWIIKWsu90Doq7mh5AYDQIpJIZYpWtY16rlB4iaqIDRSCA/Eic47E7PLDMmuBAKsdil1BSxQEtSiS8QIgr7mJ2e6ZMffXsZ5tU9s7NAkv2qpqa77z33nj59+97zug0MYQhDGMLFA11sBoLBYLXP57uCmUfIslwNAOl0uouIziYSiZP19fVdF5O/CyogIYw5kiTdwszXArgawGQHsk8AHCGid03TfDORSOy7kEIbdAHF43F/X1/fYiJaAmAuAM8Am0wB2ENE2xRF2blgwYLuATNZBIMmoLa2tsmpVOpRIvoRgOqs4j4A7zDzUSI6SkSfAThrmmYXAEiSVA1gBDNPZOapRDQVwHUAhmW108'+
	'XMWz0ez/ra2tpPBuM+Ki6g1tbWcZIkPQngfgDejKIPAAQB7K6urn573rx5iVLabW9v93V1dX0PwHwA9wD4dkZxEsCrpmk+uXDhwhMDuoEsVExAwWBQrqqqeoiZm4noMnE5CWAbM7+saVonEXEl+mJm0nV9JhE9CGApxINg5q+JqKG3t3dLfX19uhJ9VURA0Wj0m6Zp/gHADeJSkpk3EdHTmqZ9Wok+CkHX9UnMvIaIVuDciD0gSdIP6urq/jnQ9gcsIF3XNQDbAIwCAGaOEdEqTdM+HGjbpSAajV5lmuavASwQl04DWKppmj6QdgckoEgkspqZnxWnPUS0oq6ubnulXqVSwcwUjUaXMPMmAMPF5dWapv2q3DbLEhAzUyQSaQbwmLh0JJ1O37lo0aL3y2WkkmhpaZkmy/LrsPQsMPM6TdOeKOfBlSWgcDjcTESPAwAR'+
	'7Qegqap6upy2BguRSGQUAJ2ZbwIAImpWVfWJUtuRyuh4tS0cALt6enpuvdSEAwCqqp42TfM2ALsAgJkbdF1/uNR2ShpBYkIOA9bIMU3ztkAg0FNqp9kIBoPyyJEjx6ZSqYkA4PF4Pjtz5swXlViqw+HwcEmS3rBHEoBAKRO3awGJpfwdWKvVESK6sdyREwwGq4cPH347gDuY+fsAJiB3NJsAPieivwLY2dPTs6tcGywSiYxi5rdgzUmnmfnaQCDwLze0rgQklMB9sPScnnQ6PaucCVksxU8BWIRcs8EJfQBaJElaW1dX90GpfYuJuwPW6nagt7d3jpsR6kpAuq6vBPACABDRD1VV3VYKc6FQaKzX621k5mUA5Iyi40QUA3CMmY8z8+eijwlENB7AFGauATA+gyYF4CVZlptqa2tPlsJHJBJZysy/AwBmXhkIBDY50T'+
	'gKqLW1dZwwKC9j5pimabWlLJetra23SpIUBPANcakLwGYAOzo7OzubmprMYvSNjY3SzJkzZwK4C8BynDN8TxNRvaqqf3HLi1BPdsFSJr8yDGPq4sWLvyhG4yggXdc3A3gIll013a2GLJhZCeA5WKMmCWCzLMvNpT55G6FQaKyiKI8DWAFAAZAG8LCmaS+6bUO85ocF/RZN05YXq19UQG1tbZPT6fRHALzM/FwgEPiZGyaEcJ4G8Ii4dIyIFqqqetgNvRMikch0Zm4FMEX0tzEQCKxxSx8Oh58lotWwHtqUYvZiUT0olUo9CssATDLzBrcMRCKRFRDCYeZ2wzBmV0o4AKCq6mHDMGYD2AMARPTzcDi8wi09ET0NSzheAI8WrVuoIB6P+5PJ5HFY7/zLmqb9xE3nYs7ZBUBm5vaJEycumDlzpuGW+VIQDAa9VVVVcVie'+
	'yjQR1bidk3Rd/w2ABwGc9Xq9Ewp5JguOoL6+vsUQEyIzv+ym01AoNFZMyDKAY6lU6u7BEg4A1NfXJ5n5bgD/gPVAgm1tbVe4JH9F/I8wDOOOQpUKCkj4kAHgA03TOt30qCjKWlirVZKIFi5evPjfLpktG4FA4BQRBQAYAEal0+m1buhUVe0AYC84SwrVyyugYDBYDWvYAkDQzbIejUavArBMnG6u5JzjBNHXZnH6kOClKIiIiSgIAMw8Nx6P+/PVyxth8Pl8czLKdrthUmjIHgBdsiw3u6HJRCgUutzr9U4FgGQyebTU0WcYRrOiKPcDqBa83OuCbDeABgBKKpWaAyCWXSHvCJIk6RZx2FddXf22Uy+tra0jYJkPALC5FD0nEolM13V9j6Iop5h5PzPvVxTllK7reyKRyHS37QiFzx5Fi8RbUBR+v/8ALBMGzDw/X5'+
	'28AhJBPQB4x030QZblGpyzrXY41QcsDTkcDq9h5kMAbs5T5WZmPhQOh9c0Nja6cstIkvS6OBxWVVVV41R/3rx5CWZ+V5xek7fNArS2J+6oG8YA2KvA8c7OTlcT+owZMx4hog2wdJETzLwO1mtxrzg+AcBLRBtmzZrlSkE9ePBgh6DL5KkoiOgoADDz1fnKcwQkhubkTGInCJcFiCjmZFsB1mtFRPY81aYoyrRAINCgadprmqa9FggEGhRFmQagTbS/zs3r1tTUZDKzPY/kG5U5yLjHK/O9ljkC8vl8/XqEiHgWRTAYlGH5cwDgmBummPkFiJGjKMp9NTU1X2bXqamp+VJRlPsgRpKgcQObh/GCNyf0mxmKoozJLswREDOPyDg969T6yJEjx9rtMPNxp/qhUOhyiKfLzL/NJxwbouxVcXqzoC0KSZJsHmS/3++oNNrh'+
	'bgDwer0jsstzBGSnoGQTF4LtJgUA259TDPZSDgBE9Den+gDesw8URXHUbzJ5YOZJTvUlSeq/x6zBYZW7YPD/GjkCSqfT/RIVWRZF4fF4+ucpIppQrC5gKYH2MTN/1wWP/cuvYRiOrtZMHojIMextmmb/PRJRzpSSI6CsSjlDLhtnzpz5ApaDHcJNWhRCQ94r6v84FouNLlRXzDn3i9O9brRr0zRtHtLd3d2OCmvmIEgmk84CSiQS/Y0y88Ts8mwIx7f93k9xqg8ARPRTWP6YcYZh/D6fkGKx2GhFUbYDGAegj5lXumk7g4fjLsNG/fOUYRinsgtzBCRCK58AADNPzS7PBxGaATPXuNF6VVU9zMwN4rTWMIz3dV1fp+v6PeK3zjCM9wHUivYbAoHA353abWxslIjI1qD3uuE94x4/zhdWKnQzRwRjrgQEYKf4Hy8c7I'+
	'44dOjQM0S0BmIkwYrz/1H8HhPXkkS0pqOj49nCLZ3D7NmzZwm6TJ6KwhYQER3JV55XQERk2yfXtbe3+5w66enp2QVh9MGKPjiiqanJVFV1IxHNQP6nvZeIZqiqutGNdg4ApmneKQ77ent7cyzzbLS3t/uIyLY738tXJ6+ATNN8UxwOE2lvRSGGZos4XV6CVw+qqh7WNG2uYRhjANwI4EbDMMZomja3FJ9SKBQaCyssBAAtbqKw3d3dN0AY2USU162T1x+USCT2VVVVpUT5fAjneDFIkrRWPMHqdDrdAGC1E00mxAp1oBSaTCiK0gDLRZwC8EuXZLaLw/B4PPvyVcg7goT099inzOwYPxPh4JfE6fJSfDkDhejLHj1b3MTumJmYuR4AiGhPyU57Zt4uDq/Sdd3VxCvLchOs1DcvM7e6sZ0GinA4PIaZw7ACgadlWX7K'+
	'DV0kEpmFc5my2wvVKyigYcOGhWCFiSGySR1RW1t7kojqYUU8pyiKsiMYDHqd6MpFMBj0EtGfAHwLVtinvgRv5gPi/6yiKAVXvIICWrBgQTczbxWnS3VddzT8AEDEpexEpbk+ny82GCMpHA6PyYiJgZlXlRATmwQrfRgAthbL1i+q1Hk8nvUQEUhmdh3aVVV1E4BnAICI5imK0lHJOUk43A7inHA2usnUsCHuxQvr3tYXqztoyQuCdiWAX8EKJBoANhuG0eyUUVEIInmhAdaErABIM/OqUoRTavKCo1lgmuaTzPw1LIk/72ZFs6Fp2otC9T8tGFqlKMpHuq6vj0aj17sxSxobG6VoNHq9ruvrFUX5CMAq0dZpIqopceSQaZrPC/qvDMNodKK5YAlUIuq6DOfrXieED/mYJEnnJVAJq3yKEPC4DJoUgC2yLD91SSRQAf'+
	'8bKXjhcPg7RNQBoAqVTsEDKp/EKeJWd8DyT4/H+al5gKUqHIdlp+3s7e2NlZvEGYvFRhuGsR+DlcRpYzDTgP1+/xW2D5mIPu3u7j5ZqTRgIvozLDsPGKw0YBtZ+zN2MfNdlRDSYEAIZweA28WlkvdtlOy0V1X1ORH5BIDbJUl6Q6T9X1KIxWKjJUl6A0I4RNRczqaWsqIamqY9YQuJmW9i5rdaWlqmldPWYKClpWWaYRj7M/dp1NXVubXwz8PQdigHVHxDHYC4JEmrylmKBwKhQjwP4DZx6eJvqLNxiWzJXAlLQwaAA8x8r9ulvBgquqnX5/MtA7Aue1MvgFdUVe2o5KZe4c95ABmbegF8xcwNiUTipUtqU28mhFnRhNxt4R+KnMDdfr//QDnbwoUPeb7wBOZsCzcMo7FcQ7gQBvXDAul0+hewBJXzYQFmflfsATkK'+
	'4FPTNLvsRALTNKtFxHMSM08VHxe4FrnmyVkAW2VZ3vBf82GBbMTjcb/IQ17CzHNxbp4oFwYR7WHmbcy8c7CV1Av6cZN4PO5PpVJzRMLkNSLt7UoHso9FUO89Itrt8Xj2Dfb3OjJxSXweR1GUMV6vd4Sdn0NEZ5PJ5FnDME5d7M/jDGEIQxjCxcR/APw2Y0g8DjyJAAAAAElFTkSuQmCC');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_node_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 36;
		el.userData.height = 36;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_node_icon.material) me._ht_node_icon.material.opacity = v;
			me._ht_node_icon.visible = (v>0 && me._ht_node_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_node_icon.visible
			let parentEl = me._ht_node_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_icon.userData.opacity = v;
			v = v * me._ht_node_icon.userData.parentOpacity;
			me._ht_node_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_icon.children.length; i++) {
				let child = me._ht_node_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_icon.userData.parentOpacity = v;
			v = v * me._ht_node_icon.userData.opacity
			me._ht_node_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_icon.children.length; i++) {
				let child = me._ht_node_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_icon = el;
		el.userData.ggId="ht_node_icon";
		me._ht_node_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node_bg.add(me._ht_node_icon);
		width = 1.5;
		height = 1.5;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.2, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.2, (height / 2.0));
		roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.2);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.2, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.2);
		roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.2, (height / 2.0));
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_node_image_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		loader = new THREE.TextureLoader();
		el.userData.ggNodeId=nodeId;
		texture = loader.load(basePath + 'images_vr/ht_node_image_' + nodeId + '.png');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_node_image_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.30, 0.30, 1.0);
		el.userData.width = 150;
		el.userData.height = 150;
		el.userData.scale = {x: 0.30, y: 0.30, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_image';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_node_image.material) me._ht_node_image.material.opacity = v;
			me._ht_node_image.visible = (v>0 && me._ht_node_image.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_node_image.visible
			let parentEl = me._ht_node_image.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_image.userData.opacity = v;
			v = v * me._ht_node_image.userData.parentOpacity;
			me._ht_node_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_image.children.length; i++) {
				let child = me._ht_node_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_image.userData.parentOpacity = v;
			v = v * me._ht_node_image.userData.opacity
			me._ht_node_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_image.children.length; i++) {
				let child = me._ht_node_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_image = el;
		el.userData.ggId="ht_node_image";
		me._ht_node_image.userData.ggIsActive=function() {
			return player.getCurrentNode()==this.userData.ggElementNodeId();
		}
		el.userData.ggElementNodeId=function() {
			return this.userData.ggNodeId;
		}
		me._ht_node_image.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_node_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_node_image.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_node_image.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_node_image.ggCurrentLogicStateScaling == 0) {
					me._ht_node_image.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_node_image.userData.transitions.length; i++) {
						if (me._ht_node_image.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_node_image.userData.transitions[i].interval);
							me._ht_node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_node_image.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_node_image.scale.set(transition_scale.startScale.x + (me._ht_node_image.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_node_image.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_node_image.position.x = (me._ht_node_image.position.x - me._ht_node_image.userData.curScaleOffX) + scaleOffX;
						me._ht_node_image.userData.curScaleOffX = scaleOffX;
						me._ht_node_image.position.y = (me._ht_node_image.position.y - me._ht_node_image.userData.curScaleOffY) + scaleOffY;
						me._ht_node_image.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_node_image.userData.transitions.splice(me._ht_node_image.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_node_image.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_node_image.userData.transitionValue_scale = {x: 0.3, y: 0.3, z: 1.0};
					for (var i = 0; i < me._ht_node_image.userData.transitions.length; i++) {
						if (me._ht_node_image.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_node_image.userData.transitions[i].interval);
							me._ht_node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_node_image.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_node_image.scale.set(transition_scale.startScale.x + (me._ht_node_image.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_node_image.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_node_image.position.x = (me._ht_node_image.position.x - me._ht_node_image.userData.curScaleOffX) + scaleOffX;
						me._ht_node_image.userData.curScaleOffX = scaleOffX;
						me._ht_node_image.position.y = (me._ht_node_image.position.y - me._ht_node_image.userData.curScaleOffY) + scaleOffY;
						me._ht_node_image.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_node_image.userData.transitions.splice(me._ht_node_image.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_node_image.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_node_image.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node_bg'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_node_image.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_node_image.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_node_image.ggCurrentLogicStateAlpha == 0) {
					me._ht_node_image.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_node_image.userData.transitions.length; i++) {
						if (me._ht_node_image.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_node_image.userData.transitions[i].interval);
							me._ht_node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_node_image.material ? me._ht_node_image.material.opacity : me._ht_node_image.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_node_image.userData.setOpacity(transition_alpha.startAlpha + (me._ht_node_image.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_node_image.userData.transitions.splice(me._ht_node_image.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_node_image.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_node_image.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_node_image.userData.transitions.length; i++) {
						if (me._ht_node_image.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_node_image.userData.transitions[i].interval);
							me._ht_node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_node_image.material ? me._ht_node_image.material.opacity : me._ht_node_image.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_node_image.userData.setOpacity(transition_alpha.startAlpha + (me._ht_node_image.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_node_image.userData.transitions.splice(me._ht_node_image.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_node_image.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_node_image.userData.onclick=function (e) {
			player.openNext(player._(me.hotspot.url),player._(me.hotspot.target));
		}
		me._ht_node_image.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 1.5;
		height = 0.51;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.2, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_node_title_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_node_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_node_title.material.opacity = v;
			if (me._ht_node_title.userData.hasScrollbar) {
				me._ht_node_title.userData.scrollbar.material.opacity = v;
				me._ht_node_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_node_title.userData.ggSubElement) {
				me._ht_node_title.userData.ggSubElement.material.opacity = v
				me._ht_node_title.userData.ggSubElement.visible = (v>0 && me._ht_node_title.userData.visible);
			}
			me._ht_node_title.visible = (v>0 && me._ht_node_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_node_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_node_title.userData.backgroundColorAlpha = v;
			me._ht_node_title.userData.setOpacity(me._ht_node_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.495);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 150;
		el.userData.height = 51;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_title';
		el.userData.x = 0;
		el.userData.y = -0.495;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_node_title.visible
			let parentEl = me._ht_node_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_title.userData.opacity = v;
			v = v * me._ht_node_title.userData.parentOpacity;
			me._ht_node_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_title.children.length; i++) {
				let child = me._ht_node_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_title.userData.parentOpacity = v;
			v = v * me._ht_node_title.userData.opacity
			me._ht_node_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_title.children.length; i++) {
				let child = me._ht_node_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0, 0, 0);
		el.userData.textColor = new THREE.Color(0.701961, 0.701961, 0.701961);
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 150;
		canvas.height = 51;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_node_title.userData.totalHeight = 18;
			me._ht_node_title.userData.textLines = [];
			var ctx = me._ht_node_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_node_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_node_title.userData.textLines.push(line);
					line = '';
					me._ht_node_title.userData.totalHeight += me._ht_node_title.userData.lineHeight;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (me._ht_node_title.userData.width - 10 - (scrollbar ? 25 : 0)) && i > 0) {
					me._ht_node_title.userData.textLines.push(line);
					line = words[i];
					me._ht_node_title.userData.totalHeight += me._ht_node_title.userData.lineHeight;
				} else {
					line = testLine;
				}
			}
			me._ht_node_title.userData.textLines.push(line);
			me._ht_node_title.userData.totalHeight += me._ht_node_title.userData.lineHeight;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_node_title.userData.textCanvas;
			var ctx = me._ht_node_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_node_title.userData.backgroundColor.r * 255 + ', ' + me._ht_node_title.userData.backgroundColor.g * 255 + ', ' + me._ht_node_title.userData.backgroundColor.b * 255 + ', ' + me._ht_node_title.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_node_title.userData.textColor.r * 255 + ', ' + me._ht_node_title.userData.textColor.g * 255 + ', ' + me._ht_node_title.userData.textColor.b * 255 + ', ' + me._ht_node_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_node_title.userData.boxWidth - (me._ht_node_title.userData.hasScrollbar ? 25 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 13;
			y += (canv.height - me._ht_node_title.userData.totalHeight - 5) / 2;
			for (var i = 0; i < me._ht_node_title.userData.textLines.length; i++) {
				ctx.fillText(me._ht_node_title.userData.textLines[i], x, y);
				y += me._ht_node_title.userData.lineHeight;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_node_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.encoding = THREE.sRGBEncoding;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_node_title.material.map) {
				me._ht_node_title.material.map.dispose();
			}
			me._ht_node_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._ht_node_title.remove(...me._ht_node_title.children);
			var canv = me._ht_node_title.userData.textCanvas;
			var ctx = me._ht_node_title.userData.textCanvasContext;
			ctx.font = '20px Verdana';
			me._ht_node_title.userData.lineHeight = 20 * 1.2;
			me._ht_node_title.userData.ggWrapText(false);
			me._ht_node_title.userData.boxWidth = me._ht_node_title.userData.width;
			me._ht_node_title.userData.boxHeight = me._ht_node_title.userData.height;
			me._ht_node_title.userData.hasScrollbar = false;
			canv.width = me._ht_node_title.userData.boxWidth;
			canv.height = me._ht_node_title.userData.boxHeight;
			ctx.font = '20px Verdana';
			me._ht_node_title.userData.ggPaintCanvasText();
		}
		me._ht_node_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_node_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_node_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_node_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_node_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_node_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_node_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_node_title";
		me._ht_node_title.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player._(me.hotspot.title) == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_title.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_title.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_node_title.ggCurrentLogicStateVisible == 0) {
			me._ht_node_title.visible=false;
			me._ht_node_title.userData.visible=false;
				}
				else {
			me._ht_node_title.visible=((!me._ht_node_title.material && Number(me._ht_node_title.userData.opacity>0)) || Number(me._ht_node_title.material.opacity)>0)?true:false;
			me._ht_node_title.userData.visible=true;
				}
			}
		}
		me._ht_node_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node_image.add(me._ht_node_title);
		me._ht_node_bg.add(me._ht_node_image);
		me._ht_node.add(me._ht_node_bg);
		me._ht_node.userData.setOpacity(1.00);
		me._ht_node_bg.userData.setOpacity(1.00);
		me._ht_node_icon.userData.setOpacity(1.00);
		me._ht_node_image.userData.setOpacity(0.00);
		me._ht_node_title.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_node_title.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_node_title.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_node_title.logicBlock_visible();
			};
			me.__obj = me._ht_node;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='ht_node') {
			hotspot.skinid = 'ht_node';
			hsinst = new SkinHotspotClass_ht_node(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_image') {
			hotspot.skinid = 'ht_image';
			hsinst = new SkinHotspotClass_ht_image(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_info') {
			hotspot.skinid = 'ht_info';
			hsinst = new SkinHotspotClass_ht_info(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_video_file') {
			hotspot.skinid = 'ht_video_file';
			hsinst = new SkinHotspotClass_ht_video_file(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_video_url') {
			hotspot.skinid = 'ht_video_url';
			hsinst = new SkinHotspotClass_ht_video_url(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		}
		return (hsinst ? hsinst.__obj : null);
	}
	me.removeSkinHotspots=function() {
		hotspotTemplates = [];
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
	if (!player.isInVR()) return;
		me.ggCurrentTime=new Date().getTime();
		me._page_up_bg.userData.ggUpdateConditionTimer();
		me._page_down_bg.userData.ggUpdateConditionTimer();
	};
	player.addListener('timer', me.skinTimerEvent);
	player.addListener('entervr', function() { me.addSkin(); player.triggerEvent('changenode'); });
	player.addListener('exitvr', function() { me.removeSkin(); });
	me.skinTimerEvent();
};