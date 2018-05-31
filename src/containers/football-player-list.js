import React, { Component } from "react";
import Items from '../components/items/items'
import axios from '../axios/axios';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actions';
import classes from './football-player-list.css'
import Auxiliar from "../components/hoc/auxiliar/auxiliar";
import Filter from "../components/filter/filter";
import * as util from '../utils/util'
class FootballPlayerList extends Component {

    state = {
        players:[],
        filteredPlayers: null
    }

    componentDidMount() {
        axios.get('/players.json')
            .then((response) =>{
                const storeData = Object.keys(response.data).map(i => response.data[i])
                this.props.onSetFootballPlayers(storeData);
                this.setState({players: this.props.players})
                console.log(this.props.players)
            })
            .catch(() => console.log('error'))
    }

    onFilterHandler = (player) => {
        let updatedfilteredPlayers = [];
        const players = this.state.players.slice();
        updatedfilteredPlayers = util.findPlayers(players, player);
        console.log(updatedfilteredPlayers)
        if(!players){
            return;
        }
        this.setState({filteredPlayers: updatedfilteredPlayers})
    }

    showAllPlayers() {
        const updatedfilteredPlayers = null;
        this.setState({filteredPlayers: updatedfilteredPlayers})
    }

    render() {
        let players = this.state.players;
        if (this.state.filteredPlayers) {
            players = this.state.filteredPlayers;
        }
        return (
            <Auxiliar>
                <Filter search={(player) => this.onFilterHandler(player)} showAll={() => this.showAllPlayers()}/>
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
                        <Items items={players}/>
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