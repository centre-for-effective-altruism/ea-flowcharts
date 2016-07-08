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
        this.updateDrawing = this.updateDrawing.bind(this);
        this.setPathway = this.setPathway.bind(this);
        this.setZoom = this.setZoom.bind(this);
        this.setFlowchartHeight = this.setFlowchartHeight.bind(this);
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
        window.addEventListener('resize', this.setFlowchartHeight)
    }

    componentWillUnmount(){
        this.draw();
        window.removeEventListener('resize', this.setFlowchartHeight)
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

        var width = "100%",
            height = 530;

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
        const flowchart = d3.select(this.flowchart)
            // svg = chart.append('svg')
            .attr('width',width)
            .attr('height',height)
            .attr('class',styles.chart),
            flowchartBody = flowchart.append("g").attr('id','flowchart');

        render(flowchartBody, g);
        // Center the graph

        flowchart.attr("width", g.graph().width+40);
        flowchart.attr("height", g.graph().height+40);
        flowchartBody.attr("transform", 'translate(20,20)');

        const flowchartWrapper = d3.select(this.flowchartWrapper)
        .attr("width", width)
        .attr("height", height)
        .attr('viewBox',`0 0 ${flowchart.attr("width")} ${flowchart.attr("height")}`)
        // apply styles and click handlers
        flowchartBody.selectAll('.node')
          .classed(styles.node,true)
          .on('click', clickHandler);
        flowchartBody.selectAll('.edgePath')
          .classed(styles.edgePath,true);

          this.setZoom(2)

        // zoom buttons
        const buttonSize = 80;
        const buttonSpacing = 20;
        const zoomIn = flowchartWrapper.append('g')
          .attr('transform', `translate(${buttonSpacing}, ${buttonSpacing})`)
          .attr('class',styles.zoomButton)
        const zoomOut = flowchartWrapper.append('g')
          .attr('transform', `translate(${buttonSize + buttonSpacing * 2}, ${ buttonSpacing })`)
          .attr('class',styles.zoomButton)

        const buttons = d3.selectAll(`.${styles.zoomButton}`);
        buttons.append('rect')
          .attr('width', buttonSize)
          .attr('height', buttonSize)
          .attr('rx', 10)
          .attr('ry', 10)

        buttons.append('text')
          .attr('transform',`translate(${buttonSpacing},0)`)
          .attr('dy','1em')


        zoomIn
          .on('click',function(){zoom('in')})
          .select('text').text('+')
        
        zoomOut
          .on('click',function(){zoom('out')})
          .select('text').text('-')

        const setZoom = this.setZoom;
        function zoom(direction) {
            let zoomCoefficient = 1;
            if(direction === 'out'){
                zoomCoefficient *= -1;
            }
            let scaleFactor = d3.transform(flowchartBody.attr('transform')).scale[0];
                scaleFactor += parseFloat(zoomCoefficient,10);
            console.log(direction,zoomCoefficient, scaleFactor)
            setZoom(scaleFactor);
        }
    }

    updateDrawing() {
        this.setPathway();
        this.setFlowchartHeight();
        this.setZoom();
    }

    setFlowchartHeight() {
        const flowchart = d3.select(this.flowchart);
        const flowchartWrapper = d3.select(this.flowchartWrapper);
        const flowchartBBox = flowchart.node().getBBox();
        const aspectRatio = flowchartBBox.height/ flowchartBBox.width;
        const flowchartWrapperWidth = flowchartWrapper.node().getBoundingClientRect().width;
        flowchartWrapper.attr('height',flowchartWrapperWidth * aspectRatio);
        
    }

    setPathway() {
        const flowchart = d3.select(this.flowchart);
        const flowchartWrapper = d3.select(this.flowchartWrapper);
        const flowchartBody = flowchart.select('#flowchart');

        // ensure items in the pathway are marked as selected
        const nodes = flowchart.selectAll(`.${styles.node}`).classed(styles.inPathway,false);
        this.props.pathway.forEach(function(entryId){
            let p = flowchart.select(`#id_${entryId}`).classed(styles.inPathway,true);
        });
    }

    setZoom(scaleFactor = false) {
        const flowchart = d3.select(this.flowchart);
        const flowchartWrapper = d3.select(this.flowchartWrapper);
        const flowchartBody = flowchart.select('#flowchart');
        const currentFlowchartNode = flowchart.select(`#id_${this.props.pathway.slice(0,this.props.pathway.length).pop()}`);
        
        const flowchartBodyTransform = d3.transform(flowchartBody.attr('transform'));
        const nodeTransform = d3.transform(currentFlowchartNode.attr('transform'));
        scaleFactor = scaleFactor || flowchartBodyTransform.scale[0] || 1;
        var flowchartBBox = flowchartBody.node().getBBox();
        
        // set bounds on the scaling factor
        if(scaleFactor > 4) scaleFactor = 4;
        if(scaleFactor < 0.8) scaleFactor = 0.8;
        
        let centerOnCurrentNode = [
            -1 * (nodeTransform.translate[0]-(flowchartBBox.width/(2*scaleFactor))),
            -1 * (nodeTransform.translate[1]-(flowchartBBox.height/(2*scaleFactor)))
        ];


        flowchartBody.transition()
          .duration(750).attr('transform',`scale(${scaleFactor}) translate(${centerOnCurrentNode})`)
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
