import * as constants from './constants';
import axios from 'axios';
import {fromJS} from "immutable";

//自己用的
const changeList = (data)=>({
    type: constants.CHANGE_LIST,
    //这里的data是接口数据，是一个普通数据，故要转变
    data: fromJS(data),
    //取整
    totalPage: Math.ceil(data.length/10)
});
// 导出给别人用的
export const searchFocus = () => ({
    //返回一个对象
    type: constants.SEARCH_FOCUS
});
export const searchBlur = () => ({
    type:constants.SEARCH_BLUR
});
export const mouseEnter = () => ({
    type:constants.MOUSE_ENTER
});
export const mouseLeave = () => ({
    type:constants.MOUSE_LEAVE
});
export const changePage = (page) => ({
    type:constants.CHANGE_PAGE,
    page
});
export const getList = () => {
    return (dispatch)=>{
        axios.get('/api/headerList.json').then((res)=>{
            //先获取数据
            const data = res.data;
            //创建action然后把数据传给store
            dispatch(changeList(data.data))
            }).catch(()=>{
                console.log("error");
        })
    }
};