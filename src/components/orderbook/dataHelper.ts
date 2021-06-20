// Note / @TODO: This algo for groupLevel isn't performing as it should, they need to be revisited.
// Also needs refactoring since those 2 helper function are code duplication

export const levelBids = (groupLevel: number, bids: [number, number][]) => {
  let bidsWithLevel: [number, number][] = []
  let ignoreIndex: number[] = []

  bids.forEach((bid, bidIndex) => {
    if (ignoreIndex.includes(bidIndex)) return

    bids.forEach((nextBid, nextBidIndex) => {
      if (bidIndex === nextBidIndex) return

      let isInFinal = false
      // Merging when groupLevel match
      if (nextBid[0] > bid[0] - groupLevel) {
        bidsWithLevel.forEach((bidWithLevel, finalBidIndex) => {
          if (bidWithLevel[0] === bid[0]) {
            isInFinal = true
            bidsWithLevel[finalBidIndex] = [
              bidWithLevel[0],
              bid[1] + nextBid[1],
            ]
            return
          }
        })
        if (!isInFinal) {
          bidsWithLevel.push([bid[0], bid[1] + nextBid[1]])
        }

        ignoreIndex.push(nextBidIndex)
        return
      }

      // Add single entry
      bidsWithLevel.forEach((bidWithLevel) => {
        if (bidWithLevel[0] === bid[0]) {
          isInFinal = true
          return
        }
      })
      if (!isInFinal) {
        bidsWithLevel.push(bid)
      }
    })
  })

  return bidsWithLevel
}

export const levelAsks = (groupLevel: number, asks: [number, number][]) => {
  let asksWithLevel: [number, number][] = []
  let ignoreIndex: number[] = []

  asks.forEach((ask, askIndex) => {
    if (ignoreIndex.includes(askIndex)) return

    asks.forEach((nextAsk, nextAskIndex) => {
      if (askIndex === nextAskIndex) return

      let isInFinal = false
      // Merging when groupLevel match
      if (nextAsk[0] < ask[0] + groupLevel) {
        asksWithLevel.forEach((askWithLevel, finalAskIndex) => {
          if (askWithLevel[0] === ask[0]) {
            isInFinal = true
            asksWithLevel[finalAskIndex] = [
              askWithLevel[0],
              ask[1] + nextAsk[1],
            ]
            return
          }
        })
        if (!isInFinal) {
          asksWithLevel.push([ask[0], ask[1] + nextAsk[1]])
        }

        ignoreIndex.push(nextAskIndex)
        return
      }

      // Add single entry
      asksWithLevel.forEach((askWithLevel) => {
        if (askWithLevel[0] === ask[0]) {
          isInFinal = true
          return
        }
      })
      if (!isInFinal) {
        asksWithLevel.push(ask)
      }
    })
  })

  return asksWithLevel
}
