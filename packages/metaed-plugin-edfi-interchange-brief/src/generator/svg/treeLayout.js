/* eslint-disable */
"use strict";
var treeLayout = (function () {
    function treeLayout(data) {
        this.offsets = { rx: 10, ry: 5, rr: 5, pady: 20, linelen: 50 };
        this.data = data;
    }
    treeLayout.prototype.drawOn = function (svg) {
        var paper = Snap(svg);
        return this.drawPaper(paper);
    };
    treeLayout.prototype.draw = function () {
        var paper = Snap(10000, 10000);
        return this.drawPaper(paper);
    };
    treeLayout.prototype.drawPaper = function (paper) {
        var group = this.createGroups(paper, this.data, 1);
        var bb = group.getBBox();
        var matrix = new Snap.Matrix().translate(-bb.x + 1, -bb.y + 1);
        group.transform(matrix);


        console.log('<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
        '<svg height="' + Math.round(bb.height + 1.5) + 'px" width="' + Math.round(bb.width + 1.5) +
        'px" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
        paper.innerSVG() + '</svg>');


        return '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
            '<svg height="' + Math.round(bb.height + 1.5) + 'px" width="' + Math.round(bb.width + 1.5) +
            'px" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
            paper.innerSVG() + '</svg>';
    };
    treeLayout.prototype.createGroups = function (paper, data, level) {

        if (data.children) {
            var parent = this.createElementSvg(paper, data.name, level, true);
            var parentBB = parent.getBBox();
            var children = this.createChildrenGroup(paper, data, level);
            var childrenBB = children.getBBox();
            var result = paper.group(parent, children);
            var parentMatrix = new Snap.Matrix().translate(0, childrenBB.y - parentBB.y + (childrenBB.height - parentBB.height) / 2);
            parent.transform(parentMatrix);
            var childrenMatrix = new Snap.Matrix().translate(parentBB.x2, 0);
            children.transform(childrenMatrix);
            return result;
        }
        else {
            return this.createElementSvg(paper, data.name, level, false);
        }
    };
    treeLayout.prototype.createChildrenGroup = function (paper, data, level) {
        var result = paper.group();
        if (data.children) {
            var matrix = new Snap.Matrix();
            for (var _i = 0, _a = data.children; _i < _a.length; _i++) {
                var child = _a[_i];
                var group = this.createGroups(paper, child, level + 1);
                result.add(group);
                group.transform(matrix);
                matrix.translate(0, group.getBBox().height + this.offsets.pady);
            }
            var bb1 = result[0].getBBox();
            var bbn = group.getBBox();
            result.line(0, (bb1.y + bb1.y2) / 2, 0, (bbn.y + bbn.y2) / 2);
        }
        return result;
    };
    treeLayout.prototype.createElementSvg = function (paper, text, level, hasChildren) {
        console.log('createElementSvg: text = ' + text + '; level = ' + level + '; hasChildren = ' + hasChildren );
        var result = paper.group().attr({ class: 'level' + level });
        var t = result.text(this.offsets.linelen, 0, text);
        var b = t.getBBox();
        var rect = result.rect(b.x - this.offsets.rx, b.y - this.offsets.ry, b.width + 2 * this.offsets.rx, b.height + 2 * this.offsets.ry, this.offsets.rr, this.offsets.rr);
        t.before(rect);
        b = rect.getBBox();
        if (level > 1) {
            result.line(0, b.y + b.height / 2, b.x, b.y + b.height / 2);
        }
        if (hasChildren) {
            result.line(b.x2, b.y + b.height / 2, b.x2 + this.offsets.linelen, b.y + b.height / 2);
        }
        console.log(result);
        return result;
    };
    return treeLayout;
}());
//# sourceMappingURL=treeLayout.js.map
