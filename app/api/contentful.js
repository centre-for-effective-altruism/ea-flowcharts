import Contentful from 'contentful/browser';
import React from 'react';

const contentful = Contentful.createClient({
    space: 'ppxi1l1afmkx',
    accessToken: 'cf596a41ff02b2d36634aef2efdae682f23f66844b7dcab74e270a2881a299df',
});

export default contentful;

export const contentfulObjShape = {
    sys: React.PropTypes.object,
    fields: React.PropTypes.object,
};
