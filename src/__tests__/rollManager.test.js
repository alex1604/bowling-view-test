import { isStrike, isSpare } from '../utils/rollManager.js';
import React from 'react';

describe('we are testing strike check here:', () => {
    it('returns false if 10 hits on second roll (spare):', () => {
        expect(isStrike([0,10])).toBe(false)
    })
    it('returns false if spare:', () => {
        expect(isStrike([7,3])).toBe(false)
    })
    it('returns true if strike (10 hits on first roll):', () => {
        expect(isStrike([10,0])).toBe(true)
    })
})

describe('we are testing spare check here:', () => {
    it('returns true if 10 hits on second roll (spare):', () => {
        expect(isSpare([0,10])).toBe(true)
    })
    it('returns true if spare:', () => {
        expect(isSpare([7,3])).toBe(true)
    })
    it('returns false if strike (10 hits on first roll):', () => {
        expect(isSpare([10,0])).toBe(false)
    })
})