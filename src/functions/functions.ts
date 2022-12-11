import { Dispatch, SetStateAction } from 'react'
import { ghostObject, packmanObject, playItem } from '../types/playTypes'

export const setEyes = (packmanTop: number, packmanLeft: number, ghostTop: number, ghostLeft: number) => {

    let eyePosition = { top: '0px', left: '0px' }

    if (packmanTop < ghostTop) {
        packmanLeft > ghostLeft ? eyePosition = { top: '0px', left: '8px' } :
            packmanLeft < ghostLeft ? eyePosition = { top: '0px', left: '0px' } :
                eyePosition = { top: '0px', left: '4px' }
    }
    else if (packmanTop > ghostTop) {
        packmanLeft > ghostLeft ? eyePosition = { top: '8px', left: '8px' } :
            packmanLeft < ghostLeft ? eyePosition = { top: '8px', left: '0px' } :
                eyePosition = { top: '8px', left: '4px' }
    }
    else packmanLeft > ghostLeft ? eyePosition = { top: '4px', left: '8px' } : packmanLeft < ghostLeft ? eyePosition = { top: '4px', left: '0px' } : eyePosition = { top: '4px', left: '4px' }

    return eyePosition
}


export const findWay = async (index: number, needIndex: number, playField: playItem[], packmanPosition: packmanObject, blinkyPosition: ghostObject, setBlinkyPosition: Dispatch<SetStateAction<ghostObject>>, setEyePosition: Dispatch<SetStateAction<{ left: string, top: string }>>, setIsPackmanDead: Dispatch<SetStateAction<boolean>>) => {
    let allCount = Infinity
    let result: number[] = []
    let packmanIndex = packmanPosition.top * 15 + packmanPosition.left

    let findWays = async (mass: number[], index: number, count: number) => {
        if (index == needIndex || count > allCount) {
            if (count < allCount) {
                allCount = count
                result = mass
            }
            return
        }
        let newMass = []
        let top = Math.floor(index / 15)
        let left = index % 15
        if (top - 1 >= 0) newMass.push((top - 1) * 15 + left)
        if (top + 1 <= 14) newMass.push((top + 1) * 15 + left)
        if (left - 1 >= 0) newMass.push((top) * 15 + left - 1)
        if (left + 1 <= 14) newMass.push((top) * 15 + left + 1)
        newMass = newMass.filter(item => playField[item].type != 'BLOCK' && !mass.includes(item))
        newMass = newMass.sort((a, b) => Math.abs(a - needIndex) - Math.abs(b - needIndex))
        for (let i = 0; i < newMass.length; i++) {
            let massNew = [...mass]
            massNew.push(newMass[i])
            await findWays(massNew, newMass[i], count + 1)
        }
    }

    await findWays([], index, 0)

    if (result.length > 0) {
        let top = Math.floor(result[0] / 15)
        let left = result[0] % 15
        setEyePosition(setEyes(packmanPosition.top, packmanPosition.left, blinkyPosition.top, blinkyPosition.left))
        setBlinkyPosition({ top: top, left: left })
        if (result[0] == packmanIndex || (blinkyPosition.top * 15 + blinkyPosition.left) == packmanIndex) return setTimeout(() => setIsPackmanDead(true), 300)
    }
    else {
        let newMass = []
        let top = Math.floor(index / 15)
        let left = index % 15
        if (top - 1 >= 0) newMass.push((top - 1) * 15 + left)
        if (top + 1 <= 14) newMass.push((top + 1) * 15 + left)
        if (left - 1 >= 0) newMass.push((top) * 15 + left - 1)
        if (left + 1 <= 14) newMass.push((top) * 15 + left + 1)
        newMass = newMass.filter(item => playField[item].type != 'BLOCK')
        let newTop = Math.floor(newMass[0] / 15)
        let newLeft = newMass[0] % 15
        setBlinkyPosition({ top: newTop, left: newLeft })
        if (newMass[0] == packmanIndex || (blinkyPosition.top * 15 + blinkyPosition.left) == packmanIndex) return setTimeout(() => setIsPackmanDead(true), 300)
    }
}