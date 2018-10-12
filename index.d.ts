declare namespace G6 {
    const version: string;
    class Item {
        public getModel(): any;
        public getBBox(): any;
        public getGraphicGroup(): any;
        public getKeyShape(): any;
        public getParent(): any;
        public getChildren(): any;
    }

    class Node extends Item {
        public getEdges(): Array<any>;
    }

    class Group extends Node {
        public getChildren(): Array<Item>;
        public getAllChildren(): Array<Item>;
        public getChildrenBBox(): any;
    }

    class Edge extends Item {
        public getSource(): Item;
        public getTarget(): Item;
        public getPoints(): Array<Point>;
    }

    class Guide extends Item {}

    class Graph {
        constructor(options: GraphOptions);
        public read(data: GraphModel): void;
        public save(): GraphModel;
        public on(
            eventName: 'click' | 'dblclick' | 'mouseenter' | 'mouseleave' | 'mousedown' | 'mouseup' | 'mousemove' | 'dragstart' | 'drag' | 'dragend' | 'dragenter' | 'dragleave' | 'drop' | 'contextmenu' | 'keydown' | 'keyup' | 'mousewheel' | 'beforechangesize' | 'afterchangesize' | 'beforeviewportchange' | 'afterviewportchange' | 'beforechange' | 'afterchange', 
            eventHandle: (ev: GraphEvent) => void
        ): void;
        public find(id: string): any;

        public add(type: 'node', model: GraphNode): void;
        public add(type: 'edge', model: GraphEdge): void;
        public add(type: 'guide', model: GraphGuide): void;

        public update(type: 'node', model: GraphNode): void;
        public update(type: 'edge', model: GraphEdge): void;
        public update(type: 'guide', model: GraphGuide): void;
    }

    interface Point {
        x: number;
        y: number;
    }
    interface GraphDataCommonType {
        id: string;
        /** 渲染层级 */
        index?: number;
        shape?: string;
        color?: string;
        parent?: string;
    }
    interface GraphNode extends GraphDataCommonType {}
    interface GraphEdge extends GraphDataCommonType {
        /** 源节点id */
        source?: string;     
        /** 目标id */
        target?: string;
        /** 控制点 */
        controlPoints?: Array<Point>;
        /** 源节点锚点 */
        sourceAnchor?: number;      
        /** 目标节点锚点 */
        targetAnchor?: number;
    }
    interface GraphGroup extends GraphDataCommonType {}
    interface GraphGuide extends GraphDataCommonType {}
    interface GraphModel {
        nodes?: Array<GraphNode>
        edges?: Array<GraphEdge>;
        groups?: Array<GraphGroup>;
        guides?: Array<GraphGuide>;
    }

    interface GraphOptions {
        /** 容器，可传入dom元素或者元素id */
        container: HTMLElement | string;
        /** 画布宽度，可选 */
        width?: number;
        /** 画布高度，可选 */
        heith?: number;
        /** 初始化视口区域 */
        fitView?:  'tl' | 'lc' | 'bl' | 'cc' | 'tc' | 'tr' | 'rc' | 'br' | 'bc' | 'autoZoom';
        /** 视口适应画布边距 */
        fitViewPadding?: number | Array<number>;
        /** 最小缩放倍率 */
        minZoom?: number;
        /** 最大缩放倍率 */
        maxZoom?: number;
    }
    interface GraphEvent {
        currentItem: Item;            // drag 拖动子项
        currentShape: any;           // drag 拖动图形
        shape: string;               // 图形对象
        item: Item;                   // 子项
        domEvent: Event;             // 原生 dom 事件
        x: number;                   // 图横坐标
        y: number;                   // 图纵坐标
        domX: number;                // dom横坐标
        domY: number;                // dom纵坐标
        action: string;              // 数据变更动作 add、update、remove、changeData
        toShape: any;                // mouseleave、dragleave 到达的图形
        toItem: Item;                 // mouseleave、dragleave 到达的子项
    }
}

export default G6;
