/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react"
import { StyleSheet, Text, TouchableHighlight, View } from "react-native"

import type { MyGameProps } from "./game"

class Board extends React.Component<MyGameProps> {
  onClick = (id: number) => {
    if (this.isActive(id)) {
      this.props.moves.clickCell(id)
    }
  }

  isActive(id: number) {
    if (!this.props.isActive) return false
    if (this.props.G.cells[id] !== null) return false
    return true
  }

  render() {
    const tbody = []
    const marker = {
      0: "X",
      1: "O",
    }
    for (let i = 0; i < 3; i++) {
      const cells = []
      for (let j = 0; j < 3; j++) {
        const id: number = 3 * i + j
        let styleId: keyof typeof styles = "cell0"
        switch (id) {
          case 0:
            styleId = "cell0"
            break
          case 1:
            styleId = "cell1"
            break
          case 2:
            styleId = "cell2"
            break
          case 3:
            styleId = "cell3"
            break
          case 4:
            styleId = "cell"
            break
          case 5:
            styleId = "cell5"
            break
          case 6:
            styleId = "cell6"
            break
          case 7:
            styleId = "cell7"
            break
          case 8:
            styleId = "cell8"
            break
        }
        cells.push(
          <TouchableHighlight
            key={id}
            onPress={() => this.onClick(id)}
            style={[styles.cell, styles[styleId]]}
            underlayColor="transparent"
          >
            <Text style={styles.value}>{marker[this.props.G.cells[id]]}</Text>
          </TouchableHighlight>
        )
      }
      tbody.push(
        <View key={i} style={styles.row}>
          {cells}
        </View>
      )
    }

    let disconnected = null
    if (this.props.isMultiplayer && !this.props.isConnected) {
      disconnected = <Text style={styles.infoText}>Disconnected!</Text>
    }

    let winner = null
    if (this.props.ctx.gameover !== undefined) {
      winner = (
        <Text style={styles.infoText}>
          Winner: {marker[this.props.ctx.gameover === "0" ? 0 : 1]}
        </Text>
      )
    }

    let player = null
    if (this.props.playerID !== null) {
      player = (
        <Text style={styles.infoText}>Player: {this.props.playerID}</Text>
      )
    }

    return (
      <View>
        <View>{tbody}</View>
        <View style={styles.info}>
          {player}
          {winner}
          {disconnected}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cell: {
    alignItems: "center",
    justifyContent: "center",
    width: 96,
    height: 96,
    borderWidth: 4,
    borderColor: "#666",
    borderStyle: "solid",
  },
  value: {
    fontSize: 48,
    fontWeight: "700",
    color: "#373748",
  },
  cell0: {
    borderLeftColor: "transparent",
    borderTopColor: "transparent",
  },
  cell1: {
    borderTopColor: "transparent",
  },
  cell2: {
    borderTopColor: "transparent",
    borderRightColor: "transparent",
  },
  cell3: {
    borderLeftColor: "transparent",
  },
  cell5: {
    borderRightColor: "transparent",
  },
  cell6: {
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
  },
  cell7: {
    borderBottomColor: "transparent",
  },
  cell8: {
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderStyle: "solid",
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginTop: 24,
  },
  infoText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#373748",
  },
})

export { Board }
