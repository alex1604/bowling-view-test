import Frame from '../classes/Frame'

var frames = []

function init(){
    for(let i=0; i<10; i++){
        frames.push(new Frame(i))
    }
    return frames
}

export {
    init
}