import React, { Component } from "react";
import Items from '../components/items/items'
import axios from '../axios/axios';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actions';
import classes from './football-player-list.css'
import Auxiliar from "../components/hoc/auxiliar/auxiliar";
import Filter from "../components/filter/filter";

class FootballPlayerList extends Component {

    componentDidMount() {
        axios.get('/players.json')
            .then((response) =>{
                const storeData = Object.keys(response.data).map(i => response.data[i])
                this.props.onSetFootballPlayers(storeData);
            })
            .catch(() => console.log('error'))
    }

    render() {
        return (
            <Auxiliar>
            <Filter/>
            <table className={classes.Table}>
                <thead>
                    <tr>
                        <th className={classes.Player}>Player</th>
                        <th className={classes.Position}>Position</th>
                        <th className={classes.Team}>Team</th>
                        <th className={classes.Age}>Age</th>
                    </tr>
                </thead>
                <tbody>
                    <Items items={this.props.players}/>
                </tbody>
            </table>
            </Auxiliar>
        );
    }

}

const mapStateToProps = state => {
    return {
        players: state.players.footbalPlayers
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSetFootballPlayers: (players) => dispatch({type: actionTypes.SET_PLAYERS, payload: players})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FootballPlayerList);