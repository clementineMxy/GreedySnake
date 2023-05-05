//食物类
class Food{
    //食物对应元素
    element:HTMLElement;

    constructor(){
        this.element=document.getElementById('food')!;
    }

    //获取食物坐标方法
    get X(){
        return this.element.offsetLeft;
    }
    get Y(){
        return this.element.offsetTop;
    }
    //修改食物位置的方法
    change(){
        //坐标必须是10的倍数，否则蛇无法吃到
        let top=Math.round(Math.random()*29)*10;
        let left=Math.round(Math.random()*29)*10;
        this.element.style.left=left+"px";
        this.element.style.top=top+"px";
    }

}
export default Food;