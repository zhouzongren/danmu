import  * as $ from 'jquery'

window.$ = $;
class DanmuChild{
    constructor(danmu=[{}],speed,c_width,interval=500){
        this.speed = speed
        this.cruDanmu = danmu 
        this.c_width =c_width
        this.interval = interval
    }
    run(){
        let arr = [...this.cruDanmu]
        if(arr.length===1){
            this.move($(arr[0]))
        }
        else if(arr.length >1){
            let index= 0
            this.move($(arr[index]))
            setInterval(()=>{
                if(arr.length>0)
                this.move($(arr.shift()))
            },this.interval)
        }
    }
    move(element){
        if(element.offset().left>0 ){
            element.animate({
                right:this.c_width + 'px'
            },this.speed,'linear',()=>{
                element.remove()
            })
        }
        return this
    }
}
export default  class Danmu{
    constructor(config={}){
        this.config = Object.assign({
            areaHeight:'300',
            top:0,
            speed:8000
        },config)
        this.dropback = this.init()
    }
    init(){
        var {areaHeight ,top} = this.config;
        var dropback = $('<i></i>').css({
            'position':'absolute',
            'overflow':'hidden',
            'width':'100%',
            'height':areaHeight +'px',
            'top':top+'px',
            'z-index':999,
        })
        if(window){
            $('body').append(dropback);
            return dropback
        }
    }
    createDanmu(text){
        var {speed} = this.config
        var danmu 
        if(typeof text === 'string'){
            danmu =[text]
        }
        if(Object.prototype.toString.call(text)=='[object Array]'){
            danmu =text
        }
        let _dman = danmu.map((el)=>{
            var d = $('<div></div>').text(el).css({
                height:'45px',
                fontSize:'30px',
                lineHight:'45px',
                position:'absolute',
                fontStyle:'normal',
                top:this.ladder(45)
            });
            this.dropback.append(d)
            d.css({right:-d.width()+'px'})
            // danmu.push(d)
            return d
        })
        
        return new DanmuChild(_dman,speed,this.dropback.width())
    }
    ladder(h){
        var {areaHeight:H} = this.config
        return  Math.floor(Math.random()*Math.floor(H/h))*h
    }
}