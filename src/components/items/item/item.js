import React from 'react';
import Auxiliar from '../../hoc/auxiliar/auxiliar';
import classes from './item.css';

const item = (props) =>(
    <Auxiliar>
        <td className={classes.Item}>{props.text}</td>
    </Auxiliar>
);

export default item;