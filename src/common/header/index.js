import React,{Component} from 'react';
import {
    Headwrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    Addition,
    Button,
    SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    SearchInfoList
} from './style';
import { CSSTransition } from 'react-transition-group';
import {connect} from 'react-redux';
import {actionCreators} from './store';

class Header extends Component{
    //定义一个方法，实现点击输入框，显示下面热门搜索；不点击不显示
    getListArea(){
        //结构解析,获取到页码了
        const {focused,list,page,totalPage,mouseIn,handleMouseEnter,handleMouseLeave,handleChangePage} = this.props;
        // list是immutable的数据类型，toJS方法把数组转为普通的js数组
        const newList = list.toJS();
        const pageList = [];
        //只有ajax获取数据，才能做分页的展示
        if (newList.length){
            for (let i = (page - 1)*10;i < page * 10;i++){
                pageList.push(
                    //key值对应list的第几项
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }
        //参数是真，返回列表
        if (focused || mouseIn){
            return(
                <SearchInfo
                    onMouseEnter = {handleMouseEnter}
                    onMouseLeave = {handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch
                            onClick={()=>handleChangePage(page,totalPage,this.spinIcon)}>
                            {/*//ref可以获取真实的DOM节点*/}
                            <i ref={(icon)=>{this.spinIcon = icon}} className={'iconfont spin'}>&#xe626;</i>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {/*//循环*/}
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>
            )
        } else{
            //参数是假，不返回列表
            return null;
        }
    };
    render(){
        //结构解析
        const {focused,list,handleInputFocus,handleInputBlur} = this.props;
        return(
            <Headwrapper>
                <Logo/>
                <Nav>
                    <NavItem className={'left active'}>首页</NavItem>
                    <NavItem className={'left'}>下载App</NavItem>
                    <NavItem className={'right'}>登录</NavItem>
                    <NavItem className={'right'}>
                        <i className={"iconfont"}>&#xe636;</i>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={focused}
                            timeout={1000}
                            classNames={'slide'}
                        >
                            <NavSearch
                                className={focused ? 'focused' : ''}
                                onFocus={()=>{handleInputFocus(list)}}
                                onBlur={handleInputBlur}
                            >
                            </NavSearch>
                        </CSSTransition>
                        <i className={focused ? 'focused iconfont zoom' :"iconfont zoom"}>
                            &#xe614;
                        </i>
                        {/*//调用这个方法，传参数*/}
                        {this.getListArea()}
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Button className={"writing"}>
                        <i className={"iconfont"}>&#xe615;</i>
                        写文章
                    </Button>
                    <Button className={"reg"}>注册</Button>
                </Addition>
            </Headwrapper>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        //从header下面取数据
        // focused: state.get('header').get('focused')
        focused: state.getIn(['header','focused']),
        //从这里取数据
        list: state.getIn(['header','list']),
        //去store里面获取页码
        page: state.getIn(['header','page']),
        totalPage: state.getIn(['header','totalPage']),
        mouseIn: state.getIn(['header','mouseIn'])
    }
};
const mapDispatchToProps = (dispatch)=>{
    return {
        // 聚焦的时候，派发一个action
        handleInputFocus(list){
            //只有list.size等于0的时候，才去请求数据；有数据了就不要请求数据了
           (list.size === 0) && dispatch(actionCreators.getList());
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur(){
           dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter(){
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave(){
            dispatch(actionCreators.mouseLeave());
        },
        handleChangePage(page,totalPage,spin){
            // replace方法取字符串中的数字;如果这里某个字母中有不是0-9的数字，我就把它都替换成空
            // 单纯的CSS过渡效果实现
            let originAngel = spin.style.transform.replace(/[^0-9]/ig,'');
            if (originAngel){
                //把原始角度以十进制的形式变成一个数字
                originAngel = parseInt(originAngel ,10);
            }else{
                // 刚开始是空，rotate没有值，也就是初始值为0
                originAngel = 0
            }
            //点击一次是360度
            spin.style.transform = 'rotate('+(originAngel +360)+'deg)';
            if (page<totalPage){
                dispatch(actionCreators.changePage(page+1));
            } else{
                dispatch(actionCreators.changePage(1));
            }

        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Header);