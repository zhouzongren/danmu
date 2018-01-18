import Danmu from './index'

var danmu = new Danmu()
danmu.createDanmu(['1',2,3,4,5,6,7,8]).run()
setTimeout(()=>{
    danmu.createDanmu('ssssss').run()
},3000)