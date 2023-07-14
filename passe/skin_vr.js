// Garden Gnome Software - VR - Skin
// Pano2VR 7.0.4a/19987
// Filename: feather_vr.ggsk
// Generated 2023-07-14T09:17:11

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
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAABjUlEQVR4nO3bIW4DMRCF4X+t3iGwOJF8iNCSkl6s9ygpKQ0uXinBhbmEXbKRwhNp5o3ez9bE1ietycjgnHPOOeecc84555xzzjlXriVq4/P5/DrnfF+W5ftwOPxFnePZtaiN55w/wOec83dd133UOZ5dGOhdu9baqQpqGOgY4wO4bp9lUMPuUIB1XfettROw25auY4xj7/0Sea5HCgWFeqjhoFALNQUo1EFNAwo1UFOBgj5qOlDQRk0JCrqoaUFBEzU1KOihpgcFLVQJUNBBlQEFDVQpUMiPKgcKuVElQSEvqiwo5ESVBoV8qBlmSg/Ve7+MMY53S7vW2lfUeeRBsyUPevfL37puA8CQpO/QbPcnCINmxARR0KyYIAiaGRPEQLNjghCoAiaIgKpggg'+
	'CoEiYkB1XDhMSgipiQFFQVExKCKmNCMlB1TEgEWgETkoBWwYQEoJUwwY8Wnl4YaEVMCByBbIO0UpiQY6ZUBhPgJWrjZVnebo9ne+9lHs8655xzzjnnnHPOOeecc84V7B9SvYCqgXEVXwAAAABJRU5ErkJggg==');
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
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAABjklEQVR4nO3ZMU7DQBRF0Tsj9uCS2kGuqdPS0LAHSjZGwwqyiJGSmjKb8FAQEYrQGf3/Ru9uwE+nsC19cM4555xzzjnnnHPOOeecG64SPWDLjsfjfe/9uZTysdvtPiM23EU89D9qrc299wMw9d5fgYeIHTXioVvXWptrrQdgit4iD3oD87yu60vUHul36B+Y+2VZTlGbZEEzYoIoaFZMEATNjAlioNkxQQhUARNEQFUwQQBUCROSg6phQmJQRUxICqqKCQlBlTEhGag6JiQCHQETkoCOggkJQEfChGDQ0TAhEHRETAg8gdRa3/l1AxoBEwa4KWUrDPRySDv/DKn10Fqbo/ZslT9KG+ffpo0LB4WxUFOAwjioaUBhDNRUoKCPmg4UtFFTgoIualpQ0E'+
	'RNDQp6qOlBQQtVAhR0UGVAQQNVChTyo8qBQm5USVDIiyoLCjlRpUEhH6r8TWlZltO6rnuu55TpcgAMSR4UbqKGNQQofKOWUh6Bt1LKU/Qe55xzzjnnnHPOOeecc865gfoCgYJ8odsg7Q0AAAAASUVORK5CYII=');
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
		el.userData.textColor = new THREE.Color(0.835294, 0.835294, 0.835294);
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
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAERklEQVR4nO2bT2gcVRzHv7/3ZjcshYAeDBIvPUw2Oxuz0AbaepKCJ0GxePEgGo3mLhJovbcUKXg1WtNcvIgWxVuhPTZCLEw2O7vbOYiHRfRQIVCW7M6bn4fMJJPt7hpmd7ab2fc5vfebP7/ffnnznWH2N4BGo9FoNBqNRqPRaDRjBvXbaNv2S1JKk5kzoyqoF0TUVkq5pVLpn5Hm7Rbc3d19i4iuAbgwymJOyG/MfH1hYeGXUSQ7JtD29nYml8t9DWB5FMkHZKPZbK4uLS21k0xiRCdRcZi5AeCOEKKslPo7ySJOgpRyxvf9VwF8SESzAJZzuRwAfJRk3sMVFFxWPwfTH7LZ7IppmntJJo+D67rTrVbrNoB3AYCZ307ychPhIPAcMHNjXMUBANM097'+
	'LZ7MfBCgcRXU0ynwAO7lY4MuQ74ypOiGmae0S0GUwvBvUPhVqtdrZWq50N5wIApJTmYUCI8rCSJQkR7YTjaP1xYWbhOM6aUqqulKqHIolg4+FzzjgY8kmI1jnoc5pt2684jnOPmW8CyADIKKVeAzruYpNIuVy+IoT4FsAL0bjv+w1gggWybfuMlPIrIlqJhB8DmIvuN5ECVavV877vf48jMZ4Q0YpS6l8hxIPovuLZw9NLaMS+7z/EkTj3DcNYtCzrbrdjJmYFBUa8CeByEGoT0ReFQuEWEfm9jpsIgboY8WMies+yrEf/d2yqBephxOue531WKpWenuQcqRWolxH38ppepM6k4xhxP1K1guIacT9SI9AgRtyPVFxiRPS5EOJHHImz7nneuUHFAVKygojozWAYy4j7cWoFIqKXO0IPDMN4P5/PN4aZJxWXGAAQUd+/'+
	'sOJyagVi5r865q97nrfjOM47w8xzagWKQkS/BsMXmfknx3HWbds+M4xzp0IgpdQtIroC4AkAMPMnhmE8qlar5wc9dyoEAgDLsu4ahrEI4H4QmvN9/6HjOGvMHPt3pkYgAMjn8w3Lst4gojUAbQAZZr7pOM69er0+G+ecqRIIAIjItyzrSyHEJRy8QgWAy3ENPHUChRQKhd89zztHRN8EoVgGnlqBAKBUKj21LOvTQQw81QKFDGLgEyEQEN/AJ0YgIJ6BT5RAIb0MXAix3rnvRAoEdDdwAM80QUysQCFdDPwYAjjoIA0DUsqZEdU2ENE6o/XHoYuBtzOZzJ9AIJBSyg13DvoAxx5mXgzH0frjEjHwOSllfn5+/g8g0qNYqVS2AFxg5sbU1JQ1zl1mrutO7+/vO0Ez51axWLyUVK5DD2Lm6wBARLOtVuu267rTSSUdhL'+
	'CJMxAHzHwjyXzHXlNWKpXvEGkDJqJNItoZh64zKeUMMy8y8wehOAA2isViom3Ax17aN5vN1aD3eDko4hozQ4jnf7NjZgBA5NXzRrPZXE06b79PEa4CuJh0ATHYYuYbz+VThE70xywajUaj0Wg0Go1Go9GMIf8BQKH7gohvlMgAAAAASUVORK5CYII=');
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
		el.userData.textColor = new THREE.Color(0.835294, 0.835294, 0.835294);
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
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABk0lEQVR4nO3bXU7CUBBA4VO3A5vAXcECcFe4idv11Jc2IQREnfszhvO9mBDTzj0gxbaAJEmSJEmSJEn/TinlUEo5jJ7jkRbzvdXaUCnlME3TZZqmyzzPx1rbrWWe5+M2X82I1QLeOGeKuM5ybrHtagH3+/0ncLp6KEXEO/FO66xVTLU2tLk38G63+6i9nyyzVA8IOSL2mqFJQBgbsee+mwWEMRF777NpQOi7oBFPWPOA0Gdho94yugSEtgsc+X7bLSC0WejoI37XgFB3waPjwYCAUGfhGeLBoIAQC5AlHgwMCH8LkSkeDA4IvwuSLR4kCAg/C5MxHiQJCN8HyhoPEgWE+6HWnynjQbKA8PTscap4kDAgPIyYLh60uybyMtK9Av0TDvAgEuDHmAA/SA'+
	'f4r1yAJxMCPJ0V4AnVAE/pB3hRKcDLmgFeWA/w1o4Aby4K8Pa2gNFHxp4zeItvUNWAmeJtWs9ULeD2PZGrh4bH29xGXJblvdad+q2uiaSJB7DOcnr6i6O94le9JEmSJEmSJEnq4wuSLpcL38DFjAAAAABJRU5ErkJggg==');
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
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAERklEQVR4nO2bT2gcVRzHv7/3ZjcshYAeDBIvPUw2Oxuz0AbaepKCJ0GxePEgGo3mLhJovbcUKXg1WtNcvIgWxVuhPTZCLEw2O7vbOYiHRfRQIVCW7M6bn4fMJJPt7hpmd7ab2fc5vfebP7/ffnnznWH2N4BGo9FoNBqNRqPRaDRjBvXbaNv2S1JKk5kzoyqoF0TUVkq5pVLpn5Hm7Rbc3d19i4iuAbgwymJOyG/MfH1hYeGXUSQ7JtD29nYml8t9DWB5FMkHZKPZbK4uLS21k0xiRCdRcZi5AeCOEKKslPo7ySJOgpRyxvf9VwF8SESzAJZzuRwAfJRk3sMVFFxWPwfTH7LZ7IppmntJJo+D67rTrVbrNoB3AYCZ307ychPhIPAcMHNjXMUBANM097'+
	'LZ7MfBCgcRXU0ynwAO7lY4MuQ74ypOiGmae0S0GUwvBvUPhVqtdrZWq50N5wIApJTmYUCI8rCSJQkR7YTjaP1xYWbhOM6aUqqulKqHIolg4+FzzjgY8kmI1jnoc5pt2684jnOPmW8CyADIKKVeAzruYpNIuVy+IoT4FsAL0bjv+w1gggWybfuMlPIrIlqJhB8DmIvuN5ECVavV877vf48jMZ4Q0YpS6l8hxIPovuLZw9NLaMS+7z/EkTj3DcNYtCzrbrdjJmYFBUa8CeByEGoT0ReFQuEWEfm9jpsIgboY8WMies+yrEf/d2yqBephxOue531WKpWenuQcqRWolxH38ppepM6k4xhxP1K1guIacT9SI9AgRtyPVFxiRPS5EOJHHImz7nneuUHFAVKygojozWAYy4j7cWoFIqKXO0IPDMN4P5/PN4aZJxWXGAAQUd+/'+
	'sOJyagVi5r865q97nrfjOM47w8xzagWKQkS/BsMXmfknx3HWbds+M4xzp0IgpdQtIroC4AkAMPMnhmE8qlar5wc9dyoEAgDLsu4ahrEI4H4QmvN9/6HjOGvMHPt3pkYgAMjn8w3Lst4gojUAbQAZZr7pOM69er0+G+ecqRIIAIjItyzrSyHEJRy8QgWAy3ENPHUChRQKhd89zztHRN8EoVgGnlqBAKBUKj21LOvTQQw81QKFDGLgEyEQEN/AJ0YgIJ6BT5RAIb0MXAix3rnvRAoEdDdwAM80QUysQCFdDPwYAjjoIA0DUsqZEdU2ENE6o/XHoYuBtzOZzJ9AIJBSyg13DvoAxx5mXgzH0frjEjHwOSllfn5+/g8g0qNYqVS2AFxg5sbU1JQ1zl1mrutO7+/vO0Ez51axWLyUVK5DD2Lm6wBARLOtVuu267rTSSUdhL'+
	'CJMxAHzHwjyXzHXlNWKpXvEGkDJqJNItoZh64zKeUMMy8y8wehOAA2isViom3Ax17aN5vN1aD3eDko4hozQ4jnf7NjZgBA5NXzRrPZXE06b79PEa4CuJh0ATHYYuYbz+VThE70xywajUaj0Wg0Go1Go9GMIf8BQKH7gohvlMgAAAAASUVORK5CYII=');
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
		el.userData.textColor = new THREE.Color(0.835294, 0.835294, 0.835294);
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
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABk0lEQVR4nO3bXU7CUBBA4VO3A5vAXcECcFe4idv11Jc2IQREnfszhvO9mBDTzj0gxbaAJEmSJEmSJEn/TinlUEo5jJ7jkRbzvdXaUCnlME3TZZqmyzzPx1rbrWWe5+M2X82I1QLeOGeKuM5ybrHtagH3+/0ncLp6KEXEO/FO66xVTLU2tLk38G63+6i9nyyzVA8IOSL2mqFJQBgbsee+mwWEMRF777NpQOi7oBFPWPOA0Gdho94yugSEtgsc+X7bLSC0WejoI37XgFB3waPjwYCAUGfhGeLBoIAQC5AlHgwMCH8LkSkeDA4IvwuSLR4kCAg/C5MxHiQJCN8HyhoPEgWE+6HWnynjQbKA8PTscap4kDAgPIyYLh60uybyMtK9Av0TDvAgEuDHmAA/SA'+
	'f4r1yAJxMCPJ0V4AnVAE/pB3hRKcDLmgFeWA/w1o4Aby4K8Pa2gNFHxp4zeItvUNWAmeJtWs9ULeD2PZGrh4bH29xGXJblvdad+q2uiaSJB7DOcnr6i6O94le9JEmSJEmSJEnq4wuSLpcL38DFjAAAAABJRU5ErkJggg==');
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
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAIl0lEQVR4nO2bb2xbVxnGn/fas9tmSdbSFCZUpLaExvZ1wtqMDuimFgFl65i60i7VugnQtIkxIY0hMT4AqrQKVTBN0yTGf00gEE2purWrpnV/cKciFVjU4eTe64Q0i0QHRVnXrkvtOE7uefjg4+KF1b7XdmIz+ffl3nN93ve8fnzOPfee8xpo0qRJkyZNmrxPkXoHUGBsbKx9ZmZmmVJqqYi0KqVWA7hE8kQsFpsQEVWPuOoiUCKRCHZ0dNxoGMYWkh8H0APgQyVMpgEMkhwQkWOhUOj5zs7O6YWIdUEFchznBgBfI/lFAMuqcHVBRA6KyO+6urpOzGfvmneBSEoqlbqD5DcBbJjzmSsiloj8jeSQiEwopS4CuARgDfIihkRkLYCPAYgAuHpOE68D+E'+
	'40Gj0oIqx1/PMqUCqVWk/yCZKfKro8A+AIgKdd132uu7v7gld/lmWFDMP4rFJql4hsA9Ba9PEJEXkwGo2eqlH4AOZJoGQy2RIMBh8DcG9RG+dE5CdKqSdN0/x3tW2Mj48vSqfTt4rIHgAxfZkkf+W67oM9PT3patsA5kGgwcHB1YZhPCMicX0pB+CxQCDwg66urslat5dIJIIrVqy4h+QjItKhL58KBoO3rV279p/V+q+pQI7jfI5kP4Cl+tIxpdQD8Xh8rJbtvBejo6NtuVxuL4Bv6EtnlVK3xePxgWr81kwgy7K2iMizAK5CvqvvicViexf6+cWyrK+IyM91HFmSfaZpHqnUX00Esm37RpLHRGQxgEsi0heNRp+rhe9KsCxro4g8DWA58iLdZJrmq5X4qlog27ZjAE4CaCU5FQgEbo5EIq9U67daLMv6qIicRF6k'+
	's8Fg8PpK7klGNUGMj48vArAf+ek2R3JbI4gDAKZpniZ5O/KPFdfOzs4eSSaTLX79VCVQOp3eB8AEABF5IB6Pv1CNv1pjmuafSN6ni+sCgcDjfn1UPMQsy9osIn8EABE5FIlEdszHk2wtsG37CeRnN4pIr5+HyYp6EEkxDOOHunhWRO5rVHEAIBQKfZfkmwCE5OMkPXeMigRKpVLbSPYCAMk9kUjkrUr8LBSdnZ3viMj3dfFGx3F2eLX1LRBJg+ReXXw9m80+5ddHPZiYmPglAEcX95H09N19C+Q4zqcBRAGA5CO9vb0zfn3Ug82bN88C2KOLq1Op1EYvdpUMsbv08VJ7e3t/BfZ1o62t7SiASQAguduLjS+BRkdHwwDu0A0cWrly5ZTfIOuJjvewLu60LCtUzsaXQDMzMzcBuEYXf+8vvMZARPbr06UicnO5+r4EUk'+
	'rdUDh1XfeE3+AaAaXUi8ivWILklnL1/d6DNmjHdq0WpBYa0zRzIjIMACKyvlx9vwJ9Qjuu6M24USD5d33aXW669yzQmTNnFhdW7ERkpIr46g7JQvyLLMvqKFXXs0CZTKZ4m+Z8JYE1CoZhFP/AK0vW9epUKbWs6NzzTkSDUvwDz91GeheeBXJdt/2ykWG8U0FQDYNSyi2cB4PBki/ZngUSkcuzllJqcWWhNQYicnk/jWTJnRbPAhmGcaHo/JpSdRsdEbk8GmZnZ98uVddPDype0iiVaNDwkLw8cxmGURuB9KbfG7qBeJnqjU5hJ/ZcLBYrOeH4elAkmdSn11USVaNQtOs7WG4l1O+T9Gv6GBkZGVnuO7IGYGBgYElhBIhIslx9vwIdK9i5rnuL3+AagXA4/BkAYV18uVx9XwLFYrGTevEbSqlt/sOrP4ZhbNWn2Uwm'+
	'kyhb349zEXGRz+2BiNzqOM61/kOsH3qjs7Dg93Jvb2+mnE0lS64/08erANxfgX3dSKfT26FT/0Tk115sfAukkwAuAADJ+xOJRNCvj3qg9/Ie1sVzJA+XNNBU+uVy+hjYtGlTw24YFuM4zm4A3br4C9M0c6XqF/Ddg4aHh1vx33XpZ/R9qaEZGxtrB/CoLp4NhUL7vNr6FkgptRV6mhSRg37t68H09PSPAHwQAETkoc7OTs+rEb6HGMkd+niR5Et+7Rcax3HuIXmvLr4UiUR87eX56kHJZLKFZOEB8bDXcVwvbNveQPJJXXyD5N1+kyx8CRQMBm/RaXYA0NDDy3GcdQCOAggByCqlbq8k/djvPaiQFTHZ0tLyot/GFgrLsjaSTCCffkcR+Wql2a6eBRoYGFgCoPCY/uyqVauylTQ439i2fReAFwC0IZ9+1xeNRveXtr'+
	'oynm/S4XD4CwBagMacvcbGxtqz2eyPAewWEQDIkNxumuaxMqYl8dyDAoFAYXilW1tbn/fTCEnxkihQCSQDlmV9OZvNDgLYra+NANhYrTiAxxzF8fHxRZlM5k0AV5PsN01zVzkbkmLbdq+I7ALwkL6cJHmnaZpOKVsvjI6Ohqenp7frzLGuoo9+OjU19S0vL6Je8DTE0un050WksH90xeGlRekWkT7HcfpEZPWcKj0iYtu2nSB5iOTheDx+xmuw+g8snwRwZy6X2yEixZsHSZIP16LXFOOpB1mW9RsRuZvklOu6HXMTF4aGhiKGYfQB6MO7f00vnAbwmogkSf5LKXUxEAhMIt9blyL/9r2G5PUi0oP//VFPi8j3IpHIgfn420NZgUZHR8O5XG4C+VnhYCwW2wkAQ0NDawzD6BORPpLd72H6KoB+kn8wTfMfQD773TCM'+
	'r5P8EoCPVBH3JICDJH8bi8Vemc/3wbICOY6zleRRABCRbzPPriukjiQB9CulDpT6h48eij16dW+d/t/q3OFYzNsi8leSfxaRv2QymeO1useUo6xAtm0fALCzRJVhAPtd1+3v7u4erjSQgYGBJeFw+APIZ361AZgkeX56evqt9evXT9UrD7ukQCQDtm1PFr1eFBhDvqf0m6Y51MhJ5NVSchY7fvy4dHR0nAfwYX3pUcMw9nd1dZ16P4vii5GRkeW2bV/nNfG6SZMmTZo0adLk/4T/AGAidkpP8gAfAAAAAElFTkSuQmCC');
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
		el.userData.textColor = new THREE.Color(0.835294, 0.835294, 0.835294);
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
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABk0lEQVR4nO3bXU7CUBBA4VO3A5vAXcECcFe4idv11Jc2IQREnfszhvO9mBDTzj0gxbaAJEmSJEmSJEn/TinlUEo5jJ7jkRbzvdXaUCnlME3TZZqmyzzPx1rbrWWe5+M2X82I1QLeOGeKuM5ybrHtagH3+/0ncLp6KEXEO/FO66xVTLU2tLk38G63+6i9nyyzVA8IOSL2mqFJQBgbsee+mwWEMRF777NpQOi7oBFPWPOA0Gdho94yugSEtgsc+X7bLSC0WejoI37XgFB3waPjwYCAUGfhGeLBoIAQC5AlHgwMCH8LkSkeDA4IvwuSLR4kCAg/C5MxHiQJCN8HyhoPEgWE+6HWnynjQbKA8PTscap4kDAgPIyYLh60uybyMtK9Av0TDvAgEuDHmAA/SA'+
	'f4r1yAJxMCPJ0V4AnVAE/pB3hRKcDLmgFeWA/w1o4Aby4K8Pa2gNFHxp4zeItvUNWAmeJtWs9ULeD2PZGrh4bH29xGXJblvdad+q2uiaSJB7DOcnr6i6O94le9JEmSJEmSJEnq4wuSLpcL38DFjAAAAABJRU5ErkJggg==');
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
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAGyUlEQVR4nO2bz48bZxnHv8/M7Cp7SE44VhsR9VAL2+80K6qUrFqBWEJalaKgbLmnWRCBGxwbGpACTf8EKFKyDRcOKIlArSLSFkuVCg1ERc7OO7bkSLSVQpX4liA58s7Ml4PfSWaX9Xp3Pa833fXn4nlm3nned76e99fzvgOMGTNmzJgxY7YpMqqMGo3GE1EUPZGHr4mJiU/L5fK/8/A1iJEIFIbh0yT/DmAyL58iMletVi/n5a9vPrYzCIJgEsB1EXkqZ9f3SH7J9/1uzn6X4dl0DgCO47xGMhXngyRJfjmkv98D+DKA3SLycwBD+RuE1TcoDMOnkyT5h4i4InIjSZJnhv3HV7yREYCvKaX+lUuBV8GaQDYfxIbw/XBsOAV6VSvT7pzN81+uVqsfO4'+
	'5zFgBIHjBVzQpWBDL/8CkAEJEbJF/PO48kSX5NctGYp7TWX807D8BCFRtlGzGKqramQPV6fa/ruiWSE+t16DjOGQBfN+YZpZTVXiYMwzMkTxtzQ72kiCzFcdyanp6+0zfNaieDIDgqIqcAHNpYcZdlbrXxTMlpnHWN5Fnf9/+88sIyga5fvz4xNTX1JoATQ2QGAF0AMza73yw5jtQXOp3OyYMHDy6lJ5YNFLPikLwF4C3HcRbjOL69kVw8z/ukUql8MmRh1021Wv240Wh8ZaNzPdd1i0mSPAXgFRHZB+DE1NQUAMynaR68QaZa/cmYf5ycnPxhqVS6O3zxH31ardaebrd7DsD3AYDk99Lq9qCbN20OSN7aSeIAQKlUujs5OfkDU2sgIq+m1xyg11vhYYP81k4SJ6VUKt0VkQvGnDGa9ARyXbeUJnQcZ3GV+3cEInIj'+
	'PU41cQAgO87ZaIO8ncg+e6qJ9XDHeiDpaK33uq67DwDiOL6llLojIslWl23LBGo2m7ujKHpZRI6FYfi8iOxKkp4eIoIwDO9rra+SvOx53sVyuXxvK8ppbTbfj1qt5mmtT8ZxfFNEFgAcBbBrlaS7ABwVkYU4jltBEPyoVquN/A8daYb1en3vxMTEZZLPZk63SL4DoAHgc3PuMQAVEfkugCcBFEXkzWKxeLxerx9ba+6UNyMTKAiCqohcIbnfnHoPwGtKqWtr3PYzrfUhAK8DOEzyWc/z/hkEwYu+74fWC40RVbHFxcWiiFwBsB+9edq8UurIAHEAAEqpa0qpb6M3/O8C2C8iV9Jxim2sC1Sr1TzXdS/BiCMiR5RSCxv1o5RaEJEjMCJ5nndpFG2SdYEKhcJ8ps35cbVa/WCzvsy9PzHmc4VCYdiow0CsCtRsNneLyB'+
	'ljvr+ZN2clSqnzAP4KACLyq2azuXtYn2thVaAoil4GUDRmboH1TJC+GEXRXF5+V8OqQCJyzBy21tMgr5dKpXINwM0VeVjBmkAkHQDPm+N38vQtIiT5tjFfMHlZwZpjrfVePBwhN/L2LyJNc7grCIJC3v5TrAmUTjwNn/dNuElI/qdPXrky8rnYFw1rAsVxfCtjPpa3fxF5vE9euWJNIKXUHQD3jVnJ2z/Jsvnt+L7fztt/ijWBTLDrqjl+KU/fJMXM9CEiV20G1qy2QSTTLXIlMyvPhUajcQi9MEg2DytYFcjzvIsA0jhvbjs8MrtFbgO4mJff1bAqULlcvkfyF8Y8rLUeenKptZ4H8C0AIHna9/3/DutzLax38+12+7yI/M2Yvw3D8Bub9WXu/Y0xP2y320NPfgdhXaDZ2dloaWnpGIDPAEySfNe8BRtCaz1P8l30'+
	'Nih8GkXR3OzsbJR3eVcykoHi9PT0HZIvwogE4JzW+r0wDGdI9t2jRFLCMJzRWr8P4Jy59zOS3xlVXHpkMWnf98N6vf6M53mXADyHXoz5cBiGN4MgeFtEmun0QUQeJ1kJw/AlmN7K8GEURXPbMmgP9N6kWq32zUKhMG8CaUUAT4rIT4HeelhK9hjAbZKn2+32wiiqVZaRrzOZB/xds9n8QxRFcyae8wL+f23sPoC/mIXDS1u1cLhlK6vmgS8AuEDSCYKgkF169n2/vaOXnrMYIW7j4aDykWEc7hjAWKABjAUagAP0NlSnJ1zXLfZPvr3JPnuqiQMAcRy30gtmW+yOhOSB9DjVxAF6AzgA6brVK61Wa8/oi7e1tFqtPSSPG/OjdLT+oA0ieRYARGRft9s9t5NESvdJm83kIPlGem3ZeF5rfR6ZnfYickFEbmzXjZ2u6x'+
	'ZJHiB5PBUHwIJS6kG0YdlAsdPpnDRb8U+YG06RhONsz86OJIBl876FTqdzMptmra99XgUwY7OAjxAfkXxj4Nc+K9nM92JfJNbzvdiYMWPGjBkzZtvyPyzg9Lm49AQrAAAAAElFTkSuQmCC');
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
		el.userData.textColor = new THREE.Color(0.835294, 0.835294, 0.835294);
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
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABk0lEQVR4nO3bXU7CUBBA4VO3A5vAXcECcFe4idv11Jc2IQREnfszhvO9mBDTzj0gxbaAJEmSJEmSJEn/TinlUEo5jJ7jkRbzvdXaUCnlME3TZZqmyzzPx1rbrWWe5+M2X82I1QLeOGeKuM5ybrHtagH3+/0ncLp6KEXEO/FO66xVTLU2tLk38G63+6i9nyyzVA8IOSL2mqFJQBgbsee+mwWEMRF777NpQOi7oBFPWPOA0Gdho94yugSEtgsc+X7bLSC0WejoI37XgFB3waPjwYCAUGfhGeLBoIAQC5AlHgwMCH8LkSkeDA4IvwuSLR4kCAg/C5MxHiQJCN8HyhoPEgWE+6HWnynjQbKA8PTscap4kDAgPIyYLh60uybyMtK9Av0TDvAgEuDHmAA/SA'+
	'f4r1yAJxMCPJ0V4AnVAE/pB3hRKcDLmgFeWA/w1o4Aby4K8Pa2gNFHxp4zeItvUNWAmeJtWs9ULeD2PZGrh4bH29xGXJblvdad+q2uiaSJB7DOcnr6i6O94le9JEmSJEmSJEnq4wuSLpcL38DFjAAAAABJRU5ErkJggg==');
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
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAANJUlEQVR4nO1ce4wV5RX/nW9mFmUX6wNhFYiBBpY7M7oYF6MYlfpEEx+Iov6hVqtR1FBqrYliUWzhD/FRrAGMVov9o5FqfTSRtS0KEsQIRq87M3evpJLW14ooNqxu2Tszp3/cc3fHvY+Ze/deoM3+ks3O45zvO3Pu953vnPOdGWAEIxjBCA4c6EAL4DhOi67rR+dyuTEAWuRyr2EYe33f/9K27d4DKd9+VZDjOC1EdDqAswDMADAdwMQYtk8AdAN4H8DrzLx5fyqt4QpKp9PNhmFcxszXApgNQB9mkz6AjQDW+r7/Ynt7+7fDbK8iGqagdDo9Udf1uwBcj8GpU8A+AO8RUZaZs8z8GTPvBVAYGS1ENIaIjiWiNmZuA3AigFFD2ukF8Izv+w+2t7d/0o'+
	'jnqLuCurq6xiul7gdwA4CmyK0PmXkdM29oaWl5e/Lkyf+ppt2dO3ce0tvbewoRnU1EVwKYGrndD+DpMAzvP/74478Y9kNEUDcFMbPmuu4tAJYR0Q/kcj8RrQ3D8EnLsrYTEdepL3Jdt0MpdRMzXwf5IZj53wAWW5a1hoiCevRVFwV5nndcGIZ/JKJT5VI/M68yDOOhtra2T+vRRzlks9kJuVzuTiK6FYOK2qqUuto0zX8Ot/1hK8hxnIuIaC2AI+RSJxEtNE1zx3DbrgaZTGZaGIaPAThfLu1h5uts2/7LcNodloI8z1vEzI/K6XfMfKtlWc/WaypVC5l61xLRKgCjAYCIFpmmubLWNmtSEDOT53nLANwtl7qZeZ5t216tgtQTjuOYRPQC8n4WACw3TfPeWn44VYsAnuf9GoPK2RIEwayDRTkAYNu2FwTBLABb5NI9'+
	'ruv+qpa2qh5BQ6bV+sMOO2zepEmT+mrpvNHYvn376EMPPfR5ABcAtU23qhQkBvkVOd3S19d3XkdHx3fVtFEKzKxlMplxRHSsnH+WSqV21WOpFiX9FcBp0vbF1RjuxAryPO84Zn4P+dWqOwiCWSeccMKeqiXGQEx2ARHNDcPwDCI6BsXTPWTmz5VSbzLzi8y8vtYY7IMPPjhC07S3kLdJe5h5hm3b/0rCm0hB4gRuFj/nO2aeWYvNyWQy04IgeICILkVx2BCHfcz8kqZpS1Kp1IfV9i2GexuA0cy81bKs05OM0EQKchznNiJ6HACY+ce2ba+tRrh0Oj1O07T7ANxMRFrkVg+ATmb+CEAPM38OADKiWoloCoA5AFojPD4RPWEYxtKpU6d+WY0cjuNcR0S/lz5uM01zVRxPrIK6urrGE1FWwodO0zQvrGa59DzvXGZeB+'+
	'BwudTLzKsBPC/hR1iJn5mV67odAC4nogUYDHz3ENF80zT/nlQWcU/WI+9MfuP7flt7e/uuSjyxy7xS6n5RTj8RLUyqHGYmx3FuD8NwPfLK6WfmlU1NTVNs277Ltu134pQDAEQU2rb9jm3bd/m+/0NmXgkgB+CIMAw7Hce5LYk80hYrpRYK/+G6ri+N5al0U1IW/wDQxMy/sW37Z0kEkV/qIQB3yKWPiOgS0zSdJPxx8DzPZuaXAUyRSw9blnVnUn7HcR4lokUA+nVdn1IpXqw4giSf0yQNrUgqgOu6t2JQOW8opU6ul3IAwDRNRyl1MhFtlEs/9zzv1qT8hmE8hHyKpMn3/bsq0ZZVUDqdbkY+2QUiWjt9+vTPknTued65AArO2Bt9fX3np1KprxJJXgVSqdRXYRieX1BSGIaPeZ53ThLetra2TyXABoDr5VlLoqyC'+
	'DMO4DGIQwzB8MknH6XR6HDOvk5XqI6XUFR0dHbkkvLXAtu1+TdOuYOadRKQx87odO3YcnYQ3DMOn5HCMrutzy9GVVZDkkAHgQ8uytifp1DCMJRCDTESXNGLkDEVbW9tupdTFEMPd39+/JAmfZVnbAOwAvvesRSipIMdxWpBPsENGROzKlclkpjHzzcKzup42Jw7S12o5vSWTyUyL4yEiFvcDRDS73DQrqSDZmtEBgJk3JBEyCIIHhKd31KhRy5LwRJHJZI7q6uqa1dXVNSuTyRxVLb/v+8uQT+LrIksSFJ7N0DTt9FIE5abYWfJ/X0tLy9txvXR3d4+R8AHMvLoaD9fzPNtxnI1hGO5WSm1RSm0Jw3C34zgbPc+zk7bT3t6+SxxQENGlMgsqorm5eSvyOywgorNL0ZRT0Az5/16S3YcgCOZgMLZ6Po4eGPCQ72Tmd4'+
	'nozKH3iehMZn5XaBLlrSRJBpFlThy9PNv7Ik97KZpyHU+XDrMJBSusAj1JDbrneXcAWIG8n/UFgOVEdBURXQVguVxrArDC87xEDqppmtuELypTRTBzVuinl7pfpCAZmhOjzHEIw/AMOexMEj7I1CnYqVeZ2bQsa7Fpms+ZpvmcZVmLmdkE8KrQLE8y3YgoJKJOkb1oVJbhKTzjpFLTskhBuq4P+BHMHOscMrMm0TckKo9FGIaPQ0YOM19j2/bXQ2ls2/6ama+BjCThSdJ2QYZWZtYqEudlHggzNE0bO/R+kYKkyqLAvDeug0wmMy7STk8C+qMiNud3pZRTgNx7GsjbpISrW4/Qa67rJnEao0m4MUNvlrJB0WEWm8ErpEkBoJDPqQTf99sivB8kaD8dOY31bwAMyKBp2oQE9APP6Pt+IgWNIIJSCoqOmlhfImqnCrao'+
	'EnRdHzD8zHxCgvajy2+SVOuADEEQJNn2HnhGXdeLTEqRggzDGCAioqIhNxSpVGoXgMLK1VqJVui/YuZNcvoTx3GOLEcrNucGAGDmTQlju1ahDyzLSuKwRgdBvIJ83x9oNGpfyoGIgkgueUocPQAopW5HPh8znoj+UEpJjuMcGYbhswDGA9hHRIkyh0qpggw9iZLyRAN2KgiC3UXtDb0gWyufCHPb0PtlhHpTDuck8XoluFwspxcSkee67nLP8670PO9K13WXE5EH4EKhWWxZlhvXLjMrZp4jsm+KoxeewjN+XGpbqVw5XDeAiRHmuE5eBHA1gFZJsL8Tx2Oa5iOe5zHyXvN4AHczFyUN+gHcY5rmo0NvlILneTOlrYJMsSgMAmbuLnW/3K/9vvw/cefOnYfEdcLM6yFBH4DLEwoWWpb1MBGdFLFJ0TY3EdFJQhPrnQ'+
	'vPPDncB6Azjl6ebYbIky5FU05Br8v/Ub29vafEdWTbdi8zvyQdLUia1QPy08227dlKqbFKqVnyN9a27dnV5JTS6fQ42RYCM7+UZBf222+/PRUSZJdL65ScYsy8mYh8ALqkATbGdaZp2pIwDOcBaNm3b99iAIvieKKQFWprNTxR6Lq+GPkVyVdK/TIhWyHFkQuCYHMpgpIjSLS/EQCIaD4zx24wplKpD4noCeFZUE0uZ7iQvhbI6Zok1W3MTEQ0X443lisnLrviENGzcjhNDG8sDMNYCmAP8vtoL9eSGawW2Wx2bBiGrwAwAOxpampKlE10XXcmpFI28qxFKKugXC73Z4hXrZS6KUmnU6dO/VJGXABgCjM/7zhOUyxjjXAcpykIgj8R0WRmDohoftJsplLqRjnc6/t+2RWvrIJkyD0DAMx8XTabTRL4QfbKfyp8s4mo'+
	'sxEjKZvNjlVKvcbMswFAKbUw6T59NpudIOXDAPBMpWr9ik6d7/sPQnYgc7lc4q1dy7JWAXhETn8UBMG2etokz/PsXC73TkE5AB5OUqlRgDxLYcf4wUq0scbXdd3VAG5Bfq/Lrqa8VwoLVspGYg7Aat/3l8VVVJRDOp0eJ6vVAgAGMwcychIrR8qFHeRt1hrLshZUoq+2/OU10zQvqLL85RzZfyrUUfcy82oiesE0zW1Jyl88z5vJzPPqUf6SyWQ6mfk8JCx/2W8FVIZhLJGNxajv9QURdUqatAeDya5jALQqpaZIbDU+wuMDWNPU1PTAQVFABfx/lOC5rmsx8zYiOrTuJXhA/Ys4Acwhormy+9A6pDQP4ir0ENEmCTw7ay3idBznSCLagkYVcUY6algZsOu6RxdyyEEQfGpZ1pf1KgMePXr035h5lvTVmDLgAoYWkv'+
	'f19V1eDyU1Avu9kLwA13WXAbhHTrcEQXBRrdOtUZBp9QoGC8iX2bZ9b7Xt1LSrYZrmvcgnugDgNE3T3nIcx6ylrUZAaqK3IKIcy7KSRvjfw8jrUDFoxAt1rymlFtayFA8HUsD1W3ECgYPhhboCDpJXMm9DPnwAM28FcFXSpbwS6vpSbyaTuTkMw+VU/FLvU5ZlbavX1JOpNFMpdSNHXuoF8A0RLU6lUk/Uw0UAGvBauASUS1H8WvgOick2NDc3b63ltXDJIZ8tmcCi18J937+v1kC4HBr9YYFfIK+oUh8WeJ+Zs5T/uMCnyCfnBj4sgPzHBSYwc5tszcxAcXiyF/kPC6z4n/mwwFCk0+lmXdfnMvO1RDQbYieGgRwzbySitX19fS822kndrx83SafTzZqmnU5EZzNzu5S9TYph+5iZu4kozcwbgiDY3OjvdURxUHwe'+
	'Ryq7xhTqc6TKYm8QBLsP9OdxRjCCEYzgQOK/GcWiY/PQHFcAAAAASUVORK5CYII=');
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
		el.userData.textColor = new THREE.Color(0.835294, 0.835294, 0.835294);
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