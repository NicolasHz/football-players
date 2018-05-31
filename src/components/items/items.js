import React from 'react';

import Item from './item/item';
import classes from './items.css';
import * as util  from '../../utils/util';

const items = (props) => {
    let items = props.items.map( ( item, index ) => {
        const age = util.calculateAge(item.dateOfBirth);
        return (
            <tr key={item.name} className={classes.Item}>
                <Item text={item.name}/>
                <Item text={item.position}/>
                <Item text={item.nationality}/>
                <Item text={age}/>
            </tr>)
    } );

    return items
}

export default items;