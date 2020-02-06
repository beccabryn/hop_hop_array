import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import Axios from 'axios'

class AllAlgos extends Component {
  constructor() {
    super()
    this.state = {
      algos: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/algos')
    this.setState({algos: data})
  }

  // onClick = async() => {
  //   const newRow = await Axios.post(
  //     `/api/algos`, {userSolution: this.state.algos..defaultText}
  //   )
  // }

  render() {
    const algos = this.state.algos
    console.log(this.state)

    return (
      <Wrapper>
        <PageName>All Algos</PageName>
        <SubHead>Select an algo to attempt!</SubHead>
        <div>
          <table className="all-algos-table">
            <TableHeader>
              <tr>
                <Headers>Algo</Headers>
                <Headers>Level</Headers>
                <Headers>Prompt</Headers>
              </tr>
            </TableHeader>
            <tbody>
              {algos.map(algo => {
                let num = algo.id
                return (
                  <TableRow key={algo.id}>
                    <td>
                      <Link
                        onClick={async () => {
                          await Axios.post(`/api/algos`, {
                            userSolution: algo.defaultText
                          })
                        }}
                        to={`/algos/${algo.id}`}
                      >
                        {algo.name}
                      </Link>
                    </td>
                    <Level>{algo.algoLevel}</Level>
                    <td>{shortPrompt(algo.prompt, 50)}</td>
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
    user: state.user
  }
}

const ConnectedAlgos = connect(mapStateToProps)(AllAlgos)

export default ConnectedAlgos

//helper functions
function shortPrompt(prompt, maxLength) {
  if (prompt.length <= maxLength) {
    return prompt
  } else {
    return prompt.slice(0, maxLength - 3) + '...'
  }
}

//styled components

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
