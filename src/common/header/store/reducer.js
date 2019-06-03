import * as constants from './constants';
import {fromJS} from 'immutable';

const defaultState = fromJS({
    // 两个都是immutable对象和数组
    focused: false,
    mouseIn: false,
    list:[],
    page: 1,
    totalPage:1
});

export default (state = defaultState,action)=> {
    switch (action.type) {
        case constants.SEARCH_FOCUS:
            // immutable对象的set方法，会结合之前的immutable对象的值和设置的值，返回一个全新的对象
            return state.set('focused',true);
        case constants.SEARCH_BLUR:
            return state.set('focused',false);
        case constants.CHANGE_LIST:
            //一次性改变state里面的两个数据，要循环地调用set
            return state.merge({
                //action.data是一个普通的数组，数据类型变了.所以要去actionCreator中去改数据类型
                list: action.data,
                totalPage: action.totalPage
            });
        case constants.MOUSE_ENTER:
            return state.set('mouseIn',true);
        case constants.MOUSE_LEAVE:
            return state.set('mouseIn',false);
        case constants.CHANGE_PAGE:
            return state.set('page',action.page);
        default:
            return state;
    }
}