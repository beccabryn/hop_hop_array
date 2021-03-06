import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import {updateGame} from '../store/user'
import {fetchAllAlgos} from '../store/allAlgos'

class AllAlgos extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    const user = this.props.user

    this.props.onLoadAllAlgos(user.id)
  }

  async startNewGame(algoId, userId) {
    const {data} = await axios.post('/api/games', {algoId, userId})

    this.props.onStartGame(data.id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        user: this.props.user
      })
    }
  }

  render() {
    const algos = this.props.allAlgos
    const user = this.props.user

    let startGame = false
    // if (user.gameId === null) {
    //   startGame = true
    // }

    if (!user) {
      return null
    }

    return (
      <Wrapper>
        <br />
        <br />
        <PageName>All Algos</PageName>
        <SubHead>Select an algo to attempt!</SubHead>
        <div>
          <table className="all-algos-table">
            <TableHeader>
              <tr>
                <Headers>Algo</Headers>
                <Headers>Submitted</Headers>
                <Headers>Level</Headers>
                <Headers>Prompt</Headers>
                {startGame ? <Headers>Start Tournament</Headers> : null}
              </tr>
            </TableHeader>
            <tbody>
              {algos.map(algo => {
                return (
                  <TableRow key={algo.id}>
                    <td>
                      <AlgoLink href={`/algos/${algo.id}`}>
                        {algo.name}
                      </AlgoLink>
                    </td>
                    <Level>
                      {algo.complete === true ? (
                        <Complete className="fa fa-check-circle" />
                      ) : null}
                    </Level>
                    <Level>{algo.algoLevel}</Level>
                    <td>{shortPrompt(algo.prompt, 50)}</td>
                    {startGame ? (
                      <td>
                        <a href={`/algos/${algo.id}`}>
                          <button
                            onClick={() => {
                              this.startNewGame(algo.id, user.id)
                            }}
                          >
                            Start
                          </button>
                        </a>
                      </td>
                    ) : null}
                  </TableRow>
                )
              })}
            </tbody>
          </table>
        </div>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    allAlgos: state.allAlgos
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onStartGame: function(gameId) {
      dispatch(updateGame(gameId))
    },
    onLoadAllAlgos: function(userId) {
      dispatch(fetchAllAlgos(userId))
    }
  }
}

const ConnectedAlgos = connect(mapStateToProps, mapDispatchToProps)(AllAlgos)
export default ConnectedAlgos

//helper functions
function shortPrompt(prompt, maxLength) {
  if (prompt.length <= maxLength) {
    return prompt
  } else {
    return prompt.slice(0, maxLength - 3) + '...'
  }
}

function openAlgos(allAlgos, userLevel) {
  return allAlgos.filter(algo => algo.algoLevel <= userLevel)
}

//styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AlgoLink = styled.a`
  font-weight: bold;
  text-decoration: underline;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
`
const PageName = styled.h1`
  font-family: 'Open Sans', sans-serif;
  text-transform: uppercase;
  font-weight: lighter;
  letter-spacing: 1.9px;
  margin-block-end: 0;
`
const SubHead = styled.h4`
  font-family: 'Open Sans', sans-serif;
  text-transform: uppercase;
`
const TableHeader = styled.thead`
  background-color: #e7e7e7;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  font-family: 'Open Sans', sans-serif;
  text-transform: uppercase;
  text-align: center;
`
const Headers = styled.th`
  padding: 10px;
  align-text: center;
`
const TableRow = styled.tr`
  background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  font-family: 'Open Sans', sans-serif;
`
const Level = styled.td`
  text-align: center;
`
const Complete = styled.i`
  color: green;
`
