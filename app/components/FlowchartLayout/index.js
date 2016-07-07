/**
*
* FlowchartLayout
*
*/

import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
// d3 libs
import d3 from 'd3';
import dagreD3 from 'dagre-d3';

import styles from './styles.css';

import { contentfulObjShape } from 'api/contentful';

export class FlowchartLayout extends React.Component {

    constructor(props){
        super(props);
        this.flowchartNodeClickHandler = this.flowchartNodeClickHandler.bind(this);
    }

    static propTypes = {
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        interpolation: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.function
        ]),
    };

    componentWillReceiveProps(){
        this.updateDrawing();
    }

    componentDidUpdate(){
        this.updateDrawing();
    }

    componentDidMount(){
        this.draw();
    }

    getChildren(entryId, depth = 0) {
        const getChildrenOfEntry = this.getChildrenOfEntry.bind(this);
        const getChildren = this.getChildren.bind(this);
        const defaultChild = {
            id: '',
            children: [],
            // depth: 0
        };
        
        const map = Object.assign({},defaultChild);
        
        map.id = entryId;
        
        const childIds = getChildrenOfEntry(entryId);

        if (childIds && childIds.length > 0) {
            map.children = childIds.map(function(childId){
                const childMap = getChildren(childId, depth + 1);
                return childMap;
            })
        }
        return map;

    }

    getChildrenOfEntry(entryId) {
        const entry = this.props.entries[entryId];
        switch (entry.sys.contentType.sys.id){
        case 'flowchart':
            return [entry.fields.nodeLink.sys.id];
        case 'flowchartNode': 
            return entry.fields.nodeLinks.map(function(nodeLink){
                return nodeLink.sys.id;
            })
        case 'nodeLink':
            return [entry.fields.flowchartNode.sys.id]
        default:
            return false;
        }

    }

    getNodesAndEdges(entry = this.getChildren(this.props.currentFlowchart), map){
        map = map || {
            nodes: [],
            edges: []
        };
        const getNodesAndEdges = this.getNodesAndEdges.bind(this);
        const getEntry = this.getEntry.bind(this);
        
        const entryContentType = getEntry(entry.id).sys.contentType.sys.id
        if(map.nodes.indexOf(entry.id)===-1 && entryContentType !== 'nodeLink') map.nodes.push(entry.id);
        
        entry.children.forEach(function(child){
            const childEntry = getEntry(child.id)
            if(childEntry.sys.contentType.sys.id === 'nodeLink'){
                map.edges.push({
                    from: entry.id,
                    to: childEntry.fields.flowchartNode.sys.id,
                    label: childEntry.fields.response
                });
            }
            getNodesAndEdges(child, map);
        })

        return map;
    }

    getEntry(entryId){
        return this.props.entries[entryId];
    }

    flowchartNodeClickHandler(data) {
        if(this.props.pathway.indexOf(data) > -1)
        this.props.truncatePathwayToStep(data);
    }

    draw(){
        const getEntry = this.getEntry.bind(this)

        const clickHandler = this.flowchartNodeClickHandler;

        var width = 300,
            height = 400;

        // Create the input graph
        var g = new dagreD3.graphlib.Graph()
          .setGraph({})
          .setDefaultEdgeLabel(function() { return {}; });

        // Here we"re setting nodeclass, which is used by our custom drawNodes function
        // below.

        var map = this.getNodesAndEdges();

        map.nodes.forEach(function(entryId){
            const entry = getEntry(entryId);
            const contentType = entry.sys.contentType.sys.id;
            let title;
            switch (contentType){
                case 'flowchartNode':
                    title = entry.fields.question;
                    break;
                case 'nodeLink':
                    title = entry.fields.response;
                    break;
                default:
                    title = entry.fields.title;
            }
            g.setNode(entryId, {
                label: title,
                id: `id_${entryId}`,
                class: styles[contentType] ,
            });
        })

        map.edges.forEach(function(edge){
            g.setEdge(edge.from,edge.to,{label:edge.label});
        })

        

        g.nodes().forEach(function(v) {
          var node = g.node(v);
          // Round the corners of the nodes
          node.rx = node.ry = 5;
        });

        var render = new dagreD3.render();


        // // Set up an SVG group so that we can translate the final graph.
        var svg = d3.select(this.flowchart)
            // svg = chart.append('svg')
            .attr('width',width)
            .attr('height',height)
            .attr('class',styles.chart),
            svgGroup = svg.append("g").attr('id','flowchart');

        render(svgGroup, g);
        // Center the graph

        svg.attr("width", g.graph().width+40);
        svg.attr("height", g.graph().height+40);
        svgGroup.attr("transform", 'translate(20,20)');

        d3.select(this.flowchartWrapper)
        .attr("width", "100%")
        .attr("height", 600)
        .attr('viewBox',`0 0 ${svg.attr("width")} ${svg.attr("height")}`)

        // apply styles and click handlers
        svgGroup.selectAll('.node')
          .classed(styles.node,true)
          .on('click', clickHandler);
        svgGroup.selectAll('.edgePath')
          .classed(styles.edgePath,true);
        
    }

    updateDrawing() {
        const flowchart = d3.select(this.flowchart);
        const flowchartWrapper = d3.select(this.flowchartWrapper);

        // ensure items in the pathway are marked as selected
        const nodes = flowchart.selectAll(`.${styles.node}`).classed(styles.inPathway,false);
        this.props.pathway.forEach(function(entryId){
            let p = flowchart.select(`#id_${entryId}`).classed(styles.inPathway,true);
        });

        
        const flowchartBody = flowchart.select('#flowchart');
        const currentFlowchartNode = flowchart.select(`#id_${this.props.pathway.slice(0,this.props.pathway.length).pop()}`);
        

        // const flowchartWrapperHeight = 400;
        // const flowchartWrapperWidth = 585;
        // const flowchartWidth = flowchart.attr('width');
        // const flowchartHeight = flowchart.attr('height');
        

        // const currentNodeBBox = currentFlowchartNode.node().getBBox();
        // const flowchartClientRect = flowchartBody.node().getBoundingClientRect();
        // const flowchartBBox = flowchartBody.node().getBBox();
        // const flowchartCTM = flowchart.node().getScreenCTM();

        // console.log('flowchartClientRect',flowchartClientRect);
        // console.log('flowchartBBox',flowchartBBox);
        // console.log('currentNodeBBox',currentNodeBBox);
        // console.log('flowchartCTM',flowchartCTM);


        // function convertCoords(x,y,scale = 1,elem) {
            

        //     var offset = flowchartBody.node().getBoundingClientRect();

        //     var matrix = elem.node().getScreenCTM();

        //     console.log('offset',offset);
        //     console.log('offsetE',flowchartBody);
        //     console.log('matrix',matrix);
        //     console.log('matrixE',elem);

        //     return {
        //         x: 1/scale * (matrix.a * x) + (matrix.c * y) + matrix.e - offset.left,
        //         y: 1/scale * (matrix.b * x) + (matrix.d * y) + matrix.f - offset.top
        //     };
        // }

        // var bbox = currentFlowchartNode.node().getBBox(),
        // middleX = bbox.x + (bbox.width / 2),
        // middleY = bbox.y + (bbox.height / 2);

        // const scaleFactor = 0.8;
        // const coords = convertCoords(middleX,middleY,scaleFactor,currentFlowchartNode);
        // d3.select('#test').remove();
        // flowchartBody.append('rect').attr('id','test').attr('width',6).attr('height',6).attr('x',coords.x).attr('y',coords.y)

        // const center = [0,0];

        // flowchartBody.attr('transform',`translate(0,0) scale(${scaleFactor}) translate(${center})`);

    }

    render(){
        return (
            <svg className={styles.flowchartWrapper} ref={(ref) => this.flowchartWrapper=ref}>
                <svg className={styles.flowchart} ref={(ref) => this.flowchart=ref}  preserveAspectRatio="xMinYMin" />
            </svg>
        );
    }
}

FlowchartLayout.propTypes = {
    currentFlowchart: React.PropTypes.string.isRequired,
    pathway: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    entries: React.PropTypes.objectOf(React.PropTypes.shape(contentfulObjShape)).isRequired,
    truncatePathwayToStep: React.PropTypes.func.isRequired,
};

export default FlowchartLayout;
